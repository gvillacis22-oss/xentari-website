"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Heart,
  Building2,
  Briefcase,
  PiggyBank,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const strategyAreas = [
  {
    id: "protect",
    category: "Protect",
    icon: Shield,
    title: "Coverage & Protection Strategy",
    description:
      "Comprehensive protection planning that shields your income, health, and family without overpaying for coverage you don't need.",
    items: [
      {
        icon: Heart,
        title: "Health Coverage",
        description: "Individual, family, and marketplace plans optimized for your situation",
      },
      {
        icon: Shield,
        title: "Life & Disability",
        description: "Income protection and family security strategies",
      },
      {
        icon: Building2,
        title: "Business Coverage",
        description: "Group benefits and key-person protection for business owners",
      },
    ],
  },
  {
    id: "optimize",
    category: "Optimize",
    icon: Briefcase,
    title: "Tax & Cash Flow Strategy",
    description:
      "Strategic structuring that keeps more money in your pocket through tax-efficient planning and cash flow optimization.",
    items: [
      {
        icon: Briefcase,
        title: "Tax-Efficient Structures",
        description: "Entity selection, retirement contributions, and deduction strategies",
      },
      {
        icon: PiggyBank,
        title: "Cash Flow Management",
        description: "Expense optimization and income allocation planning",
      },
      {
        icon: CheckCircle,
        title: "Compliance & Planning",
        description: "Year-round tax planning, not just preparation",
      },
    ],
  },
  {
    id: "grow",
    category: "Grow",
    icon: TrendingUp,
    title: "Wealth Building Strategy",
    description:
      "Long-term wealth accumulation through disciplined investing, retirement positioning, and compound growth strategies.",
    items: [
      {
        icon: TrendingUp,
        title: "Investment Planning",
        description: "Asset allocation and portfolio strategy guidance",
      },
      {
        icon: PiggyBank,
        title: "Retirement Positioning",
        description: "401(k), IRA, and business retirement plan optimization",
      },
      {
        icon: Building2,
        title: "Business Wealth",
        description: "Business valuation, exit planning, and succession strategies",
      },
    ],
  },
];

export function ServicesDetailV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="services-detail"
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background-surface" />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent/80 text-sm font-medium uppercase tracking-[0.2em] mb-4 block">
            Strategy Areas
          </span>
          <h2 className="text-display-mobile md:text-display font-bold text-white mb-4">
            How We Restructure the Financial Picture
          </h2>
          <p className="text-text-secondary text-lg">
            A deeper look at the strategic areas where we help clients build
            clarity, efficiency, and lasting financial strength.
          </p>
        </motion.div>

        {/* Strategy areas */}
        <div className="space-y-8">
          {strategyAreas.map((area, areaIndex) => {
            const AreaIcon = area.icon;

            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + areaIndex * 0.1 }}
                className="bg-background-card border border-white/[0.06] rounded-2xl overflow-hidden"
              >
                {/* Area header */}
                <div className="p-6 md:p-8 border-b border-white/[0.06]">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <AreaIcon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="text-accent/70 text-xs font-medium uppercase tracking-wider mb-1">
                        {area.category}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {area.title}
                      </h3>
                      <p className="text-text-secondary">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Area items */}
                <div className="p-6 md:p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    {area.items.map((item, itemIndex) => {
                      const ItemIcon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="p-5 bg-background-elevated/50 rounded-xl border border-white/[0.04]"
                        >
                          <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center mb-4">
                            <ItemIcon className="w-5 h-5 text-text-secondary" />
                          </div>
                          <h4 className="text-white font-semibold mb-2">
                            {item.title}
                          </h4>
                          <p className="text-text-muted text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
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
          <p className="text-text-muted mb-4">
            Ready to explore how these strategies apply to your situation?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors font-semibold"
          >
            Schedule a strategy session
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
