"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { CalculatorResults, MilestoneData, AdvancedMode, TargetType } from "./types";
import { formatCurrency, formatCompactCurrency, formatPercent } from "@/lib/calculatorUtils";
import { cn } from "@/lib/utils";

interface ResultsPanelProps {
  mode: AdvancedMode;
  results: CalculatorResults;
  milestones: MilestoneData[];
  yearsToRetirement: number;
  targetType: TargetType;
}

export function ResultsPanel({ mode, results, milestones, yearsToRetirement, targetType }: ResultsPanelProps) {
  const {
    projectedBalance,
    projectedBalanceInflationAdjusted,
    targetBalance,
    gap,
    isOnTrack,
    progressPercent,
    totalContributions,
    totalGrowth,
    requiredMonthly,
    additionalMonthlyNeeded,
    additionalYearsNeeded,
    requiredReturnRate,
    projectedMonthlyIncome,
  } = results;

  return (
    <div className="space-y-6">
      {/* Main Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Projected Value */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background-surface border border-white/[0.06] rounded-xl p-5"
        >
          <div className="flex items-center gap-2 text-text-muted text-sm mb-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            Projected Value
          </div>
          <div className="text-2xl font-bold text-white">
            {formatCompactCurrency(projectedBalance)}
          </div>
          {projectedBalanceInflationAdjusted > 0 && projectedBalanceInflationAdjusted !== projectedBalance && (
            <div className="text-xs text-text-muted mt-1">
              {formatCompactCurrency(projectedBalanceInflationAdjusted)} in today's dollars
            </div>
          )}
        </motion.div>

        {/* Target Value */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-background-surface border border-white/[0.06] rounded-xl p-5"
        >
          <div className="flex items-center gap-2 text-text-muted text-sm mb-2">
            <Target className="w-4 h-4" />
            {targetType === "income-goal" ? "Required Portfolio" : "Target Value"}
          </div>
          <div className="text-2xl font-bold text-white">
            {formatCompactCurrency(targetBalance)}
          </div>
          <div className="text-xs text-text-muted mt-1">
            {targetType === "income-goal" ? "for your income goal" : "at retirement"}
          </div>
        </motion.div>
      </div>

      {/* Projected Monthly Income (when using income goal) */}
      {targetType === "income-goal" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-background-surface border border-white/[0.06] rounded-xl p-5"
        >
          <div className="flex items-center gap-2 text-text-muted text-sm mb-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            Projected Monthly Income
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {formatCurrency(projectedMonthlyIncome)}
            </span>
            <span className="text-text-muted text-sm">/month</span>
          </div>
          <div className="text-xs text-text-muted mt-1">
            Based on 4% safe withdrawal rate
          </div>
        </motion.div>
      )}

      {/* Gap / Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={cn(
          "rounded-xl p-5 border",
          isOnTrack
            ? "bg-green-500/10 border-green-500/20"
            : "bg-amber-500/10 border-amber-500/20"
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {isOnTrack ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-500" />
              )}
              <span className={cn("font-semibold", isOnTrack ? "text-green-400" : "text-amber-400")}>
                {isOnTrack ? "On Track" : "Gap to Target"}
              </span>
            </div>
            <div className={cn("text-3xl font-bold", isOnTrack ? "text-green-400" : "text-amber-400")}>
              {isOnTrack ? "+" : "-"}{formatCompactCurrency(Math.abs(gap))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-text-muted mb-1">Progress</div>
            <div className="text-xl font-bold text-white">{progressPercent}%</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-2 bg-background-elevated rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progressPercent, 100)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={cn(
                "h-full rounded-full",
                isOnTrack ? "bg-green-500" : "bg-amber-500"
              )}
            />
          </div>
        </div>
      </motion.div>

      {/* Contribution Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-background-surface border border-white/[0.06] rounded-xl p-5"
      >
        <h4 className="text-sm text-text-muted uppercase tracking-wider mb-4">Breakdown</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Total Contributions</span>
            <span className="text-white font-medium">{formatCurrency(totalContributions)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Investment Growth</span>
            <span className="text-green-400 font-medium">+{formatCurrency(totalGrowth)}</span>
          </div>
          <div className="h-px bg-white/[0.06]" />
          <div className="flex justify-between items-center">
            <span className="text-white font-semibold">Projected Total</span>
            <span className="text-white font-bold">{formatCurrency(projectedBalance)}</span>
          </div>
        </div>
      </motion.div>

      {/* Goal Seek Results */}
      {mode === "goal-seek" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-accent/10 border border-accent/20 rounded-xl p-5"
        >
          <h4 className="text-sm text-accent uppercase tracking-wider mb-4">
            To Reach Your Goal
          </h4>
          <div className="text-3xl font-bold text-white mb-2">
            {formatCurrency(requiredMonthly)}<span className="text-lg text-text-muted">/month</span>
          </div>
          <p className="text-sm text-text-secondary">
            Required monthly contribution over {yearsToRetirement} years
          </p>
        </motion.div>
      )}

      {/* Smart Suggestions */}
      {!isOnTrack && mode !== "goal-seek" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-background-surface border border-white/[0.06] rounded-xl p-5"
        >
          <h4 className="text-sm text-text-muted uppercase tracking-wider mb-4">
            Ways to Close the Gap
          </h4>
          <div className="space-y-3">
            {additionalMonthlyNeeded > 0 && (
              <div className="flex items-start gap-3 p-3 bg-background-elevated/50 rounded-lg">
                <DollarSign className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm text-white font-medium">
                    Increase monthly by {formatCurrency(additionalMonthlyNeeded)}
                  </div>
                  <div className="text-xs text-text-muted">
                    Additional per month to reach target
                  </div>
                </div>
              </div>
            )}
            {additionalYearsNeeded > 0 && (
              <div className="flex items-start gap-3 p-3 bg-background-elevated/50 rounded-lg">
                <Calendar className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm text-white font-medium">
                    Work {additionalYearsNeeded} more year{additionalYearsNeeded !== 1 ? "s" : ""}
                  </div>
                  <div className="text-xs text-text-muted">
                    At current contribution rate
                  </div>
                </div>
              </div>
            )}
            {requiredReturnRate > 0 && requiredReturnRate < 15 && (
              <div className="flex items-start gap-3 p-3 bg-background-elevated/50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm text-white font-medium">
                    Achieve {formatPercent(requiredReturnRate)} returns
                  </div>
                  <div className="text-xs text-text-muted">
                    Required annual return rate
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Milestones */}
      {milestones.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-background-surface border border-white/[0.06] rounded-xl p-5"
        >
          <h4 className="text-sm text-text-muted uppercase tracking-wider mb-4">
            Projected Milestones
          </h4>
          <div className="space-y-2">
            {milestones.map((milestone) => (
              <div
                key={milestone.age}
                className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold text-accent">
                    {milestone.age}
                  </div>
                  <div>
                    <div className="text-sm text-white font-medium">
                      Age {milestone.age}
                    </div>
                    <div className="text-xs text-text-muted">{milestone.year}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white font-medium">
                    {formatCompactCurrency(milestone.balance)}
                  </div>
                  <div className="text-xs text-green-400">
                    +{formatCompactCurrency(milestone.totalGrowth)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
