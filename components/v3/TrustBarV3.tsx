"use client";

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

export function TrustBarV3() {
  return (
    <section className="bg-[#0F0F11] border-y border-white/[0.06] py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-400"
              >
                <Icon className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-sm font-medium whitespace-nowrap">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
