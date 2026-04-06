import type { Metadata } from "next";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about health insurance, employee benefits, tax structuring, and working with Xentari.",
};

export default function FAQPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pb-8 pt-32 sm:pb-12 sm:pt-40">
        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[150px]" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-display-mobile font-bold text-white sm:text-display">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-xl text-text-secondary">
              Have questions? We have answers. If you don't see what you're
              looking for, feel free to reach out directly.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ showAll />

      <FinalCTA />
    </>
  );
}
