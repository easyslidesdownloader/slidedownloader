const imageCache = new Map();

/*
 * Prevent multiple requests for the same image from happening
 * simultaneously.
 */
const imageRequestCache = new Map();

function proxied(url) {
  return `/api/proxy-image?url=${encodeURIComponent(url)}`;
}

async function getImageBlob(url) {
  if (imageCache.has(url)) {
    return imageCache.get(url);
  }

  if (imageRequestCache.has(url)) {
    return imageRequestCache.get(url);
  }

  const request = (async () => {
    const res = await fetch(proxied(url));

    if (!res.ok) {
      throw new Error(
        `Failed to fetch slide image (${res.status})`
      );
    }

    const contentType =
      res.headers.get("content-type") || "";

    if (!contentType.startsWith("image/")) {
      throw new Error(
        `Invalid slide response: ${contentType}`
      );
    }

    const blob = await res.blob();

    imageCache.set(url, blob);

    return blob;
  })();

  imageRequestCache.set(url, request);

  try {
    return await request;
  } finally {
    imageRequestCache.delete(url);
  }
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(blob);
  });
}

function getImageDimensions(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };

    img.onerror = () => {
      reject(
        new Error("Unable to read image dimensions")
      );
    };

    img.src = dataUrl;
  });
}


/* ---------------------------------------------------------
   PREFETCH
--------------------------------------------------------- */

export async function prefetchSlides(
  slides,
  concurrency = 6
) {
  let index = 0;

  async function worker() {
    while (true) {
      const currentIndex = index++;

      if (currentIndex >= slides.length) {
        return;
      }

      const url = slides[currentIndex];

      try {
        await getImageBlob(url);
      } catch (error) {
        console.warn(
          "[prefetch] Failed:",
          url,
          error
        );
      }
    }
  }

  const workerCount = Math.min(
    concurrency,
    slides.length
  );

  await Promise.all(
    Array.from(
      { length: workerCount },
      () => worker()
    )
  );
}


/* ---------------------------------------------------------
   INTERNAL PDF GENERATOR
--------------------------------------------------------- */

async function generatePDF(
  slides,
  onProgress
) {
  const { jsPDF } = await import("jspdf");

  let doc = null;

  const MARGIN = 10;

  for (let i = 0; i < slides.length; i++) {
    const blob = await getImageBlob(
      slides[i]
    );

    const dataUrl =
      await blobToDataUrl(blob);

    const { width, height } =
      await getImageDimensions(dataUrl);

    const orientation =
      width >= height
        ? "landscape"
        : "portrait";

    const pdfWidth =
      orientation === "landscape"
        ? 297
        : 210;

    const imgWidth =
      pdfWidth - MARGIN * 2;

    const imgHeight =
      (imgWidth * height) / width;

    const pdfHeight =
      imgHeight + MARGIN * 2;

    if (i === 0) {
      doc = new jsPDF({
        orientation,
        unit: "mm",
        format: [
          pdfWidth,
          pdfHeight,
        ],
      });
    } else {
      doc.addPage(
        [
          pdfWidth,
          pdfHeight,
        ],
        orientation
      );
    }

    doc.addImage(
      dataUrl,
      "JPEG",
      MARGIN,
      MARGIN,
      imgWidth,
      imgHeight
    );

    onProgress?.(
      i + 1,
      slides.length
    );
  }

  if (!doc) {
    throw new Error(
      "No slides available"
    );
  }

  /*
   * Return the PDF as a Blob instead of
   * immediately downloading it.
   */
  return doc.output("blob");
}


/* ---------------------------------------------------------
   BACKGROUND PDF PREPARATION
--------------------------------------------------------- */

export async function preparePDF(
  slides
) {
  /*
   * Images should already be prefetched by page.tsx.
   *
   * However, getImageBlob() has its own cache, so this
   * remains safe even if prefetching isn't complete.
   */
  return generatePDF(slides);
}


/* ---------------------------------------------------------
   PDF DOWNLOAD
--------------------------------------------------------- */

export async function exportToPDF(
  slides,
  filename,
  onProgress
) {
  const blob =
    await generatePDF(
      slides,
      onProgress
    );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download =
    `${filename}.pdf`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  /*
   * Give the browser a moment to start
   * the download before releasing the URL.
   */
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}


/* ---------------------------------------------------------
   PPTX
--------------------------------------------------------- */

export async function exportToPPTX(
  slides,
  filename,
  onProgress
) {
  const PptxGenJS =
    (await import("pptxgenjs")).default;

  const pptx =
    new PptxGenJS();

  pptx.layout =
    "LAYOUT_16x9";

  for (
    let i = 0;
    i < slides.length;
    i++
  ) {
    const blob =
      await getImageBlob(
        slides[i]
      );

    const dataUrl =
      await blobToDataUrl(blob);

    const slide =
      pptx.addSlide();

    slide.addImage({
      data: dataUrl,
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
    });

    onProgress?.(
      i + 1,
      slides.length
    );
  }

  await pptx.writeFile({
    fileName:
      `${filename}.pptx`,
  });
}


/* ---------------------------------------------------------
   ZIP
--------------------------------------------------------- */

export async function exportToZIP(
  slides,
  filename,
  onProgress
) {
  const JSZip =
    (await import("jszip")).default;

  const { saveAs } =
    await import("file-saver");

  const zip =
    new JSZip();

  const folder =
    zip.folder(
      `${filename}_images`
    );

  if (!folder) {
    throw new Error(
      "Unable to create ZIP folder"
    );
  }

  for (
    let i = 0;
    i < slides.length;
    i++
  ) {
    const blob =
      await getImageBlob(
        slides[i]
      );

    const num =
      String(i + 1)
        .padStart(2, "0");

    folder.file(
      `slide_${num}.jpg`,
      blob
    );

    onProgress?.(
      i + 1,
      slides.length
    );
  }

  const zipBlob =
    await zip.generateAsync({
      type: "blob",
    });

  saveAs(
    zipBlob,
    `${filename}_slides.zip`
  );
}