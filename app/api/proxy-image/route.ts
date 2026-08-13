import axios from "axios";

export const runtime = "nodejs";

export async function GET(
  req: Request
) {
  const { searchParams } =
    new URL(req.url);

  const imageUrl =
    searchParams.get("url");

  if (!imageUrl) {
    return new Response(
      "Image URL is required",
      { status: 400 }
    );
  }

  try {
    const parsed =
      new URL(imageUrl);

    if (
      parsed.protocol !== "https:" ||
      ![
        "image.slidesharecdn.com",
        "cdn.slidesharecdn.com",
      ].includes(
        parsed.hostname
      )
    ) {
      return new Response(
        "Invalid image URL",
        { status: 400 }
      );
    }

    const response =
      await axios.get(
        parsed.toString(),
        {
          responseType:
            "arraybuffer",

          timeout: 30000,

          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",

            Referer:
              "https://www.slideshare.net/",
          },
        }
      );

    const contentType =
  String(
    response.headers["content-type"] ||
      "image/jpeg"
  );

    return new Response(
      response.data,
      {
        status: 200,

        headers: {
          "Content-Type":
            contentType,

          "Cache-Control":
            "public, max-age=31536000, immutable",
        },
      }
    );
  } catch (error) {
    console.error(
      "[proxy-image] ERROR:",
      error
    );

    return new Response(
      "Failed to fetch image",
      { status: 500 }
    );
  }
}