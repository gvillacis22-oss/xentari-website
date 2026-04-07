import type { Metadata } from "next";
import { Clock, Check, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Medicare & Retirement Planning | Xentari",
  description:
    "Navigate Medicare with confidence and plan for a secure retirement. We help you understand your options and make smart decisions.",
};

const benefits = [
  {
    title: "Medicare Enrollment Guidance",
    description:
      "Initial enrollment, special enrollment, open enrollment—we guide you through every Medicare milestone with clarity.",
  },
  {
    title: "Plan Comparison & Selection",
    description:
      "Original Medicare, Advantage, Medigap, Part D—we compare all options to find the best fit for your health needs and budget.",
  },
  {
    title: "Supplement (Medigap) Planning",
    description:
      "Understand the gaps in Original Medicare and choose supplemental coverage that provides true peace of mind.",
  },
  {
    title: "Prescription Drug Coverage",
    description:
      "Part D plans vary dramatically. We analyze your medications and find plans that minimize your out-of-pocket costs.",
  },
  {
    title: "Retirement Health Strategy",
    description:
      "Coordinate Medicare with other retirement benefits, retiree coverage, and health savings to optimize your healthcare costs.",
  },
  {
    title: "Annual Plan Reviews",
    description:
      "Plans change every year. We review your coverage annually to ensure you're still in the best plan for your needs.",
  },
];

const idealFor = [
  "Turning 65 and enrolling in Medicare for the first time",
  "Already on Medicare but confused about your options",
  "Retiring early and need coverage before Medicare kicks in",
  "Want to understand Medicare Advantage vs. Original Medicare",
  "Looking to reduce prescription drug costs",
];

export default function MedicareRetirementPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[150px]" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex rounded-2xl bg-accent/10 p-4 text-accent">
              <Clock className="h-8 w-8" />
            </div>
            <h1 className="text-display-mobile font-bold text-white sm:text-display">
              Medicare & Retirement
            </h1>
            <p className="mt-6 text-xl text-text-secondary">
              Transitioning to Medicare doesn't have to be confusing. We help
              you navigate your options and build a healthcare strategy for
              retirement.
            </p>
            <div className="mt-10">
              <Button href="/contact" size="lg">
                Get Your Medicare Review
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-background-subtle">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white">
              Medicare Is More Complex Than It Looks
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Parts A, B, C, D. Medigap plans lettered A through N. Annual
              enrollment periods. Late enrollment penalties. Medicare isn't just
              one program—it's a web of choices that can cost you thousands if
              you get it wrong.
            </p>
            <p className="mt-6 text-lg text-white font-medium">
              We make it simple.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-display-mobile font-bold text-white sm:text-display">
              How We Help
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              From first-time enrollment to annual reviews, we're your Medicare
              partner through every stage of retirement.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="section-padding bg-background-subtle">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-white">
                Who This Is For
              </h2>
              <p className="mb-8 text-lg text-text-secondary">
                Whether you're approaching 65 or already on Medicare, we help
                you make sense of your options and find the right coverage.
              </p>
              <ul className="space-y-4">
                {idealFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-text-secondary"
                  >
                    <Check className="h-5 w-5 flex-shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Card className="bg-background">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Timing Matters
              </h3>
              <p className="mb-6 text-text-secondary">
                Medicare has strict enrollment windows. Miss them, and you could
                face permanent penalties that increase your premiums for life.
              </p>
              <p className="text-text-secondary">
                Start planning 3-6 months before you turn 65. If you're already
                past that window, don't panic—we can help you understand your
                options and minimize any impact.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white">
              Ready to Navigate Medicare?
            </h2>
            <p className="mb-12 text-lg text-text-secondary">
              Schedule a free Medicare consultation. We'll review your
              situation, explain your options in plain English, and help you
              choose coverage that fits your health needs and budget.
            </p>
            <Button href="/contact" size="lg">
              Schedule Your Free Consultation
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
