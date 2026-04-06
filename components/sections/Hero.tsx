import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-20">
      {/* Background Glow Effect */}
      <div className="absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[150px]" />
      <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="container-custom relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center text-center">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background-card px-4 py-2 text-sm text-text-secondary">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Trusted advisors since {siteConfig.foundedYear}
          </div>

          {/* Headline */}
          <h1 className="text-hero-mobile font-bold tracking-tight text-white sm:text-hero">
            Smarter Coverage.
            <br />
            <span className="text-gradient">Strategic Planning.</span>
            <br />
            Financial Clarity.
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary sm:text-xl">
            We help individuals, families, and business owners navigate health
            insurance and tax-efficient strategies—with guidance you can trust.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" size="lg">
              Book Your Free Consultation
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore Our Services
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-text-muted">
              Scroll
            </span>
            <div className="h-12 w-[1px] bg-gradient-to-b from-accent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
