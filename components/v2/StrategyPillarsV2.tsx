"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, TrendingUp, Zap, ArrowDown } from "lucide-react";

const pillars = [
  {
    id: "protect",
    title: "Protect",
    icon: Shield,
    tagline: "Secure your foundation",
    description:
      "Strategic health, life, and coverage planning designed to shield what matters most—without overpaying or being underinsured.",
    highlights: [
      "Health coverage strategy",
      "Life & income protection",
      "Risk-aware planning",
    ],
  },
  {
    id: "optimize",
    title: "Optimize",
    icon: Zap,
    tagline: "Maximize every dollar",
    description:
      "Tax-aware structuring, cash-flow efficiency, and strategic opportunities that put more of your money to work.",
    highlights: [
      "Tax-efficient strategies",
      "Cash-flow optimization",
      "Structural opportunities",
    ],
  },
  {
    id: "grow",
    title: "Grow",
    icon: TrendingUp,
    tagline: "Build lasting wealth",
    description:
      "Long-term wealth building, retirement positioning, and financial momentum that compounds over time.",
    highlights: [
      "Wealth accumulation",
      "Retirement positioning",
      "Financial momentum",
    ],
  },
];

export function StrategyPillarsV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const scrollToServices = () => {
    const services = document.getElementById("services-detail");
    if (services) {
      services.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="strategy-pillars"
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-accent/80 text-sm font-medium uppercase tracking-[0.2em] mb-6"
          >
            Our Approach
          </motion.span>
          <h2 className="text-display-mobile md:text-display font-bold text-white mb-6">
            A Smarter Financial Framework
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Three strategic pillars working together to create clarity,
            efficiency, and lasting financial strength.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 mb-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + index * 0.12,
                  ease: "easeOut",
                }}
                className="group relative"
              >
                {/* Card */}
                <div
                  className="relative h-full bg-background-card border border-white/[0.06] rounded-2xl p-8 transition-all duration-300 hover:border-white/[0.12]"
                >

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {pillar.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-accent/80 text-sm font-medium mb-4">
                    {pillar.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    {pillar.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-center gap-3 text-sm text-text-muted"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <a
            href="#services-detail"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.08] bg-background-card hover:border-accent/30 hover:bg-background-elevated transition-all duration-300 text-text-secondary hover:text-white"
          >
            Explore Strategy Areas
            <ArrowDown className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
