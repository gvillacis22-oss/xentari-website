"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Percent,
  PiggyBank,
  Target,
  Info,
  User,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface CalculatorInputs {
  currentAge: number;
  retirementAge: number;
  startingAmount: number;
  monthlyContribution: number;
  annualReturn: number;
}

interface CalculatorResults {
  futureValue: number;
  totalContributions: number;
  totalGrowth: number;
  yearsInvested: number;
}

const DEFAULT_ANNUAL_RETURN = 7;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function parseCurrencyInput(value: string): number {
  const cleaned = value.replace(/[^0-9]/g, "");
  return parseInt(cleaned, 10) || 0;
}

function PremiumSliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  icon: Icon,
  formatValue,
  suffix = "",
  prefix = "",
  allowTypedInput = true,
  isCurrency = false,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  icon: React.ElementType;
  formatValue?: (value: number) => string;
  suffix?: string;
  prefix?: string;
  allowTypedInput?: boolean;
  isCurrency?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;
  const displayValue = formatValue
    ? formatValue(value)
    : `${prefix}${value.toLocaleString()}${suffix}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (isCurrency) {
      setInputValue(raw);
    } else {
      setInputValue(raw.replace(/[^0-9.]/g, ""));
    }
  };

  const handleInputBlur = () => {
    let newValue: number;
    if (isCurrency) {
      newValue = parseCurrencyInput(inputValue);
    } else {
      newValue = parseFloat(inputValue) || min;
    }
    newValue = Math.max(min, Math.min(max, newValue));
    onChange(newValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const startEditing = () => {
    if (!allowTypedInput) return;
    setInputValue(value.toString());
    setIsEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-text-secondary">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-accent" />
          </div>
          <span className="text-sm font-medium">{label}</span>
        </div>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="w-32 text-right text-lg font-semibold text-white bg-background-elevated border border-accent/50 rounded-lg px-3 py-1 focus:outline-none focus:border-accent"
            autoFocus
          />
        ) : (
          <button
            onClick={startEditing}
            className={cn(
              "text-lg font-semibold text-white transition-colors px-3 py-1 rounded-lg",
              allowTypedInput && "hover:bg-white/5 cursor-text"
            )}
          >
            {displayValue}
          </button>
        )}
      </div>
      <div className="relative h-2">
        <div className="absolute inset-0 bg-background-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent/80 to-accent rounded-full transition-all duration-200"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-accent border-2 border-white/20 pointer-events-none transition-all duration-200"
          style={{
            left: `calc(${percentage}% - 10px)`,
            boxShadow: "0 2px 8px rgba(255, 107, 53, 0.3)",
          }}
        />
      </div>
    </div>
  );
}

function ResultCard({
  label,
  value,
  icon: Icon,
  highlight = false,
  subtext,
  index = 0,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  highlight?: boolean;
  subtext?: string;
  index?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className={cn(
        "relative p-6 rounded-2xl border transition-all duration-300 overflow-hidden group",
        highlight
          ? "border-accent/30 bg-gradient-to-br from-accent/8 via-accent/4 to-transparent"
          : "border-white/[0.06] bg-background-card/40 backdrop-blur-xl hover:border-white/[0.1]"
      )}
      style={{
        boxShadow: highlight
          ? "0 8px 32px rgba(255, 107, 53, 0.1)"
          : "0 4px 24px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              highlight ? "bg-accent/15" : "bg-white/5"
            )}
          >
            <Icon className="w-4 h-4 text-accent" />
          </div>
          <span className="text-sm text-text-secondary">{label}</span>
        </div>
        <div
          className={cn(
            "text-2xl md:text-3xl font-bold",
            highlight ? "text-accent" : "text-white"
          )}
        >
          {value}
        </div>
        {subtext && (
          <div className="text-xs text-text-muted mt-1">{subtext}</div>
        )}
      </div>
    </motion.div>
  );
}

export function Calculator() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [inputs, setInputs] = useState<CalculatorInputs>({
    currentAge: 30,
    retirementAge: 65,
    startingAmount: 10000,
    monthlyContribution: 500,
    annualReturn: DEFAULT_ANNUAL_RETURN,
  });

  const [results, setResults] = useState<CalculatorResults>({
    futureValue: 0,
    totalContributions: 0,
    totalGrowth: 0,
    yearsInvested: 35,
  });

  const [isAnimating, setIsAnimating] = useState(false);

  // Reduced mouse tracking - smoother, more subtle
  const glowX = useSpring(50, { damping: 50, stiffness: 30 });
  const glowY = useSpring(50, { damping: 50, stiffness: 30 });

  // Reduced glow movement range
  const glowLeft = useTransform(glowX, (v) => `calc(${v}% - 400px)`);
  const glowTop = useTransform(glowY, (v) => `calc(${v}% - 400px)`);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glowX.set(x);
      glowY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [glowX, glowY]);

  const calculateCompoundGrowth = useCallback(() => {
    const { currentAge, retirementAge, startingAmount, monthlyContribution, annualReturn } =
      inputs;

    const yearsInvested = Math.max(0, retirementAge - currentAge);
    const monthlyRate = annualReturn / 100 / 12;
    const totalMonths = yearsInvested * 12;

    let futureValue = startingAmount * Math.pow(1 + monthlyRate, totalMonths);

    if (monthlyRate > 0) {
      futureValue +=
        monthlyContribution *
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    } else {
      futureValue += monthlyContribution * totalMonths;
    }

    const totalContributions =
      startingAmount + monthlyContribution * totalMonths;
    const totalGrowth = futureValue - totalContributions;

    return {
      futureValue: Math.round(futureValue),
      totalContributions: Math.round(totalContributions),
      totalGrowth: Math.round(totalGrowth),
      yearsInvested,
    };
  }, [inputs]);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setResults(calculateCompoundGrowth());
      setIsAnimating(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [calculateCompoundGrowth]);

  const updateInput = (key: keyof CalculatorInputs, value: number) => {
    setInputs((prev) => {
      const newInputs = { ...prev, [key]: value };
      if (key === "currentAge" && value >= prev.retirementAge) {
        newInputs.retirementAge = value + 1;
      }
      if (key === "retirementAge" && value <= prev.currentAge) {
        newInputs.retirementAge = prev.currentAge + 1;
      }
      return newInputs;
    });
  };

  const growthPercentage =
    results.totalContributions > 0
      ? ((results.totalGrowth / results.totalContributions) * 100).toFixed(0)
      : "0";

  return (
    <section
      ref={sectionRef}
      id="calculator"
      className="section-padding relative overflow-hidden"
    >
      {/* Layer 1: Enhanced base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#080808] to-background" />

      {/* Layer 2: Mouse-following glow - more subtle */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          left: glowLeft,
          top: glowTop,
          background:
            "radial-gradient(circle, rgba(255, 107, 53, 0.03) 0%, transparent 55%)",
          filter: "blur(100px)",
        }}
      />

      {/* Layer 3: Static ambient glow - reduced animation */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        animate={{
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 53, 0.05) 0%, transparent 60%)",
          filter: "blur(120px)",
        }}
      />

      {/* Layer 4: Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 5: Vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)",
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-4 block">
            Growth Calculator
          </span>
          <h2 className="text-display-mobile md:text-display font-bold text-white mb-4">
            See Your Future Wealth
          </h2>
          <p className="text-text-secondary text-lg">
            Visualize the power of compound growth. Adjust the sliders or type
            values directly to see how your wealth can grow.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Main calculator panel - enhanced depth */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="relative bg-background-card/30 backdrop-blur-2xl border border-white/[0.06] rounded-3xl p-8 md:p-10 overflow-hidden"
            style={{
              boxShadow:
                "0 25px 60px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.02) inset",
            }}
          >
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-transparent pointer-events-none rounded-3xl" />

            <div className="relative grid lg:grid-cols-2 gap-10">
              {/* Input controls */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center text-accent text-xs font-bold">
                      1
                    </span>
                    Your Profile
                  </h3>
                  <div className="space-y-6">
                    <PremiumSliderInput
                      label="Current Age"
                      value={inputs.currentAge}
                      onChange={(v) => updateInput("currentAge", v)}
                      min={18}
                      max={70}
                      step={1}
                      icon={User}
                      suffix=" years"
                    />

                    <PremiumSliderInput
                      label="Retirement Age"
                      value={inputs.retirementAge}
                      onChange={(v) => updateInput("retirementAge", v)}
                      min={inputs.currentAge + 1}
                      max={85}
                      step={1}
                      icon={Calendar}
                      suffix=" years"
                    />

                    <div className="flex items-center justify-between p-4 rounded-xl bg-accent/5 border border-accent/15">
                      <span className="text-text-secondary text-sm">
                        Years Until Retirement
                      </span>
                      <span className="text-accent font-bold text-lg">
                        {results.yearsInvested} years
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center text-accent text-xs font-bold">
                      2
                    </span>
                    Investment Details
                  </h3>
                  <div className="space-y-6">
                    <PremiumSliderInput
                      label="Starting Amount"
                      value={inputs.startingAmount}
                      onChange={(v) => updateInput("startingAmount", v)}
                      min={0}
                      max={500000}
                      step={1000}
                      icon={DollarSign}
                      formatValue={formatCurrency}
                      isCurrency
                    />

                    <PremiumSliderInput
                      label="Monthly Contribution"
                      value={inputs.monthlyContribution}
                      onChange={(v) => updateInput("monthlyContribution", v)}
                      min={0}
                      max={10000}
                      step={50}
                      icon={PiggyBank}
                      formatValue={formatCurrency}
                      isCurrency
                    />

                    <PremiumSliderInput
                      label="Expected Annual Return"
                      value={inputs.annualReturn}
                      onChange={(v) => updateInput("annualReturn", v)}
                      min={1}
                      max={15}
                      step={0.5}
                      icon={Percent}
                      suffix="%"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-text-muted p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-text-muted" />
                  <p>
                    The default {DEFAULT_ANNUAL_RETURN}% return reflects
                    historical stock market averages. Actual returns vary.
                  </p>
                </div>
              </div>

              {/* Results display */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center text-accent text-xs font-bold">
                    3
                  </span>
                  Your Projected Growth
                </h3>

                <div
                  className={cn(
                    "transition-opacity duration-200 space-y-4",
                    isAnimating ? "opacity-50" : "opacity-100"
                  )}
                >
                  <ResultCard
                    label="Estimated Future Value"
                    value={formatCurrency(results.futureValue)}
                    icon={Target}
                    highlight
                    subtext={`At age ${inputs.retirementAge}`}
                    index={0}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                      label="Total Contributions"
                      value={formatCurrency(results.totalContributions)}
                      icon={DollarSign}
                      subtext="Principal + deposits"
                      index={1}
                    />
                    <ResultCard
                      label="Total Growth"
                      value={formatCurrency(results.totalGrowth)}
                      icon={TrendingUp}
                      subtext={`+${growthPercentage}% earnings`}
                      index={2}
                    />
                  </div>

                  {/* Growth bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    className="relative bg-background-card/40 backdrop-blur-xl border border-white/[0.06] rounded-xl p-5"
                  >
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-text-secondary">Growth Breakdown</span>
                      <span className="text-text-muted text-xs">
                        {(
                          (results.totalContributions /
                            (results.futureValue || 1)) *
                          100
                        ).toFixed(0)}
                        % contributions /{" "}
                        {(
                          (results.totalGrowth / (results.futureValue || 1)) *
                          100
                        ).toFixed(0)}
                        % growth
                      </span>
                    </div>
                    <div className="h-3 bg-background-elevated rounded-full overflow-hidden">
                      <div className="h-full flex">
                        <div
                          className="bg-text-secondary/50 h-full transition-all duration-500"
                          style={{
                            width: `${(results.totalContributions / (results.futureValue || 1)) * 100}%`,
                          }}
                        />
                        <div
                          className="bg-accent h-full transition-all duration-500"
                          style={{
                            width: `${(results.totalGrowth / (results.futureValue || 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mt-3 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-text-secondary/50" />
                        <span className="text-text-muted">Contributions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-accent" />
                        <span className="text-text-muted">Compound Growth</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Strategy CTA section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-10 text-center"
          >
            <div className="max-w-2xl mx-auto">
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                If investing feels out of reach, it may not be an income problem
                — it may be a <span className="text-white font-medium">strategy problem</span>.
                We help clients optimize taxes and cash flow so they can start
                building real momentum.
              </p>

              <div className="relative inline-block group">
                <div className="absolute -inset-1 bg-accent/15 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Button
                  size="lg"
                  className="relative"
                  onClick={() => {
                    const intake = document.getElementById("intake");
                    if (intake) {
                      intake.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Get My Personalized Strategy
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="mt-8 p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl"
          >
            <p className="text-xs text-text-muted text-center leading-relaxed">
              <strong className="text-text-secondary">Disclaimer:</strong> This
              calculator is for illustrative purposes only and does not
              constitute financial advice. Actual investment returns vary and
              may be higher or lower than shown. Past performance does not
              guarantee future results.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
