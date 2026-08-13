import { chromium } from "playwright-core";
import chromiumBinary from "@sparticuz/chromium";

export const runtime = "nodejs";
export const maxDuration = 60;

function isValidSlideShareUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" &&
      (url.hostname === "slideshare.net" ||
        url.hostname === "www.slideshare.net")
    );
  } catch {
    return false;
  }
}

function makeFilename(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 100) || "presentation"
  );
}

function changeQuality(url: string, quality: string): string {
  if (quality === "sd") {
    return url;
  }

  try {
    const parsed = new URL(url);

    /*
     * SlideShare image URLs normally end like:
     *
     * -1-320.jpg
     * -1-638.jpg
     * -1-2048.jpg
     */

    if (quality === "hd") {
      parsed.pathname = parsed.pathname.replace(
        /-(\d+)\.jpg$/i,
        "-638.jpg"
      );
    }

    if (quality === "fullhd") {
      parsed.pathname = parsed.pathname.replace(
        /-(\d+)\.jpg$/i,
        "-2048.jpg"
      );
    }

    return parsed.toString();
  } catch {
    return url;
  }
}

export async function POST(req: Request) {
  let browser: Awaited<
    ReturnType<typeof chromium.launch>
  > | null = null;

  try {
    const body = await req.json();

    const url = body?.url;
    const quality = body?.quality || "sd";

    if (!url || typeof url !== "string") {
      return Response.json(
        {
          success: false,
          error: "Please enter a SlideShare URL.",
        },
        { status: 400 }
      );
    }

    if (!isValidSlideShareUrl(url)) {
      return Response.json(
        {
          success: false,
          error: "Please enter a valid SlideShare URL.",
        },
        { status: 400 }
      );
    }

    /*
     * @sparticuz/chromium provides a Chromium binary
     * suitable for Vercel/serverless environments.
     */
    const executablePath =
      await chromiumBinary.executablePath();

    console.log(
      "[fetch-slides] Chromium:",
      executablePath
    );

    browser = await chromium.launch({
      executablePath,

      headless: true,

      args: [
        ...chromiumBinary.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });

    const context = await browser.newContext({
      viewport: {
        width: 1366,
        height: 768,
      },

      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",

      locale: "en-US",
    });

    const page = await context.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    /*
     * Give SlideShare time to populate the presentation.
     */
    await page.waitForTimeout(3000);

    const title = await page.title();

    /*
     * Extract actual presentation slide images.
     *
     * We deliberately only accept:
     *
     * image.slidesharecdn.com
     *
     * and URLs ending with:
     *
     * -320.jpg
     * -638.jpg
     * -2048.jpg
     *
     * This prevents profile images and unrelated CDN images
     * from entering the result.
     */
    const imageUrls = await page.evaluate(() => {
      const urls: string[] = [];

      const images = Array.from(
        document.querySelectorAll("img")
      );

      for (const img of images) {
        const candidates = [
          img.getAttribute("src"),
          img.getAttribute("data-src"),
          img.getAttribute("data-lazy-src"),
          img.getAttribute("data-original"),
        ];

        for (const candidate of candidates) {
          if (!candidate) continue;

          try {
            const parsed = new URL(candidate);

            if (
              parsed.protocol !== "https:" ||
              parsed.hostname !==
                "image.slidesharecdn.com"
            ) {
              continue;
            }

            if (
              !/-\d+-(320|638|2048)\.jpg$/i.test(
                parsed.pathname
              )
            ) {
              continue;
            }

            urls.push(parsed.toString());
            break;
          } catch {
            // Ignore invalid URLs.
          }
        }
      }

      return [...new Set(urls)];
    });

    /*
     * Sort slides numerically.
     *
     * Example:
     * slide-1
     * slide-2
     * ...
     * slide-10
     */
    imageUrls.sort((a, b) => {
      const getNumber = (url: string) => {
        const match = url.match(/-(\d+)-(?:320|638|2048)\.jpg/i);

        return match ? Number(match[1]) : 0;
      };

      return getNumber(a) - getNumber(b);
    });

    console.log(
      "[fetch-slides] Slides found:",
      imageUrls.length
    );

    if (imageUrls.length === 0) {
      return Response.json(
        {
          success: false,
          error:
            "No slides found. The presentation may be private, deleted, or SlideShare may have changed its page structure.",
          debug: {
            title,
          },
        },
        { status: 404 }
      );
    }

    const slides = imageUrls.map((image) =>
      changeQuality(image, quality)
    );

    const cleanTitle =
      title
        .replace(
          /\s*\|\s*(PPTX?|SlideShare)$/i,
          ""
        )
        .trim() || "presentation";

    const filename = makeFilename(cleanTitle);

    return Response.json({
      success: true,
      title: cleanTitle,
      filename,
      count: slides.length,
      slides,
    });
  } catch (error) {
    console.error(
      "[fetch-slides] ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch SlideShare presentation.",
      },
      { status: 500 }
    );
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {
        // Ignore browser close errors.
      }
    }
  }
}