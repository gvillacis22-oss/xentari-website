"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Shield, Building2, BarChart3, ArrowRight, Check } from "lucide-react";
import { services } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  building: Building2,
  chart: BarChart3,
};

export function ServicesV2() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Layer 1: Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-subtle/30 to-background" />

      {/* Layer 2: Ambient glows */}
      <motion.div
        className="absolute top-1/4 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 53, 0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Layer 3: Noise texture */}
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
            Our Services
          </span>
          <h2 className="text-display-mobile md:text-display font-bold text-white mb-4">
            Comprehensive Financial Solutions
          </h2>
          <p className="text-text-secondary text-lg">
            From health coverage to tax optimization, we provide integrated
            strategies that work together to protect and grow your wealth.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            const isActive = activeService === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.15 }}
                className={cn(
                  "group relative rounded-2xl border transition-all duration-500 overflow-hidden",
                  isActive
                    ? "border-accent bg-accent/5 scale-[1.02]"
                    : "border-border bg-background-card/80 backdrop-blur-sm hover:border-accent/50"
                )}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                {/* Card glow effect */}
                <motion.div
                  className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(255,107,53,0.15), transparent 70%)",
                    filter: "blur(20px)",
                  }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                  }}
                />

                {/* Gradient overlay on hover */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent transition-opacity duration-500",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />

                <div className="relative p-8">
                  {/* Icon */}
                  <motion.div
                    className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300",
                      isActive
                        ? "bg-accent text-white"
                        : "bg-accent/10 text-accent group-hover:bg-accent/20"
                    )}
                    animate={
                      isActive
                        ? {
                            boxShadow: [
                              "0 0 20px rgba(255, 107, 53, 0.4)",
                              "0 0 30px rgba(255, 107, 53, 0.6)",
                              "0 0 20px rgba(255, 107, 53, 0.4)",
                            ],
                          }
                        : { boxShadow: "0 0 0px rgba(255, 107, 53, 0)" }
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Icon className="w-7 h-7" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -10 }
                        }
                        transition={{
                          duration: 0.4,
                          delay: 0.3 + index * 0.1 + featureIndex * 0.05,
                        }}
                      >
                        <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Link */}
                  <Link
                    href={service.href}
                    className={cn(
                      "inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300",
                      isActive
                        ? "text-accent"
                        : "text-text-secondary group-hover:text-accent"
                    )}
                  >
                    Learn More
                    <ArrowRight
                      className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        isActive ? "translate-x-1" : "group-hover:translate-x-1"
                      )}
                    />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-text-muted mb-4">
            Not sure which service is right for you?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors font-semibold"
          >
            Let's discuss your needs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
