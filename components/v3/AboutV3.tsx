"use client";

import { CheckCircle } from "lucide-react";

const highlights = [
  "Independent advice — not tied to any single carrier",
  "Licensed in 38 states to serve you wherever you are",
  "Real strategies, not cookie-cutter solutions",
  "Focused on long-term results, not quick sales",
];

export function AboutV3() {
  return (
    <section className="bg-[#0A0A0B] py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image placeholder */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Image placeholder */}
              <div className="aspect-[4/5] bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 rounded-full bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl text-[#FF6B35]">X</span>
                    </div>
                    <p className="text-sm text-gray-500">Professional Photo</p>
                  </div>
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-[#FF6B35]/20 rounded-2xl -z-10" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-[#FF6B35] text-sm font-medium uppercase tracking-wider mb-3">
              About Xentari
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Financial Guidance That Actually Works
            </h2>

            <div className="space-y-4 text-gray-400 leading-relaxed mb-8">
              <p>
                I started Xentari because I saw too many people confused by their finances —
                overpaying for coverage they didn't need, missing out on tax strategies they
                didn't know existed, and feeling stuck without a clear path forward.
              </p>
              <p>
                My approach is different. I take the time to understand your full picture —
                your income, your goals, your concerns. Then I build a strategy that actually
                makes sense for <em>your</em> life.
              </p>
              <p className="text-white font-medium border-l-2 border-[#FF6B35] pl-4">
                "I don't just help you buy policies — I help you build a financial system
                that actually works."
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
