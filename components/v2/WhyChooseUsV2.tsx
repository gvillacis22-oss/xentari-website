"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Award, Layers, Handshake, ArrowRight } from "lucide-react";
import Link from "next/link";
import { features } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  award: Award,
  layers: Layers,
  handshake: Handshake,
};

export function WhyChooseUsV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Layer 1: Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background-subtle/30" />

      {/* Layer 2: Decorative glows */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 53, 0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
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
            Why Choose Us
          </span>
          <h2 className="text-display-mobile md:text-display font-bold text-white mb-4">
            The Xentari Difference
          </h2>
          <p className="text-text-secondary text-lg">
            We combine deep expertise, genuine care, and a commitment to your
            long-term success.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="group relative bg-background-card/80 backdrop-blur-sm border border-[#FF6B35]/20 rounded-2xl p-8 overflow-hidden hover:border-[#FF6B35]/40 transition-all duration-300"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                {/* Glow on hover */}
                <div className="absolute -inset-px bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-2xl" />

                <div className="relative">
                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Icon className="w-6 h-6 text-accent" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl pointer-events-none">
                  <motion.div
                    className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-accent/30 to-transparent"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />
                  <motion.div
                    className="absolute top-0 right-0 w-16 h-px bg-gradient-to-l from-accent/30 to-transparent"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5 + 0.5,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg text-white hover:border-accent hover:text-accent transition-all duration-300 group backdrop-blur-sm"
          >
            Learn More About Our Approach
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
