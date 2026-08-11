import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          Page Not <span className="text-[var(--color-accent)]">Found</span>
        </h1>
        <p className="text-[var(--color-ink-muted)] text-lg mb-8">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-medium px-6 py-3 rounded-xl transition"
        >
          Back to Homepage
        </a>
      </div>
      <Footer />
    </>
  );
}