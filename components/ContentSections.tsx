const BADGES = [
  { label: "100% Free", icon: "check" },
  { label: "No Registration", icon: "lock" },
  { label: "HD Quality", icon: "star" },
  { label: "No Watermark", icon: "spark" },
];

const FEATURES = [
  {
    title: "Reliable, Every Time",
    desc: "Built to handle SlideShare's modern anti-bot protections directly, not with fragile shortcuts that break in a week.",
    icon: "shield",
  },
  {
    title: "Private by Design",
    desc: "Nothing you paste or download is stored. Everything is processed in real time and forgotten immediately after.",
    icon: "lock",
  },
  {
    title: "Full HD Slides",
    desc: "Choose SD, HD, or Full HD (up to 2048px) per download, so you get exactly the quality you need.",
    icon: "image",
  },
  {
    title: "Three Export Formats",
    desc: "Download as PDF for reading, PPTX for reusing offline, or a ZIP of images for design and reference.",
    icon: "layers",
  },
  {
    title: "No Account Needed",
    desc: "No signup, no email, no CAPTCHA. Paste a link and go.",
    icon: "bolt",
  },
  {
    title: "Any Deck Size",
    desc: "Works on presentations with hundreds of slides — the tool scrolls and loads the entire deck automatically.",
    icon: "infinity",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Copy the SlideShare URL",
    desc: "Open the presentation on SlideShare.net and copy the full link from your browser's address bar.",
  },
  {
    n: "2",
    title: "Paste & Choose Quality",
    desc: "Paste the link above, pick SD, HD, or Full HD, and click Fetch Slides.",
  },
  {
    n: "3",
    title: "Download Your Format",
    desc: "Choose PDF, PPTX, or ZIP of images — your file downloads instantly, right in your browser.",
  },
];

const FORMATS = [
  {
    title: "PDF",
    best: "Best for reading & printing",
    desc: "Fixed layout that looks the same everywhere. Ideal for sharing, printing, or reading on any device.",
  },
  {
    title: "PPTX",
    best: "Best for presenting & reuse",
    desc: "Each slide is placed as a full image inside a PowerPoint file — great for presenting offline or reordering slides. Text isn't separately editable.",
  },
  {
    title: "Images (ZIP)",
    best: "Best for visuals & reference",
    desc: "Every slide as a high-quality individual image file, perfect for design reference or dropping into your own deck.",
  },
];

const FAQS = [
  {
    q: "Can I download SlideShare presentations without logging in?",
    a: "Yes. You don't need a SlideShare, LinkedIn, or any other account to use this tool.",
  },
  {
    q: "Does this add a watermark to my files?",
    a: "No. Every file you download is clean, with no watermark added.",
  },
  {
    q: "Can I download private presentations?",
    a: "No — only presentations that are publicly viewable on SlideShare can be downloaded.",
  },
  {
    q: "Can I edit the text after downloading as PPTX?",
    a: "Each slide is placed as an image inside the PowerPoint file, preserving the exact original design — but the text itself isn't a separately editable layer.",
  },
  {
    q: "Is it free?",
    a: "Yes, completely free with no limits, no premium tier, and no hidden costs.",
  },
];

function BadgeIcon({ icon }: { icon: string }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.2 };
  if (icon === "check") return <svg {...common}><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (icon === "lock") return <svg {...common}><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" strokeLinecap="round" /></svg>;
  if (icon === "star") return <svg {...common}><path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21 7.5 13.5 2 9h7z" strokeLinejoin="round" /></svg>;
  return <svg {...common}><path d="M12 2v4M12 18v4M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" strokeLinecap="round" /></svg>;
}

function FeatureIcon({ icon }: { icon: string }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 };
  if (icon === "shield")
    return (
      <svg {...common}>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (icon === "lock")
    return (
      <svg {...common}>
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 018 0v3" strokeLinecap="round" />
      </svg>
    );
  if (icon === "image")
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <circle cx="9" cy="10" r="1.8" />
        <path d="M3 17l5-5 4 4 3-3 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (icon === "layers")
    return (
      <svg {...common}>
        <path d="M12 3l9 5-9 5-9-5 9-5z" strokeLinejoin="round" />
        <path d="M3 13l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (icon === "bolt")
    return (
      <svg {...common}>
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M18.5 12a4 4 0 10-6.5-3 4 4 0 10-6.5 3 4 4 0 106.5 3 4 4 0 106.5-3z" strokeLinejoin="round" />
    </svg>
  );
}

export function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {BADGES.map((b) => (
        <span
          key={b.label}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)]/70 bg-[var(--color-card)] border border-[var(--color-border)] rounded-full px-3.5 py-1.5"
        >
          <span className="text-[var(--color-accent)]">
            <BadgeIcon icon={b.icon} />
          </span>
          {b.label}
        </span>
      ))}
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl font-semibold tracking-tight mb-3">
          Why Use EasySlidesDownloader?
        </h2>
        <p className="text-[var(--color-ink-muted)] max-w-xl mx-auto">
          Built to actually work, not just look like a downloader.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-accent)]/40 transition"
          >
            <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center mb-4">
              <FeatureIcon icon={f.icon} />
            </div>
            <h3 className="font-display font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="bg-[var(--color-canvas-dim)]/60 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-semibold tracking-tight mb-3">How It Works</h2>
          <p className="text-[var(--color-ink-muted)]">Three steps. No account. No waiting around.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center">
              <div className="w-11 h-11 mx-auto mb-4 rounded-full bg-[var(--color-accent)] text-white font-display font-semibold flex items-center justify-center">
                {s.n}
              </div>
              <h3 className="font-display font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FormatCompareSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl font-semibold tracking-tight mb-3">
          PDF vs PPTX vs Images — Which Should You Choose?
        </h2>
        <p className="text-[var(--color-ink-muted)] max-w-xl mx-auto">
          Depends on what you're going to do with the slides.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {FORMATS.map((f) => (
          <div key={f.title} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6">
            <span className="inline-block text-xs font-semibold text-[var(--color-accent)] bg-[var(--color-accent-soft)] rounded-full px-2.5 py-1 mb-3">
              {f.best}
            </span>
            <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl font-semibold tracking-tight mb-3">
          Frequently Asked Questions
        </h2>
      </div>
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
  );
}