"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { trustStats } from "@/lib/constants";

interface AnimatedCounterProps {
  target: string;
  duration?: number;
  isInView: boolean;
}

function AnimatedCounter({
  target,
  duration = 2000,
  isInView,
}: AnimatedCounterProps) {
  const [count, setCount] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      animateValue();
    }
  }, [isInView, hasAnimated]);

  const animateValue = () => {
    const numericMatch = target.match(/^([\d.]+)/);
    const suffix = target.replace(/^[\d.]+/, "");

    if (!numericMatch) {
      setCount(target);
      return;
    }

    const endValue = parseFloat(numericMatch[1]);
    const isDecimal = target.includes(".");
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = endValue * easeOut;

      if (isDecimal) {
        setCount(currentValue.toFixed(1) + suffix);
      } else {
        setCount(Math.floor(currentValue).toString() + suffix);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  };

  return <span>{count}</span>;
}

export function TrustBarV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background-surface" />

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-background-card border border-white/[0.06] rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {trustStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter target={stat.value} isInView={isInView} />
                </div>
                <div className="text-text-secondary text-sm uppercase tracking-wider">
                  {stat.label}
                </div>

                {/* Divider for desktop (not on last item) */}
                {index < trustStats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/[0.08]" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
