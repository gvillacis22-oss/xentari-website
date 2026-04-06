"use client";

import { motion } from "framer-motion";
import { FileText, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { FinancialSnapshotForm } from "@/components/financial-snapshot";

export function FinancialSnapshotClient() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background layers */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#020202] via-[#050505] to-background -z-10" />

      {/* Subtle ambient glow */}
      <motion.div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full pointer-events-none -z-10"
        animate={{ opacity: [0.04, 0.06, 0.04] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse, rgba(255, 107, 53, 0.08) 0%, transparent 60%)",
          filter: "blur(120px)",
        }}
      />

      {/* Noise texture */}
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />

      {/* Content */}
      <div className="container-custom py-24 md:py-32">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/v2"
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <span className="text-accent/80 text-sm font-medium uppercase tracking-wider">
              Financial Worksheet
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Financial Snapshot
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            A guided worksheet to help you organize your financial picture.
            Understand your income, expenses, assets, and goals—all in one place.
          </p>
          <div className="mt-6 flex items-start gap-2 p-4 bg-accent/5 border border-accent/15 rounded-xl">
            <ExternalLink className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-sm text-text-muted">
              This worksheet is for planning and educational purposes only. No data
              is stored or transmitted. Information entered here does not constitute
              financial, tax, or legal advice.
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <FinancialSnapshotForm />
      </div>
    </div>
  );
}
