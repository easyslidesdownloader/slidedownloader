import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { posts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function renderContent(content: string) {
  return content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="font-display text-xl font-semibold tracking-tight mt-10 mb-3">
          {block.replace("## ", "")}
        </h2>
      );
    }
    if (block.trim().startsWith("- ")) {
      const items = block.split("\n").map((line) => line.replace(/^-\s*/, ""));
      return (
        <ul key={i} className="space-y-2 mb-4">
          {items.map((item, j) => (
            <li key={j} className="text-[var(--color-ink-muted)] leading-relaxed flex gap-2">
              <span className="text-[var(--color-accent)] shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
      );
    }
    if (/^\d+\.\s/.test(block.trim())) {
      const items = block.split("\n").map((line) => line.replace(/^\d+\.\s*/, ""));
      return (
        <ol key={i} className="space-y-2 mb-4 list-decimal list-inside">
          {items.map((item, j) => (
            <li key={j} className="text-[var(--color-ink-muted)] leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      );
    }
    return (
      <p key={i} className="text-[var(--color-ink-muted)] leading-relaxed mb-4">
        {block}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "EasySlidesDownloader" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        <a href="/blog" className="text-sm text-[var(--color-accent)] font-medium mb-6 inline-block">
          ← Back to Blog
        </a>
        <span className="font-mono text-xs text-[var(--color-ink-muted)] block mb-3">
          {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          {" · "}
          {post.readTime}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-8 leading-tight">
          {post.title}
        </h1>
        <div>{renderContent(post.content)}</div>
      </article>

      <CTASection />
      <Footer />
    </>
  );
}