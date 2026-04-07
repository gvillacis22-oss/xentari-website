"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CalculatorCTAV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="bg-[#0A0A0B] py-16 md:py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center mx-auto mb-6">
            <Calculator className="w-8 h-8 text-[#FF6B35]" />
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Retirement Calculator
          </h2>

          {/* Description */}
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Estimate your future and see what it may take to reach your goals.
          </p>

          {/* CTA Button */}
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-semibold rounded-xl transition-all duration-300 border border-[#FF6B35] hover:border-[#E55A2B]"
          >
            Open Calculator
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
