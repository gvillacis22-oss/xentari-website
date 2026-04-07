"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, Users, Shield } from "lucide-react";

const trustItems = [
  {
    icon: MapPin,
    text: "Licensed in 38 States",
  },
  {
    icon: Clock,
    text: "6+ Years Experience",
  },
  {
    icon: Users,
    text: "Helping Families & Business Owners Nationwide",
  },
  {
    icon: Shield,
    text: "Trusted Financial Guidance",
  },
];

export function TrustBarV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

  return (
    <section
      ref={sectionRef}
      id="trust-bar"
      className="bg-[#0F0F11] border-y border-white/[0.06] py-6"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-12"
        >
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-2 text-gray-400"
              >
                <Icon className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-sm font-medium whitespace-nowrap">{item.text}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
