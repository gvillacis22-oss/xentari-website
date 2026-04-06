import { Button } from "@/components/ui/Button";
import { processSteps } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function Process() {
  return (
    <section className="section-padding bg-background-subtle">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-display-mobile font-bold text-white sm:text-display">
            How We Work Together
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Getting started is simple. We've streamlined our process so you can
            move from confusion to clarity in three steps.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line (desktop only) */}
          <div className="absolute left-1/2 top-16 hidden h-[2px] w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative text-center">
                {/* Step Number */}
                <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-background text-2xl font-bold text-accent shadow-glow">
                  {step.step.toString().padStart(2, "0")}
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-text-secondary">{step.description}</p>

                {/* Arrow (desktop only) */}
                {index < processSteps.length - 1 && (
                  <div className="absolute -right-4 top-8 hidden text-accent lg:block">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button href="/contact" size="lg">
            Start Your Discovery Call
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
