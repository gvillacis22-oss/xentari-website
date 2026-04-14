"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Target,
  TrendingUp,
  ChevronDown,
  Plus,
  Trash2,
  Info,
  DollarSign,
  PiggyBank,
} from "lucide-react";
import { AdvancedMode, TargetType, CalculatorInputs, ContributionPhase, SAFE_WITHDRAWAL_RATE } from "./types";
import { cn } from "@/lib/utils";

interface InputPanelProps {
  mode: AdvancedMode;
  onModeChange: (mode: AdvancedMode) => void;
  inputs: CalculatorInputs;
  onInputChange: (inputs: Partial<CalculatorInputs>) => void;
}

const modes: { id: AdvancedMode; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: "future-value",
    label: "Future Value",
    icon: <TrendingUp className="w-4 h-4" />,
    description: "See projected portfolio value",
  },
  {
    id: "goal-seek",
    label: "Goal Seek",
    icon: <Target className="w-4 h-4" />,
    description: "Find required contributions",
  },
  {
    id: "phased",
    label: "Phased Plan",
    icon: <Calculator className="w-4 h-4" />,
    description: "Ramp up over time",
  },
];

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
}

function InputField({
  label,
  value,
  onChange,
  min = 0,
  max = 100000000,
  step = 1,
  prefix,
  suffix,
  tooltip,
}: InputFieldProps) {
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
    if (e.key === "Enter") {
      handleInputBlur();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm text-text-secondary flex items-center gap-1.5">
          {label}
          {tooltip && (
            <span className="group relative">
              <Info className="w-3.5 h-3.5 text-text-muted cursor-help" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-background-elevated border border-white/10 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {tooltip}
              </span>
            </span>
          )}
        </label>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="w-24 text-right text-sm text-white font-medium bg-background-elevated border border-accent/50 rounded px-2 py-0.5 focus:outline-none focus:border-accent"
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
    </div>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm text-text-secondary">{label}</label>
        <span className="text-sm text-white font-medium tabular-nums">
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </span>
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
    </div>
  );
}

