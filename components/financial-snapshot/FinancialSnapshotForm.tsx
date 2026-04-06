"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  Home,
  DollarSign,
  CreditCard,
  PiggyBank,
  Target,
  ChevronDown,
  Building2,
} from "lucide-react";
import {
  FinancialSnapshot,
  initialSnapshot,
  incomeRanges,
  businessRevenueRanges,
  savingsRanges,
  debtRanges,
  retirementAccountTypes,
  financialGoals,
  industryOptions,
} from "./types";
import { SummaryPanel } from "./SummaryPanel";
import { cn } from "@/lib/utils";

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

function SelectField({ label, value, onChange, options, placeholder = "Select..." }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm text-text-secondary mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-background-elevated/50 border border-white/[0.08] rounded-lg px-4 py-3 text-white appearance-none cursor-pointer hover:border-white/[0.15] focus:border-accent/50 focus:outline-none transition-colors"
        >
          <option value="" className="bg-background-card">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-background-card">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  prefix?: string;
}

function InputField({ label, value, onChange, placeholder, type = "text", prefix }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm text-text-secondary mb-2">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">{prefix}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full bg-background-elevated/50 border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-text-muted hover:border-white/[0.15] focus:border-accent/50 focus:outline-none transition-colors",
            prefix && "pl-8"
          )}
        />
      </div>
    </div>
  );
}

interface CheckboxGroupProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

function CheckboxGroup({ label, options, selected, onChange }: CheckboxGroupProps) {
  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div>
      <label className="block text-sm text-text-secondary mb-3">{label}</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggleOption(opt.value)}
            className={cn(
              "px-4 py-2.5 rounded-lg text-sm font-medium transition-all border",
              selected.includes(opt.value)
                ? "bg-accent/20 border-accent/40 text-accent"
                : "bg-background-elevated/30 border-white/[0.06] text-text-secondary hover:border-white/[0.12]"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  delay?: number;
}

function SectionCard({ icon, title, description, children, delay = 0 }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-background-card/40 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 8px 32px -12px rgba(0, 0, 0, 0.4)" }}
    >
      <div className="p-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-text-muted">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </motion.div>
  );
}

