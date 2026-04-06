import { Shield, Building2, TrendingUp } from "lucide-react";
import { ServiceCard } from "@/components/ui/Card";
import { services } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="h-6 w-6" />,
  building: <Building2 className="h-6 w-6" />,
  chart: <TrendingUp className="h-6 w-6" />,
};

export function Services() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-display-mobile font-bold text-white sm:text-display">
            What We Do
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            We offer strategic guidance across three core areas—designed to
            protect what matters and position you for long-term success.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={iconMap[service.icon]}
              title={service.title}
              description={service.description}
              href={service.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
