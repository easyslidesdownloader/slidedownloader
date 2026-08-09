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
  {
    slug: "slideshare-mobile-download-guide",
    title: "How to Download SlideShare on Mobile (Android & iPhone)",
    excerpt: "Yes, you can download SlideShare presentations right from your phone — here's how.",
    date: "2026-08-06",
    readTime: "3 min read",
    content: `You don't need a desktop computer to save a SlideShare presentation. EasySlidesDownloader works entirely in the browser, which means it works just as well on a phone or tablet as it does on a laptop.

## Downloading on Android

1. Open the SlideShare app or website and find the presentation you want
2. Tap the share icon (or long-press the address bar) and copy the link
3. Open your mobile browser and go to EasySlidesDownloader
4. Paste the link, choose your quality, and tap Fetch Slides
5. Tap your preferred format to download — it saves to your phone's Downloads folder

## Downloading on iPhone

The process is nearly identical on iOS:

1. Open the presentation in Safari or the SlideShare app
2. Tap the share button and copy the link
3. Open Safari and go to EasySlidesDownloader
4. Paste the link, select a quality level, and fetch the slides
5. Tap Download — files save to your Files app, accessible from there afterward

## A Tip for Slow Mobile Connections

Larger presentations involve loading a lot of images. If you're on mobile data rather than Wi-Fi, choosing SD quality first will get you a usable file much faster, and you can always re-download in Full HD later when you're on a stronger connection.

## Why Use the Browser Instead of an App

Because everything runs directly in your mobile browser, there's no app to install, no storage taken up on your device beyond the actual downloaded file, and no extra permissions to grant. It works the same way regardless of whether you're on Chrome, Safari, Firefox, or Samsung Internet.`,
  },
  {
    slug: "slideshare-download-not-working",
    title: "SlideShare Not Letting You Download? Here's Why (and How to Fix It)",
    excerpt: "The most common reasons a SlideShare download fails, and what to actually do about each one.",
    date: "2026-08-07",
    readTime: "4 min read",
    content: `If you've tried to save a SlideShare presentation and hit a wall, you're not alone — SlideShare doesn't make downloading easy by design. Here's what's usually going on.

## The Uploader Disabled Downloads

Many creators upload presentations for viewing only, without enabling SlideShare's own (limited) download feature. This is a setting the uploader controls, and there's no way around it if the content itself has been made genuinely private or restricted.

## You're Being Asked to Log In

SlideShare frequently gates actions — including saving content — behind a LinkedIn login. This is separate from whether the presentation is actually public; it's simply SlideShare's way of pushing account creation.

## The Presentation Is Private

If a presentation was uploaded as private or unlisted, it isn't accessible outside of SlideShare's own permissions system — no downloader tool, including ours, can access content that isn't publicly viewable in the first place.

## The Format You Wanted Isn't Available

SlideShare's native download option (when available at all) is often limited to whatever format the uploader originally submitted. This is one of the biggest reasons people move to a dedicated tool — you get to choose PDF, PPTX, or images regardless of the original upload format.

## The Fix: Use a Dedicated Downloader

For any publicly viewable presentation, a tool like EasySlidesDownloader sidesteps the login wall and format restrictions entirely:

1. Copy the presentation's URL
2. Paste it into EasySlidesDownloader
3. Choose your format and quality
4. Download directly — no SlideShare account needed

## When Nothing Works

If a presentation still won't download anywhere, it's almost always because it's genuinely private or has been deleted. At that point, the only real fix is reaching out to whoever shared the link with you and asking for the content directly.`,
  },
  {
    slug: "how-to-save-slideshare-as-images",
    title: "How to Save SlideShare Slides as Individual Images",
    excerpt: "Sometimes you just need the visuals — here's how to export every slide as its own image file.",
    date: "2026-08-08",
    readTime: "3 min read",
    content: `Not every use case needs a full PDF or PowerPoint file. Sometimes you just want the actual visuals — a chart, a diagram, a well-designed slide layout — as standalone image files you can drop into other projects.

## Why Choose Images Over PDF or PPTX

- You only need specific slides, not the whole deck as one document
- You're using them for design reference or inspiration
- You want to drop individual slides into your own presentation
- You need images for a report, blog post, or social media

## How to Download as Images

1. Copy the SlideShare presentation URL
2. Paste it into EasySlidesDownloader
3. Pick your quality — Full HD (2048px) if you need crisp detail, SD if file size matters more
4. Click Fetch Slides
5. Click Download ZIP

Every slide comes packaged as its own .jpg file inside a ZIP folder, numbered in order (slide_01.jpg, slide_02.jpg, and so on), so you can find exactly the one you need.

## What to Do With the ZIP File

Once downloaded, just extract the ZIP like any other compressed folder. On Windows, right-click and choose Extract All. On Mac, simply double-click it. From there, every slide is a normal image file you can open, edit, or import anywhere — design software, documents, slide decks, wherever you need it.`,
  },
  {
    slug: "pdf-vs-pptx-vs-images-comparison",
    title: "PDF vs PPTX vs Images: Which Format Should You Choose?",
    excerpt: "A closer look at all three export formats, so you download the right one the first time.",
    date: "2026-08-09",
    readTime: "4 min read",
    content: `EasySlidesDownloader gives you three ways to save a presentation, and picking the right one depends entirely on what you're going to do with it afterward.

## PDF: Best for Reading, Sharing, and Printing

A PDF keeps the layout locked exactly as designed, and opens identically on every device without needing any specific software. If you want to read a presentation later, print it, email it as one file, or archive it for reference, PDF is almost always the right call.

## PPTX: Best for Presenting and Reordering

Choose PPTX when you actually plan to present the deck — on a projector, in a meeting, or in your own slideshow app. Each slide becomes a full image inside a real PowerPoint file, so you get slide-by-slide navigation, presenter view, and the ability to reorder or delete slides. The one thing you give up is text editing, since each slide is an image rather than live text — for presenting or reusing slides as-is, that's rarely an issue.

## Images (ZIP): Best for Visuals and Design Reference

If you only need specific slides — a chart, a diagram, a nicely designed layout — download as images instead of pulling the entire deck as one document. Each slide comes as its own high-quality file, easy to drop into other documents, design tools, or your own presentations.

## Quick Decision Guide

- Need to read or print it later? → PDF
- Need to present it, offline, exactly as designed? → PPTX
- Only need a few specific slides or visuals? → Images (ZIP)
- Not sure yet? → PDF is the safest default; you can always download again in another format later

All three formats are generated instantly and download directly to your device — there's no harm in downloading more than one format if you're not sure which you'll end up needing.`,
  },
  {
    slug: "slideshare-downloader-for-students",
    title: "SlideShare Downloader for Students: Save Lecture Slides for Offline Study",
    excerpt: "Build your own offline study library from lecture decks, course material, and research presentations.",
    date: "2026-08-10",
    readTime: "3 min read",
    content: `A huge amount of course material ends up on SlideShare — lecture slides, study guides, exam reviews, research summaries. The problem is that relying on an internet connection to review them later isn't always realistic, especially before exams or while commuting.

## Why Download Lecture Slides

- Study offline, without needing a stable connection every time
- Build a personal library organized by course or topic
- Print slides for annotation, or review them on a tablet
- Keep access to material even if the original upload gets taken down later

## A Simple Study Workflow

1. As you come across useful lecture slides during the semester, copy each SlideShare link
2. Paste each one into EasySlidesDownloader and download as PDF for easy reading
3. Organize downloaded PDFs into folders by course or topic
4. Before exams, you've already got a full offline library ready to review — no searching required

## Choosing the Right Format for Studying

PDF is usually the best fit for studying — it's easy to annotate with a stylus or highlighter app, and keeps everything in one file per lecture. If you want to pull specific diagrams or charts for your own notes, downloading as images instead gives you individual visuals you can drop straight into your notes app.

## A Reminder on Fair Use

Downloading lecture material for your own personal study is exactly the kind of use case this tool is built for. Just remember: if you're citing material in your own academic work, credit the original source the same way you would with any other reference.`,
  },
  {
    slug: "slideshare-for-teachers-classroom",
    title: "How Teachers Can Use SlideShare Presentations in the Classroom",
    excerpt: "Building a reliable, offline-ready library of teaching material from public SlideShare content.",
    date: "2026-08-11",
    readTime: "3 min read",
    content: `Classroom Wi-Fi isn't always reliable, and pulling up a live SlideShare page mid-lesson is a gamble many teachers would rather not take. Downloading material ahead of time solves that problem entirely.

## Why Teachers Download Presentations Ahead of Time

- No dependency on classroom internet during the actual lesson
- Presentations open instantly from a local file instead of a loading webpage
- Material can be reused across multiple classes or semesters without searching again
- Slides can be edited into your own teaching deck once converted to PPTX

## Building a Reusable Teaching Library

1. Search SlideShare for material relevant to your subject
2. Download useful presentations as PDF for quick reference, or PPTX if you plan to fold parts of it into your own lesson slides
3. Organize files by unit or topic, the same way you'd organize any other teaching resource
4. Reuse the library year over year, without needing to re-search or re-download

## Combining Slides Into Your Own Lessons

Since PPTX downloads open like any normal PowerPoint file, you can copy individual slides out of a downloaded deck and paste them into your own lesson presentation. This is a great way to supplement your own material with well-made diagrams or explanations you found elsewhere — just remember to credit the original creator when you do.

## A Note on Classroom Use

Using downloaded material for teaching is a reasonable, common use case — but as with any secondhand content, avoid presenting someone else's work as entirely your own, and give credit where it's due, especially for original research or unique diagrams.`,
  },
  {
    slug: "reusing-slideshare-content-best-practices",
    title: "Best Practices for Reusing SlideShare Content in Your Own Presentations",
    excerpt: "How to responsibly pull ideas, diagrams, and layouts from downloaded presentations into your own work.",
    date: "2026-08-12",
    readTime: "3 min read",
    content: `Finding a well-designed slide or a clear diagram on SlideShare and wanting to use it in your own presentation is completely normal — the key is doing it the right way.

## Give Credit

If you're using a diagram, chart, statistic, or specific idea from someone else's presentation, add a small attribution line — the original author's name, or a link back to the source. This is standard practice in professional and academic presentations alike, and takes seconds to add.

## Redesign Rather Than Copy Wholesale

Instead of pasting an entire downloaded slide directly into your deck, consider rebuilding it in your own visual style. This keeps your presentation consistent, avoids any confusion about ownership, and usually results in a better-looking deck overall.

## Use Data and Structure, Not Someone Else's Words

It's one thing to reference a statistic or reuse the structure of an argument — it's another to copy someone's exact wording into your own presentation and present it as your own writing. Rewrite explanations in your own voice, even when the underlying facts or research come from elsewhere.

## Avoid Commercial Reuse Without Permission

Personal, educational, or internal reference use is generally fine. Repurposing someone else's presentation commercially — reselling it, using it in paid marketing material, or rebranding it as your own product — crosses into territory where you'd need explicit permission from the original creator.

## When in Doubt, Ask

If you're planning to reuse a substantial amount of someone's original work — not just a stat or a layout idea, but large sections of unique content — reaching out to the original creator directly is always the safest path.`,
  },
  {
    slug: "best-slideshare-alternatives",
    title: "Top SlideShare Alternatives for Hosting Your Own Presentations",
    excerpt: "If you're looking to publish presentations yourself, here are the platforms worth considering.",
    date: "2026-08-13",
    readTime: "4 min read",
    content: `If you're a creator rather than just a downloader — looking to publish your own presentations online — SlideShare isn't the only option, and it might not even be the best fit depending on what you need.

## Google Slides

Free, simple, and widely used, Google Slides lets you publish a presentation with a shareable link and control exactly who can view, comment, or edit it. It's a strong choice if you want fine-grained sharing permissions without building an audience on a public platform.

## Canva

Beyond just presentations, Canva offers a full design toolkit with polished templates, making it a popular choice for anyone who wants a more visually distinctive deck without starting from a blank slide. Presentations can be shared as a public link or exported as PDF/PPTX.

## Prezi

Prezi takes a different approach with zooming, non-linear presentations rather than the traditional slide-by-slide format. It's worth considering if your content benefits from a more visual, exploratory structure rather than a straight sequence of slides.

## Issuu

Originally built for publications and magazines, Issuu also works well for presentation-style documents you want to publish with a polished, flip-through reading experience.

## Your Own Website

For creators who want full control — no platform restrictions, no login walls for viewers, full ownership of the content — simply hosting a PDF or embedded viewer directly on your own website remains one of the most reliable options, even if it takes a bit more setup.

## Choosing the Right Platform

If your priority is reach and discoverability, a public platform like SlideShare still has real advantages. If your priority is control over access, design flexibility, or avoiding login walls for your viewers, one of the alternatives above may serve you better.`,
  },
  {
    slug: "best-free-slideshare-downloader-tools-compared",
    title: "Best Free SlideShare Downloader Tools Compared (2026)",
    excerpt: "What actually matters when picking a SlideShare downloader, and how to evaluate the options.",
    date: "2026-08-14",
    readTime: "4 min read",
    content: `There are a handful of free tools that let you download SlideShare presentations, and they're not all built the same. Here's what's actually worth comparing before you pick one.

## Reliability

SlideShare has added increasingly sophisticated anti-bot protections over time. Many downloader tools rely on simple scraping methods that break whenever SlideShare updates its site — meaning a tool that worked last month might silently stop working today. Look for tools that are actively maintained rather than ones that haven't been updated in a long time.

## Format Options

Some tools only offer one format (usually just PDF). Being able to choose between PDF, PPTX, and individual images matters depending on whether you're archiving, presenting, or just need specific visuals.

## Quality Options

A downloader that only pulls low-resolution thumbnails will leave you with blurry text and images. Look for tools that let you choose your quality level, ideally up to Full HD, rather than forcing one fixed resolution on every download.

## Privacy

Some free tools log the URLs you submit or store downloaded files on their servers, sometimes for advertising or analytics purposes. A tool that processes everything in real time without retaining your data is meaningfully better for privacy-conscious users.

## Ads and Clutter

Many free downloader sites are heavily monetized with ads surrounding the tool itself, which can make the actual download process slower and more frustrating than it needs to be.

## What to Look For

- Actively maintained, so it keeps working as SlideShare changes
- Multiple format options (PDF, PPTX, images)
- Adjustable quality, up to HD or better
- No account or login required
- Clear privacy practices — nothing stored longer than necessary
- A clean interface without excessive ads

EasySlidesDownloader was built specifically around these priorities — reliable extraction that handles SlideShare's modern protections directly, full format and quality choice, and a private-by-design approach where nothing is stored after your download completes.`,
  },
  {
    slug: "slideshare-downloader-common-errors",
    title: "SlideShare Downloader Not Working? Common Errors Explained",
    excerpt: "A breakdown of the error messages you might see, and exactly what each one means.",
    date: "2026-08-15",
    readTime: "3 min read",
    content: `If EasySlidesDownloader shows an error instead of your slides, it's almost always one of a few specific, fixable situations.

## "No slides found. The presentation may be private, deleted, or the URL is wrong."

This means the presentation either isn't publicly accessible, no longer exists, or the link is incomplete. Double-check that you copied the full URL directly from SlideShare's address bar, and confirm the presentation still loads normally when you visit it directly in a browser.

## "Please enter a valid SlideShare URL"

The link you pasted doesn't match a recognizable SlideShare presentation URL. Make sure it starts with https://www.slideshare.net/ and points directly to a presentation, not to a search results page, a profile page, or a category listing.

## The Page Seems Stuck on "Fetching…"

Larger presentations take longer, since the tool scrolls through the entire deck to find every slide. Give it a little extra time, especially for decks with 100+ slides — if it's still stuck after a minute or two, refresh and try again.

## Downloaded File Won't Open

This is rare, but if it happens, try downloading again — an interrupted download can occasionally produce an incomplete file. If the problem persists with a specific presentation, it may be worth trying a different format (for example, PDF instead of PPTX) to narrow down whether the issue is format-specific.

## Still Stuck?

If none of the above resolves it, reach out through our Contact page with the SlideShare URL you're trying to download — that's the fastest way for us to look into what's happening.`,
  },
  {
    slug: "how-to-find-slideshare-url",
    title: "How to Find and Copy a SlideShare Presentation URL",
    excerpt: "A quick reference for grabbing the exact link a downloader tool needs.",
    date: "2026-08-16",
    readTime: "2 min read",
    content: `This sounds simple, but getting the wrong URL is one of the most common reasons a download fails — so it's worth doing right.

## On Desktop

1. Open the presentation directly on SlideShare.net (not a search results page)
2. Click into the address bar at the top of your browser
3. Select the entire URL and copy it (Ctrl+C on Windows, Cmd+C on Mac)

The URL should look like this:

https://www.slideshare.net/slideshow/presentation-title/12345678

## On Mobile

1. Open the presentation in your mobile browser or the SlideShare app
2. Tap the share icon
3. Choose "Copy Link" from the share menu

## What NOT to Copy

Avoid copying links from:

- Search result pages (these point to a search query, not a specific presentation)
- A user's profile page (this lists many presentations, not one)
- Shortened or redirected links from social media, which sometimes don't point directly to the actual presentation page

## Quick Check

Before pasting the link into a downloader, make sure it includes /slideshow/ in the URL and ends with a number (the presentation's unique ID). If both of those are present, you've got the right link.`,
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}