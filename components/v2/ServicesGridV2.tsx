"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Shield, Briefcase, FileText, Clock } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Health Insurance",
    description: "Affordable coverage that actually fits your needs",
  },
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Protect your family's future and build cash value",
  },
  {
    icon: Briefcase,
    title: "Business Benefits",
    description: "Attract talent and protect your business income",
  },
  {
    icon: FileText,
    title: "Tax Structuring",
    description: "Legal strategies to minimize your tax burden",
  },
  {
    icon: Clock,
    title: "Medicare & Retirement",
    description: "Plan for a secure and comfortable retirement",
  },
];

export function ServicesGridV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="bg-[#0F0F11] py-20 md:py-28">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive financial solutions tailored to your goals
          </p>
        </motion.div>

        {/* 5-card grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-[#0A0A0B] border border-[#FF6B35]/20 rounded-2xl p-6 hover:border-[#FF6B35]/40 transition-all duration-300 cursor-pointer"
              >
                {/* Icon with orange accent border on hover */}
                <div className="w-11 h-11 rounded-lg bg-[#FF6B35]/10 border border-transparent group-hover:border-[#FF6B35]/30 flex items-center justify-center mb-4 transition-all">
                  <Icon className="w-5 h-5 text-[#FF6B35]" />
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-white mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
