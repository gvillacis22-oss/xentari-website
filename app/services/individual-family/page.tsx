import type { Metadata } from "next";
import { Shield, Check, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Individual & Family Health Insurance",
  description:
    "Find the right health coverage for you and your loved ones. We simplify your options and find plans that fit your needs and budget.",
};

const benefits = [
  {
    title: "Personalized Plan Comparison",
    description:
      "We analyze dozens of plans across multiple carriers to find options that match your specific health needs, budget, and preferences.",
  },
  {
    title: "ACA Marketplace Navigation",
    description:
      "Confused by Healthcare.gov? We guide you through the enrollment process and help you maximize available subsidies and tax credits.",
  },
  {
    title: "Short-Term Health Options",
    description:
      "Between jobs or waiting for employer coverage? We find bridge solutions that keep you protected during transitions.",
  },
  {
    title: "Dental & Vision Coverage",
    description:
      "Complete your coverage picture with supplemental plans that protect your overall health without breaking the bank.",
  },
  {
    title: "Prescription Drug Analysis",
    description:
      "We review your medications and find plans with formularies that cover what you need at the lowest possible cost.",
  },
  {
    title: "Ongoing Annual Reviews",
    description:
      "Plans change every year. We review your coverage annually and recommend adjustments to keep you optimally protected.",
  },
];

const idealFor = [
  "Self-employed professionals and freelancers",
  "Families seeking comprehensive coverage",
  "Individuals between jobs or in career transitions",
  "Early retirees not yet eligible for Medicare",
  "Anyone unhappy with their current coverage",
];

export default function IndividualFamilyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[150px]" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex rounded-2xl bg-accent/10 p-4 text-accent">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-display-mobile font-bold text-white sm:text-display">
              Individual & Family Plans
            </h1>
            <p className="mt-6 text-xl text-text-secondary">
              Find the right health coverage for you and your loved ones. We
              simplify your options and find plans that fit your needs and
              budget.
            </p>
            <div className="mt-10">
              <Button href="/contact" size="lg">
                Get Your Free Quote
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-background-subtle">
        <div className="container-custom">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-display-mobile font-bold text-white sm:text-display">
              How We Help
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Navigating health insurance doesn't have to be overwhelming. Here's
              how we make it simple.
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
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-white">
                Ideal For
              </h2>
              <p className="mb-8 text-lg text-text-secondary">
                Our individual and family coverage guidance is perfect for
                anyone who wants personalized attention and expert help finding
                the right plan.
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

            <Card className="bg-background-subtle">
              <h3 className="mb-4 text-xl font-semibold text-white">
                The Xentari Difference
              </h3>
              <p className="mb-6 text-text-secondary">
                Unlike online marketplaces that leave you to figure it out alone,
                we provide personalized guidance from start to finish. We
                understand your situation, compare options across carriers, and
                help you enroll with confidence.
              </p>
              <p className="text-text-secondary">
                Plus, we don't disappear after enrollment. We're here year after
                year to review your coverage, answer questions, and adjust your
                plan as your life changes.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-background-subtle">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white">
              Getting Started Is Easy
            </h2>
            <p className="mb-12 text-lg text-text-secondary">
              Schedule a free consultation. We'll review your situation, present
              your best options, and help you enroll—all at no cost to you.
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