export function FinancialSnapshotForm() {
  const [data, setData] = useState<FinancialSnapshot>(initialSnapshot);

  const updateBasicProfile = (field: keyof typeof data.basicProfile, value: string) => {
    setData((prev) => ({
      ...prev,
      basicProfile: { ...prev.basicProfile, [field]: value },
    }));
  };

  const updateIncome = (field: keyof typeof data.income, value: string) => {
    setData((prev) => ({
      ...prev,
      income: { ...prev.income, [field]: value },
    }));
  };

  const updateExpenses = (field: keyof typeof data.expenses, value: string) => {
    setData((prev) => ({
      ...prev,
      expenses: { ...prev.expenses, [field]: value },
    }));
  };

  const updateSavings = (field: keyof typeof data.savings, value: string | string[]) => {
    setData((prev) => ({
      ...prev,
      savings: { ...prev.savings, [field]: value },
    }));
  };

  const updateDebt = (field: keyof typeof data.debt, value: string) => {
    setData((prev) => ({
      ...prev,
      debt: { ...prev.debt, [field]: value },
    }));
  };

  const updateGoals = (goals: string[]) => {
    setData((prev) => ({
      ...prev,
      goals: { selectedGoals: goals },
    }));
  };

  const updateProfessionalProfile = (field: keyof typeof data.professionalProfile, value: string) => {
    setData((prev) => ({
      ...prev,
      professionalProfile: { ...prev.professionalProfile, [field]: value },
    }));
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Form Sections */}
      <div className="lg:col-span-2 space-y-6">
        {/* Section 1: Basic Profile */}
        <SectionCard
          icon={<User className="w-5 h-5 text-accent" />}
          title="Basic Profile"
          description="Tell us about your current situation"
          delay={0}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <SelectField
              label="Employment Status"
              value={data.basicProfile.employmentStatus}
              onChange={(v) => updateBasicProfile("employmentStatus", v)}
              options={[
                { value: "employed", label: "Employed" },
                { value: "self-employed", label: "Self-employed" },
                { value: "business-owner", label: "Business Owner" },
                { value: "exploring", label: "Exploring Options" },
              ]}
            />
            <SelectField
              label="Own a Business?"
              value={data.basicProfile.ownsBusiness}
              onChange={(v) => updateBasicProfile("ownsBusiness", v)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "planning", label: "Planning to Start" },
              ]}
            />
            <SelectField
              label="Own a Home?"
              value={data.basicProfile.ownsHome}
              onChange={(v) => updateBasicProfile("ownsHome", v)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            <InputField
              label="Age"
              value={data.basicProfile.age}
              onChange={(v) => updateBasicProfile("age", v)}
              placeholder="Enter age"
              type="number"
            />
            <SelectField
              label="Marital Status (optional)"
              value={data.basicProfile.maritalStatus}
              onChange={(v) => updateBasicProfile("maritalStatus", v)}
              options={[
                { value: "single", label: "Single" },
                { value: "married", label: "Married" },
                { value: "divorced", label: "Divorced" },
                { value: "widowed", label: "Widowed" },
              ]}
            />
            <InputField
              label="Dependents (optional)"
              value={data.basicProfile.dependents}
              onChange={(v) => updateBasicProfile("dependents", v)}
              placeholder="Number of dependents"
              type="number"
            />
          </div>
        </SectionCard>

        {/* Professional Profile */}
        <SectionCard
          icon={<Building2 className="w-5 h-5 text-accent" />}
          title="Professional Profile"
          description="Help us understand your professional situation"
          delay={0.025}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <SelectField
              label="Are you a business owner?"
              value={data.professionalProfile.isBusinessOwner}
              onChange={(v) => updateProfessionalProfile("isBusinessOwner", v)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            {data.professionalProfile.isBusinessOwner === "yes" && (
              <SelectField
                label="What industry are you in?"
                value={data.professionalProfile.industry}
                onChange={(v) => updateProfessionalProfile("industry", v)}
                options={industryOptions}
              />
            )}
          </div>
        </SectionCard>

        {/* Section 2: Income */}
        <SectionCard
          icon={<Briefcase className="w-5 h-5 text-accent" />}
          title="Income"
          description="Your household and business income"
          delay={0.05}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <SelectField
              label="Household Income Range (Annual)"
              value={data.income.householdIncomeRange}
              onChange={(v) => updateIncome("householdIncomeRange", v)}
              options={incomeRanges}
            />
            {(data.basicProfile.employmentStatus === "business-owner" ||
              data.basicProfile.ownsBusiness === "yes") && (
              <SelectField
                label="Business Revenue Range (Annual)"
                value={data.income.businessRevenueRange}
                onChange={(v) => updateIncome("businessRevenueRange", v)}
                options={businessRevenueRanges}
              />
            )}
            <InputField
              label="Other Monthly Income (optional)"
              value={data.income.otherIncome}
              onChange={(v) => updateIncome("otherIncome", v)}
              placeholder="0"
              prefix="$"
            />
          </div>
        </SectionCard>

        {/* Section 3: Monthly Expenses */}
        <SectionCard
          icon={<Home className="w-5 h-5 text-accent" />}
          title="Monthly Expenses"
          description="Estimate your typical monthly spending"
          delay={0.1}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              label="Housing (Rent/Mortgage)"
              value={data.expenses.housing}
              onChange={(v) => updateExpenses("housing", v)}
              placeholder="0"
              prefix="$"
            />
            <InputField
              label="Utilities"
              value={data.expenses.utilities}
              onChange={(v) => updateExpenses("utilities", v)}
              placeholder="0"
              prefix="$"
            />
            <InputField
              label="Insurance Premiums"
              value={data.expenses.insurance}
              onChange={(v) => updateExpenses("insurance", v)}
              placeholder="0"
              prefix="$"
            />
            <InputField
              label="Transportation"
              value={data.expenses.transportation}
              onChange={(v) => updateExpenses("transportation", v)}
              placeholder="0"
              prefix="$"
            />
            <InputField
              label="Food & Groceries"
              value={data.expenses.food}
              onChange={(v) => updateExpenses("food", v)}
              placeholder="0"
              prefix="$"
            />
            <InputField
              label="Subscriptions & Memberships"
              value={data.expenses.subscriptions}
              onChange={(v) => updateExpenses("subscriptions", v)}
              placeholder="0"
              prefix="$"
            />
            <InputField
              label="Debt Payments"
              value={data.expenses.debtPayments}
              onChange={(v) => updateExpenses("debtPayments", v)}
              placeholder="0"
              prefix="$"
            />
            <InputField
              label="Miscellaneous"
              value={data.expenses.miscellaneous}
              onChange={(v) => updateExpenses("miscellaneous", v)}
              placeholder="0"
              prefix="$"
            />
          </div>
        </SectionCard>

        {/* Section 4: Savings & Assets */}
        <SectionCard
          icon={<PiggyBank className="w-5 h-5 text-accent" />}
          title="Savings & Assets"
          description="Your current financial reserves"
          delay={0.15}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <SelectField
              label="Cash Savings Range"
              value={data.savings.cashSavingsRange}
              onChange={(v) => updateSavings("cashSavingsRange", v)}
              options={savingsRanges}
            />
            <SelectField
              label="Investments Range"
              value={data.savings.investmentsRange}
              onChange={(v) => updateSavings("investmentsRange", v)}
              options={savingsRanges}
            />
          </div>
          <CheckboxGroup
            label="Retirement Account Types"
            options={retirementAccountTypes}
            selected={data.savings.retirementAccounts}
            onChange={(v) => updateSavings("retirementAccounts", v)}
          />
        </SectionCard>

        {/* Section 5: Debt */}
        <SectionCard
          icon={<CreditCard className="w-5 h-5 text-accent" />}
          title="Debt"
          description="Your current debt obligations"
          delay={0.2}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <SelectField
              label="Credit Card Debt Range"
              value={data.debt.creditCardDebtRange}
              onChange={(v) => updateDebt("creditCardDebtRange", v)}
              options={debtRanges}
            />
            <SelectField
              label="Other Loans Range"
              value={data.debt.loansRange}
              onChange={(v) => updateDebt("loansRange", v)}
              options={debtRanges}
            />
            <SelectField
              label="Have a Mortgage?"
              value={data.debt.hasMortgage}
              onChange={(v) => updateDebt("hasMortgage", v)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          </div>
        </SectionCard>

        {/* Section 6: Goals */}
        <SectionCard
          icon={<Target className="w-5 h-5 text-accent" />}
          title="Financial Goals"
          description="What matters most to you"
          delay={0.25}
        >
          <CheckboxGroup
            label="Select all that apply"
            options={financialGoals}
            selected={data.goals.selectedGoals}
            onChange={updateGoals}
          />
        </SectionCard>
      </div>

      {/* Summary Panel - Sticky on desktop */}
      <div className="lg:col-span-1">
        <div className="lg:sticky lg:top-24">
          <SummaryPanel data={data} />
        </div>
      </div>
    </div>
  );
}
