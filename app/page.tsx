"use client";

import { useState } from "react";
import { exportToPDF, exportToPPTX, exportToZIP, prefetchSlides } from "@/lib/converter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleContent from "@/components/ArticleContent";
import {
  TrustBadges,
  FeaturesSection,
  HowItWorksSection,
  FormatCompareSection,
  FAQSection,
} from "@/components/ContentSections";

type Result = {
  title: string;
  filename: string;
  count: number;
  slides: string[];
};

const QUALITY_OPTIONS = [
  { id: "sd", label: "SD", sub: "320px" },
  { id: "hd", label: "HD", sub: "638px" },
  { id: "fullhd", label: "Full HD", sub: "2048px" },
];

const LOADING_MESSAGES = [
  "Loading presentation…",
  "Reading slides…",
  "Counting the deck…",
  "Almost done…",
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("sd");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState("");
  const [justDone, setJustDone] = useState("");
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  async function handleFetch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    let msgIndex = 0;
    const msgTimer = setInterval(() => {
      msgIndex = (msgIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[msgIndex]);
    }, 2500);

    try {
      const res = await fetch("/api/fetch-slides-browser", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url,
    quality,
  }),
});

const text = await res.text();

let data: any;

try {
  data = JSON.parse(text);
} catch {
  throw new Error(
    `Server returned HTTP ${res.status}: ${text.slice(0, 300)}`
  );
}

console.log(
  "[fetch-slides] HTTP status:",
  res.status
);

console.log(
  "[fetch-slides] Response:",
  data
);

if (!res.ok || !data.success) {
  throw new Error(
    data.error ||
      `Server returned HTTP ${res.status}`
  );
}

setResult(data);
prefetchSlides(data.slides);
    } catch (err) {
  console.error("[fetch-slides] Frontend error:", err);

  setError(
    err instanceof Error
      ? err.message
      : "Couldn't reach the server. Please try again."
  );
} finally {
      clearInterval(msgTimer);
      setLoadingMsg(LOADING_MESSAGES[0]);
      setLoading(false);
    }
  }

  async function handleExport(type: "pdf" | "pptx" | "zip") {
    if (!result || exporting) return;
    setExporting(type);
    setJustDone("");
    setProgress({ done: 0, total: result.slides.length });

    const onProgress = (done: number, total: number) => setProgress({ done, total });

    try {
      if (type === "pdf") await exportToPDF(result.slides, result.filename, onProgress);
      if (type === "pptx") await exportToPPTX(result.slides, result.filename, onProgress);
      if (type === "zip") await exportToZIP(result.slides, result.filename, onProgress);
      setJustDone(type);
      setTimeout(() => setJustDone(""), 2500);
    } catch (err: any) {
      setError(`Couldn't create the ${type.toUpperCase()} file. Please try again.`);
    } finally {
      setExporting("");
    }
  }

  return (
    <>
      <Header />

      <div id="tool" className="flex flex-col items-center px-4 pt-16 pb-4">
        <div className="w-full max-w-2xl">
          {/* Hero */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-3">
              Download SlideShare Presentations, Free
            </h1>
            <p className="text-[var(--color-ink-muted)] text-lg">
              Paste a link, get PDF, PPTX, or images. No login, no watermark.
            </p>
            <TrustBadges />
          </div>

          {/* Input card */}
          <form
            onSubmit={handleFetch}
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 shadow-[0_1px_2px_rgba(20,20,40,0.04),0_8px_24px_rgba(20,20,40,0.04)]"
          >
            <input
              type="url"
              required
              placeholder="https://www.slideshare.net/slideshow/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3.5 mb-4 outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent-soft)] transition placeholder:text-[var(--color-ink-muted)]"
            />

            <div className="grid grid-cols-3 gap-2 mb-5">
              {QUALITY_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex flex-col items-center py-2.5 rounded-xl border cursor-pointer transition ${
                    quality === opt.id
                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                      : "border-[var(--color-border)] hover:border-[var(--color-ink-muted)]"
                  }`}
                >
                  <input
                    type="radio"
                    name="quality"
                    value={opt.id}
                    checked={quality === opt.id}
                    onChange={() => setQuality(opt.id)}
                    className="hidden"
                  />
                  <span className={`font-medium text-sm ${quality === opt.id ? "text-[var(--color-accent)]" : ""}`}>
                    {opt.label}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--color-ink-muted)]">{opt.sub}</span>
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-medium py-3.5 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? loadingMsg : "Fetch Slides"}
            </button>
          </form>

          {/* Error */}
          {error && (
            <div className="mt-4 bg-[var(--color-danger-soft)] text-[var(--color-danger)] rounded-xl px-4 py-3.5 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className="mt-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6">
              <div className="h-4 w-1/2 bg-[var(--color-canvas-dim)] rounded animate-pulse mb-2" />
              <div className="h-3 w-1/4 bg-[var(--color-canvas-dim)] rounded animate-pulse mb-5" />
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="aspect-video bg-[var(--color-canvas-dim)] rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="mt-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6">
              <h2 className="font-display font-semibold text-lg mb-0.5">{result.title}</h2>
              <p className="font-mono text-sm text-[var(--color-ink-muted)] mb-5">{result.count} slides</p>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {[
                  { id: "pdf" as const, label: "PDF" },
                  { id: "pptx" as const, label: "PPTX" },
                  { id: "zip" as const, label: "ZIP" },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => handleExport(btn.id)}
                    disabled={!!exporting}
                    className={`py-2.5 rounded-xl border font-medium text-sm transition disabled:cursor-not-allowed ${
                      justDone === btn.id
                        ? "border-[var(--color-amber)] bg-[var(--color-amber-soft)] text-[#8A5A0F]"
                        : "border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-50"
                    }`}
                  >
                    {exporting === btn.id
                      ? `${progress.done}/${progress.total}`
                      : justDone === btn.id
                      ? "Downloaded ✓"
                      : `Download ${btn.label}`}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {result.slides.map((s, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
  key={i}
  src={`/api/proxy-image?url=${encodeURIComponent(s)}`}
  alt={`Slide ${i + 1}`}
  loading="lazy"
  decoding="async"
  className="rounded-lg border border-[var(--color-border)] w-full aspect-video object-cover"
/>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <FeaturesSection />
      <HowItWorksSection />
      <FormatCompareSection />
      <ArticleContent />
      <FAQSection />
      <Footer />
    </>
  );
}