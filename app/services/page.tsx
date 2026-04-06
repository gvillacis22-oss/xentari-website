import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Building2, TrendingUp, ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { services } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our services: individual & family health insurance, business group benefits, and tax structuring strategies.",
};

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="h-8 w-8" />,
  building: <Building2 className="h-8 w-8" />,
  chart: <TrendingUp className="h-8 w-8" />,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[150px]" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-display-mobile font-bold text-white sm:text-display">
              Our Services
            </h1>
            <p className="mt-6 text-xl text-text-secondary">
              Strategic guidance across three core areas—designed to protect
              what matters and position you for long-term success.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-background-subtle">
        <div className="container-custom">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid items-center gap-12 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="mb-6 inline-flex rounded-2xl bg-accent/10 p-4 text-accent">
                    {iconMap[service.icon]}
                  </div>
                  <h2 className="mb-4 text-3xl font-bold text-white">
                    {service.title}
                  </h2>
                  <p className="mb-6 text-lg text-text-secondary">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="mb-8 space-y-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-text-secondary"
                      >
                        <Check className="h-5 w-5 flex-shrink-0 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button href={service.href}>
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <Card className="aspect-[4/3] flex items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-4 rounded-2xl bg-accent/10 p-6 text-accent">
                        {iconMap[service.icon]}
                      </div>
                      <p className="text-text-muted">
                        {service.shortTitle}
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Sell Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white">
              The Power of Combined Strategy
            </h2>
            <p className="mb-8 text-lg text-text-secondary">
              What sets us apart is our ability to connect health coverage with
              tax strategy. Most advisors specialize in one or the other. We
              bring both together to create smarter financial outcomes—
              protecting you while positioning you for growth.
            </p>
            <Button href="/contact" size="lg">
              Discuss Your Strategy
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
