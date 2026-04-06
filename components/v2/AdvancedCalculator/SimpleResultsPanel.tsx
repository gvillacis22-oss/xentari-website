"use client";

import { motion } from "framer-motion";
import { TrendingUp, PiggyBank, Sparkles, DollarSign } from "lucide-react";
import { CalculatorResults } from "./types";
import { formatCurrency, formatCompactCurrency } from "@/lib/calculatorUtils";

interface SimpleResultsPanelProps {
  results: CalculatorResults;
  yearsToRetirement: number;
}

export function SimpleResultsPanel({ results, yearsToRetirement }: SimpleResultsPanelProps) {
  const {
    projectedBalance,
    totalContributions,
    totalGrowth,
    projectedMonthlyIncome,
  } = results;

  return (
    <div className="space-y-5">
      {/* Main Projected Value */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 text-accent/80 text-sm mb-2">
          <Sparkles className="w-4 h-4" />
          Projected Retirement Balance
        </div>
        <div className="text-4xl md:text-5xl font-bold text-white mb-3">
          {formatCompactCurrency(projectedBalance)}
        </div>
        <p className="text-text-secondary text-sm">
          After {yearsToRetirement} years of saving and growth
        </p>
      </motion.div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Contributions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-background-surface border border-white/[0.06] rounded-xl p-5"
        >
          <div className="flex items-center gap-2 text-text-muted text-sm mb-2">
            <PiggyBank className="w-4 h-4" />
            Your Contributions
          </div>
          <div className="text-xl font-bold text-white">
            {formatCompactCurrency(totalContributions)}
          </div>
          <div className="text-xs text-text-muted mt-1">
            What you put in
          </div>
        </motion.div>

        {/* Investment Growth */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-background-surface border border-white/[0.06] rounded-xl p-5"
        >
          <div className="flex items-center gap-2 text-text-muted text-sm mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            Investment Growth
          </div>
          <div className="text-xl font-bold text-green-400">
            +{formatCompactCurrency(totalGrowth)}
          </div>
          <div className="text-xs text-text-muted mt-1">
            Compound interest earned
          </div>
        </motion.div>
      </div>

      {/* Monthly Income Estimate */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-background-surface border border-white/[0.06] rounded-xl p-5"
      >
        <div className="flex items-center gap-2 text-text-muted text-sm mb-3">
          <DollarSign className="w-4 h-4" />
          Estimated Monthly Income in Retirement
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">
            {formatCurrency(projectedMonthlyIncome)}
          </span>
          <span className="text-text-muted text-sm">/month</span>
        </div>
        <p className="text-xs text-text-muted mt-2">
          Based on the 4% safe withdrawal rule
        </p>
      </motion.div>

      {/* Growth Breakdown Visual */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-background-surface border border-white/[0.06] rounded-xl p-5"
      >
        <h4 className="text-sm text-text-muted uppercase tracking-wider mb-4">
          How Your Money Grows
        </h4>

        {/* Stacked bar visualization */}
        <div className="h-8 rounded-full overflow-hidden flex bg-background-elevated mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(totalContributions / projectedBalance) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-accent/60 h-full"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(totalGrowth / projectedBalance) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="bg-green-500 h-full"
          />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent/60" />
            <span className="text-text-secondary">
              Contributions ({Math.round((totalContributions / projectedBalance) * 100)}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-text-secondary">
              Growth ({Math.round((totalGrowth / projectedBalance) * 100)}%)
            </span>
          </div>
        </div>
      </motion.div>

      {/* Power of Starting Early */}
      {yearsToRetirement > 20 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
        >
          <p className="text-sm text-green-400">
            <strong>Time is your ally.</strong> With {yearsToRetirement} years to grow,
            compound interest can turn your contributions into{" "}
            {((projectedBalance / totalContributions) || 1).toFixed(1)}x their original value.
          </p>
        </motion.div>
      )}
    </div>
  );
}
