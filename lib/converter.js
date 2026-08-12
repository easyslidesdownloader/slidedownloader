// Client-side export helpers: PDF, PPTX, ZIP
// Keeps its own in-memory cache of fetched image blobs so downloads
// are instant once slides have been prefetched, regardless of browser
// HTTP-cache behavior (which Next.js dev mode disables anyway).

const imageCache = new Map(); // slideUrl -> Blob

function proxied(url) {
  return `/api/proxy-image?url=${encodeURIComponent(url)}`;
}

async function getImageBlob(url) {
  if (imageCache.has(url)) return imageCache.get(url);
  const res = await fetch(proxied(url));
  const blob = await res.blob();
  imageCache.set(url, blob);
  return blob;
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function getImageDimensions(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.src = dataUrl;
  });
}

export async function prefetchSlides(slides, concurrency = 6) {
  let i = 0;
  async function worker() {
    while (i < slides.length) {
      const url = slides[i++];
      try {
        await getImageBlob(url);
      } catch {}
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
}

export async function exportToPDF(slides, filename, onProgress) {
  const { jsPDF } = await import("jspdf");
  let doc = null;
  const MARGIN = 10; // mm on every side

  for (let i = 0; i < slides.length; i++) {
    const blob = await getImageBlob(slides[i]);
    const dataUrl = await blobToDataUrl(blob);
    const { width, height } = await getImageDimensions(dataUrl);
    const orientation = width >= height ? "landscape" : "portrait";
    const pdfWidth = orientation === "landscape" ? 297 : 210;
    const imgWidth = pdfWidth - MARGIN * 2;
    const imgHeight = (imgWidth * height) / width;
    const pdfHeight = imgHeight + MARGIN * 2;

    if (i === 0) {
      doc = new jsPDF({ orientation, unit: "mm", format: [pdfWidth, pdfHeight] });
    } else {
      doc.addPage([pdfWidth, pdfHeight], orientation);
    }
    doc.addImage(dataUrl, "JPEG", MARGIN, MARGIN, imgWidth, imgHeight);
    onProgress?.(i + 1, slides.length);
  }

  doc.save(`${filename}.pdf`);
}

export async function exportToPPTX(slides, filename, onProgress) {
  const PptxGenJS = (await import("pptxgenjs")).default;
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_16x9";

  for (let i = 0; i < slides.length; i++) {
    const blob = await getImageBlob(slides[i]);
    const dataUrl = await blobToDataUrl(blob);
    const slide = pptx.addSlide();
    slide.addImage({ data: dataUrl, x: 0, y: 0, w: "100%", h: "100%" });
    onProgress?.(i + 1, slides.length);
  }

  await pptx.writeFile({ fileName: `${filename}.pptx` });
}

export async function exportToZIP(slides, filename, onProgress) {
  const JSZip = (await import("jszip")).default;
  const { saveAs } = await import("file-saver");

  const zip = new JSZip();
  const folder = zip.folder(`${filename}_images`);

  for (let i = 0; i < slides.length; i++) {
    const blob = await getImageBlob(slides[i]);
    const num = String(i + 1).padStart(2, "0");
    folder.file(`slide_${num}.jpg`, blob);
    onProgress?.(i + 1, slides.length);
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  saveAs(zipBlob, `${filename}_slides.zip`);
}