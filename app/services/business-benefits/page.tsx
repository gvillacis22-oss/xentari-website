import type { Metadata } from "next";
import { Building2, Check, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Business Group Benefits",
  description:
    "Attract and retain talent with competitive employee benefits. We design group health plans that work for your business.",
};

const benefits = [
  {
    title: "Group Health Insurance",
    description:
      "We shop multiple carriers to find group health plans that provide excellent coverage while fitting your budget.",
  },
  {
    title: "Complete Benefits Packages",
    description:
      "Beyond health insurance, we help you build comprehensive packages including dental, vision, life, and disability coverage.",
  },
  {
    title: "Cost Containment Strategies",
    description:
      "We identify opportunities to reduce costs without sacrificing coverage quality—from plan design to contribution strategies.",
  },
  {
    title: "Compliance Guidance",
    description:
      "Navigate ACA requirements, COBRA, ERISA, and other regulations with confidence. We keep you compliant and protected.",
  },
  {
    title: "Open Enrollment Support",
    description:
      "We handle the heavy lifting during open enrollment, from employee education to enrollment processing.",
  },
  {
    title: "Ongoing Administration",
    description:
      "Questions don't stop after enrollment. We're your year-round resource for employee issues, claims support, and plan adjustments.",
  },
];

const idealFor = [
  "Small businesses (2-50 employees)",
  "Growing companies scaling their team",
  "Startups competing for talent",
  "Businesses with high turnover looking to improve retention",
  "Companies overpaying for current benefits",
];

export default function BusinessBenefitsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[150px]" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex rounded-2xl bg-accent/10 p-4 text-accent">
              <Building2 className="h-8 w-8" />
            </div>
            <h1 className="text-display-mobile font-bold text-white sm:text-display">
              Business Group Benefits
            </h1>
            <p className="mt-6 text-xl text-text-secondary">
              Attract and retain talent with competitive employee benefits. We
              design group health plans that work for your business.
            </p>
            <div className="mt-10">
              <Button href="/contact" size="lg">
                Get Your Benefits Analysis
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
              What We Offer
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Building a competitive benefits package doesn't have to be
              complicated or expensive. Here's how we help.
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
                Whether you're offering benefits for the first time or looking
                to improve what you have, we help businesses of all sizes build
                packages that work.
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
                Why Benefits Matter
              </h3>
              <p className="mb-6 text-text-secondary">
                In today's competitive job market, benefits are a key
                differentiator. The right package helps you attract top
                candidates, retain your best employees, and build a healthier,
                more engaged workforce.
              </p>
              <p className="text-text-secondary">
                We help you maximize the impact of every benefit dollar—
                creating packages that employees value while keeping costs
                manageable for your business.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section-padding bg-background-subtle">
        <div className="container-custom">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white">
              What You Can Expect
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <div className="mb-4 text-4xl font-bold text-accent">20%+</div>
              <p className="text-text-secondary">
                Average savings found for clients switching to optimized plans
              </p>
            </Card>
            <Card className="text-center">
              <div className="mb-4 text-4xl font-bold text-accent">5+ hrs</div>
              <p className="text-text-secondary">
                Saved per month on benefits administration with our support
              </p>
            </Card>
            <Card className="text-center">
              <div className="mb-4 text-4xl font-bold text-accent">100%</div>
              <p className="text-text-secondary">
                Compliance confidence with our regulatory guidance
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
              Ready to Build Better Benefits?
            </h2>
            <p className="mb-12 text-lg text-text-secondary">
              Schedule a free benefits analysis. We'll review your current
              situation, identify opportunities, and show you how to build a
              package that works for your business and your team.
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
