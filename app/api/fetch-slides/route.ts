import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const maxDuration = 60;

/* ---------------------------------------------------------
   PRIMARY: OUR OWN SCRAPER
--------------------------------------------------------- */

async function fetchHtml(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Referer": "https://www.slideshare.net/",
      "Connection": "keep-alive",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch page (status ${res.status})`);
  return res.text();
}

async function slideExists(url: string) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

async function probeTotalSlides(slug: string, namePart: string, startFrom = 1, maxSlides = 1000, batchSize = 15) {
  let lastSuccess = startFrom - 1;
  let n = startFrom;

  while (n <= maxSlides) {
    const batch = [];
    for (let i = 0; i < batchSize && n + i <= maxSlides; i++) batch.push(n + i);

    const results = await Promise.all(
      batch.map(async (num) => {
        const url = `https://image.slidesharecdn.com/${slug}/85/${namePart}-${num}-320.jpg`;
        return { num, ok: await slideExists(url) };
      })
    );

    const anySuccess = results.some((r) => r.ok);
    for (const r of results) if (r.ok) lastSuccess = Math.max(lastSuccess, r.num);
    if (!anySuccess) break;
    n += batchSize;
  }

  return lastSuccess;
}

function buildOwnUrl(slug: string, namePart: string, n: number, q: string) {
  if (q === "fullhd") return `https://image.slidesharecdn.com/${slug}/75/${namePart}-${n}-2048.jpg`;
  if (q === "hd") return `https://image.slidesharecdn.com/${slug}/85/${namePart}-${n}-638.jpg`;
  return `https://image.slidesharecdn.com/${slug}/85/${namePart}-${n}-320.jpg`;
}

async function tryOwnScraper(url: string, quality: string) {
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);

  const rawTitle = $("title").first().text();
  const cleanTitle = rawTitle.replace(/\s*\|\s*(PPTX?|SlideShare)$/i, "").trim() || "presentation";

  const match = html.match(/https:\/\/image\.slidesharecdn\.com\/([^/"']+)\/85\/([^/"']+?)-(\d+)-320\.jpg/i);
  if (!match) throw new Error("Own scraper: no slide pattern found (likely blocked or invalid URL)");

  const slug = match[1];
  const namePart = match[2];

  let htmlCount = 0;
  $('[id^="slide"].slide-item, [id^="slide"][data-cy="slide-container"]').each((_, el) => {
    const id = $(el).attr("id") || "";
    const m = id.match(/^slide(\d+)$/);
    if (m) htmlCount = Math.max(htmlCount, parseInt(m[1], 10));
  });

  const totalSlides =
    htmlCount === 0 ? await probeTotalSlides(slug, namePart, 1) : await probeTotalSlides(slug, namePart, htmlCount + 1);

  if (totalSlides === 0) throw new Error("Own scraper: no slides found");

  const slides = [];
  for (let n = 1; n <= totalSlides; n++) slides.push(buildOwnUrl(slug, namePart, n, quality));

  const filename =
    cleanTitle.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 100) || "presentation";

  return { success: true, title: cleanTitle, filename, count: slides.length, slides, source: "own" };
}

/* ---------------------------------------------------------
   FALLBACK: THIRD-PARTY API
   Only used if our own scraper fails (blocked, changed page
   structure, etc). Their quality tiers don't line up exactly
   with ours (see note above), so it's an imperfect but working
   backup rather than a primary source.
--------------------------------------------------------- */

async function tryFallbackApi(url: string, quality: string) {
  // Our 3 tiers -> their 2 tiers. Their "sd" already returns 638px
  // (what we call HD), so this is the closest available mapping.
  const theirQuality = quality === "fullhd" ? "hd" : "sd";

  const res = await fetch("https://api.slidesharedownloader.top/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slideshareUrl: url, quality: theirQuality }),
  });

  if (!res.ok) throw new Error(`Fallback API returned HTTP ${res.status}`);

  const data = await res.json();
  if (!data.success || !data.images?.length) throw new Error("Fallback API returned no slides");

  const title = data.title?.trim() || "presentation";
  const filename =
    title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 100) || "presentation";

  return {
    success: true,
    title,
    filename,
    count: data.images.length,
    slides: data.images,
    source: "fallback",
  };
}

/* ---------------------------------------------------------
   HANDLER
--------------------------------------------------------- */

export async function POST(req: NextRequest) {
  try {
    const { url, quality = "sd" } = await req.json();

    if (!url || !url.includes("slideshare.net")) {
      return NextResponse.json({ success: false, error: "Please enter a valid SlideShare URL." }, { status: 400 });
    }

    try {
      const result = await tryOwnScraper(url, quality);
      return NextResponse.json(result);
    } catch (ownError) {
      console.warn("[fetch-slides] Own scraper failed, trying fallback API:", ownError);

      try {
        const result = await tryFallbackApi(url, quality);
        return NextResponse.json(result);
      } catch (fallbackError) {
        console.error("[fetch-slides] Fallback API also failed:", fallbackError);
        return NextResponse.json(
          {
            success: false,
            error: "No slides found. The presentation may be private, deleted, or the URL is wrong.",
          },
          { status: 404 }
        );
      }
    }
  } catch (error) {
    console.error("[fetch-slides] ERROR:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Something went wrong." },
      { status: 500 }
    );
  }
}