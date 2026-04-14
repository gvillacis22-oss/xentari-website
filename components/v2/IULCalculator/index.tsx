"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingDown, DollarSign, Percent, Plus, Trash2 } from "lucide-react";
import {
  IULInputs,
  IULResults,
  YearlyProjection,
  DistributionPeriod,
  defaultIULInputs,
  SAFE_WITHDRAWAL_RATE,
} from "./types";
import { cn } from "@/lib/utils";

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const startEditing = () => {
    setInputValue(value.toString());
    setIsEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setInputValue(raw);
  };

  const handleInputBlur = () => {
    let newValue = parseFloat(inputValue) || min;
    newValue = Math.max(min, Math.min(max, newValue));
    onChange(newValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleInputBlur();
    if (e.key === "Escape") setIsEditing(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm text-text-secondary">{label}</label>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="w-20 text-right text-sm text-white font-medium bg-background-elevated border border-accent/50 rounded px-2 py-0.5 focus:outline-none focus:border-accent"
            autoFocus
          />
        ) : (
          <button
            onClick={startEditing}
            title="Click to type"
            className="text-sm text-white font-medium tabular-nums px-2 py-0.5 rounded hover:bg-white/10 cursor-text transition-all"
          >
            {prefix}{value.toLocaleString()}{suffix}
          </button>
        )}
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-background-elevated rounded-full appearance-none cursor-pointer accent-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer"
      />
      <div className="flex justify-between text-xs text-text-muted">
        <span>{prefix}{min.toLocaleString()}{suffix}</span>
        <span>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );
}

function ResultCard({
  label,
  value,
  subtext,
  highlight = false,
  negative = false,
}: {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
  negative?: boolean;
}) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl border",
        highlight
          ? "border-accent/30 bg-accent/5"
          : negative
          ? "border-red-500/20 bg-red-500/5"
          : "border-white/[0.06] bg-background-elevated/30"
      )}
    >
      <div className="text-xs text-text-muted mb-1">{label}</div>
      <div
        className={cn(
          "text-xl font-bold",
          highlight ? "text-accent" : negative ? "text-red-400" : "text-white"
        )}
      >
        {value}
      </div>
      {subtext && <div className="text-xs text-text-muted mt-1">{subtext}</div>}
    </div>
  );
}

