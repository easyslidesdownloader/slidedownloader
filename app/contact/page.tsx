import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with EasySlidesDownloader — report a problem, ask a question, or reach out for anything else.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
      <ContactForm />
      </main>
      <Footer />
    </>
  );
}