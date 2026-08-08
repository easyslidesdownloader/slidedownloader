const FOOTER_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/help" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "How to Download", href: "/blog/how-to-download-slideshare-presentations" },
      { label: "SlideShare to PDF", href: "/blog/slideshare-to-pdf-guide" },
      { label: "SlideShare to PPTX", href: "/blog/slideshare-to-pptx-guide" },
      { label: "Help & FAQs", href: "/help" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "DMCA Policy", href: "/dmca" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-white/70 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="26" height="26" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="20" width="40" height="28" rx="6" fill="#8A80F0" fillOpacity="0.35" />
                <rect x="14" y="14" width="40" height="28" rx="6" fill="#8A80F0" fillOpacity="0.6" />
                <rect x="20" y="8" width="40" height="28" rx="6" fill="#8A80F0" />
                <rect x="27" y="17" width="26" height="3.2" rx="1.6" fill="#14151F" />
                <rect x="27" y="24" width="18" height="3.2" rx="1.6" fill="#14151F" fillOpacity="0.7" />
              </svg>
              <span className="font-display font-bold text-white text-base">
                EasySlidesDownloader
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Download SlideShare presentations as PDF, PPTX, or images in HD quality — free,
              no signup, no watermark.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm hover:text-white transition">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} EasySlidesDownloader. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Not affiliated with SlideShare, Scribd, or LinkedIn.
          </p>
        </div>
      </div>
    </footer>
  );
}