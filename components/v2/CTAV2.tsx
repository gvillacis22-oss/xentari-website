"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle, Phone, Mail, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/lib/constants";
import { cn } from "@/lib/utils";

const benefits = [
  "Free 30-minute strategy session",
  "No-obligation policy review",
  "Personalized recommendations",
  "Independent, unbiased advice",
];

export function CTAV2() {
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Reduced mouse tracking - smoother, more subtle
  const mouseX = useSpring(50, { damping: 50, stiffness: 30 });
  const mouseY = useSpring(50, { damping: 50, stiffness: 30 });

  const glowLeft = useTransform(mouseX, (v) => `calc(${v}% - 200px)`);
  const glowTop = useTransform(mouseY, (v) => `calc(${v}% - 200px)`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Layer 1: Enhanced base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#060606] to-background-subtle" />

      {/* Layer 2: Large centered glow - opacity only, no movement */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] rounded-full pointer-events-none"
        animate={{
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse, rgba(255, 107, 53, 0.12) 0%, transparent 55%)",
          filter: "blur(100px)",
        }}
      />

      {/* Layer 3: Corner glows - STATIC, opacity only */}
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
        animate={{
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        className="absolute top-1/4 right-0 w-48 h-48 rounded-full pointer-events-none"
        animate={{
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative bg-background-card/30 backdrop-blur-2xl border border-white/[0.06] rounded-3xl overflow-hidden"
            style={{
              boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.5)",
            }}
            onMouseMove={handleMouseMove}
          >
            {/* Mouse-following glow inside card - subtle */}
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{
                left: glowLeft,
                top: glowTop,
                background:
                  "radial-gradient(circle, rgba(255, 107, 53, 0.05) 0%, transparent 55%)",
                filter: "blur(60px)",
              }}
            />

            {/* Top accent line - static glow */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255, 107, 53, 0.5) 50%, transparent 100%)",
              }}
            />

            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Copy */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  <h2 className="text-display-mobile md:text-display font-bold text-white mb-4">
                    Ready to Take Control of Your Financial Future?
                  </h2>
                  <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                    Join hundreds of clients who've secured better coverage,
                    optimized their taxes, and built lasting wealth with our
                    guidance.
                  </p>

                  {/* Benefits list - simplified hover effects */}
                  <ul className="space-y-4 mb-8">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                        className={cn(
                          "flex items-center gap-3 transition-all duration-200",
                          hoveredBenefit === index
                            ? "translate-x-1"
                            : "translate-x-0"
                        )}
                        onMouseEnter={() => setHoveredBenefit(index)}
                        onMouseLeave={() => setHoveredBenefit(null)}
                      >
                        <CheckCircle
                          className={cn(
                            "w-5 h-5 flex-shrink-0 transition-colors duration-200",
                            hoveredBenefit === index
                              ? "text-accent"
                              : "text-green-500"
                          )}
                        />
                        <span className="text-text-secondary">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Primary CTA - simplified glow */}
                  <div className="relative inline-block group">
                    <div className="absolute -inset-1 bg-accent/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Button
                      href="/contact"
                      size="lg"
                      className="relative w-full sm:w-auto"
                    >
                      Book Your Free Consultation
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>

                {/* Right side - Contact options */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="space-y-4"
                >
                  {/* Quick contact card */}
                  <div
                    className="bg-background-elevated/50 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.06]"
                    style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)" }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Prefer to reach out directly?
                    </h3>

                    <div className="space-y-4">
                      {/* Phone */}
                      <a
                        href={contactInfo.phoneHref}
                        className="flex items-center gap-4 p-4 rounded-xl bg-background-card/50 border border-white/[0.05] hover:border-accent/30 transition-all duration-300 group"
                      >
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                          <Phone className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <div className="text-xs text-text-muted uppercase tracking-wider">
                            Call Us
                          </div>
                          <div className="text-white font-medium">
                            {contactInfo.phone}
                          </div>
                        </div>
                      </a>

                      {/* Email */}
                      <a
                        href={contactInfo.emailHref}
                        className="flex items-center gap-4 p-4 rounded-xl bg-background-card/50 border border-white/[0.05] hover:border-accent/30 transition-all duration-300 group"
                      >
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                          <Mail className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <div className="text-xs text-text-muted uppercase tracking-wider">
                            Email Us
                          </div>
                          <div className="text-white font-medium">
                            {contactInfo.email}
                          </div>
                        </div>
                      </a>

                      {/* Schedule - static, no border animation */}
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/5 border border-accent/15">
                        <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <div className="text-xs text-accent uppercase tracking-wider">
                            Response Time
                          </div>
                          <div className="text-white font-medium">
                            Usually within 24 hours
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Financial Snapshot Link */}
                  <Link
                    href="/financial-snapshot"
                    target="_blank"
                    className="flex items-center justify-between p-4 rounded-xl bg-background-card/50 border border-white/[0.05] hover:border-accent/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                        <FileText className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          Open Financial Snapshot
                        </div>
                        <div className="text-xs text-text-muted">
                          Organize your financial picture
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>

                  {/* Trust message */}
                  <p className="text-center text-text-muted text-sm mt-4">
                    Serving clients in {contactInfo.location} and beyond
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Bottom trust indicators - simplified, no pulsing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-8 mt-12 text-text-muted text-sm"
          >
            {["Licensed & Insured", "Independent Advisor", "Client-First Always"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>{item}</span>
                </div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
