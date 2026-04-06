import { Users, Award, Layers, Handshake } from "lucide-react";
import { features } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="h-6 w-6" />,
  award: <Award className="h-6 w-6" />,
  layers: <Layers className="h-6 w-6" />,
  handshake: <Handshake className="h-6 w-6" />,
};

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-display-mobile font-bold text-white sm:text-display">
            Why Clients Trust Us
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            We're not your typical insurance agency. We take a different
            approach—one built on strategy, clarity, and long-term partnership.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex gap-5 rounded-2xl border border-border bg-background-card p-6 transition-all duration-300 hover:border-accent/50"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="rounded-xl bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  {iconMap[feature.icon]}
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
