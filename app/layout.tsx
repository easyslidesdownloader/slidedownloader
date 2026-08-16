import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.easyslidesdownloader.com"),
  title: {
    default: "SlideShare Downloader — Download PPT, PDF & Slides Instantly",
    template: "%s | EasySlidesDownloader",
  },
  description: "Download SlideShare presentations as PPTX, PDF, or images. No login, no watermark, free.",
  openGraph: {
    title: "SlideShare Downloader — Download PPT, PDF & Slides Instantly",
    description: "Download SlideShare presentations as PPTX, PDF, or images. No login, no watermark, free.",
    url: "https://www.easyslidesdownloader.com",
    siteName: "EasySlidesDownloader",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SlideShare Downloader — Download PPT, PDF & Slides Instantly",
    description: "Download SlideShare presentations as PPTX, PDF, or images. No login, no watermark, free.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "EasySlidesDownloader",
    url: "https://www.easyslidesdownloader.com",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Download SlideShare presentations as PDF, PPTX, or images. No login, no watermark, free.",
  };

  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}