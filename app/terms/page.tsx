import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for using EasySlidesDownloader's free SlideShare presentation downloader.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using EasySlidesDownloader (the "Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use the Service.`,
  },
  {
    title: "2. Description of Service",
    body: `EasySlidesDownloader provides a free online tool that allows users to download publicly available presentations from SlideShare.net as PDF, PPTX (PowerPoint), or a ZIP of individual slide images, in SD, HD, or Full HD quality. No account or registration is required to use the Service.`,
  },
  {
    title: "3. Acceptable Use",
    body: `You agree to use the Service only for lawful purposes, including personal study, academic research, and professional reference. You agree not to use the Service to download, redistribute, or commercially exploit content without the necessary rights or permissions from the original copyright holder, and not to use automated systems to abuse or overload the Service.`,
  },
  {
    title: "4. Third-Party Content & Intellectual Property",
    body: `Content available through SlideShare.net belongs to its respective creators. The Service simply provides a means to access and save publicly accessible content — we do not claim any ownership over downloaded material. You are solely responsible for ensuring your use of downloaded content complies with applicable copyright laws and the original creator's terms of use.`,
  },
  {
    title: "5. No Warranty",
    body: `The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee the Service will be uninterrupted, error-free, or that every presentation will download successfully, since availability depends on SlideShare's own platform and access restrictions outside our control.`,
  },
  {
    title: "6. Limitation of Liability",
    body: `To the maximum extent permitted by law, EasySlidesDownloader and its operators shall not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, the Service.`,
  },
  {
    title: "7. Changes to the Service & Terms",
    body: `We may modify, suspend, or discontinue the Service at any time without prior notice. We may also update these Terms from time to time; continued use of the Service after changes are posted constitutes acceptance of the updated Terms.`,
  },
  {
    title: "8. Contact",
    body: `Questions about these Terms can be sent through our Contact page.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-4">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-3">
          Terms of <span className="text-[var(--color-accent)]">Service</span>
        </h1>
        <p className="text-[var(--color-ink-muted)]">Last updated: August 2026</p>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl font-semibold tracking-tight mb-3">{s.title}</h2>
            <p className="text-[var(--color-ink-muted)] leading-relaxed">{s.body}</p>
          </div>
        ))}
      </section>
      </main>
      <Footer />
    </>
  );
}