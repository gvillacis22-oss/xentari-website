import type { Metadata } from "next";
import { Shield, Check, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Life Insurance | Xentari",
  description:
    "Protect your family's future and build cash value with the right life insurance strategy. We help you find coverage that fits your goals.",
};

const benefits = [
  {
    title: "Term Life Insurance",
    description:
      "Affordable protection for a specific period. Ideal for covering mortgages, income replacement, or temporary needs.",
  },
  {
    title: "Whole Life Insurance",
    description:
      "Permanent coverage with guaranteed cash value growth. A foundation for long-term financial planning.",
  },
  {
    title: "Universal Life Options",
    description:
      "Flexible policies that adapt to your changing needs. Adjust premiums and death benefits as life evolves.",
  },
  {
    title: "Income Replacement Planning",
    description:
      "We calculate exactly how much coverage you need to protect your family's lifestyle if something happens to you.",
  },
  {
    title: "Cash Value Strategies",
    description:
      "Learn how permanent life insurance can serve as a tax-advantaged wealth building tool, not just protection.",
  },
  {
    title: "Policy Review & Optimization",
    description:
      "Already have coverage? We review existing policies to ensure they still fit your goals and aren't costing you more than necessary.",
  },
];

const idealFor = [
  "Young professionals starting families",
  "Homeowners with mortgages to protect",
  "Business owners needing key-person coverage",
  "High earners looking for tax-advantaged growth",
  "Anyone without adequate income protection",
];

export default function LifeInsurancePage() {
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
              Life Insurance
            </h1>
            <p className="mt-6 text-xl text-text-secondary">
              Protect what matters most. We help you find the right life
              insurance strategy—whether that's simple protection or a
              wealth-building tool.
            </p>
            <div className="mt-10">
              <Button href="/contact" size="lg">
                Get Your Coverage Analysis
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
              More Than Just a Death Benefit
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Most people think of life insurance as something you buy and
              forget. But the right policy can be a powerful financial tool—
              protecting your family while building tax-advantaged wealth.
            </p>
            <p className="mt-6 text-lg text-white font-medium">
              We help you see the full picture.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-display-mobile font-bold text-white sm:text-display">
              What We Offer
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              From simple term coverage to sophisticated wealth strategies, we
              match you with the right approach.
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
                Life insurance isn't one-size-fits-all. Your coverage should
                reflect your specific situation, goals, and budget.
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
                The Best Time to Get Coverage
              </h3>
              <p className="mb-6 text-text-secondary">
                Life insurance premiums are based on your age and health. The
                younger and healthier you are, the less you pay—and you lock in
                that rate for life.
              </p>
              <p className="text-text-secondary">
                Waiting costs money. Even if you're healthy today, rates only go
                up. A policy you can afford at 30 may be out of reach at 45.
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
              Ready to Protect Your Future?
            </h2>
            <p className="mb-12 text-lg text-text-secondary">
              Schedule a free coverage analysis. We'll help you understand your
              options, calculate how much coverage you need, and find a policy
              that fits your budget.
            </p>
            <Button href="/contact" size="lg">
              Schedule Your Free Analysis
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
