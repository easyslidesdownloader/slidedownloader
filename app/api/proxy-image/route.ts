const CDN_HOST = "image.slidesharecdn.com";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
      return new Response("Missing image URL", {
        status: 400,
      });
    }

    let parsed: URL;

    try {
      parsed = new URL(imageUrl);
    } catch {
      return new Response("Invalid image URL", {
        status: 400,
      });
    }

    if (
      parsed.protocol !== "https:" ||
      parsed.hostname !== CDN_HOST
    ) {
      return new Response("Invalid image host", {
        status: 400,
      });
    }

    console.log("[proxy-image] Fetching:", imageUrl);

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 20000);

    let res: Response;

    try {
      res = await fetch(imageUrl, {
        signal: controller.signal,

        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",

          Accept:
            "image/avif,image/webp,image/apng,image/jpeg,image/*,*/*;q=0.8",

          Referer: "https://www.slideshare.net/",
        },

        cache: "no-store",
      });
    } finally {
      clearTimeout(timeout);
    }

    console.log(
      "[proxy-image] CDN status:",
      res.status
    );

    if (!res.ok) {
      return new Response(
        `Failed to fetch image from SlideShare CDN (${res.status})`,
        {
          status: res.status,
        }
      );
    }

    const contentType =
      res.headers.get("content-type") ||
      "image/jpeg";

    const buffer = await res.arrayBuffer();

    return new Response(buffer, {
      status: 200,

      headers: {
        "Content-Type": contentType,

        "Cache-Control":
          "public, max-age=31536000, immutable",

        "Content-Length":
          buffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error(
      "[proxy-image] ERROR:",
      error
    );

    if (
      error instanceof Error &&
      error.name === "AbortError"
    ) {
      return new Response(
        "SlideShare CDN request timed out",
        {
          status: 504,
        }
      );
    }

    return new Response(
      error instanceof Error
        ? error.message
        : "Failed to fetch image",
      {
        status: 500,
      }
    );
  }
}