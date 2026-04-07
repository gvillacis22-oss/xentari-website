"use client";

import { ArrowRight, Calendar } from "lucide-react";

export function HeroV3() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Dark background with strong contrast */}
      <div className="absolute inset-0 bg-[#0A0A0B]" />

      {/* Subtle gradient overlay - darker, less fade */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(255, 107, 53, 0.08) 0%, transparent 60%)",
        }}
      />

      {/* Grid pattern - subtle */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline - strong contrast */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Stop Overpaying.
            <br />
            <span className="text-[#FF6B35]">Start Building Real Wealth.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            We help individuals, families, and business owners take control of their money
            through smarter health, life, and tax strategies.
          </p>

          {/* CTA Buttons - large and mobile-friendly */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA */}
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-semibold rounded-xl transition-all duration-300 text-lg shadow-lg shadow-[#FF6B35]/20 hover:shadow-[#FF6B35]/30"
            >
              Get Your Free Money Audit
              <ArrowRight className="w-5 h-5" />
            </a>

            {/* Secondary CTA */}
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/20 hover:border-[#FF6B35]/50 text-white font-semibold rounded-xl transition-all duration-300 text-lg hover:bg-white/5"
            >
              <Calendar className="w-5 h-5" />
              Book a Consultation
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0B] to-transparent" />
    </section>
  );
}
