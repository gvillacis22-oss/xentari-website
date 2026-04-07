import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Financial Tools | Xentari",
  description:
    "Free financial tools to help you plan your future. Explore your retirement projections and see what's possible.",
};

const tools = [
  {
    icon: Calculator,
    title: "Retirement Calculator",
    description:
      "Estimate your future portfolio growth and see what it takes to reach your retirement goals. Model different scenarios with our interactive planner.",
    href: "/calculator",
    cta: "Open Calculator",
  },
];

export default function ToolsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[150px]" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-display-mobile font-bold text-white sm:text-display">
              Financial Tools
            </h1>
            <p className="mt-6 text-xl text-text-secondary">
              Free tools to help you explore your financial future. No signup
              required—just real insights to help you plan.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section-padding bg-background-subtle">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Card key={tool.title} className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-accent" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-2">
                          {tool.title}
                        </h2>
                        <p className="text-text-secondary mb-4">
                          {tool.description}
                        </p>
                        <Link
                          href={tool.href}
                          className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent/80 transition-colors"
                        >
                          {tool.cta}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white">
              Want Personalized Guidance?
            </h2>
            <p className="mb-12 text-lg text-text-secondary">
              Tools are a great starting point, but nothing replaces a real
              conversation. Schedule a free consultation and let's talk about
              your specific situation.
            </p>
            <Button href="/contact" size="lg">
              Book a Free Consultation
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
