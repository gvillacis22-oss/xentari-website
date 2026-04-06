import { User, Users, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { audiences } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  individuals: <User className="h-8 w-8" />,
  families: <Users className="h-8 w-8" />,
  "business-owners": <Briefcase className="h-8 w-8" />,
};

export function WhoWeHelp() {
  return (
    <section className="section-padding bg-background-subtle">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-display-mobile font-bold text-white sm:text-display">
            Built for People Like You
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Whether you're an individual, a growing family, or a business owner,
            we tailor our approach to your unique situation.
          </p>
        </div>

        {/* Audience Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {audiences.map((audience) => (
            <Card key={audience.id} className="relative overflow-hidden">
              {/* Icon */}
              <div className="mb-6 inline-flex rounded-2xl bg-accent/10 p-4 text-accent">
                {iconMap[audience.id]}
              </div>

              {/* Content */}
              <h3 className="mb-4 text-2xl font-semibold text-white">
                {audience.title}
              </h3>
              <p className="mb-4 text-text-secondary">{audience.description}</p>
              <p className="text-sm text-text-muted">{audience.detail}</p>

              {/* Decorative gradient */}
              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-accent/5 blur-3xl" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
