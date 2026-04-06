import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Schedule a free consultation with Xentari. Get personalized guidance on health insurance, employee benefits, and tax structuring strategies.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[150px]" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-display-mobile font-bold text-white sm:text-display">
              Book Your Free Consultation
            </h1>
            <p className="mt-6 text-xl text-text-secondary">
              Ready to take control of your coverage and strategy? Fill out the
              form below and we'll be in touch within 24 hours to schedule your
              free consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-background-subtle">
        <div className="container-custom">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
