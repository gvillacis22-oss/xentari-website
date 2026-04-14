/**
 * IUL Distribution Calculator Types
 */

export type DistributionType = "fixed" | "percentage";

export interface DistributionPeriod {
  id: string;
  startAge: number;
  endAge: number;
  type: DistributionType;
  amount: number; // Fixed $ amount OR percentage
}

export interface IULInputs {
  // Basic inputs
  currentAge: number;
  retirementAge: number;
  currentBalance: number;
  monthlyContribution: number;
  expectedAnnualReturn: number;

  // Distribution periods (multiple)
  distributionPeriods: DistributionPeriod[];

  // Lump sum withdrawal
  lumpSumEnabled: boolean;
  lumpSumAge: number;
  lumpSumAmount: number;
}

export interface IULResults {
  // Without distributions
  balanceAtRetirementNoDistribution: number;
  totalContributionsNoDistribution: number;
  totalGrowthNoDistribution: number;

  // With distributions
  balanceAtRetirement: number;
  totalContributions: number;
  totalGrowth: number;
  totalDistributions: number;

  // Impact
  distributionImpact: number; // How much less you have due to distributions
  distributionImpactPercent: number;

  // Monthly income at retirement (4% rule)
  projectedMonthlyIncomeNoDistribution: number;
  projectedMonthlyIncome: number;
}

export interface YearlyProjection {
  age: number;
  balanceNoDistribution: number;
  balanceWithDistribution: number;
  yearlyDistribution: number;
  cumulativeDistributions: number;
}

export const defaultIULInputs: IULInputs = {
  currentAge: 30,
  retirementAge: 65,
  currentBalance: 25000,
  monthlyContribution: 500,
  expectedAnnualReturn: 7,
  distributionPeriods: [
    {
      id: "1",
      startAge: 60,
      endAge: 65,
      type: "fixed",
      amount: 1000,
    },
  ],
  lumpSumEnabled: false,
  lumpSumAge: 50,
  lumpSumAmount: 50000,
};

// 4% safe withdrawal rate
export const SAFE_WITHDRAWAL_RATE = 0.04;
