const ALLOWED_HOSTS = new Set([
  "image.slidesharecdn.com",
  "cdn.slidesharecdn.com",
]);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
      return new Response("Missing image URL", { status: 400 });
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(imageUrl);
    } catch {
      return new Response("Invalid image URL", { status: 400 });
    }

    if (
      parsedUrl.protocol !== "https:" ||
      !ALLOWED_HOSTS.has(parsedUrl.hostname)
    ) {
      return new Response("Invalid image host", { status: 400 });
    }

    const res = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
      redirect: "follow",
    });

    if (!res.ok) {
      return new Response(
        `Failed to fetch image (${res.status})`,
        { status: res.status }
      );
    }

    const contentType =
      res.headers.get("content-type") || "image/jpeg";

    if (!contentType.startsWith("image/")) {
      return new Response("URL did not return an image", {
        status: 415,
      });
    }

    const buffer = await res.arrayBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control":
          "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("[proxy-image] Error:", error);

    return new Response(
      error instanceof Error
        ? error.message
        : "Failed to fetch image",
      { status: 500 }
    );
  }
}