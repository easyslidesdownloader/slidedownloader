export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string; // paragraphs separated by \n\n; lines starting with "## " are headings
};

export const posts: Post[] = [
  {
    slug: "how-to-download-slideshare-presentations",
    title: "How to Download SlideShare Presentations (Complete Guide)",
    excerpt: "A full step-by-step walkthrough for saving any public SlideShare presentation as PDF, PPTX, or images.",
    date: "2026-08-01",
    readTime: "5 min read",
    content: `SlideShare hosts millions of presentations covering everything from college lectures to enterprise sales decks — but SlideShare itself rarely gives you a simple download button. If you've ever found a genuinely useful presentation and then hit a wall trying to save it, this guide walks through exactly how to get it onto your device.

## Step 1: Find the Presentation URL

Open the presentation on SlideShare.net and copy the full URL from your browser's address bar. It should look something like this:

https://www.slideshare.net/slideshow/presentation-title/12345678

Make sure you copy the complete link, including everything after slideshow/.

## Step 2: Paste It Into EasySlidesDownloader

Head to the EasySlidesDownloader homepage and paste the link into the input box. You don't need an account, and there's no email or signup required at any point.

## Step 3: Choose Your Quality

Before fetching, pick a quality level:

- SD (320px) — smallest file size, good for quick reference
- HD (638px) — a solid middle ground for most use cases
- Full HD (2048px) — best for printing or when text needs to stay sharp

## Step 4: Fetch and Download

Click Fetch Slides. The tool will load the presentation, count every slide, and show you a preview grid. From there, choose your format:

- PDF — best for reading, printing, or sharing as one file
- PPTX — each slide becomes an image inside a PowerPoint file, useful for presenting offline
- ZIP of images — every slide saved as an individual high-quality image file

Your download starts immediately in your browser — no email link, no waiting page.

## A Note on Large Presentations

Some decks have hundreds of slides. Larger presentations can take a little longer to load since the tool needs to scroll through the entire deck to find every slide — but it happens automatically, so you don't need to do anything but wait a few extra seconds.

## What If It Doesn't Work?

A few things to check if a link isn't downloading:

- Make sure the presentation is public — private or restricted presentations can't be downloaded by any tool, since SlideShare simply doesn't expose that content
- Double-check you copied the full URL
- Try refreshing and pasting the link again

If it still doesn't work, our Help Center has a full troubleshooting section, or you can reach out through our Contact page.`,
  },
  {
    slug: "how-to-download-slideshare-without-login",
    title: "How to Download SlideShare Presentations Without Logging In",
    excerpt: "SlideShare normally wants you to sign in with LinkedIn to save anything. Here's how to skip that entirely.",
    date: "2026-08-02",
    readTime: "3 min read",
    content: `If you've tried to save a presentation directly on SlideShare, you've probably run into a login wall — SlideShare (now part of LinkedIn) often asks you to sign in before letting you interact with content beyond just viewing it.

## Why SlideShare Asks You to Log In

SlideShare is designed to encourage account creation, both for engagement and to build its LinkedIn-connected user base. Even viewing certain presentations fully, or trying to save one, can prompt a login screen.

## The Workaround: A Dedicated Downloader

Tools like EasySlidesDownloader work directly with SlideShare's publicly accessible content — the same slides anyone can view without an account — and package them into a downloadable file. Since you're only accessing what's already public, no SlideShare or LinkedIn login is required on your end.

## How It Works

1. Copy the URL of any public SlideShare presentation
2. Paste it into EasySlidesDownloader
3. Choose your quality and format
4. Download — no account needed on our end either

## A Few Limits to Know

This only works for presentations that are already public. If a presentation has been set to private or restricted by its uploader, no tool — including this one — can access it, since that content simply isn't exposed publicly in the first place.

That's actually a good thing: it means creators still have control over who sees their private work, while public presentations stay easy to access for everyone else.`,
  },
  {
    slug: "is-it-legal-to-download-slideshare-presentations",
    title: "Is It Legal to Download SlideShare Presentations?",
    excerpt: "A straightforward look at the legal side of saving presentations for personal use, study, or reference.",
    date: "2026-08-03",
    readTime: "4 min read",
    content: `This is one of the most common questions we get, and it deserves a clear, honest answer rather than a vague one.

## The Short Answer

Downloading a publicly available SlideShare presentation for personal use — studying, research, or reference — is generally acceptable. SlideShare presentations are, after all, published publicly by their creators specifically to be viewed and shared.

## Where It Gets More Complicated

The content itself still belongs to whoever created it. That means:

- You shouldn't redistribute a downloaded presentation as if it were your own work
- You shouldn't use someone else's presentation commercially without their permission
- If you reference material from a downloaded presentation in your own work, credit the original author

## What About the Tool Itself?

Using a downloader tool to save publicly accessible content isn't inherently different from taking a screenshot, printing a webpage, or saving a public PDF you found online — you're accessing content that's already open to anyone who visits the page.

## The Practical Rule of Thumb

If you'd be comfortable explaining exactly how you're using the content to the person who created it, you're almost certainly on solid ground. Personal study? Fine. Research citation with credit? Fine. Repackaging someone's entire deck and selling it as your own? Not fine, regardless of what tool you used to get it.

## If You're a Content Creator

If you've found your own presentation downloaded or used in a way you didn't authorize, see our DMCA Policy for how to submit a takedown request.`,
  },
  {
    slug: "slideshare-to-pdf-guide",
    title: "How to Convert SlideShare to PDF",
    excerpt: "Turn any SlideShare presentation into a clean, shareable PDF in under a minute.",
    date: "2026-08-04",
    readTime: "3 min read",
    content: `PDF is one of the most useful formats for saved presentations — it keeps the exact layout intact, opens on literally any device, and is easy to print or share as a single file.

## Why Choose PDF

- The layout never breaks, regardless of what app or device opens it
- Easy to print, annotate, or highlight
- One single file instead of dozens of separate images
- Works well for citing or archiving research material

## How to Convert

1. Copy the SlideShare presentation's URL
2. Paste it into EasySlidesDownloader
3. Pick your quality (Full HD if you plan to print)
4. Click Fetch Slides
5. Click Download PDF

That's it — the PDF is built directly in your browser and saves straight to your device. Every slide becomes its own page, in the original order, at the resolution you selected.

## A Tip for Large Presentations

If you're downloading a very long deck (100+ slides) and plan to print it, Full HD quality will noticeably increase the file size. HD is usually a good balance between sharpness and manageable file size unless you specifically need print-level detail.

## What You Can't Do With the PDF

Since each slide is placed as an image, the text inside the PDF isn't selectable or searchable — it's a visual copy of the original slide, not a text document. If you need to reuse the actual text content, you'll need to type or transcribe it separately.`,
  },
  {
    slug: "slideshare-to-pptx-guide",
    title: "How to Convert SlideShare to PPTX (PowerPoint)",
    excerpt: "Get a SlideShare presentation into a real PowerPoint file you can open, present, and reorder offline.",
    date: "2026-08-05",
    readTime: "3 min read",
    content: `If you want to present a SlideShare deck offline — on a projector, at a meeting, or without an internet connection — converting it to PPTX is the way to go.

## What You Get

Each slide is placed as a full-bleed image inside a real .pptx file that opens in PowerPoint, Google Slides, Keynote, or any other presentation software. You get:

- Slide-by-slide navigation just like a normal presentation
- The ability to reorder, delete, or duplicate slides
- Presenter mode and slideshow view, just like any other PowerPoint file

## What You Don't Get

It's worth being upfront about one limitation: because each slide is an image rather than live text and shapes, you can't edit the words on a slide directly. If you need to change specific text, you'd need to add a new text box over the image or recreate that slide from scratch.

For presenting as-is, reordering, or reusing slides visually, this isn't a limitation at all — it's simply how the original design gets preserved exactly.

## How to Convert

1. Copy the presentation's SlideShare URL
2. Paste it into EasySlidesDownloader
3. Choose your quality level
4. Click Fetch Slides, then Download PPTX

The file downloads directly — no email, no waiting, no extra steps.

## When to Choose PPTX vs PDF

Choose PPTX if you plan to actually present the deck or want to reorder/reuse individual slides. Choose PDF if you just want something to read, print, or archive. If you're unsure, our PDF vs PPTX vs Images comparison breaks down all three formats side by side.`,
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}