export function InputPanel({ mode, onModeChange, inputs, onInputChange }: InputPanelProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const addCustomPhase = () => {
    const lastPhase = inputs.customPhases[inputs.customPhases.length - 1];
    const newPhase: ContributionPhase = {
      id: Date.now().toString(),
      startAge: lastPhase ? lastPhase.endAge : inputs.currentAge,
      endAge: lastPhase ? Math.min(lastPhase.endAge + 5, inputs.retirementAge) : inputs.currentAge + 5,
      monthlyContribution: lastPhase ? lastPhase.monthlyContribution + 500 : 1000,
    };
    onInputChange({ customPhases: [...inputs.customPhases, newPhase] });
  };

  const removeCustomPhase = (id: string) => {
    onInputChange({ customPhases: inputs.customPhases.filter((p) => p.id !== id) });
  };

  const updateCustomPhase = (id: string, updates: Partial<ContributionPhase>) => {
    onInputChange({
      customPhases: inputs.customPhases.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    });
  };

  // Calculate implied target from income goal
  const impliedTargetFromIncome = (inputs.desiredMonthlyIncome * 12) / SAFE_WITHDRAWAL_RATE;

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="bg-background-surface border border-white/[0.06] rounded-xl p-4">
        <label className="text-sm text-text-muted uppercase tracking-wider mb-3 block">
          Planning Mode
        </label>
        <div className="grid grid-cols-3 gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => onModeChange(m.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all text-center",
                mode === m.id
                  ? "bg-accent/10 border-accent/40 text-accent"
                  : "bg-background-elevated/50 border-white/[0.06] text-text-secondary hover:border-white/[0.12]"
              )}
            >
              {m.icon}
              <span className="text-xs font-medium">{m.label}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-text-muted mt-3 text-center">
          {modes.find((m) => m.id === mode)?.description}
        </p>
      </div>

      {/* Basic Inputs */}
      <div className="bg-background-surface border border-white/[0.06] rounded-xl p-4 space-y-4">
        <h4 className="text-sm text-text-muted uppercase tracking-wider">Profile</h4>

        <div className="grid grid-cols-2 gap-4">
          <SliderField
            label="Current Age"
            value={inputs.currentAge}
            onChange={(v) => onInputChange({ currentAge: v })}
            min={18}
            max={70}
          />
          <SliderField
            label="Retirement Age"
            value={inputs.retirementAge}
            onChange={(v) => onInputChange({ retirementAge: v })}
            min={inputs.currentAge + 1}
            max={85}
          />
        </div>

        <InputField
          label="Current Invested Balance"
          value={inputs.currentBalance}
          onChange={(v) => onInputChange({ currentBalance: v })}
          prefix="$"
          min={0}
          max={10000000}
          step={1000}
        />

        <SliderField
          label="Expected Annual Return"
          value={inputs.expectedAnnualReturn}
          onChange={(v) => onInputChange({ expectedAnnualReturn: v })}
          min={0}
          max={12}
          step={0.5}
          suffix="%"
        />
      </div>

      {/* Target Type Selection (for goal-seek mode) */}
      {mode === "goal-seek" && (
        <div className="bg-background-surface border border-white/[0.06] rounded-xl p-4 space-y-4">
          <h4 className="text-sm text-text-muted uppercase tracking-wider">Target Type</h4>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onInputChange({ targetType: "lump-sum" })}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                inputs.targetType === "lump-sum"
                  ? "bg-accent/10 border-accent/40"
                  : "bg-background-elevated/50 border-white/[0.06] hover:border-white/[0.12]"
              )}
            >
              <PiggyBank className={cn(
                "w-5 h-5",
                inputs.targetType === "lump-sum" ? "text-accent" : "text-text-muted"
              )} />
              <span className={cn(
                "text-sm font-medium",
                inputs.targetType === "lump-sum" ? "text-accent" : "text-text-secondary"
              )}>
                Lump Sum Target
              </span>
              <span className="text-xs text-text-muted text-center">
                Set a total portfolio goal
              </span>
            </button>

            <button
              onClick={() => onInputChange({ targetType: "income-goal" })}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                inputs.targetType === "income-goal"
                  ? "bg-accent/10 border-accent/40"
                  : "bg-background-elevated/50 border-white/[0.06] hover:border-white/[0.12]"
              )}
            >
              <DollarSign className={cn(
                "w-5 h-5",
                inputs.targetType === "income-goal" ? "text-accent" : "text-text-muted"
              )} />
              <span className={cn(
                "text-sm font-medium",
                inputs.targetType === "income-goal" ? "text-accent" : "text-text-secondary"
              )}>
                Income Goal
              </span>
              <span className="text-xs text-text-muted text-center">
                Set desired monthly income
              </span>
            </button>
          </div>

          {inputs.targetType === "lump-sum" ? (
            <InputField
              label="Target Retirement Amount"
              value={inputs.targetRetirementAmount}
              onChange={(v) => onInputChange({ targetRetirementAmount: v })}
              prefix="$"
              min={0}
              max={20000000}
              step={10000}
            />
          ) : (
            <>
              <InputField
                label="Desired Monthly Income"
                value={inputs.desiredMonthlyIncome}
                onChange={(v) => onInputChange({ desiredMonthlyIncome: v })}
                prefix="$"
                min={0}
                max={50000}
                step={500}
                tooltip="Monthly income you want in retirement"
              />
              <div className="p-3 bg-background-elevated/50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Required Portfolio (4% rule):</span>
                  <span className="text-white font-medium">
                    ${impliedTargetFromIncome.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-text-muted mt-2">
                  The 4% safe withdrawal rate suggests you can withdraw 4% of your portfolio
                  annually in retirement without running out of money over 30 years.
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Target Amount (for future-value mode, just for comparison) */}
      {mode === "future-value" && (
        <div className="bg-background-surface border border-white/[0.06] rounded-xl p-4 space-y-4">
          <h4 className="text-sm text-text-muted uppercase tracking-wider">Target (Optional)</h4>
          <InputField
            label="Target Retirement Amount"
            value={inputs.targetRetirementAmount}
            onChange={(v) => onInputChange({ targetRetirementAmount: v })}
            prefix="$"
            min={0}
            max={20000000}
            step={10000}
            tooltip="Optional comparison target"
          />
        </div>
      )}

      {/* Contribution Inputs */}
      {(mode === "future-value" || mode === "goal-seek") && (
        <div className="bg-background-surface border border-white/[0.06] rounded-xl p-4 space-y-4">
          <h4 className="text-sm text-text-muted uppercase tracking-wider">Contributions</h4>

          <InputField
            label="Monthly Contribution"
            value={inputs.monthlyContribution}
            onChange={(v) => onInputChange({ monthlyContribution: v })}
            prefix="$"
            min={0}
            max={10000}
            step={100}
          />
        </div>
      )}

      {/* Phased Inputs */}
      {mode === "phased" && (
        <div className="bg-background-surface border border-white/[0.06] rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm text-text-muted uppercase tracking-wider">Phased Plan</h4>
            <button
              onClick={() => onInputChange({ useCustomPhases: !inputs.useCustomPhases })}
              className={cn(
                "text-xs px-2 py-1 rounded border transition-colors",
                inputs.useCustomPhases
                  ? "bg-accent/10 border-accent/40 text-accent"
                  : "border-white/[0.08] text-text-muted hover:border-white/[0.15]"
              )}
            >
              {inputs.useCustomPhases ? "Custom" : "Auto Ramp"}
            </button>
          </div>

          {!inputs.useCustomPhases ? (
            <>
              <InputField
                label="Starting Monthly Contribution"
                value={inputs.startingContribution}
                onChange={(v) => onInputChange({ startingContribution: v })}
                prefix="$"
                min={0}
                max={10000}
                step={100}
              />
              <InputField
                label="Max Monthly Contribution"
                value={inputs.maxContribution}
                onChange={(v) => onInputChange({ maxContribution: v })}
                prefix="$"
                min={inputs.startingContribution}
                max={10000}
                step={100}
              />
              <SliderField
                label="Annual Increase Rate"
                value={inputs.annualIncreaseRate}
                onChange={(v) => onInputChange({ annualIncreaseRate: v })}
                min={0}
                max={20}
                step={1}
                suffix="%"
              />
            </>
          ) : (
            <div className="space-y-3">
              {inputs.customPhases.map((phase, index) => (
                <div
                  key={phase.id}
                  className="bg-background-elevated/50 rounded-lg p-3 border border-white/[0.04]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-text-muted">Phase {index + 1}</span>
                    <button
                      onClick={() => removeCustomPhase(phase.id)}
                      className="text-text-muted hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-text-muted">Start</label>
                      <input
                        type="number"
                        value={phase.startAge}
                        onChange={(e) =>
                          updateCustomPhase(phase.id, { startAge: Number(e.target.value) })
                        }
                        className="w-full bg-background-card border border-white/[0.06] rounded px-2 py-1 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-text-muted">End</label>
                      <input
                        type="number"
                        value={phase.endAge}
                        onChange={(e) =>
                          updateCustomPhase(phase.id, { endAge: Number(e.target.value) })
                        }
                        className="w-full bg-background-card border border-white/[0.06] rounded px-2 py-1 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-text-muted">$/mo</label>
                      <input
                        type="number"
                        value={phase.monthlyContribution}
                        onChange={(e) =>
                          updateCustomPhase(phase.id, {
                            monthlyContribution: Number(e.target.value),
                          })
                        }
                        className="w-full bg-background-card border border-white/[0.06] rounded px-2 py-1 text-sm text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addCustomPhase}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-white/[0.1] text-text-muted hover:border-accent/40 hover:text-accent transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Phase
              </button>
            </div>
          )}
        </div>
      )}

      {/* Advanced Options */}
      <div className="bg-background-surface border border-white/[0.06] rounded-xl overflow-hidden">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between p-4 text-sm text-text-muted hover:text-text-secondary transition-colors"
        >
          <span>Advanced Options</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform",
              showAdvanced && "rotate-180"
            )}
          />
        </button>
        {showAdvanced && (
          <div className="p-4 pt-0 space-y-4 border-t border-white/[0.04]">
            <SliderField
              label="Inflation Rate"
              value={inputs.inflationRate}
              onChange={(v) => onInputChange({ inflationRate: v })}
              min={0}
              max={8}
              step={0.5}
              suffix="%"
            />
            <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={inputs.showInflationAdjusted}
                onChange={(e) =>
                  onInputChange({ showInflationAdjusted: e.target.checked })
                }
                className="w-4 h-4 rounded border-white/20 bg-background-elevated accent-accent"
              />
              Show inflation-adjusted values
            </label>
            <InputField
              label="Employer Match"
              value={inputs.employerMatch}
              onChange={(v) => onInputChange({ employerMatch: v })}
              suffix="%"
              min={0}
              max={100}
              tooltip="Percentage your employer matches"
            />
            <InputField
              label="Annual Lump Sum"
              value={inputs.annualLumpSum}
              onChange={(v) => onInputChange({ annualLumpSum: v })}
              prefix="$"
              min={0}
              max={100000}
              tooltip="Annual bonus contribution"
            />
          </div>
        )}
      </div>
    </div>
  );
}
