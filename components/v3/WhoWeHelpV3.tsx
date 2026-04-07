"use client";

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

export function WhoWeHelpV3() {
  return (
    <section className="bg-[#0A0A0B] py-20 md:py-28">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Who We Help
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We work with people at every stage of their financial journey
          </p>
        </div>

        {/* 4-card grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group bg-[#111113] border border-white/[0.06] rounded-2xl p-6 hover:border-[#FF6B35]/30 transition-all duration-300"
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
