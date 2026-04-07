"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Briefcase, TrendingUp, Clock } from "lucide-react";

const audiences = [
  {
    icon: Users,
    title: "Individuals & Families",
    description: "Struggling with rising costs and coverage confusion",
  },
  {
    icon: Briefcase,
    title: "Business Owners",
    description: "Looking to protect income and offer better benefits",
  },
  {
    icon: TrendingUp,
    title: "High-Income Earners",
    description: "Wanting to reduce taxes and grow wealth",
  },
  {
    icon: Clock,
    title: "Pre-Retirees",
    description: "Planning for security and long-term income",
  },
];

export function WhoWeHelpV2() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Who We Help
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We work with people at every stage of their financial journey
          </p>
        </motion.div>

        {/* 4-card grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-[#111113] border border-[#FF6B35]/20 rounded-2xl p-6 hover:border-[#FF6B35]/40 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center mb-5 group-hover:bg-[#FF6B35]/20 transition-colors">
                  <Icon className="w-6 h-6 text-[#FF6B35]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                  {item.description}
                </p>

                {/* Learn More button */}
                <button className="text-[#FF6B35] text-sm font-medium hover:text-[#FF8B5A] transition-colors">
                  Learn More →
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
