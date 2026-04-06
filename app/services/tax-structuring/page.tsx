import type { Metadata } from "next";
import { TrendingUp, Check, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Tax Structuring",
  description:
    "Optimize your financial position with strategic tax planning. Reduce liability and keep more of what you earn.",
};

const benefits = [
  {
    title: "Tax-Efficient Strategies",
    description:
      "We identify legal strategies to minimize your tax burden—from retirement contributions to business deductions you may be missing.",
  },
  {
    title: "Business Structure Optimization",
    description:
      "Is your business structured for tax efficiency? We analyze your entity type and recommend changes that could reduce your liability.",
  },
  {
    title: "Retirement Planning",
    description:
      "Maximize tax-advantaged retirement savings with the right accounts and contribution strategies for your situation.",
  },
  {
    title: "Wealth Preservation",
    description:
      "Protect what you've built with strategies that minimize taxes on investments, real estate, and business exits.",
  },
  {
    title: "Entity Selection Guidance",
    description:
      "LLC, S-Corp, C-Corp? We help you choose the structure that optimizes your tax position as your business grows.",
  },
  {
    title: "Proactive Planning",
    description:
      "Unlike reactive tax preparation, we plan ahead—positioning your finances today to minimize tomorrow's tax bill.",
  },
];

const idealFor = [
  "Business owners paying more tax than necessary",
  "High-income professionals seeking optimization",
  "Real estate investors building portfolios",
  "Entrepreneurs planning for business exits",
  "Anyone who wants to keep more of what they earn",
];

export default function TaxStructuringPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[150px]" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex rounded-2xl bg-accent/10 p-4 text-accent">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h1 className="text-display-mobile font-bold text-white sm:text-display">
              Tax Structuring
            </h1>
            <p className="mt-6 text-xl text-text-secondary">
              Optimize your financial position with strategic tax planning.
              Reduce liability and keep more of what you earn.
            </p>
            <div className="mt-10">
              <Button href="/contact" size="lg">
                Get Your Tax Analysis
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Difference Section */}
      <section className="section-padding bg-background-subtle">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white">
              Tax Structuring vs. Tax Preparation
            </h2>
            <p className="text-lg text-text-secondary">
              Most people only think about taxes once a year—when they file.
              That's tax preparation: looking backward at what already happened.
            </p>
            <p className="mt-4 text-lg text-text-secondary">
              Tax structuring is different. It's proactive planning that
              positions your finances today to minimize your tax burden
              tomorrow. It's the difference between reacting to taxes and
              strategically managing them.
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
              Strategic tax positioning that helps you keep more of what you
              earn—legally and ethically.
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
                Ideal For
              </h2>
              <p className="mb-8 text-lg text-text-secondary">
                If you're earning well but feel like too much is going to taxes,
                strategic structuring can help.
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
                The Xentari Advantage
              </h3>
              <p className="mb-6 text-text-secondary">
                What makes us different is our ability to connect tax strategy
                with health coverage and benefits planning. Many tax
                optimization strategies involve retirement accounts, health
                savings accounts, and business structure decisions that
                intersect with insurance and benefits.
              </p>
              <p className="text-text-secondary">
                We see the full picture and create coordinated strategies that
                optimize both your coverage and your tax position.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-background-card p-8">
            <h3 className="mb-4 text-xl font-semibold text-white">
              Important Note
            </h3>
            <p className="text-text-secondary">
              Tax structuring guidance is educational and strategic in nature.
              We help you understand options and strategies that may benefit
              your situation. For specific tax advice and filing, we recommend
              working with a licensed CPA or tax attorney. We're happy to
              coordinate with your existing tax professionals to ensure a
              cohesive approach.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background-subtle">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white">
              Ready to Optimize Your Tax Position?
            </h2>
            <p className="mb-12 text-lg text-text-secondary">
              Schedule a free consultation. We'll discuss your current situation
              and identify strategies that could help you keep more of what you
              earn.
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
