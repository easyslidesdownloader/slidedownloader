import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer covering third-party content, intended use, and liability for EasySlidesDownloader.",
  alternates: { canonical: "/disclaimer" },
};

const SECTIONS = [
  {
    title: "1. No Affiliation",
    body: `EasySlidesDownloader is an independent tool and is not affiliated with, endorsed by, or sponsored by SlideShare, Scribd, LinkedIn, or any other third-party platform referenced on this site. All trademarks and brand names belong to their respective owners.`,
  },
  {
    title: "2. Third-Party Content",
    body: `All presentations accessed through this Service belong to their original creators and remain their intellectual property. We do not host, store, or claim ownership of any presentation content — we simply provide a means to download publicly accessible material from SlideShare.net on your behalf.`,
  },
  {
    title: "3. Intended Use",
    body: `This tool is intended for personal study, academic research, and professional reference. You are responsible for ensuring your use of downloaded content — including any redistribution, republishing, or commercial use — complies with applicable copyright law and the original creator's terms.`,
  },
  {
    title: "4. No Warranty",
    body: `This Service is provided on an "as is" and "as available" basis, without warranties of any kind, either express or implied. We do not guarantee that every presentation will download successfully, or that downloaded content will be complete, accurate, or free of errors, since this depends in part on SlideShare's own platform.`,
  },
  {
    title: "5. Limitation of Liability",
    body: `We are not responsible for any loss, damage, or claim arising from your use of this Service or downloaded content, including any copyright disputes arising from how downloaded material is subsequently used.`,
  },
  {
    title: "6. Copyright Concerns",
    body: `If you are a content owner and believe your work has been made available inappropriately through this Service, please refer to our DMCA Policy for how to submit a request.`,
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-4">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-3">
          <span className="text-[var(--color-accent)]">Disclaimer</span>
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