export async function GET() {
  try {
    const url = "https://www.slideshare.net/";

    const controller = new AbortController();

    const timer = setTimeout(() => {
      controller.abort();
    }, 15000);

    try {
      const res = await fetch(url, {
        signal: controller.signal,

        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",

          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });

      const text = await res.text();

      return Response.json({
        success: true,
        status: res.status,
        contentType: res.headers.get("content-type"),
        length: text.length,
        preview: text.slice(0, 300),
      });
    } finally {
      clearTimeout(timer);
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}