export function IULCalculator() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [inputs, setInputs] = useState<IULInputs>(defaultIULInputs);

  const handleInputChange = (updates: Partial<IULInputs>) => {
    setInputs((prev) => {
      const newInputs = { ...prev, ...updates };
      // Ensure lump sum age is between current age and retirement
      if (updates.currentAge && newInputs.lumpSumAge < updates.currentAge) {
        newInputs.lumpSumAge = updates.currentAge;
      }
      if (updates.retirementAge && newInputs.lumpSumAge > updates.retirementAge) {
        newInputs.lumpSumAge = updates.retirementAge;
      }
      return newInputs;
    });
  };

  // Calculate projections
  const { results, projections } = useMemo(() => {
    const {
      currentAge,
      retirementAge,
      currentBalance,
      monthlyContribution,
      expectedAnnualReturn,
      distributionPeriods,
      lumpSumEnabled,
      lumpSumAge,
      lumpSumAmount,
    } = inputs;

    const annualRate = expectedAnnualReturn / 100;
    const monthlyRate = annualRate / 12;
    const yearsToRetirement = retirementAge - currentAge;

    const projections: YearlyProjection[] = [];

    let balanceNoDistribution = currentBalance;
    let balanceWithDistribution = currentBalance;
    let totalContributionsNoDistribution = currentBalance;
    let totalContributions = currentBalance;
    let totalDistributions = 0;
    let lumpSumTaken = false;

    // Helper to find active distribution period for a given age
    const getActiveDistribution = (age: number): DistributionPeriod | undefined => {
      return distributionPeriods.find(p => age >= p.startAge && age < p.endAge);
    };

    // Calculate year by year
    for (let year = 0; year <= yearsToRetirement; year++) {
      const age = currentAge + year;

      // Apply lump sum withdrawal at the start of the specified age year
      if (lumpSumEnabled && age === lumpSumAge && !lumpSumTaken) {
        const actualLumpSum = Math.min(lumpSumAmount, balanceWithDistribution);
        balanceWithDistribution -= actualLumpSum;
        totalDistributions += actualLumpSum;
        lumpSumTaken = true;
      }

      // Store projection for this year
      projections.push({
        age,
        balanceNoDistribution,
        balanceWithDistribution,
        yearlyDistribution: 0,
        cumulativeDistributions: totalDistributions,
      });

      if (year === yearsToRetirement) break;

      // Get active distribution period for this age
      const activePeriod = getActiveDistribution(age);

      // Grow both balances for the year (month by month)
      for (let month = 0; month < 12; month++) {
        // Add contribution
        balanceNoDistribution += monthlyContribution;
        balanceWithDistribution += monthlyContribution;
        totalContributionsNoDistribution += monthlyContribution;
        totalContributions += monthlyContribution;

        // Apply growth
        balanceNoDistribution *= 1 + monthlyRate;
        balanceWithDistribution *= 1 + monthlyRate;

        // Apply distribution if there's an active period
        if (activePeriod) {
          let monthlyDistribution = 0;
          if (activePeriod.type === "fixed") {
            monthlyDistribution = activePeriod.amount;
          } else {
            // Percentage - annual percentage divided by 12
            monthlyDistribution = (balanceWithDistribution * (activePeriod.amount / 100)) / 12;
          }

          // Don't let balance go negative
          monthlyDistribution = Math.min(monthlyDistribution, balanceWithDistribution);
          balanceWithDistribution -= monthlyDistribution;
          totalDistributions += monthlyDistribution;
        }
      }

      // Update yearly distribution in projection
      if (activePeriod && projections.length > 0) {
        const lastProjection = projections[projections.length - 1];
        lastProjection.yearlyDistribution = totalDistributions - lastProjection.cumulativeDistributions;
      }
    }

    const totalGrowthNoDistribution = balanceNoDistribution - totalContributionsNoDistribution;
    const totalGrowth = balanceWithDistribution - totalContributions + totalDistributions;
    const distributionImpact = balanceNoDistribution - balanceWithDistribution;
    const distributionImpactPercent = balanceNoDistribution > 0
      ? (distributionImpact / balanceNoDistribution) * 100
      : 0;

    const results: IULResults = {
      balanceAtRetirementNoDistribution: Math.round(balanceNoDistribution),
      totalContributionsNoDistribution: Math.round(totalContributionsNoDistribution),
      totalGrowthNoDistribution: Math.round(totalGrowthNoDistribution),
      balanceAtRetirement: Math.round(balanceWithDistribution),
      totalContributions: Math.round(totalContributions),
      totalGrowth: Math.round(totalGrowth),
      totalDistributions: Math.round(totalDistributions),
      distributionImpact: Math.round(distributionImpact),
      distributionImpactPercent: Math.round(distributionImpactPercent),
      projectedMonthlyIncomeNoDistribution: Math.round((balanceNoDistribution * SAFE_WITHDRAWAL_RATE) / 12),
      projectedMonthlyIncome: Math.round((balanceWithDistribution * SAFE_WITHDRAWAL_RATE) / 12),
    };

    return { results, projections };
  }, [inputs]);

  // Calculate total years of distributions across all periods
  const totalDistributionYears = inputs.distributionPeriods.reduce(
    (sum, p) => sum + (p.endAge - p.startAge),
    0
  );

  return (
    <section
      ref={sectionRef}
      id="iul-calculator"
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-background-surface border border-[#FF6B35]/20 rounded-3xl overflow-hidden hover:border-[#FF6B35]/40 transition-all duration-300"
          style={{ boxShadow: "0 25px 80px -20px rgba(0, 0, 0, 0.6)" }}
        >
          {/* Header */}
          <div className="p-8 md:p-10 border-b border-white/[0.06]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-accent" />
              </div>
              <span className="text-accent/80 text-sm font-medium uppercase tracking-wider">
                IUL Distribution Calculator
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Early Distribution Impact
            </h2>
            <p className="text-text-secondary mt-2 max-w-xl">
              See how taking early distributions affects your retirement balance.
              Compare scenarios with and without withdrawals before retirement.
            </p>
          </div>

          {/* Main content */}
          <div className="p-6 md:p-10">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left: Inputs */}
              <div className="lg:col-span-2 space-y-6">
                {/* Profile */}
                <div className="bg-background-surface border border-white/[0.06] rounded-xl p-5 space-y-5">
                  <h4 className="text-sm text-text-muted uppercase tracking-wider font-medium">
                    Your Profile
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    <SliderField
                      label="Current Age"
                      value={inputs.currentAge}
                      onChange={(v) => handleInputChange({ currentAge: v })}
                      min={18}
                      max={70}
                    />
                    <SliderField
                      label="Retirement Age"
                      value={inputs.retirementAge}
                      onChange={(v) => handleInputChange({ retirementAge: v })}
                      min={inputs.currentAge + 1}
                      max={85}
                    />
                  </div>
                </div>

                {/* Money */}
                <div className="bg-background-surface border border-white/[0.06] rounded-xl p-5 space-y-5">
                  <h4 className="text-sm text-text-muted uppercase tracking-wider font-medium">
                    Your Money
                  </h4>
                  <SliderField
                    label="Current Balance"
                    value={inputs.currentBalance}
                    onChange={(v) => handleInputChange({ currentBalance: v })}
                    min={0}
                    max={500000}
                    step={5000}
                    prefix="$"
                  />
                  <SliderField
                    label="Monthly Contribution"
                    value={inputs.monthlyContribution}
                    onChange={(v) => handleInputChange({ monthlyContribution: v })}
                    min={0}
                    max={10000}
                    step={100}
                    prefix="$"
                  />
                  <SliderField
                    label="Expected Annual Return"
                    value={inputs.expectedAnnualReturn}
                    onChange={(v) => handleInputChange({ expectedAnnualReturn: v })}
                    min={0}
                    max={12}
                    step={0.5}
                    suffix="%"
                  />
                </div>

                {/* Distribution Periods */}
                <div className="bg-background-surface border border-accent/20 rounded-xl p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm text-accent uppercase tracking-wider font-medium">
                      Distribution Periods
                    </h4>
                    <button
                      onClick={() => {
                        const lastPeriod = inputs.distributionPeriods[inputs.distributionPeriods.length - 1];
                        const newStartAge = lastPeriod ? lastPeriod.endAge : inputs.currentAge + 10;
                        const newPeriod: DistributionPeriod = {
                          id: Date.now().toString(),
                          startAge: Math.min(newStartAge, inputs.retirementAge - 1),
                          endAge: inputs.retirementAge,
                          type: "fixed",
                          amount: 1000,
                        };
                        handleInputChange({
                          distributionPeriods: [...inputs.distributionPeriods, newPeriod],
                        });
                      }}
                      className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded border border-accent/40 text-accent hover:bg-accent/10 transition-all"
                    >
                      <Plus className="w-3 h-3" />
                      Add Period
                    </button>
                  </div>

                  {inputs.distributionPeriods.length === 0 ? (
                    <div className="p-4 bg-background-elevated/50 rounded-lg text-center">
                      <p className="text-sm text-text-muted">
                        No distribution periods. Click "Add Period" to start taking distributions.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {inputs.distributionPeriods.map((period, index) => (
                        <div
                          key={period.id}
                          className="bg-background-elevated/50 rounded-lg p-4 border border-white/[0.04] space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-accent font-medium">
                              Period {index + 1}: Age {period.startAge} - {period.endAge}
                            </span>
                            <button
                              onClick={() => {
                                handleInputChange({
                                  distributionPeriods: inputs.distributionPeriods.filter(
                                    (p) => p.id !== period.id
                                  ),
                                });
                              }}
                              className="text-text-muted hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs text-text-muted block mb-1">Start Age</label>
                              <input
                                type="number"
                                value={period.startAge}
                                onChange={(e) => {
                                  const updated = inputs.distributionPeriods.map((p) =>
                                    p.id === period.id
                                      ? { ...p, startAge: Number(e.target.value) }
                                      : p
                                  );
                                  handleInputChange({ distributionPeriods: updated });
                                }}
                                min={inputs.currentAge}
                                max={period.endAge - 1}
                                className="w-full bg-background-card border border-white/[0.06] rounded px-2 py-1.5 text-sm text-white"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-text-muted block mb-1">End Age</label>
                              <input
                                type="number"
                                value={period.endAge}
                                onChange={(e) => {
                                  const updated = inputs.distributionPeriods.map((p) =>
                                    p.id === period.id
                                      ? { ...p, endAge: Number(e.target.value) }
                                      : p
                                  );
                                  handleInputChange({ distributionPeriods: updated });
                                }}
                                min={period.startAge + 1}
                                max={inputs.retirementAge}
                                className="w-full bg-background-card border border-white/[0.06] rounded px-2 py-1.5 text-sm text-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => {
                                const updated = inputs.distributionPeriods.map((p) =>
                                  p.id === period.id ? { ...p, type: "fixed" as const } : p
                                );
                                handleInputChange({ distributionPeriods: updated });
                              }}
                              className={cn(
                                "flex items-center justify-center gap-1 p-2 rounded border transition-all text-xs",
                                period.type === "fixed"
                                  ? "bg-accent/10 border-accent/40 text-accent"
                                  : "bg-background-card border-white/[0.06] text-text-muted"
                              )}
                            >
                              <DollarSign className="w-3 h-3" />
                              Fixed $
                            </button>
                            <button
                              onClick={() => {
                                const updated = inputs.distributionPeriods.map((p) =>
                                  p.id === period.id ? { ...p, type: "percentage" as const } : p
                                );
                                handleInputChange({ distributionPeriods: updated });
                              }}
                              className={cn(
                                "flex items-center justify-center gap-1 p-2 rounded border transition-all text-xs",
                                period.type === "percentage"
                                  ? "bg-accent/10 border-accent/40 text-accent"
                                  : "bg-background-card border-white/[0.06] text-text-muted"
                              )}
                            >
                              <Percent className="w-3 h-3" />
                              Percentage
                            </button>
                          </div>

                          <div>
                            <label className="text-xs text-text-muted block mb-1">
                              {period.type === "fixed" ? "Monthly Amount ($)" : "Annual Rate (%)"}
                            </label>
                            <input
                              type="number"
                              value={period.amount}
                              onChange={(e) => {
                                const updated = inputs.distributionPeriods.map((p) =>
                                  p.id === period.id
                                    ? { ...p, amount: Number(e.target.value) }
                                    : p
                                );
                                handleInputChange({ distributionPeriods: updated });
                              }}
                              min={period.type === "fixed" ? 100 : 1}
                              max={period.type === "fixed" ? 50000 : 20}
                              step={period.type === "fixed" ? 100 : 0.5}
                              className="w-full bg-background-card border border-white/[0.06] rounded px-2 py-1.5 text-sm text-white"
                            />
                          </div>

                          <div className="text-xs text-text-muted pt-2 border-t border-white/[0.04]">
                            {period.type === "fixed"
                              ? `$${period.amount.toLocaleString()}/mo for ${period.endAge - period.startAge} years`
                              : `${period.amount}% annually for ${period.endAge - period.startAge} years`}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Total Distribution Summary */}
                  <div className="p-4 bg-accent/10 border border-accent/30 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-accent/80">Total Distributions:</span>
                      <span className="text-lg font-bold text-accent">
                        ${results.totalDistributions.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lump Sum Withdrawal */}
                <div className="bg-background-surface border border-white/[0.06] rounded-xl p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm text-text-muted uppercase tracking-wider font-medium">
                      One-Time Lump Sum
                    </h4>
                    <button
                      onClick={() => handleInputChange({ lumpSumEnabled: !inputs.lumpSumEnabled })}
                      className={cn(
                        "px-3 py-1 text-xs font-medium rounded-full border transition-all",
                        inputs.lumpSumEnabled
                          ? "bg-accent/20 border-accent/40 text-accent"
                          : "bg-background-elevated border-white/[0.08] text-text-muted hover:text-text-secondary"
                      )}
                    >
                      {inputs.lumpSumEnabled ? "Enabled" : "Disabled"}
                    </button>
                  </div>

                  {inputs.lumpSumEnabled && (
                    <>
                      <SliderField
                        label="Withdraw At Age"
                        value={inputs.lumpSumAge}
                        onChange={(v) => handleInputChange({ lumpSumAge: v })}
                        min={inputs.currentAge}
                        max={inputs.retirementAge}
                      />
                      <SliderField
                        label="Lump Sum Amount"
                        value={inputs.lumpSumAmount}
                        onChange={(v) => handleInputChange({ lumpSumAmount: v })}
                        min={5000}
                        max={500000}
                        step={5000}
                        prefix="$"
                      />
                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <p className="text-xs text-yellow-300/80">
                          This ${inputs.lumpSumAmount.toLocaleString()} withdrawal at age {inputs.lumpSumAge} will be taken from your balance and is included in the total distributions impact.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Right: Results */}
              <div className="lg:col-span-3 space-y-6">
                {/* Comparison Chart */}
                <div className="bg-background-surface border border-white/[0.06] rounded-xl p-6">
                  <h4 className="text-sm text-text-muted uppercase tracking-wider font-medium mb-4">
                    Balance Comparison at Retirement (Age {inputs.retirementAge})
                  </h4>

                  <div className="space-y-4">
                    {/* Without distributions */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-text-secondary">Without Distributions</span>
                        <span className="text-white font-semibold">
                          ${results.balanceAtRetirementNoDistribution.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-8 bg-background-elevated rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500/80 to-green-400 rounded-lg"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>

                    {/* With distributions */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-text-secondary">With Early Distributions</span>
                        <span className="text-accent font-semibold">
                          ${results.balanceAtRetirement.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-8 bg-background-elevated rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent/80 to-accent rounded-lg transition-all duration-500"
                          style={{
                            width: `${Math.max(5, (results.balanceAtRetirement / results.balanceAtRetirementNoDistribution) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Impact callout */}
                  <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-red-300">
                        Impact of Early Distributions
                      </span>
                      <span className="text-red-400 font-bold">
                        -${results.distributionImpact.toLocaleString()} ({results.distributionImpactPercent}%)
                      </span>
                    </div>
                    <p className="text-xs text-red-300/70 mt-2">
                      This is how much less you'll have at retirement due to early withdrawals
                      and lost compounding growth.
                    </p>
                  </div>
                </div>

                {/* Result Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <ResultCard
                    label="Total Distributions Taken"
                    value={`$${results.totalDistributions.toLocaleString()}`}
                    subtext={totalDistributionYears > 0 ? `Over ${totalDistributionYears} years` : "No distributions"}
                    highlight
                  />
                  <ResultCard
                    label="Lost to Reduced Compounding"
                    value={`$${(results.distributionImpact - results.totalDistributions).toLocaleString()}`}
                    subtext="Growth you missed"
                    negative
                  />
                  <ResultCard
                    label="Balance at Retirement"
                    value={`$${results.balanceAtRetirement.toLocaleString()}`}
                    subtext={`Age ${inputs.retirementAge}`}
                  />
                </div>

                {/* Monthly Income Comparison */}
                <div className="bg-background-surface border border-white/[0.06] rounded-xl p-6">
                  <h4 className="text-sm text-text-muted uppercase tracking-wider font-medium mb-4">
                    Projected Monthly Retirement Income (4% Rule)
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                      <div className="text-xs text-green-300 mb-1">Without Distributions</div>
                      <div className="text-2xl font-bold text-green-400">
                        ${results.projectedMonthlyIncomeNoDistribution.toLocaleString()}/mo
                      </div>
                    </div>
                    <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
                      <div className="text-xs text-accent/80 mb-1">With Early Distributions</div>
                      <div className="text-2xl font-bold text-accent">
                        ${results.projectedMonthlyIncome.toLocaleString()}/mo
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted mt-4 text-center">
                    Difference: ${(results.projectedMonthlyIncomeNoDistribution - results.projectedMonthlyIncome).toLocaleString()}/mo less in retirement
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-background-elevated/30 rounded-xl border border-white/[0.04]">
              <p className="text-xs text-text-muted text-center leading-relaxed">
                <strong>Disclaimer:</strong> This calculator is for educational and illustrative purposes only.
                IUL policies have specific rules, fees, and tax implications not reflected here.
                Consult a licensed insurance professional for personalized guidance on IUL distributions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
