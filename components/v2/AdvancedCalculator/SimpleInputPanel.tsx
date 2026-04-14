"use client";

import { useState, useRef } from "react";
import { CalculatorInputs } from "./types";

interface SimpleInputPanelProps {
  inputs: CalculatorInputs;
  onInputChange: (inputs: Partial<CalculatorInputs>) => void;
}

interface SliderFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  formatValue?: (value: number) => string;
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
  formatValue,
}: SliderFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const displayValue = formatValue ? formatValue(value) : value.toLocaleString();

  const startEditing = () => {
    setInputValue(value.toString());
    setIsEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimal point
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
            className="w-24 text-right text-sm text-white font-medium bg-background-elevated border border-accent/50 rounded px-2 py-1 focus:outline-none focus:border-accent"
            autoFocus
          />
        ) : (
          <button
            onClick={startEditing}
            title="Click to type a value"
            className="text-sm text-white font-medium tabular-nums px-2 py-1 rounded hover:bg-white/10 hover:border hover:border-accent/30 cursor-text transition-all"
          >
            {prefix}
            {displayValue}
            {suffix}
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

export function SimpleInputPanel({ inputs, onInputChange }: SimpleInputPanelProps) {
  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl">
        <p className="text-sm text-text-secondary">
          Enter your basic information to see a projection of your retirement savings growth.
        </p>
      </div>

      {/* Age Inputs */}
      <div className="bg-background-surface border border-white/[0.06] rounded-xl p-5 space-y-5">
        <h4 className="text-sm text-text-muted uppercase tracking-wider font-medium">Your Profile</h4>

        <div className="grid grid-cols-2 gap-6">
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

        <div className="pt-2 border-t border-white/[0.04]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Years until retirement:</span>
            <span className="text-white font-semibold">
              {inputs.retirementAge - inputs.currentAge} years
            </span>
          </div>
        </div>
      </div>

      {/* Financial Inputs */}
      <div className="bg-background-surface border border-white/[0.06] rounded-xl p-5 space-y-5">
        <h4 className="text-sm text-text-muted uppercase tracking-wider font-medium">Your Money</h4>

        <SliderField
          label="Current Balance"
          value={inputs.currentBalance}
          onChange={(v) => onInputChange({ currentBalance: v })}
          min={0}
          max={500000}
          step={5000}
          prefix="$"
        />

        <SliderField
          label="Monthly Contribution"
          value={inputs.monthlyContribution}
          onChange={(v) => onInputChange({ monthlyContribution: v })}
          min={0}
          max={10000}
          step={100}
          prefix="$"
        />
      </div>

      {/* Return Rate */}
      <div className="bg-background-surface border border-white/[0.06] rounded-xl p-5 space-y-5">
        <h4 className="text-sm text-text-muted uppercase tracking-wider font-medium">Growth Assumptions</h4>

        <SliderField
          label="Expected Annual Return"
          value={inputs.expectedAnnualReturn}
          onChange={(v) => onInputChange({ expectedAnnualReturn: v })}
          min={0}
          max={12}
          step={0.5}
          suffix="%"
        />

        <div className="p-3 bg-background-elevated/50 rounded-lg">
          <p className="text-xs text-text-muted leading-relaxed">
            Historical stock market returns have averaged 7-10% annually before inflation.
            A conservative estimate is 6-7%. This is not a guarantee of future returns.
          </p>
        </div>
      </div>

      {/* Quick tip */}
      <div className="p-4 bg-background-elevated/30 border border-white/[0.04] rounded-xl">
        <p className="text-xs text-text-muted text-center">
          Want more options? Switch to <span className="text-accent">Advanced</span> mode for
          target goals, phased contributions, and more.
        </p>
      </div>
    </div>
  );
}
