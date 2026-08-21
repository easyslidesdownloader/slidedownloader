import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "DMCA Policy",
  description: "How to submit a DMCA takedown notice for content accessed through EasySlidesDownloader.",
  alternates: { canonical: "/dmca" },
};

const SECTIONS = [
  {
    title: "1. Our Policy",
    body: `EasySlidesDownloader respects the intellectual property rights of others and expects our users to do the same. Our Service only provides access to presentations that are already publicly available on SlideShare.net — we do not host any presentation content on our own servers. If you believe your copyrighted work has been made available through our Service in a way that constitutes infringement, you may submit a takedown request as described below.`,
  },
  {
    title: "2. Filing a DMCA Takedown Notice",
    body: `To file a notice, please provide the following information in writing:

• Identification of the copyrighted work you claim has been infringed
• Identification of the material you claim is infringing, including the SlideShare URL and how it was accessed through our Service
• Your contact information — name, address, phone number, and email address
• A statement that you have a good faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law
• A statement, made under penalty of perjury, that the above information is accurate and that you are the copyright owner or authorized to act on their behalf
• Your physical or electronic signature`,
  },
  {
    title: "3. Where to Send Notices",
    body: `Please submit your DMCA notice through our Contact page. We will review valid requests promptly and take appropriate action.`,
  },
  {
    title: "4. Counter-Notices",
    body: `If you believe material was removed or access disabled as a result of mistake or misidentification, you may submit a counter-notice with comparable information, including a statement under penalty of perjury that you have a good faith belief the material was removed in error.`,
  },
  {
    title: "5. Repeat Infringers",
    body: `We reserve the right to restrict access to our Service for users who are the subject of repeated, valid infringement notices.`,
  },
];

export default function DMCAPage() {
  return (
    <>
      <Header />
      <main>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-4">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-3">
          <span className="text-[var(--color-accent)]">DMCA</span> Policy
        </h1>
        <p className="text-[var(--color-ink-muted)]">Last updated: August 2026</p>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl font-semibold tracking-tight mb-3">{s.title}</h2>
            <p className="text-[var(--color-ink-muted)] leading-relaxed whitespace-pre-line">{s.body}</p>
          </div>
        ))}

        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 text-center">
          <p className="text-[var(--color-ink-muted)] mb-4">
            Ready to submit a notice, or have questions about this policy?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-medium px-6 py-3 rounded-xl transition"
          >
            Contact Us
          </a>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}