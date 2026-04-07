"use client";

import { useRef, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the 3D globe to prevent SSR issues
const HolographicGlobe = dynamic(
  () => import("./HolographicGlobe").then((mod) => ({ default: mod.HolographicGlobe })),
  {
    ssr: false,
    loading: () => null,
  }
);

export function HeroV2() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, 30]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* === LAYERED BACKGROUND SYSTEM === */}

      {/* Layer 1: Base - near black */}
      <div className="absolute inset-0 bg-[#050507]" />

      {/* Layer 2: Radial gradient - darker edges, lighter center-right */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 70% at 60% 50%,
              #16161A 0%,
              #111113 30%,
              #0A0A0C 60%,
              #050507 100%
            )
          `,
        }}
      />

      {/* Layer 3: Secondary depth gradient - top to bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(22, 22, 26, 0.4) 0%,
              transparent 40%,
              transparent 60%,
              rgba(5, 5, 7, 0.6) 100%
            )
          `,
        }}
      />

      {/* === GLOBE GLOW LAYERS === */}

      {/* Glow Layer 1: Large soft orange ambient glow - behind globe */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "55%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "900px",
          background: "radial-gradient(circle, rgba(255, 107, 53, 0.12) 0%, rgba(255, 107, 53, 0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Glow Layer 2: Focused orange core glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "45%",
          left: "58%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255, 107, 53, 0.18) 0%, rgba(255, 107, 53, 0.06) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Glow Layer 3: Subtle white/neutral highlight for sphere definition */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "42%",
          left: "60%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 60%)",
          filter: "blur(30px)",
        }}
      />

      {/* Glow Layer 4: Very subtle edge highlight */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "48%",
          left: "62%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255, 140, 90, 0.08) 0%, transparent 50%)",
          filter: "blur(50px)",
        }}
      />

      {/* === 3D GLOBE === */}
      <Suspense fallback={null}>
        <HolographicGlobe />
      </Suspense>

      {/* === ATMOSPHERE OVERLAYS === */}

      {/* Top vignette - subtle darkening */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(5, 5, 7, 0.3) 0%, transparent 30%)",
        }}
      />

      {/* Grid pattern - very subtle */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* === CONTENT === */}
      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ y: contentY, opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline - strong contrast */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
          >
            Stop Overpaying.
            <br />
            <span className="text-[#FF6B35]">Start Building Real Wealth.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We help individuals, families, and business owners take control of their money
            through smarter health, life, and tax strategies.
          </motion.p>

          {/* CTA Buttons - large and mobile-friendly */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary CTA */}
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-semibold rounded-xl transition-all duration-300 text-lg shadow-lg shadow-[#FF6B35]/25 hover:shadow-[#FF6B35]/40"
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
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#trust-bar"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-[#FF6B35] transition-colors duration-300"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.a>

      {/* Bottom fade - matches new darker base */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050507] via-[#050507]/80 to-transparent" />
    </section>
  );
}
