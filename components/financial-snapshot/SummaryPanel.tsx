"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Eye,
  ArrowRight,
  Building2,
} from "lucide-react";
import {
  FinancialSnapshot,
  incomeRanges,
  savingsRanges,
  debtRanges,
} from "./types";
import { cn } from "@/lib/utils";

interface SummaryPanelProps {
  data: FinancialSnapshot;
}

function getMidpoint(value: string, ranges: { value: string; midpoint: number }[]): number {
  const range = ranges.find((r) => r.value === value);
  return range?.midpoint || 0;
}

function parseExpenseValue(value: string): number {
  const num = parseFloat(value.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? 0 : num;
}

export function SummaryPanel({ data }: SummaryPanelProps) {
  // Calculate monthly inflow
  const annualIncome = getMidpoint(data.income.householdIncomeRange, incomeRanges);
  const monthlyIncome = annualIncome / 12;
  const otherIncome = parseExpenseValue(data.income.otherIncome);
  const totalMonthlyInflow = monthlyIncome + otherIncome;

  // Calculate monthly outflow
  const expenses = data.expenses;
  const totalMonthlyOutflow =
    parseExpenseValue(expenses.housing) +
    parseExpenseValue(expenses.utilities) +
    parseExpenseValue(expenses.insurance) +
    parseExpenseValue(expenses.transportation) +
    parseExpenseValue(expenses.food) +
    parseExpenseValue(expenses.subscriptions) +
    parseExpenseValue(expenses.debtPayments) +
    parseExpenseValue(expenses.miscellaneous);

  // Calculate surplus/deficit
  const surplus = totalMonthlyInflow - totalMonthlyOutflow;
  const isPositive = surplus >= 0;

  // Determine "What We're Seeing" insights
  const insights: { text: string; type: "positive" | "neutral" | "attention" }[] = [];

  // Check savings rate
  if (totalMonthlyInflow > 0 && totalMonthlyOutflow > 0) {
    const savingsRate = (surplus / totalMonthlyInflow) * 100;
    if (savingsRate >= 20) {
      insights.push({
        text: "Strong cash flow position—may have room for accelerated savings or strategic investments",
        type: "positive",
      });
    } else if (savingsRate >= 10) {
      insights.push({
        text: "Moderate surplus—potential for optimization in expenses or income allocation",
        type: "neutral",
      });
    } else if (savingsRate > 0) {
      insights.push({
        text: "Tight cash flow—may benefit from expense review or income structuring",
        type: "attention",
      });
    } else if (savingsRate <= 0) {
      insights.push({
        text: "Negative cash flow indicated—cash flow management may be a priority area",
        type: "attention",
      });
    }
  }

  // Check retirement accounts
  if (
    data.savings.retirementAccounts.length === 0 ||
    data.savings.retirementAccounts.includes("none")
  ) {
    insights.push({
      text: "No retirement accounts indicated—tax-advantaged retirement options may be underutilized",
      type: "attention",
    });
  } else if (data.savings.retirementAccounts.includes("not-sure")) {
    insights.push({
      text: "Uncertainty about retirement accounts—clarity here could reveal opportunities",
      type: "neutral",
    });
  }

  // Check debt situation
  const creditCardDebt = getMidpoint(data.debt.creditCardDebtRange, debtRanges);
  if (creditCardDebt > 10000) {
    insights.push({
      text: "High-interest debt may be limiting wealth-building potential",
      type: "attention",
    });
  }

  // Check goals alignment
  if (data.goals.selectedGoals.includes("reduce-taxes") && annualIncome > 75000) {
    insights.push({
      text: "Tax reduction goal combined with income level suggests potential for strategic planning",
      type: "positive",
    });
  }

  if (data.goals.selectedGoals.includes("retirement-planning") &&
      (data.savings.retirementAccounts.length === 0 || data.savings.retirementAccounts.includes("none"))) {
    insights.push({
      text: "Retirement planning goal without current retirement accounts—significant opportunity",
      type: "neutral",
    });
  }

  // Business owner insights
  const isBusinessOwner = data.professionalProfile.isBusinessOwner === "yes" ||
    data.basicProfile.employmentStatus === "business-owner" ||
    data.basicProfile.ownsBusiness === "yes";

  const businessInsights: { text: string; type: "positive" | "neutral" | "attention" }[] = [];

  if (isBusinessOwner) {
    businessInsights.push({
      text: "Business ownership may create opportunities for expense optimization and structuring",
      type: "positive",
    });

    if (data.goals.selectedGoals.includes("reduce-taxes")) {
      businessInsights.push({
        text: "Potential for tax-efficiency strategies through business structure",
        type: "positive",
      });
    }

    if (data.goals.selectedGoals.includes("retirement-planning")) {
      businessInsights.push({
        text: "Business retirement plans (SEP, SIMPLE, Solo 401k) may offer higher contribution limits",
        type: "neutral",
      });
    }

    if (data.professionalProfile.industry) {
      businessInsights.push({
        text: "Industry-specific considerations may apply to your financial strategy",
        type: "neutral",
      });
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const hasData = totalMonthlyInflow > 0 || totalMonthlyOutflow > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Main Summary Card */}
      <div
        className="bg-background-card border border-white/[0.06] rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/[0.06]">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <Target className="w-5 h-5 text-accent" />
            Financial Summary
          </h3>
          <p className="text-text-muted text-sm mt-1">
            Based on the information provided
          </p>
        </div>

        {!hasData ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-text-muted" />
            </div>
            <p className="text-text-secondary">
              Fill in the sections to see your financial summary
            </p>
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="p-6 grid grid-cols-1 gap-4">
              {/* Monthly Inflow */}
              <div className="bg-background-elevated/50 rounded-xl p-4 border border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-text-muted text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    Est. Monthly Inflow
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatCurrency(totalMonthlyInflow)}
                  </div>
                </div>
              </div>

              {/* Monthly Outflow */}
              <div className="bg-background-elevated/50 rounded-xl p-4 border border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-text-muted text-sm">
                    <TrendingDown className="w-4 h-4 text-red-400" />
                    Est. Monthly Outflow
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatCurrency(totalMonthlyOutflow)}
                  </div>
                </div>
              </div>

              {/* Surplus/Deficit */}
              <div
                className={cn(
                  "rounded-xl p-4 border",
                  isPositive
                    ? "bg-green-500/10 border-green-500/20"
                    : "bg-red-500/10 border-red-500/20"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-text-muted text-sm">
                    <DollarSign className={cn("w-4 h-4", isPositive ? "text-green-500" : "text-red-400")} />
                    Est. {isPositive ? "Surplus" : "Deficit"}
                  </div>
                  <div
                    className={cn(
                      "text-xl font-bold",
                      isPositive ? "text-green-400" : "text-red-400"
                    )}
                  >
                    {formatCurrency(Math.abs(surplus))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* What We're Seeing */}
      {insights.length > 0 && (
        <div className="bg-background-card border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/[0.06]">
            <h4 className="text-base font-semibold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-accent" />
              What We're Seeing
            </h4>
            <p className="text-xs text-text-muted mt-1">
              General observations based on your inputs
            </p>
          </div>
          <div className="p-5 space-y-3">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg text-sm",
                  insight.type === "positive" && "bg-green-500/10",
                  insight.type === "neutral" && "bg-white/5",
                  insight.type === "attention" && "bg-amber-500/10"
                )}
              >
                {insight.type === "positive" && (
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                )}
                {insight.type === "neutral" && (
                  <Lightbulb className="w-4 h-4 text-text-muted mt-0.5 flex-shrink-0" />
                )}
                {insight.type === "attention" && (
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                )}
                <span className="text-text-secondary leading-relaxed">
                  {insight.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Potential Areas to Explore (Business Owners) */}
      {isBusinessOwner && businessInsights.length > 0 && (
        <div className="bg-background-card border border-accent/20 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/[0.06]">
            <h4 className="text-base font-semibold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-accent" />
              Potential Areas to Explore
            </h4>
            <p className="text-xs text-text-muted mt-1">
              As a business owner, you may have additional opportunities
            </p>
          </div>
          <div className="p-5 space-y-3">
            {businessInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg text-sm",
                  insight.type === "positive" && "bg-accent/10",
                  insight.type === "neutral" && "bg-white/5",
                  insight.type === "attention" && "bg-amber-500/10"
                )}
              >
                <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary leading-relaxed">
                  {insight.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      {hasData && (
        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-white mb-2">
            Review My Financial Strategy
          </h4>
          <p className="text-sm text-text-secondary mb-4">
            Based on your inputs, we can help identify opportunities and build a smarter financial structure.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-medium rounded-lg hover:bg-accent-light transition-colors"
          >
            Schedule a Strategy Session
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Disclaimer */}
      <div className="p-4 bg-background-elevated/30 rounded-xl border border-white/[0.04]">
        <p className="text-xs text-text-muted text-center leading-relaxed">
          This summary is for educational and planning purposes only. It does not
          constitute financial, tax, or legal advice. All insights are general in nature
          and based on the assumptions you provided. Consult a qualified professional
          for personalized recommendations.
        </p>
      </div>
    </motion.div>
  );
}
