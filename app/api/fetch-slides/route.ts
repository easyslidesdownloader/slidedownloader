import { NextRequest, NextResponse } from "next/server";

type SlideshareApiResponse = {
  all_slides?: {
    images: string[];
    quality: string;
  }[];
  title?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { url, quality = "sd" } = await req.json();

    if (!url || !url.includes("slideshare.net")) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid SlideShare URL.",
        },
        { status: 400 }
      );
    }

    console.log("[fetch-slides] URL:", url);
    console.log("[fetch-slides] Quality:", quality);

    const apiUrl =
      `https://slidesaver.app/api/get-images?url=${encodeURIComponent(url)}`;

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    console.log("[fetch-slides] SlideSaver status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();

      console.error(
        "[fetch-slides] SlideSaver error:",
        res.status,
        errorText.slice(0, 500)
      );

      return NextResponse.json(
        {
          success: false,
          error: `SlideShare returned HTTP ${res.status}. Please try again.`,
        },
        { status: 502 }
      );
    }

    const data: SlideshareApiResponse = await res.json();


    if (!data.all_slides || data.all_slides.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No slides found. The presentation may be private, deleted, or unavailable.",
        },
        { status: 404 }
      );
    }

    /*
     * SlideSaver returns multiple quality sets.
     *
     * Example:
     * all_slides[0] = lower quality
     * all_slides[1] = higher quality
     *
     * We map your quality selector to the available sets.
     */

    let qualityIndex = 0;

    if (quality === "hd") {
      qualityIndex = Math.min(1, data.all_slides.length - 1);
    }

    if (quality === "fullhd") {
      qualityIndex = data.all_slides.length - 1;
    }

    const selectedSet = data.all_slides[qualityIndex];

    if (!selectedSet || !selectedSet.images?.length) {
      return NextResponse.json(
        {
          success: false,
          error: "No slide images were returned.",
        },
        { status: 404 }
      );
    }

    const slides = selectedSet.images;

    /*
     * Create a clean filename.
     */
    const title =
      data.title?.trim() ||
      "presentation";

    const filename =
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 100) ||
      "presentation";

    console.log("[fetch-slides] Title:", title);
    console.log("[fetch-slides] Slides:", slides.length);
    console.log("[fetch-slides] Selected quality:", selectedSet.quality);

    return NextResponse.json({
      success: true,
      title,
      filename,
      count: slides.length,
      quality: selectedSet.quality,
      slides,
    });
  } catch (error) {
    console.error("[fetch-slides] ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching the slides.",
      },
      { status: 500 }
    );
  }
}