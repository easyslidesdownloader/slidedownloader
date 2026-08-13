import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

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

function changeQuality(
  url: string,
  quality: string
): string {
  if (quality === "sd") {
    return url;
  }

  try {
    const parsed = new URL(url);

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
    ReturnType<typeof puppeteer.launch>
  > | null = null;

  try {
    const body = await req.json();

    const url = body?.url;
    const quality = body?.quality || "sd";

    console.log(
      "[fetch-slides] URL:",
      url
    );

    console.log(
      "[fetch-slides] Quality:",
      quality
    );

    if (!url || typeof url !== "string") {
      return Response.json(
        {
          success: false,
          error:
            "Please enter a SlideShare URL.",
        },
        { status: 400 }
      );
    }

    if (!isValidSlideShareUrl(url)) {
      return Response.json(
        {
          success: false,
          error:
            "Please enter a valid SlideShare URL.",
        },
        { status: 400 }
      );
    }

    /*
     * Get Chromium executable for Vercel.
     */
    const executablePath =
      await chromium.executablePath();

    console.log(
      "[fetch-slides] Chromium:",
      executablePath
    );

    /*
     * Launch headless Chromium.
     */
    browser = await puppeteer.launch({
      args: chromium.args,

      defaultViewport: {
        width: 1366,
        height: 768,
      },

      executablePath,

      headless: true,
    });

    console.log(
      "[fetch-slides] Browser launched"
    );

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    );

    await page.setExtraHTTPHeaders({
      "Accept-Language":
        "en-US,en;q=0.9",
    });

    /*
     * Go to SlideShare.
     */
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    console.log(
      "[fetch-slides] HTTP status:",
      response?.status()
    );

    /*
     * Give SlideShare JavaScript time to
     * populate the presentation.
     */
    await new Promise((resolve) =>
      setTimeout(resolve, 4000)
    );

    const title = await page.title();

    console.log(
      "[fetch-slides] Title:",
      title
    );

    /*
     * Extract presentation images.
     */
    const imageUrls = await page.evaluate(() => {
      const results: string[] = [];

      const images =
        document.querySelectorAll("img");

      for (const image of images) {
        const candidates = [
          image.getAttribute("src"),
          image.getAttribute("data-src"),
          image.getAttribute(
            "data-lazy-src"
          ),
          image.getAttribute(
            "data-original"
          ),
        ];

        for (const candidate of candidates) {
          if (!candidate) continue;

          try {
            const parsed =
              new URL(candidate);

            /*
             * Only SlideShare image CDN.
             */
            if (
              parsed.hostname !==
              "image.slidesharecdn.com"
            ) {
              continue;
            }

            /*
             * Only actual slide images.
             */
            if (
              !/-\d+-(320|638|2048)\.jpg$/i.test(
                parsed.pathname
              )
            ) {
              continue;
            }

            results.push(
              parsed.toString()
            );

            break;
          } catch {
            continue;
          }
        }
      }

      return [
        ...new Set(results),
      ];
    });

    console.log(
      "[fetch-slides] Images found:",
      imageUrls.length
    );

    /*
     * If no images were found, inspect
     * the HTML for debugging.
     */
    if (imageUrls.length === 0) {
      const html =
        await page.content();

      console.log(
        "[fetch-slides] HTML length:",
        html.length
      );

      console.log(
        "[fetch-slides] HTML preview:",
        html.slice(0, 1000)
      );

      return Response.json(
        {
          success: false,

          error:
            "No slides found. SlideShare may have changed its page structure, or the presentation may be private/deleted.",

          debug: {
            title,
            htmlLength:
              html.length,
          },
        },
        { status: 404 }
      );
    }

    /*
     * Sort slides by slide number.
     *
     * Example:
     * 1, 2, 3, 10
     */
    imageUrls.sort((a, b) => {
      const getNumber = (
        value: string
      ) => {
        const match =
          value.match(
            /-(\d+)-(?:320|638|2048)\.jpg$/i
          );

        return match
          ? Number(match[1])
          : 0;
      };

      return (
        getNumber(a) -
        getNumber(b)
      );
    });

    /*
     * Convert to requested quality.
     */
    const slides =
      imageUrls.map((image) =>
        changeQuality(
          image,
          quality
        )
      );

    const cleanTitle =
      title
        .replace(
          /\s*\|\s*(PPTX?|SlideShare)$/i,
          ""
        )
        .trim() ||
      "presentation";

    const filename =
      makeFilename(cleanTitle);

    console.log(
      "[fetch-slides] Final slide count:",
      slides.length
    );

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

        console.log(
          "[fetch-slides] Browser closed"
        );
      } catch {
        // Ignore close errors.
      }
    }
  }
}