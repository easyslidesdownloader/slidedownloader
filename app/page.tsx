"use client";

import { useState, useRef, useEffect } from "react";
import {
  exportToPDF,
  exportToPPTX,
  exportToZIP,
  prefetchSlides,
  preparePDF,
} from "@/lib/converter";

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
  const [quality, setQuality] = useState("hd");

  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);

  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const [exporting, setExporting] = useState("");
  const [justDone, setJustDone] = useState("");

  const [progress, setProgress] = useState({ done: 0, total: 0 });

  useEffect(() => {
  function focusIfHash() {
    if (window.location.hash === "#tool") {
      const input = document.getElementById("url-input") as HTMLInputElement | null;
      setTimeout(() => input?.focus(), 400); // let the scroll-to-anchor finish first
    }
  }
  focusIfHash();
  window.addEventListener("hashchange", focusIfHash);
  return () => window.removeEventListener("hashchange", focusIfHash);
}, []);

  /*
   * Stores the PDF being prepared in the background — as a PROMISE,
   * not just the eventual blob. This is the key fix: it's set
   * synchronously the moment preparation starts, so a click that
   * happens before it finishes can still `await` the SAME promise
   * instead of kicking off a duplicate generation from scratch.
   */
  const preparedPDFRef = useRef<{
    key: string;
    promise: Promise<Blob>;
  } | null>(null);

  /*
   * Identifies the currently displayed presentation, so a PDF
   * prepared for presentation A never gets used for presentation B.
   */
  const presentationKeyRef = useRef("");

  function updateProgress(done: number, total: number) {
    setProgress({ done, total });
  }

  function triggerBlobDownload(blob: Blob, filename: string) {
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  }

  async function handleFetch(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);
    setJustDone("");

    preparedPDFRef.current = null;
    presentationKeyRef.current = "";

    let msgIndex = 0;
    const msgTimer = setInterval(() => {
      msgIndex = (msgIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[msgIndex]);
    }, 2500);

    try {
      const res = await fetch("/api/fetch-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, quality }),
      });

      const text = await res.text();
      let data: Result & { success?: boolean; error?: string };

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Server returned HTTP ${res.status}: ${text.slice(0, 300)}`);
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error || `Server returned HTTP ${res.status}`);
      }

      // Show results and stop the loading state right away — don't wait
      // on prefetch/PDF prep, which can take much longer on big decks.
      setResult(data);
      clearInterval(msgTimer);
      setLoadingMsg(LOADING_MESSAGES[0]);
      setLoading(false);

      const presentationKey = `${data.filename}|${quality}|${data.slides.join("|")}`;
      presentationKeyRef.current = presentationKey;

      // Fire-and-forget: warms the cache for PPTX/ZIP too. Never
      // throws internally, so no need to await or catch it.
      prefetchSlides(data.slides);

      // Start PDF prep immediately (in parallel with prefetch above —
      // they share the same request-dedup cache, so no duplicate
      // network calls happen either way). Store the PROMISE right
      // now, synchronously, so an early click can join it.
      const pdfPromise = preparePDF(data.slides, (done: number, total: number) => {
        // Only reflects on-screen if the user has since clicked
        // Download PDF (see handleExport) — harmless otherwise.
        if (presentationKeyRef.current === presentationKey) {
          updateProgress(done, total);
        }
      });

      // Prevent an "unhandled promise rejection" warning if prep
      // fails before anyone clicks download — the real error still
      // surfaces normally if/when the user clicks and awaits this
      // same promise directly.
      pdfPromise.catch(() => {});

      preparedPDFRef.current = { key: presentationKey, promise: pdfPromise };
    } catch (err) {
      console.error("[fetch-slides] Frontend error:", err);
      setError(err instanceof Error ? err.message : "Couldn't reach the server. Please try again.");
      clearInterval(msgTimer);
      setLoadingMsg(LOADING_MESSAGES[0]);
      setLoading(false);
    }
  }

  async function handleExport(type: "pdf" | "pptx" | "zip") {
    if (!result || exporting) return;

    setExporting(type);
    setJustDone("");
    setError("");

    try {
      if (type === "pdf") {
        const currentKey = presentationKeyRef.current;
        const prepared = preparedPDFRef.current;

        if (prepared && prepared.key === currentKey) {
          // Join the background prep — instant if it's already done,
          // otherwise waits for the remaining work (with live progress
          // continuing to update via the callback set in handleFetch).
          setProgress((p) => (p.total ? p : { done: 0, total: result.slides.length }));
          const blob = await prepared.promise;
          triggerBlobDownload(blob, `${result.filename}.pdf`);
          setProgress({ done: result.slides.length, total: result.slides.length });
        } else {
          // No background prep for this presentation — generate fresh.
          setProgress({ done: 0, total: result.slides.length });
          await exportToPDF(result.slides, result.filename, updateProgress);
        }
      }

      if (type === "pptx") {
        setProgress({ done: 0, total: result.slides.length });
        await exportToPPTX(result.slides, result.filename, updateProgress);
      }

      if (type === "zip") {
        setProgress({ done: 0, total: result.slides.length });
        await exportToZIP(result.slides, result.filename, updateProgress);
      }

      setJustDone(type);
      setTimeout(() => setJustDone(""), 2500);
    } catch (err) {
      console.error(`[${type}] Export error:`, err);
      setError(`Couldn't create the ${type.toUpperCase()} file. Please try again.`);
    } finally {
      setExporting("");
    }
  }

  return (
    <>
      <Header />
      <main>

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
              id="url-input"
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

          {error && (
            <div className="mt-4 bg-[var(--color-danger-soft)] text-[var(--color-danger)] rounded-xl px-4 py-3.5 text-sm font-medium">
              {error}
            </div>
          )}

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
                {result.slides.map((slideUrl, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${slideUrl}-${i}`}
                    src={`/api/proxy-image?url=${encodeURIComponent(slideUrl)}`}
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
      </main>
      <Footer />
    </>
  );
}