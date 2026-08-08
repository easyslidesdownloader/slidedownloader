import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "@/lib/posts";

export default function BlogPage() {
  return (
    <>
      <Header />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-12 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          The <span className="text-[var(--color-accent)]">Blog</span>
        </h1>
        <p className="text-[var(--color-ink-muted)] text-lg">
          Guides, tips, and answers for getting the most out of SlideShare presentations.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-accent)]/40 transition flex flex-col"
            >
              <span className="font-mono text-xs text-[var(--color-ink-muted)] mb-3">
                {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                {" · "}
                {post.readTime}
              </span>
              <h2 className="font-display font-semibold text-lg mb-2 leading-snug">{post.title}</h2>
              <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{post.excerpt}</p>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}