import * as cheerio from "cheerio";

export const maxDuration = 60;

const SLIDESHARE_HOSTS = [
  "slideshare.net",
  "www.slideshare.net",
];

const CDN_HOST = "image.slidesharecdn.com";

function isValidSlideShareUrl(url: string) {
  try {
    const parsed = new URL(url);

    return (
      parsed.protocol === "https:" &&
      SLIDESHARE_HOSTS.includes(parsed.hostname)
    );
  } catch {
    return false;
  }
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 15000
) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchHtml(url: string) {
  const res = await fetchWithTimeout(
    url,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",

        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",

        "Accept-Language": "en-US,en;q=0.9",

        Referer: "https://www.slideshare.net/",
      },

      cache: "no-store",
    },
    15000
  );

  const text = await res.text();

  console.log("[SlideShare] Page status:", res.status);
  console.log("[SlideShare] Page URL:", url);
  console.log("[SlideShare] HTML length:", text.length);

  if (!res.ok) {
    throw new Error(
      `SlideShare returned HTTP ${res.status}. The hosting server may be blocked or the presentation may be unavailable.`
    );
  }

  return text;
}

async function slideExists(url: string) {
  try {
    const res = await fetchWithTimeout(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",

          Accept: "image/avif,image/webp,image/apng,image/jpeg,image/*,*/*;q=0.8",

          Referer: "https://www.slideshare.net/",
        },

        cache: "no-store",
      },
      10000
    );

    console.log(
      "[SlideShare CDN]",
      res.status,
      url
    );

    return res.ok;
  } catch (error) {
    console.error("[SlideShare CDN] Probe failed:", error);
    return false;
  }
}

async function probeTotalSlides(
  slug: string,
  namePart: string,
  startFrom = 1,
  maxSlides = 500,
  batchSize = 10
) {
  let lastSuccess = startFrom - 1;
  let n = startFrom;

  while (n <= maxSlides) {
    const batch: number[] = [];

    for (
      let i = 0;
      i < batchSize && n + i <= maxSlides;
      i++
    ) {
      batch.push(n + i);
    }

    const results = await Promise.all(
      batch.map(async (num) => {
        const url =
          `https://${CDN_HOST}/${slug}/85/${namePart}-${num}-320.jpg`;

        return {
          num,
          ok: await slideExists(url),
        };
      })
    );

    let anySuccess = false;

    for (const result of results) {
      if (result.ok) {
        anySuccess = true;
        lastSuccess = Math.max(lastSuccess, result.num);
      }
    }

    if (!anySuccess) {
      break;
    }

    n += batchSize;
  }

  return lastSuccess;
}

function buildSlideUrl(
  slug: string,
  namePart: string,
  n: number,
  quality: string
) {
  if (quality === "fullhd") {
    return `https://${CDN_HOST}/${slug}/75/${namePart}-${n}-2048.jpg`;
  }

  if (quality === "hd") {
    return `https://${CDN_HOST}/${slug}/85/${namePart}-${n}-638.jpg`;
  }

  return `https://${CDN_HOST}/${slug}/85/${namePart}-${n}-320.jpg`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const url = typeof body.url === "string" ? body.url.trim() : "";
    const quality =
      body.quality === "hd" || body.quality === "fullhd"
        ? body.quality
        : "sd";

    if (!isValidSlideShareUrl(url)) {
      return Response.json(
        {
          success: false,
          error: "Please enter a valid SlideShare URL.",
        },
        { status: 400 }
      );
    }

    console.log("[fetch-slides] Starting:", url);
    console.log("[fetch-slides] Quality:", quality);

    const html = await fetchHtml(url);

    const $ = cheerio.load(html);

    const rawTitle = $("title").first().text();

    const cleanTitle =
      rawTitle
        .replace(/\s*\|\s*(PPTX?|SlideShare)$/i, "")
        .trim() || "presentation";

    const match = html.match(
      /https:\/\/image\.slidesharecdn\.com\/([^/"']+)\/85\/([^/"']+?)-(\d+)-320\.jpg/i
    );

    if (!match) {
      console.error("[fetch-slides] CDN pattern not found");

      return Response.json(
        {
          success: false,
          error:
            "No slides found. SlideShare may have changed its page structure, or the presentation may be private/deleted.",
          debug: {
            pageTitle: cleanTitle,
            htmlLength: html.length,
            htmlPreview: html.slice(0, 1000),
          },
        },
        { status: 404 }
      );
    }

    const slug = match[1];
    const namePart = match[2];

    console.log("[fetch-slides] Slug:", slug);
    console.log("[fetch-slides] Name:", namePart);

    let htmlCount = 0;

    $(
      '[id^="slide"].slide-item, [id^="slide"][data-cy="slide-container"]'
    ).each((_, el) => {
      const id = $(el).attr("id") || "";

      const m = id.match(/^slide(\d+)$/);

      if (m) {
        htmlCount = Math.max(
          htmlCount,
          parseInt(m[1], 10)
        );
      }
    });

    console.log("[fetch-slides] HTML slide count:", htmlCount);

    let totalSlides = htmlCount;

    if (htmlCount === 0) {
      totalSlides = await probeTotalSlides(
        slug,
        namePart,
        1
      );
    } else {
      totalSlides = await probeTotalSlides(
        slug,
        namePart,
        htmlCount + 1
      );
    }

    console.log(
      "[fetch-slides] Final slide count:",
      totalSlides
    );

    if (totalSlides === 0) {
      return Response.json(
        {
          success: false,
          error:
            "No slides could be detected. The presentation may be private, deleted, or SlideShare may be blocking the hosting server.",
        },
        { status: 404 }
      );
    }

    const slides = [];

    for (let n = 1; n <= totalSlides; n++) {
      slides.push(
        buildSlideUrl(
          slug,
          namePart,
          n,
          quality
        )
      );
    }

    const filename =
      cleanTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 100) || "presentation";

    return Response.json({
      success: true,
      title: cleanTitle,
      filename,
      count: slides.length,
      slides,
    });
  } catch (error) {
    console.error("[fetch-slides] ERROR:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unknown server error";

    return Response.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}