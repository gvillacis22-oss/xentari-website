"use client";

import { ArrowRight, Calendar } from "lucide-react";

export function FinalCTAV3() {
  return (
    <section className="bg-[#0F0F11] py-20 md:py-28 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255, 107, 53, 0.1) 0%, transparent 60%)",
        }}
      />

      {/* Border accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B35]/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Take Control of Your Money?
          </h2>

          {/* Subtext */}
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Stop guessing. Start building a financial system that works for you.
            Book a free consultation and see what's possible.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA */}
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-semibold rounded-xl transition-all duration-300 text-lg shadow-lg shadow-[#FF6B35]/20 hover:shadow-[#FF6B35]/30"
            >
              <Calendar className="w-5 h-5" />
              Book a Consultation
            </a>

            {/* Secondary CTA */}
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-[#FF6B35]/30 hover:border-[#FF6B35]/60 text-white font-semibold rounded-xl transition-all duration-300 text-lg hover:bg-white/10"
            >
              Get Free Money Audit
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Trust note */}
          <p className="text-gray-500 text-sm mt-8">
            No pressure. No obligation. Just honest advice.
          </p>
        </div>
      </div>
    </section>
  );
}
