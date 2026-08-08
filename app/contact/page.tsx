"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const REASONS = [
  { icon: "bug", title: "Report a Problem", desc: "A link isn't working or slides are missing." },
  { icon: "chat", title: "General Question", desc: "Anything about how the tool works." },
  { icon: "handshake", title: "Partnership / Other", desc: "Business inquiries or anything else." },
];

function ReasonIcon({ icon }: { icon: string }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 };
  if (icon === "bug")
    return (
      <svg {...common}>
        <rect x="8" y="8" width="8" height="10" rx="4" />
        <path d="M8 11H4M20 11h-4M8 15H5M19 15h-3M12 8V5M9 5l1.5 2M15 5l-1.5 2" strokeLinecap="round" />
      </svg>
    );
  if (icon === "chat")
    return (
      <svg {...common}>
        <path d="M4 5h16v11H8l-4 4V5z" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M8 12l3 3 6-6M4 7l4-3 4 2 4-2 4 3v6c0 5-4 8-8 9-4-1-8-4-8-9V7z" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/moeajpld", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Header />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-12 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          Get in <span className="text-[var(--color-accent)]">Touch</span>
        </h1>
        <p className="text-[var(--color-ink-muted)] text-lg">
          Questions, feedback, or something not working right? We'd like to hear about it.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {REASONS.map((r) => (
            <div
              key={r.title}
              className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center mb-3">
                <ReasonIcon icon={r.icon} />
              </div>
              <h3 className="font-display font-semibold text-sm mb-1">{r.title}</h3>
              <p className="text-sm text-[var(--color-ink-muted)]">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-[0_1px_2px_rgba(20,20,40,0.04),0_8px_24px_rgba(20,20,40,0.04)]">
          {status === "sent" ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">Message sent</h3>
              <p className="text-sm text-[var(--color-ink-muted)]">
                Thanks for reaching out — we'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "error" && (
                <div className="bg-[var(--color-danger-soft)] text-[var(--color-danger)] rounded-xl px-4 py-3 text-sm font-medium">
                  Something went wrong sending your message. Please try again.
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent-soft)] transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent-soft)] transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent-soft)] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent-soft)] transition resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-medium py-3.5 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}