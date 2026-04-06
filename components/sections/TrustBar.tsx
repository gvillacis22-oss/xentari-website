import { trustStats } from "@/lib/constants";
import { StatCard } from "@/components/ui/Card";

export function TrustBar() {
  return (
    <section className="border-y border-border bg-background-card py-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {trustStats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
