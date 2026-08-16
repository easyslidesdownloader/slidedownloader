"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Help", href: "/help" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-[var(--color-card)]/85 backdrop-blur-md border-b border-[var(--color-border)] shadow-[0_1px_0_rgba(20,20,40,0.02)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <svg width="26" height="26" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <rect x="8" y="20" width="40" height="28" rx="6" fill="#5B4FE9" fillOpacity="0.18" />
            <rect x="14" y="14" width="40" height="28" rx="6" fill="#5B4FE9" fillOpacity="0.45" />
            <rect x="20" y="8" width="40" height="28" rx="6" fill="#5B4FE9" />
            <rect x="27" y="17" width="26" height="3.2" rx="1.6" fill="#FFFFFF" />
            <rect x="27" y="24" width="18" height="3.2" rx="1.6" fill="#FFFFFF" fillOpacity="0.7" />
          </svg>
          <span className="font-display font-bold text-sm sm:text-lg tracking-tight whitespace-nowrap">
            Easy<span className="text-[var(--color-accent)]">Slides</span>Downloader
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-ink)]/80 hover:text-[var(--color-accent)] transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="/#tool"
          className="hidden md:inline-flex items-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          Try It Free
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-2 -mr-2 text-[var(--color-ink)]"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--color-card)] border-t border-[var(--color-border)] px-4 py-3">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium py-2.5 text-[var(--color-ink)]/80 hover:text-[var(--color-accent)] transition"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#tool"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex justify-center bg-[var(--color-accent)] text-white text-sm font-medium px-4 py-2.5 rounded-lg"
            >
              Try It Free
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}