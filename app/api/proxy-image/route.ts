export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl || !imageUrl.startsWith("https://image.slidesharecdn.com/")) {
    return new Response("Invalid image URL", { status: 400 });
  }

  const res = await fetch(imageUrl);
  if (!res.ok) {
    return new Response("Failed to fetch image", { status: res.status });
  }

  const contentType = res.headers.get("content-type") || "image/jpeg";
  const buffer = await res.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}