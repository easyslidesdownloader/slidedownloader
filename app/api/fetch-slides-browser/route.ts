import { chromium } from "playwright";

export const maxDuration = 60;

function isValidSlideShareUrl(url: string) {
  try {
    const parsed = new URL(url);

    return (
      parsed.protocol === "https:" &&
      (parsed.hostname === "www.slideshare.net" ||
        parsed.hostname === "slideshare.net")
    );
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  let browser;

  try {
    const { url, quality = "sd" } = await req.json();

    if (!isValidSlideShareUrl(url)) {
      return Response.json(
        {
          success: false,
          error: "Please enter a valid SlideShare URL.",
        },
        { status: 400 }
      );
    }

    browser = await chromium.launch({
      headless: true,
    });

    const page = await browser.newPage({
      viewport: {
        width: 1366,
        height: 768,
      },

      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    });

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await page.waitForTimeout(3000);

    const title = await page.title();

    console.log("[browser] title:", title);

    const html = await page.content();

    console.log(
      "[browser] HTML length:",
      html.length
    );

    const images = await page.evaluate(() => {
  return Array.from(document.querySelectorAll("img"))
    .map((img) => ({
      src:
        img.getAttribute("src") ||
        img.getAttribute("data-src") ||
        img.getAttribute("data-lazy-src") ||
        "",
      alt: img.getAttribute("alt") || "",
    }))
    .filter((item) => {
      try {
        const url = new URL(item.src);

        return (
          url.hostname === "image.slidesharecdn.com" &&
          /-\d+-(320|638|2048)\.jpg/i.test(url.pathname)
        );
      } catch {
        return false;
      }
    });
});

    console.log(
      "[browser] CDN images:",
      images.length
    );

    const uniqueImages = [
      ...new Set(
        images.map((item) => item.src)
      ),
    ];

    if (uniqueImages.length === 0) {
      return Response.json(
        {
          success: false,
          error:
            "No SlideShare slide images were found on the rendered page.",
          debug: {
            title,
            htmlLength: html.length,
            imageCount: images.length,
          },
        },
        { status: 404 }
      );
    }

    const slides = uniqueImages.map((image) => {
      let result = image;

      if (quality === "hd") {
        result = result.replace(
          /-\d+\.jpg$/i,
          "-638.jpg"
        );
      }

      if (quality === "fullhd") {
        result = result.replace(
          /-\d+\.jpg$/i,
          "-2048.jpg"
        );
      }

      return result;
    });

    const cleanTitle =
      title
        .replace(
          /\s*\|\s*(PPTX?|SlideShare)$/i,
          ""
        )
        .trim() || "presentation";

    const filename =
      cleanTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 100) ||
      "presentation";

    return Response.json({
      success: true,
      title: cleanTitle,
      filename,
      count: slides.length,
      slides,
    });
  } catch (error) {
    console.error(
      "[browser] ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Browser extraction failed.",
      },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}