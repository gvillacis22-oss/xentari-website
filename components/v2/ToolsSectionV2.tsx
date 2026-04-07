"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calculator, Shield, PiggyBank, ArrowRight } from "lucide-react";

const tools = [
  {
    icon: Calculator,
    title: "Retirement Calculator",
    description: "See how your savings could grow over time",
    href: "/calculator",
  },
  {
    icon: Shield,
    title: "Coverage Tool",
    description: "Find out if you have the right protection",
    href: "#",
  },
  {
    icon: PiggyBank,
    title: "Tax Savings Tool",
    description: "Discover potential tax optimization strategies",
    href: "#",
  },
];

export function ToolsSectionV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="bg-[#0F0F11] py-20 md:py-28 border-y border-white/[0.06]">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See What Your Future Could Look Like
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Use our interactive tools to explore your financial possibilities
          </p>
        </motion.div>

        {/* Tools grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.a
                key={index}
                href={tool.href}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-[#0A0A0B] border border-[#FF6B35]/20 rounded-2xl p-6 hover:border-[#FF6B35]/40 transition-all duration-300 text-center"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF6B35]/20 transition-colors">
                  <Icon className="w-7 h-7 text-[#FF6B35]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm">
                  {tool.description}
                </p>
              </motion.a>
            );
          })}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/calculator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-semibold rounded-xl transition-all duration-300"
          >
            Try the Calculator
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-[#FF6B35]/50 text-white font-medium rounded-xl transition-all duration-300 hover:bg-white/5"
          >
            Get Help Understanding Your Results
          </a>
        </motion.div>
      </div>
    </section>
  );
}
