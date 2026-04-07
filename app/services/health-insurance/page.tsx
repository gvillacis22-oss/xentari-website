import type { Metadata } from "next";
import { Heart, Check, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Health Insurance | Xentari",
  description:
    "Find the right health coverage for you and your family. We simplify your options and find plans that fit your needs and budget.",
};

const benefits = [
  {
    title: "Personalized Plan Matching",
    description:
      "We analyze your health needs, budget, and preferences to find plans that actually fit—not just the cheapest option.",
  },
  {
    title: "ACA Marketplace Navigation",
    description:
      "The marketplace can be overwhelming. We guide you through enrollment, subsidies, and plan selection with clarity.",
  },
  {
    title: "Off-Marketplace Options",
    description:
      "Sometimes the best plan isn't on the exchange. We explore all options including short-term, health sharing, and private plans.",
  },
  {
    title: "Prescription Drug Analysis",
    description:
      "Your medications matter. We ensure your prescriptions are covered and help you find plans with the best formulary fit.",
  },
  {
    title: "Provider Network Verification",
    description:
      "Keep your doctors. We verify that your preferred providers are in-network before you commit to any plan.",
  },
  {
    title: "Year-Round Support",
    description:
      "Questions don't stop after enrollment. We're here to help with claims issues, coverage questions, and life changes.",
  },
];

const idealFor = [
  "Self-employed individuals and freelancers",
  "Families needing comprehensive coverage",
  "Those between jobs or transitioning careers",
  "Early retirees not yet eligible for Medicare",
  "Anyone confused by their current options",
];

export default function HealthInsurancePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[150px]" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex rounded-2xl bg-accent/10 p-4 text-accent">
              <Heart className="h-8 w-8" />
            </div>
            <h1 className="text-display-mobile font-bold text-white sm:text-display">
              Health Insurance
            </h1>
            <p className="mt-6 text-xl text-text-secondary">
              Finding the right health coverage shouldn't be complicated. We cut
              through the confusion and find plans that actually fit your life.
            </p>
            <div className="mt-10">
              <Button href="/contact" size="lg">
                Get Your Free Coverage Review
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
              The Problem With Health Insurance Today
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Too many options. Confusing terminology. Plans that look good on
              paper but don't cover what you actually need. Most people either
              overpay for coverage they don't use or end up underinsured when it
              matters most.
            </p>
            <p className="mt-6 text-lg text-white font-medium">
              We fix that.
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
              We take the guesswork out of health insurance and find coverage
              that actually works for you.
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
                Whether you're shopping for the first time or frustrated with
                your current coverage, we help people in all situations find
                better options.
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
                Why Work With Us?
              </h3>
              <p className="mb-6 text-text-secondary">
                We're independent—not tied to any single carrier. That means we
                shop the entire market to find the best fit for your situation,
                not just the plans that pay us the highest commission.
              </p>
              <p className="text-text-secondary">
                Our only goal is finding you the right coverage at the right
                price. If that means recommending a plan with a lower payout for
                us, we'll do it every time.
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
              Ready to Find Better Coverage?
            </h2>
            <p className="mb-12 text-lg text-text-secondary">
              Schedule a free coverage review. We'll look at your current
              situation, understand your needs, and show you options you might
              not know exist.
            </p>
            <Button href="/contact" size="lg">
              Schedule Your Free Review
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
