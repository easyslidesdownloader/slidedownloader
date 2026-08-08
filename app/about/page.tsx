import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const DIFFERENTIATORS = [
  {
    title: "Speed First",
    desc: "Slides are prefetched into cache the moment they're found, so by the time you click download, your file is ready almost instantly — no waiting a second time.",
  },
  {
    title: "Quality Matters",
    desc: "Every download supports up to Full HD (2048px), so text and details stay crisp instead of blurry.",
  },
  {
    title: "Privacy Protected",
    desc: "We don't store your links, your files, or any personal information. Everything is processed in your session and forgotten right after.",
  },
  {
    title: "Always Free",
    desc: "No premium plans, no download limits, no hidden fees. It's free because it should be.",
  },
];

const COMMITMENTS = [
  {
    title: "Continuous Improvement",
    desc: "SlideShare changes how it works from time to time — we keep this tool updated so it keeps working.",
  },
  {
    title: "Transparency",
    desc: "We're upfront about what this tool can and can't do, including format limitations like PPTX slides being images rather than editable text.",
  },
  {
    title: "Ethical Use",
    desc: "We encourage downloading for personal use, learning, and reference — and respecting the original creator's rights.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          About <span className="text-[var(--color-accent)]">EasySlidesDownloader</span>
        </h1>
        <p className="text-[var(--color-ink-muted)] text-lg">
          Making presentations accessible offline — free, private, and fast.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">Our <span className="text-[var(--color-accent)]">Mission</span></h2>
        <p className="text-[var(--color-ink-muted)] leading-relaxed">
          Our mission is simple: give people a fast, reliable, and completely free way to
          download SlideShare presentations. Knowledge shouldn't be locked behind a login screen
          — whether it's a lecture, a research deck, or a business presentation, you should be
          able to save it and come back to it anytime, even offline.
        </p>
      </section>

      {/* Story */}
      <section className="bg-[var(--color-canvas-dim)]/60 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">Our <span className="text-[var(--color-accent)]">Story</span></h2>
          <p className="text-[var(--color-ink-muted)] leading-relaxed mb-3">
            This tool started from a simple frustration: finding a genuinely useful SlideShare
            presentation, only to hit a wall when trying to save it for later. No download
            button, a login wall, or a broken third-party tool — over and over.
          </p>
          <p className="text-[var(--color-ink-muted)] leading-relaxed">
            So we built the tool we actually wanted to use: one that works reliably even as
            SlideShare's own protections have gotten more complex, respects your privacy by
            default, and gives you the format you actually need — PDF, PPTX, or individual
            images — in real HD quality.
          </p>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-semibold tracking-tight mb-3">
            What Sets Us <span className="text-[var(--color-accent)]">Apart</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {DIFFERENTIATORS.map((d) => (
            <div
              key={d.title}
              className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6"
            >
              <h3 className="font-display font-semibold mb-2">{d.title}</h3>
              <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Commitment */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight mb-6 text-center">
          Our <span className="text-[var(--color-accent)]">Commitment</span> to Users
        </h2>
        <div className="space-y-5">
          {COMMITMENTS.map((c) => (
            <div key={c.title} className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-2 shrink-0" />
              <div>
                <h3 className="font-medium mb-1">{c.title}</h3>
                <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  );
}