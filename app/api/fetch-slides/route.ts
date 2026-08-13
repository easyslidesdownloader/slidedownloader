import axios from "axios";
import * as cheerio from "cheerio";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { url, quality = "sd" } = await req.json();

    if (!url || !url.includes("slideshare.net")) {
      return Response.json(
        {
          success: false,
          error: "Please enter a valid SlideShare URL",
        },
        { status: 400 }
      );
    }

    console.log("[fetch-slides] URL:", url);
    console.log("[fetch-slides] Quality:", quality);

    const response = await axios.get(url, {
      timeout: 30000,

      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",

        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",

        "Accept-Language":
          "en-US,en;q=0.9",

        Referer:
          "https://www.slideshare.net/",

        "Upgrade-Insecure-Requests": "1",
      },

      validateStatus: () => true,
    });

    console.log(
      "[fetch-slides] HTTP status:",
      response.status
    );

    const html = response.data;

    console.log(
      "[fetch-slides] HTML length:",
      html?.length || 0
    );

    if (response.status !== 200) {
      return Response.json(
        {
          success: false,
          error: `SlideShare returned HTTP ${response.status}`,
          debug: {
            status: response.status,
            htmlLength: html?.length || 0,
          },
        },
        { status: 502 }
      );
    }

    const $ = cheerio.load(html);

    /*
     * Get presentation title.
     */
    const rawTitle =
      $("title").first().text();

    const cleanTitle =
      rawTitle
        .replace(
          /\s*\|\s*(PPTX?|SlideShare)$/i,
          ""
        )
        .trim() || "presentation";

    /*
     * First try the old SlideShare structure.
     *
     * This is the structure that worked
     * in your old website.
     */
    const imageUrls: string[] = [];

    $(
      "#new-player .slide-item"
    ).each((_, element) => {
      const img =
        $(element).find("img");

      const src =
        img.attr("src") ||
        img.attr("data-src") ||
        img.attr("data-lazy-src");

      if (src) {
        imageUrls.push(src);
      }
    });

    /*
     * If old selector didn't work,
     * search for SlideShare CDN images.
     */
    if (imageUrls.length === 0) {
      $("img").each((_, element) => {
        const candidates = [
          $(element).attr("src"),
          $(element).attr("data-src"),
          $(element).attr("data-lazy-src"),
          $(element).attr("data-original"),
        ];

        for (const src of candidates) {
          if (
            src &&
            src.includes(
              "slidesharecdn.com"
            )
          ) {
            imageUrls.push(src);
            break;
          }
        }
      });
    }

    /*
     * Remove duplicates.
     */
    const uniqueImages = [
      ...new Set(imageUrls),
    ];

    console.log(
      "[fetch-slides] Images found:",
      uniqueImages.length
    );

    if (uniqueImages.length === 0) {
      console.log(
        "[fetch-slides] Title:",
        rawTitle
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
            pageTitle: rawTitle,
            htmlLength: html.length,
            htmlPreview:
              html.slice(0, 500),
          },
        },
        { status: 404 }
      );
    }

    /*
     * Convert image quality.
     */
    const slides =
      uniqueImages.map((src) => {
        try {
          const parsed =
            new URL(src);

          /*
           * SlideShare normally uses:
           *
           * -320.jpg
           * -638.jpg
           * -2048.jpg
           */

          if (
            quality === "fullhd"
          ) {
            parsed.pathname =
              parsed.pathname.replace(
                /-(320|638|2048)\.jpg$/i,
                "-2048.jpg"
              );
          } else if (
            quality === "hd"
          ) {
            parsed.pathname =
              parsed.pathname.replace(
                /-(320|638|2048)\.jpg$/i,
                "-638.jpg"
              );
          } else {
            parsed.pathname =
              parsed.pathname.replace(
                /-(320|638|2048)\.jpg$/i,
                "-320.jpg"
              );
          }

          return parsed.toString();
        } catch {
          return src;
        }
      });

    /*
     * Filename.
     */
    const filename =
      cleanTitle
        .toLowerCase()
        .replace(
          /[^a-z0-9\s-]/g,
          ""
        )
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
  }
}