import puppeteer from "puppeteer";

export async function POST(req: Request) {
  let browser = null;
  try {
    const { url, quality } = await req.json();

    if (!url || !url.includes("slideshare.net")) {
      return Response.json({ success: false, error: "Please enter a valid SlideShare URL" }, { status: 400 });
    }

    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    );

    await page.setRequestInterception(true);
    page.on("request", (r) => {
      const t = r.resourceType();
      if (["stylesheet", "font", "media"].includes(t)) r.abort();
      else r.continue();
    });

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 1500)); // let bot-challenge JS resolve

    // The slide list is virtualized (only renders slides near current scroll
    // position). Auto-scroll through the whole deck so every slide div gets
    // created, then we can count the true total.
    await page.evaluate(async () => {
      const scrollStep = 1500;
      let lastHeight = 0;
      let stableCount = 0;

      for (let i = 0; i < 400; i++) {
        window.scrollBy(0, scrollStep);
        await new Promise((r) => setTimeout(r, 150));

        const height = document.body.scrollHeight;
        if (height === lastHeight) {
          stableCount++;
          if (stableCount >= 4) break; // height stopped growing, we're at the bottom
        } else {
          stableCount = 0;
        }
        lastHeight = height;
      }
    });

    await new Promise((r) => setTimeout(r, 800));

    const totalSlides = await page.evaluate(() => {
      const nodes = document.querySelectorAll('[id^="slide"]');
      let max = 0;
      nodes.forEach((el) => {
        const m = el.id.match(/^slide(\d+)$/);
        if (m) max = Math.max(max, parseInt(m[1], 10));
      });
      return max;
    });

    const html = await page.content();
    const title = await page.title();
    await browser.close();
    browser = null;

    const cleanTitle = title.replace(/\s*\|\s*(PPTX?|SlideShare)$/i, "").trim() || "presentation";

    const match = html.match(/https:\/\/image\.slidesharecdn\.com\/([^/"']+)\/85\/([^/"']+?)-(\d+)-320\.jpg/i);

    if (!match || totalSlides === 0) {
      return Response.json(
        { success: false, error: "No slides found. The presentation may be private, deleted, or the URL is wrong." },
        { status: 404 }
      );
    }

    const slug = match[1];
    const namePart = match[2];

    function buildUrl(n: number, q: string) {
      if (q === "fullhd") return `https://image.slidesharecdn.com/${slug}/75/${namePart}-${n}-2048.jpg`;
      if (q === "hd") return `https://image.slidesharecdn.com/${slug}/85/${namePart}-${n}-638.jpg`;
      return `https://image.slidesharecdn.com/${slug}/85/${namePart}-${n}-320.jpg`;
    }

    const slides = [];
    for (let n = 1; n <= totalSlides; n++) {
      slides.push(buildUrl(n, quality));
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
  } catch (err: any) {
    if (browser) await browser.close().catch(() => {});
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}