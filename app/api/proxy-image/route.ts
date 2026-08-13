const ALLOWED_HOSTS = new Set([
  "image.slidesharecdn.com",
  "cdn.slidesharecdn.com",
]);

export const runtime = "nodejs";

export async function GET(
  req: Request
) {
  try {
    const { searchParams } =
      new URL(req.url);

    const imageUrl =
      searchParams.get("url");

    if (!imageUrl) {
      return new Response(
        "Missing image URL",
        { status: 400 }
      );
    }

    let parsed: URL;

    try {
      parsed = new URL(imageUrl);
    } catch {
      return new Response(
        "Invalid image URL",
        { status: 400 }
      );
    }

    /*
     * Only allow HTTPS SlideShare CDN.
     */
    if (
      parsed.protocol !== "https:" ||
      !ALLOWED_HOSTS.has(
        parsed.hostname
      )
    ) {
      return new Response(
        "Invalid image host",
        { status: 400 }
      );
    }

    const response =
      await fetch(
        parsed.toString(),
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",

            Accept:
              "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",

            Referer:
              "https://www.slideshare.net/",
          },

          redirect: "follow",
        }
      );

    console.log(
      "[proxy-image] Status:",
      response.status
    );

    if (!response.ok) {
      return new Response(
        `Failed to fetch image (${response.status})`,
        {
          status:
            response.status,
        }
      );
    }

    const contentType =
      response.headers.get(
        "content-type"
      ) || "image/jpeg";

    if (
      !contentType.startsWith(
        "image/"
      )
    ) {
      return new Response(
        "Response is not an image",
        { status: 415 }
      );
    }

    const buffer =
      await response.arrayBuffer();

    return new Response(
      buffer,
      {
        status: 200,

        headers: {
          "Content-Type":
            contentType,

          "Content-Length":
            String(
              buffer.byteLength
            ),

          "Cache-Control":
            "public, max-age=31536000, immutable",

          "Access-Control-Allow-Origin":
            "*",
        },
      }
    );
  } catch (error) {
    console.error(
      "[proxy-image] ERROR:",
      error
    );

    return new Response(
      error instanceof Error
        ? error.message
        : "Failed to fetch image.",
      { status: 500 }
    );
  }
}