import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const STEPS = [
  {
    n: "1",
    title: "Copy the SlideShare URL",
    desc: "Open the presentation on SlideShare.net and copy the full link from your browser's address bar.",
    example: "https://www.slideshare.net/slideshow/presentation-title/12345678",
  },
  {
    n: "2",
    title: "Paste It on EasySlidesDownloader",
    desc: "Come back here and paste the link into the input box on the homepage.",
  },
  {
    n: "3",
    title: "Choose Your Quality & Format",
    desc: "Pick SD, HD, or Full HD, then click Fetch Slides. Once loaded, choose PDF, PPTX, or a ZIP of images.",
  },
  {
    n: "4",
    title: "Download",
    desc: "Your file downloads directly to your device — no email, no waiting for a link.",
  },
];

const FAQS = [
  { q: "Is this tool free to use?", a: "Yes, completely free — no subscription, no hidden charges, and no registration required." },
  { q: "Do I need to create an account?", a: "No. You can use the tool instantly without signing up or providing any personal information." },
  { q: "Which formats are supported?", a: "PDF, PPTX (PowerPoint), and a ZIP of individual slide images." },
  { q: "Does it work on mobile?", a: "Yes — it works on Android, iPhone, tablet, and desktop across all major browsers." },
  { q: "How long does downloading take?", a: "Most presentations are ready in 10-20 seconds. Larger decks with hundreds of slides can take up to a minute, since the tool scrolls through the entire presentation to find every slide." },
  { q: "Can I download private or restricted presentations?", a: "No — only publicly accessible SlideShare presentations can be downloaded." },
  { q: "Is my data safe?", a: "Yes. We don't store downloaded files, links, or personal information. Everything is processed in real time and forgotten right after." },
  { q: "Are downloaded files watermark-free?", a: "Yes — files are delivered exactly as the original author published them, with no watermarks or branding added." },
];

const TROUBLESHOOTING = [
  {
    title: "Download is failing or not starting",
    items: [
      "Make sure the SlideShare URL is complete and correct",
      "Check that the presentation is publicly accessible — open it in a private/incognito window to confirm",
      "Try a different browser (Chrome or Firefox recommended)",
      "Disable any browser extensions temporarily and retry",
    ],
  },
  {
    title: "File quality looks low",
    items: [
      "Quality depends on what the original uploader published — we extract at the highest resolution SlideShare offers",
      "Try switching to Full HD (2048px) in the quality selector before fetching",
    ],
  },
  {
    title: "Presentation is missing slides",
    items: [
      "Some presentations contain embedded videos or animations that can't be converted to static images",
      "The downloaded file will include all static slide content",
    ],
  },
  {
    title: "Getting an error message",
    items: [
      "The presentation may have been deleted or made private by the uploader",
      "Copy the URL again directly from your browser and try once more",
      "If the problem continues, contact us with the SlideShare URL",
    ],
  },
];

export default function HelpPage() {
  return (
    <>
      <Header />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-12 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          Help <span className="text-[var(--color-accent)]">Center</span>
        </h1>
        <p className="text-[var(--color-ink-muted)] text-lg">
          Guides, answers, and troubleshooting for EasySlidesDownloader.
        </p>
      </section>

      {/* How to Use */}
      <section id="how-to-use" className="bg-[var(--color-canvas-dim)]/60 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight mb-10 text-center">
            How to Use the Tool
          </h2>
          <div className="space-y-6">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="flex gap-4 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5"
              >
                <div className="w-9 h-9 shrink-0 rounded-full bg-[var(--color-accent)] text-white font-display font-semibold flex items-center justify-center">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-medium mb-1">{s.title}</h3>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed mb-2">{s.desc}</p>
                  {s.example && (
                    <code className="text-xs bg-[var(--color-canvas-dim)] px-2.5 py-1.5 rounded-lg inline-block font-mono text-[var(--color-ink-muted)]">
                      {s.example}
                    </code>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-5 py-4"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none font-medium">
                {f.q}
                <span className="ml-4 shrink-0 text-[var(--color-ink-muted)] transition group-open:rotate-45">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm text-[var(--color-ink-muted)] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="bg-[var(--color-canvas-dim)]/60 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight mb-10 text-center">
            Troubleshooting
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TROUBLESHOOTING.map((t) => (
              <div key={t.title} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6">
                <h3 className="font-display font-semibold mb-3">{t.title}</h3>
                <ul className="space-y-2">
                  {t.items.map((item) => (
                    <li key={item} className="text-sm text-[var(--color-ink-muted)] leading-relaxed flex gap-2">
                      <span className="text-[var(--color-accent)] shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Copyright */}
      <section id="copyright" className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">
          Copyright &amp; Responsible Use
        </h2>
        <p className="text-[var(--color-ink-muted)] leading-relaxed mb-3">
          This tool is intended for personal study, academic research, and professional reference
          only. Copyright of all presentations remains with the original creator — please don't
          redistribute, republish, or commercially use downloaded content without permission, and
          always credit the original author when referencing downloaded material.
        </p>
        <p className="text-[var(--color-ink-muted)] leading-relaxed">
          If you're a content owner and believe your work has been accessed inappropriately,
          please reach out through our{" "}
          <a href="/dmca" className="text-[var(--color-accent)]">
            DMCA Policy
          </a>{" "}
          page and we'll act promptly.
        </p>
      </section>

      {/* Contact Support */}
      <section id="contact-support" className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-8 text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight mb-2">
            Still Need Help?
          </h2>
          <p className="text-[var(--color-ink-muted)] mb-6">
            Can't find the answer you're looking for? Reach out and we'll get back to you.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-medium px-6 py-3 rounded-xl transition"
          >
            Contact Us
          </a>
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  );
}