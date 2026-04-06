/**
 * Advanced Calculator Types
 */

// Calculator view mode (Simple vs Advanced tabs)
export type CalculatorView = "simple" | "advanced";

// Advanced planning mode within the Advanced tab
export type AdvancedMode = "future-value" | "goal-seek" | "phased";

// Target type for goal calculations
export type TargetType = "lump-sum" | "income-goal";

export interface CalculatorInputs {
  // Basic inputs
  currentAge: number;
  retirementAge: number;
  currentBalance: number;
  targetRetirementAmount: number;
  expectedAnnualReturn: number;
  inflationRate: number;
  showInflationAdjusted: boolean;

  // Target type (for Advanced mode)
  targetType: TargetType;
  desiredMonthlyIncome: number; // For income-goal target type

  // Contribution inputs
  monthlyContribution: number;
  employerMatch: number;
  employerMatchLimit: number;
  annualLumpSum: number;

  // Phased contribution inputs
  startingContribution: number;
  maxContribution: number;
  annualIncreaseRate: number;
  useCustomPhases: boolean;
  customPhases: ContributionPhase[];
}

export interface ContributionPhase {
  id: string;
  startAge: number;
  endAge: number;
  monthlyContribution: number;
}

export interface CalculatorResults {
  projectedBalance: number;
  projectedBalanceInflationAdjusted: number;
  targetBalance: number;
  gap: number;
  isOnTrack: boolean;
  progressPercent: number;
  totalContributions: number;
  totalGrowth: number;
  requiredMonthly: number;
  additionalMonthlyNeeded: number;
  additionalYearsNeeded: number;
  requiredReturnRate: number;
  // Income goal specific
  projectedMonthlyIncome: number; // 4% withdrawal rule
}

export interface MilestoneData {
  age: number;
  year: number;
  balance: number;
  totalContributions: number;
  totalGrowth: number;
}

export interface ChartDataPoint {
  age: number;
  balance: number;
  contributions: number;
  growth: number;
  target?: number;
}

// More realistic default values
export const defaultInputs: CalculatorInputs = {
  currentAge: 30,
  retirementAge: 65,
  currentBalance: 25000,
  targetRetirementAmount: 1000000,
  expectedAnnualReturn: 7, // More realistic long-term average
  inflationRate: 3,
  showInflationAdjusted: false,
  targetType: "lump-sum",
  desiredMonthlyIncome: 5000,
  monthlyContribution: 500,
  employerMatch: 0,
  employerMatchLimit: 0,
  annualLumpSum: 0,
  startingContribution: 500,
  maxContribution: 2000,
  annualIncreaseRate: 5,
  useCustomPhases: false,
  customPhases: [],
};

// Milestone ages - show key decades
export const milestoneAges = [40, 50, 60];

// 4% safe withdrawal rate for income goal calculations
export const SAFE_WITHDRAWAL_RATE = 0.04;
