"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wallet, Shield, TrendingUp, Calculator } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Wallet,
    title: "Fix Cash Flow",
    description: "Get control of where your money goes",
  },
  {
    number: "02",
    icon: Shield,
    title: "Protect Your Income",
    description: "Shield what you've built from unexpected events",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Build Wealth Strategically",
    description: "Grow your assets with purpose and clarity",
  },
  {
    number: "04",
    icon: Calculator,
    title: "Optimize Taxes & Growth",
    description: "Keep more of what you earn legally",
  },
];

export function MoneySystemV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="bg-[#0A0A0B] py-20 md:py-28">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[#FF6B35] text-sm font-medium uppercase tracking-wider mb-3">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The Xentari Money System
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A proven framework to transform your financial life
          </p>
        </motion.div>

        {/* 4-step horizontal layout (stacks on mobile) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector line (hidden on mobile, shown on lg) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[2px] bg-gradient-to-r from-[#FF6B35]/30 to-transparent" />
                )}

                <div className="bg-[#111113] border border-[#FF6B35]/20 rounded-2xl p-6 h-full hover:border-[#FF6B35]/40 transition-all duration-300">
                  {/* Step number + Icon row */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[#FF6B35] text-2xl font-bold opacity-60">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#FF6B35]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
