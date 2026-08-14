import { NextRequest, NextResponse } from "next/server";

type SlideshareApiResponse = {
  all_slides?: { images: string[]; quality: string }[];
  title?: string;
};

type Slide = {
  slideNum: number;
  url: string;
};

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || !url.includes("slideshare.net")) {
      return NextResponse.json({ error: "Enter a valid SlideShare URL" }, { status: 400 });
    }

    const apiUrl = `https://slidesaver.app/api/get-images?url=${encodeURIComponent(url)}`;

    const res = await fetch(apiUrl);

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch slides" }, { status: 400 });
    }

    const data: SlideshareApiResponse = await res.json();

    if (!data.all_slides || data.all_slides.length === 0) {
      return NextResponse.json({ error: "No slides found. Check the URL." }, { status: 404 });
    }

    // Use the highest quality set (last entry in the array)
    const highestQuality = data.all_slides[data.all_slides.length - 1].images;

    const slides: Slide[] = highestQuality.map((imgUrl, i) => ({
      slideNum: i + 1,
      url: imgUrl,
    }));

    return NextResponse.json({ slides });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}