import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: `EasySlidesDownloader does not require an account, and we do not store the SlideShare links you paste, the slides that are fetched, or the files you download. Everything is processed in your browser session and discarded immediately afterward.

If you use our Contact form, we collect the name, email address, and message you submit, solely to respond to your inquiry.`,
  },
  {
    title: "2. How We Use Information",
    body: `The limited information collected through the Contact form is used only to reply to your message. We do not sell, rent, or share this information with third parties for marketing purposes.`,
  },
  {
    title: "3. Third-Party Services",
    body: `Our Contact form is processed by Formspree, a third-party form service — their handling of that data is governed by Formspree's own privacy policy. Our website is hosted on Vercel's infrastructure. When you use the download tool, our servers fetch publicly available content from SlideShare.net on your behalf to build your download.`,
  },
  {
    title: "4. Cookies & Tracking",
    body: `EasySlidesDownloader does not currently use tracking or advertising cookies. If this changes in the future (for example, if we add analytics), this policy will be updated to reflect that.`,
  },
  {
    title: "5. Data Security",
    body: `All connections to our site are encrypted over HTTPS. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "6. Children's Privacy",
    body: `Our Service is not intended for children under 13 years of age, and we do not knowingly collect personal information from children under 13.`,
  },
  {
    title: "7. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. Continued use of the Service after changes are posted constitutes acceptance of the updated policy.`,
  },
  {
    title: "8. Contact",
    body: `Questions about this Privacy Policy can be sent through our Contact page.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-4">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-3">
          Privacy <span className="text-[var(--color-accent)]">Policy</span>
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
      </section>

      <Footer />
    </>
  );
}