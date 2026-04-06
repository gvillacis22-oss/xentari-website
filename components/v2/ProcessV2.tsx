"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Lightbulb, HeartHandshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { processSteps } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<number, React.ElementType> = {
  1: Phone,
  2: Lightbulb,
  3: HeartHandshake,
};

export function ProcessV2() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Layer 1: Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-subtle/50 via-background-subtle to-background" />

      {/* Layer 2: Ambient glows */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        animate={{
          opacity: [0.2, 0.35, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 53, 0.06) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* Layer 3: Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 80%)",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-4 block">
            How It Works
          </span>
          <h2 className="text-display-mobile md:text-display font-bold text-white mb-4">
            Simple. Strategic. Supportive.
          </h2>
          <p className="text-text-secondary text-lg">
            A straightforward process that puts you in control while we handle
            the complexity.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connection line (desktop) */}
            <motion.div
              className="hidden lg:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 z-0"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255, 107, 53, 0.3) 20%, rgba(255, 107, 53, 0.3) 80%, transparent 100%)",
              }}
            />

            <div className="grid lg:grid-cols-3 gap-8 relative z-10">
              {processSteps.map((step, index) => {
                const Icon = iconMap[step.step];
                const isActive = activeStep === index;

                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                    className="relative"
                    onMouseEnter={() => setActiveStep(index)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    {/* Arrow between steps (desktop) */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20">
                        <motion.div
                          animate={{
                            x: isActive || activeStep === index + 1 ? [0, 4, 0] : 0,
                          }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ArrowRight
                            className={cn(
                              "w-5 h-5 transition-colors duration-300",
                              isActive || activeStep === index + 1
                                ? "text-accent"
                                : "text-text-muted"
                            )}
                          />
                        </motion.div>
                      </div>
                    )}

                    <motion.div
                      className={cn(
                        "relative bg-background-card/80 backdrop-blur-sm border rounded-2xl p-8 text-center transition-all duration-300 h-full overflow-hidden",
                        isActive
                          ? "border-accent"
                          : "border-border hover:border-accent/50"
                      )}
                      animate={
                        isActive
                          ? {
                              scale: 1.02,
                              boxShadow: "0 0 30px rgba(255, 107, 53, 0.15)",
                            }
                          : {
                              scale: 1,
                              boxShadow: "0 0 0px rgba(255, 107, 53, 0)",
                            }
                      }
                    >
                      {/* Inner glow on active */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none"
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Step number and icon */}
                      <div className="relative w-20 h-20 mx-auto mb-6">
                        {/* Outer ring */}
                        <motion.div
                          className={cn(
                            "absolute inset-0 rounded-full border-2 transition-colors duration-300",
                            isActive ? "border-accent" : "border-border"
                          )}
                          animate={
                            isActive
                              ? {
                                  boxShadow: [
                                    "0 0 0 0 rgba(255, 107, 53, 0.2)",
                                    "0 0 0 8px rgba(255, 107, 53, 0)",
                                  ],
                                }
                              : {}
                          }
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />

                        {/* Inner circle with icon */}
                        <motion.div
                          className={cn(
                            "absolute inset-2 rounded-full flex items-center justify-center transition-all duration-300",
                            isActive
                              ? "bg-accent text-white"
                              : "bg-background-elevated text-accent"
                          )}
                          animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Icon className="w-8 h-8" />
                        </motion.div>

                        {/* Step number badge */}
                        <motion.div
                          className={cn(
                            "absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                            isActive
                              ? "bg-white text-background"
                              : "bg-accent/20 text-accent"
                          )}
                          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          {step.step}
                        </motion.div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-white mb-3 relative">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed relative">
                        {step.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="relative inline-block group">
            {/* Button glow */}
            <div className="absolute -inset-1 bg-accent/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Button href="/contact" size="lg" className="relative group">
              Start with Step 1 Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <p className="text-text-muted text-sm mt-4">
            Free consultation, no commitment required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
