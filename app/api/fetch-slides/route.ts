import * as cheerio from "cheerio";

export const maxDuration = 60;

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
    for (let i = 0; i < batchSize && n + i <= maxSlides; i++) {
      batch.push(n + i);
    }

    const results = await Promise.all(
      batch.map(async (num) => {
        const url = `https://image.slidesharecdn.com/${slug}/85/${namePart}-${num}-320.jpg`;
        return { num, ok: await slideExists(url) };
      })
    );

    const anySuccess = results.some((r) => r.ok);
    for (const r of results) {
      if (r.ok) lastSuccess = Math.max(lastSuccess, r.num);
    }

    if (!anySuccess) break; // whole batch failed — we've reached the end
    n += batchSize;
  }

  return lastSuccess;
}

export async function POST(req: Request) {
  try {
    const { url, quality } = await req.json();

    if (!url || !url.includes("slideshare.net")) {
      return Response.json({ success: false, error: "Please enter a valid SlideShare URL" }, { status: 400 });
    }

    const html = await fetchHtml(url);
    const $ = cheerio.load(html);

    const rawTitle = $("title").first().text();
    const cleanTitle = rawTitle.replace(/\s*\|\s*(PPTX?|SlideShare)$/i, "").trim() || "presentation";

    const match = html.match(/https:\/\/image\.slidesharecdn\.com\/([^/"']+)\/85\/([^/"']+?)-(\d+)-320\.jpg/i);

    if (!match) {
      return Response.json(
        {
          success: false,
          error: "No slides found. The presentation may be private, deleted, or the URL is wrong.",
          debug: { pageTitle: cleanTitle, htmlLength: html.length, htmlPreview: html.slice(0, 500) },
        },
        { status: 404 }
      );
    }

    const slug = match[1];
    const namePart = match[2];

    // Count real slide divs directly from the HTML (id="slide1", "slide2", ...)
    // instead of probing each CDN URL one-by-one — much faster and avoids
    // hammering SlideShare's image server.
    let htmlCount = 0;
    $('[id^="slide"].slide-item, [id^="slide"][data-cy="slide-container"]').each((_, el) => {
      const id = $(el).attr("id") || "";
      const m = id.match(/^slide(\d+)$/);
      if (m) htmlCount = Math.max(htmlCount, parseInt(m[1], 10));
    });

    // SlideShare's initial HTML often only includes the first ~100 slides for
    // large decks (the rest load as you scroll). Since we can't scroll here,
    // continue probing the CDN directly past whatever count we found in the
    // HTML, so decks with hundreds of slides aren't cut short.
    let totalSlides = htmlCount;
    if (htmlCount === 0) {
      totalSlides = await probeTotalSlides(slug, namePart, 1);
    } else {
      totalSlides = await probeTotalSlides(slug, namePart, htmlCount + 1);
    }

    if (totalSlides === 0) {
      return Response.json(
        { success: false, error: "No slides found. The presentation may be private, deleted, or the URL is wrong." },
        { status: 404 }
      );
    }

    function buildUrl(n: number, q: string) {
      if (q === "fullhd") return `https://image.slidesharecdn.com/${slug}/75/${namePart}-${n}-2048.jpg`;
      if (q === "hd") return `https://image.slidesharecdn.com/${slug}/85/${namePart}-${n}-638.jpg`;
      return `https://image.slidesharecdn.com/${slug}/85/${namePart}-${n}-320.jpg`;
    }

    const slides = [];
    for (let n = 1; n <= totalSlides; n++) slides.push(buildUrl(n, quality));

    const filename =
      cleanTitle.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 100) || "presentation";

    return Response.json({ success: true, title: cleanTitle, filename, count: slides.length, slides });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}