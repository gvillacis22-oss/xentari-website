"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calculator, Sparkles, TrendingUp, Settings2 } from "lucide-react";
import { InputPanel } from "./InputPanel";
import { SimpleInputPanel } from "./SimpleInputPanel";
import { ResultsPanel } from "./ResultsPanel";
import { SimpleResultsPanel } from "./SimpleResultsPanel";
import { GrowthChart } from "./GrowthChart";
import {
  CalculatorView,
  AdvancedMode,
  CalculatorInputs,
  CalculatorResults,
  MilestoneData,
  ChartDataPoint,
  defaultInputs,
  milestoneAges,
  SAFE_WITHDRAWAL_RATE,
} from "./types";
import {
  futureValueCombined,
  futureValuePhasedContributions,
  requiredMonthlyForTarget,
  generateAutoRampPhases,
  calculateMilestones,
  generateYearlyProjections,
  analyzeGap,
  adjustForInflation,
} from "@/lib/calculatorUtils";
import { cn } from "@/lib/utils";

export function AdvancedCalculator() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // View mode: Simple (default) or Advanced
  const [view, setView] = useState<CalculatorView>("simple");
  // Advanced mode selector (only used when view is "advanced")
  const [advancedMode, setAdvancedMode] = useState<AdvancedMode>("future-value");
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);

  const handleInputChange = (updates: Partial<CalculatorInputs>) => {
    setInputs((prev) => ({ ...prev, ...updates }));
  };

  // Calculate target based on target type (lump sum or income goal)
  const effectiveTarget = useMemo(() => {
    if (inputs.targetType === "income-goal") {
      // Calculate required portfolio for desired monthly income using 4% rule
      // Required Portfolio = (Monthly Income × 12) / 0.04
      return (inputs.desiredMonthlyIncome * 12) / SAFE_WITHDRAWAL_RATE;
    }
    return inputs.targetRetirementAmount;
  }, [inputs.targetType, inputs.desiredMonthlyIncome, inputs.targetRetirementAmount]);

  // Calculate results
  const { results, milestones, chartData } = useMemo(() => {
    const {
      currentAge,
      retirementAge,
      currentBalance,
      expectedAnnualReturn,
      inflationRate,
      showInflationAdjusted,
      monthlyContribution,
      employerMatch,
      annualLumpSum,
      startingContribution,
      maxContribution,
      annualIncreaseRate,
      useCustomPhases,
      customPhases,
    } = inputs;

    const annualRate = expectedAnnualReturn / 100;
    const yearsToRetirement = retirementAge - currentAge;

    // Calculate effective monthly contribution with employer match
    const matchedContribution = monthlyContribution * (1 + (employerMatch / 100));

    let projectedBalance = 0;
    let totalContributions = currentBalance;
    let phases = customPhases;

    // Only use phased mode in advanced view
    if (view === "advanced" && advancedMode === "phased") {
      // Generate phases for auto-ramp mode
      if (!useCustomPhases) {
        const generatedPhases = generateAutoRampPhases(
          currentAge,
          retirementAge,
          startingContribution,
          maxContribution,
          annualIncreaseRate / 100
        );
        // Convert to component's ContributionPhase type with ids
        phases = generatedPhases.map((p, i) => ({
          id: `auto-${i}`,
          startAge: p.startAge,
          endAge: p.endAge,
          monthlyContribution: p.monthlyContribution,
        }));
      }

      // Calculate with phased contributions
      projectedBalance = futureValuePhasedContributions(
        currentAge,
        retirementAge,
        currentBalance,
        phases.map((p) => ({
          startAge: p.startAge,
          endAge: p.endAge,
          monthlyContribution: p.monthlyContribution,
        })),
        annualRate
      );

      // Calculate total contributions from phases
      phases.forEach((phase) => {
        const yearsInPhase = phase.endAge - phase.startAge;
        totalContributions += phase.monthlyContribution * 12 * yearsInPhase;
      });
    } else {
      // Simple future value calculation
      projectedBalance = futureValueCombined(
        currentBalance,
        matchedContribution,
        annualRate,
        yearsToRetirement
      );

      // Add annual lump sums (only in advanced mode)
      if (view === "advanced" && annualLumpSum > 0) {
        for (let year = 1; year <= yearsToRetirement; year++) {
          projectedBalance += annualLumpSum * Math.pow(1 + annualRate, yearsToRetirement - year);
        }
      }

      const annualLumpSumTotal = view === "advanced" ? annualLumpSum * yearsToRetirement : 0;
      totalContributions = currentBalance + matchedContribution * 12 * yearsToRetirement + annualLumpSumTotal;
    }

    const totalGrowth = projectedBalance - totalContributions;

    // Calculate required monthly for goal-seek mode
    const requiredMonthly = requiredMonthlyForTarget(
      effectiveTarget,
      currentBalance,
      annualRate,
      yearsToRetirement
    );

    // Analyze gap (only relevant for advanced mode with target)
    const gapAnalysis = analyzeGap(
      projectedBalance,
      effectiveTarget,
      currentBalance,
      view === "advanced" && advancedMode === "phased" ? startingContribution : matchedContribution,
      annualRate,
      yearsToRetirement
    );

    // Calculate inflation-adjusted value
    const projectedBalanceInflationAdjusted = showInflationAdjusted
      ? adjustForInflation(projectedBalance, inflationRate / 100, yearsToRetirement)
      : projectedBalance;

    // Calculate projected monthly income using 4% rule
    const projectedMonthlyIncome = (projectedBalance * SAFE_WITHDRAWAL_RATE) / 12;

    // Calculate milestones
    const relevantMilestones = milestoneAges.filter(
      (age) => age > currentAge && age <= retirementAge
    );
    // Always add retirement age as final milestone
    if (!relevantMilestones.includes(retirementAge)) {
      relevantMilestones.push(retirementAge);
    }

    const effectiveMonthlyContribution = view === "advanced" && advancedMode === "phased" ? 0 : matchedContribution;
    const effectivePhases = view === "advanced" && advancedMode === "phased"
      ? phases.map((p) => ({
          startAge: p.startAge,
          endAge: p.endAge,
          monthlyContribution: p.monthlyContribution,
        }))
      : undefined;

    const milestonesData = calculateMilestones(
      currentAge,
      currentBalance,
      effectiveMonthlyContribution,
      annualRate,
      relevantMilestones,
      effectivePhases
    );

    // Generate chart data
    const yearlyProjections = generateYearlyProjections(
      currentAge,
      retirementAge,
      currentBalance,
      effectiveMonthlyContribution,
      annualRate,
      effectivePhases
    );

    // Only show target line in advanced mode
    const chartData: ChartDataPoint[] = yearlyProjections.map((p) => ({
      ...p,
      target: view === "advanced" ? effectiveTarget : undefined,
    }));

    const results: CalculatorResults = {
      projectedBalance: Math.round(projectedBalance),
      projectedBalanceInflationAdjusted: Math.round(projectedBalanceInflationAdjusted),
      targetBalance: effectiveTarget,
      gap: gapAnalysis.gap,
      isOnTrack: gapAnalysis.isOnTrack,
      progressPercent: gapAnalysis.progressPercent,
      totalContributions: Math.round(totalContributions),
      totalGrowth: Math.round(totalGrowth),
      requiredMonthly: Math.round(requiredMonthly),
      additionalMonthlyNeeded: gapAnalysis.additionalMonthlyNeeded,
      additionalYearsNeeded: gapAnalysis.additionalYearsNeeded,
      requiredReturnRate: gapAnalysis.requiredReturnRate,
      projectedMonthlyIncome: Math.round(projectedMonthlyIncome),
    };

    return { results, milestones: milestonesData, chartData };
  }, [inputs, view, advancedMode, effectiveTarget]);

  const yearsToRetirement = inputs.retirementAge - inputs.currentAge;

  return (
    <section
      ref={sectionRef}
      id="calculator"
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Subtle glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full pointer-events-none"
        animate={{ opacity: [0.03, 0.05, 0.03] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(ellipse, rgba(255, 107, 53, 0.08) 0%, transparent 60%)",
          filter: "blur(120px)",
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-background-surface border border-white/[0.06] rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 25px 80px -20px rgba(0, 0, 0, 0.6)" }}
        >
          {/* Header */}
          <div className="p-8 md:p-10 border-b border-white/[0.06]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-accent/80 text-sm font-medium uppercase tracking-wider">
                    Retirement Planner
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Plan Your Financial Future
                </h2>
                <p className="text-text-secondary mt-2 max-w-xl">
                  Model different scenarios to see what it takes to reach your retirement goals.
                </p>
              </div>

              {/* View Toggle - Simple / Advanced */}
              <div className="flex items-center gap-2 p-1 bg-background-elevated/50 border border-white/[0.06] rounded-xl">
                <button
                  onClick={() => setView("simple")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    view === "simple"
                      ? "bg-accent/20 text-accent border border-accent/30"
                      : "text-text-muted hover:text-text-secondary"
                  )}
                >
                  <TrendingUp className="w-4 h-4" />
                  Simple
                </button>
                <button
                  onClick={() => setView("advanced")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    view === "advanced"
                      ? "bg-accent/20 text-accent border border-accent/30"
                      : "text-text-muted hover:text-text-secondary"
                  )}
                >
                  <Settings2 className="w-4 h-4" />
                  Advanced
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="p-6 md:p-10">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left: Inputs */}
              <div className="lg:col-span-2">
                {view === "simple" ? (
                  <SimpleInputPanel
                    inputs={inputs}
                    onInputChange={handleInputChange}
                  />
                ) : (
                  <InputPanel
                    mode={advancedMode}
                    onModeChange={setAdvancedMode}
                    inputs={inputs}
                    onInputChange={handleInputChange}
                  />
                )}
              </div>

              {/* Right: Results */}
              <div className="lg:col-span-3 space-y-6">
                {/* Chart */}
                <GrowthChart
                  data={chartData}
                  targetValue={view === "advanced" ? effectiveTarget : undefined}
                  retirementAge={inputs.retirementAge}
                />

                {/* Results */}
                {view === "simple" ? (
                  <SimpleResultsPanel
                    results={results}
                    yearsToRetirement={yearsToRetirement}
                  />
                ) : (
                  <ResultsPanel
                    mode={advancedMode}
                    results={results}
                    milestones={milestones}
                    yearsToRetirement={yearsToRetirement}
                    targetType={inputs.targetType}
                  />
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-background-elevated/30 rounded-xl border border-white/[0.04]">
              <p className="text-xs text-text-muted text-center leading-relaxed">
                <strong>Disclaimer:</strong> This calculator is for educational and illustrative purposes only.
                Projections are based on hypothetical assumptions and do not guarantee future results.
                Investment returns vary, and past performance does not predict future outcomes.
                This is not financial advice—consult a licensed professional for personalized guidance.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
