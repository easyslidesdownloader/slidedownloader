export default function CTASection() {
  return (
    <section className="px-4 sm:px-6 pb-20">
      <div className="max-w-4xl mx-auto rounded-3xl bg-[var(--color-ink)] px-8 py-14 sm:py-16 text-center relative overflow-hidden">
        {/* Decorative stacked-slide shapes, echoing the logo mark */}
        <div className="absolute -top-8 -right-8 w-40 h-28 rounded-2xl bg-[var(--color-accent)]/20 rotate-6" />
        <div className="absolute -bottom-10 -left-10 w-44 h-32 rounded-2xl bg-[var(--color-accent)]/10 -rotate-6" />

        <div className="relative">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
            Start Downloading SlideShare Presentations Now
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Free, no login, no watermark — paste a link and get your slides in seconds.
          </p>
          <a
            href="#tool"
            className="inline-flex items-center justify-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-medium px-7 py-3.5 rounded-xl transition"
          >
            Try It Free
          </a>
        </div>
      </div>
    </section>
  );
}