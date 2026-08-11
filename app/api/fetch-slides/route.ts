import * as cheerio from "cheerio";

export const maxDuration = 60;

async function fetchHtml(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Referer": "https://www.slideshare.net/",
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

async function probeTotalSlides(slug: string, namePart: string, maxSlides = 500) {
  let consecutiveFailures = 0;
  let lastSuccess = 0;

  for (let n = 1; n <= maxSlides; n++) {
    const url = `https://image.slidesharecdn.com/${slug}/85/${namePart}-${n}-320.jpg`;
    const ok = await slideExists(url);
    if (ok) {
      lastSuccess = n;
      consecutiveFailures = 0;
    } else {
      consecutiveFailures++;
      if (n > 1 && consecutiveFailures >= 3) break;
    }
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

    const totalSlides = await probeTotalSlides(slug, namePart);

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