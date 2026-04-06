import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background" />
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[150px]" />
      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Headline */}
          <h2 className="text-display-mobile font-bold text-white sm:text-display">
            Ready to Take Control?
          </h2>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
            Stop guessing. Stop overpaying. Stop navigating this alone. Book a
            free consultation and discover how we can help you make smarter
            decisions—starting today.
          </p>

          {/* CTA Button */}
          <div className="mt-10">
            <Button href="/contact" size="lg" className="animate-glow-pulse">
              Book Your Free Consultation
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Trust note */}
          <p className="mt-6 text-sm text-text-muted">
            No obligation. No pressure. Just clarity.
          </p>
        </div>
      </div>
    </section>
  );
}
