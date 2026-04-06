/**
 * Calculator Utility Functions
 * Reusable financial calculation helpers for retirement/wealth planning
 * All calculations use proper monthly compounding
 */

// ============================================
// CORE CALCULATION FUNCTIONS
// ============================================

/**
 * Calculate future value of a lump sum with compound interest
 * @param principal - Initial investment amount
 * @param annualRate - Annual interest rate (as decimal, e.g., 0.10 for 10%)
 * @param years - Number of years
 * @returns Future value of the lump sum
 */
export function futureValueLumpSum(
  principal: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 12;
  const months = years * 12;
  return principal * Math.pow(1 + monthlyRate, months);
}

/**
 * Calculate future value of recurring monthly contributions
 * @param monthlyContribution - Amount contributed each month
 * @param annualRate - Annual interest rate (as decimal)
 * @param years - Number of years
 * @returns Future value of all contributions
 */
export function futureValueMonthlyContributions(
  monthlyContribution: number,
  annualRate: number,
  years: number
): number {
  if (annualRate === 0) {
    return monthlyContribution * years * 12;
  }
  const monthlyRate = annualRate / 12;
  const months = years * 12;
  return monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
}

/**
 * Calculate future value combining lump sum and monthly contributions
 * @param principal - Initial investment
 * @param monthlyContribution - Monthly contribution amount
 * @param annualRate - Annual interest rate (as decimal)
 * @param years - Number of years
 * @returns Total future value
 */
export function futureValueCombined(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): number {
  const fvLumpSum = futureValueLumpSum(principal, annualRate, years);
  const fvContributions = futureValueMonthlyContributions(monthlyContribution, annualRate, years);
  return fvLumpSum + fvContributions;
}

/**
 * Calculate required monthly contribution to reach a target future value
 * @param targetValue - Desired future value
 * @param currentBalance - Current investment balance
 * @param annualRate - Annual interest rate (as decimal)
 * @param years - Number of years until target
 * @returns Required monthly contribution
 */
export function requiredMonthlyForTarget(
  targetValue: number,
  currentBalance: number,
  annualRate: number,
  years: number
): number {
  const fvCurrentBalance = futureValueLumpSum(currentBalance, annualRate, years);
  const remainingNeeded = targetValue - fvCurrentBalance;

  if (remainingNeeded <= 0) return 0;
  if (annualRate === 0) return remainingNeeded / (years * 12);

  const monthlyRate = annualRate / 12;
  const months = years * 12;
  const factor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;

  return remainingNeeded / factor;
}

// ============================================
// PHASED CONTRIBUTION FUNCTIONS
// ============================================

export interface ContributionPhase {
  startAge: number;
  endAge: number;
  monthlyContribution: number;
}

/**
 * Calculate future value with phased/variable contributions
 * @param currentAge - Current age of investor
 * @param retirementAge - Target retirement age
 * @param currentBalance - Current invested amount
 * @param phases - Array of contribution phases
 * @param annualRate - Annual interest rate (as decimal)
 * @returns Total future value at retirement
 */
export function futureValuePhasedContributions(
  currentAge: number,
  retirementAge: number,
  currentBalance: number,
  phases: ContributionPhase[],
  annualRate: number
): number {
  let balance = currentBalance;
  const monthlyRate = annualRate / 12;

  // Sort phases by start age
  const sortedPhases = [...phases].sort((a, b) => a.startAge - b.startAge);

  for (let age = currentAge; age < retirementAge; age++) {
    // Find the active phase for this age
    const activePhase = sortedPhases.find(
      (p) => age >= p.startAge && age < p.endAge
    );
    const monthlyContribution = activePhase?.monthlyContribution || 0;

    // Compound for 12 months at this age
    for (let month = 0; month < 12; month++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
    }
  }

  return balance;
}

/**
 * Generate phases for auto-ramp contribution mode
 * @param currentAge - Starting age
 * @param retirementAge - Target retirement age
 * @param startingContribution - Initial monthly contribution
 * @param maxContribution - Maximum monthly contribution cap
 * @param annualIncreaseRate - Annual increase rate (as decimal, e.g., 0.10 for 10%)
 * @returns Array of contribution phases
 */
export function generateAutoRampPhases(
  currentAge: number,
  retirementAge: number,
  startingContribution: number,
  maxContribution: number,
  annualIncreaseRate: number
): ContributionPhase[] {
  const phases: ContributionPhase[] = [];
  let currentContribution = startingContribution;
  let phaseStartAge = currentAge;

  for (let age = currentAge; age < retirementAge; age++) {
    const nextContribution = Math.min(
      currentContribution * (1 + annualIncreaseRate),
      maxContribution
    );

    // If contribution changes or we hit retirement, close the current phase
    if (nextContribution !== currentContribution || age === retirementAge - 1) {
      phases.push({
        startAge: phaseStartAge,
        endAge: age + 1,
        monthlyContribution: Math.round(currentContribution),
      });
      phaseStartAge = age + 1;
    }

    currentContribution = nextContribution;
  }

  return phases;
}

// ============================================
// MILESTONE & PROJECTION FUNCTIONS
// ============================================

export interface Milestone {
  age: number;
  year: number;
  balance: number;
  totalContributions: number;
  totalGrowth: number;
}

/**
 * Calculate balance at specific milestone ages
 * @param currentAge - Current age
 * @param currentBalance - Starting balance
 * @param monthlyContribution - Monthly contribution (or use phases)
 * @param annualRate - Annual interest rate
 * @param milestoneAges - Ages to calculate milestones for
 * @param phases - Optional phased contributions
 * @returns Array of milestone projections
 */
export function calculateMilestones(
  currentAge: number,
  currentBalance: number,
  monthlyContribution: number,
  annualRate: number,
  milestoneAges: number[],
  phases?: ContributionPhase[]
): Milestone[] {
  const milestones: Milestone[] = [];
  const monthlyRate = annualRate / 12;
  const currentYear = new Date().getFullYear();

  let balance = currentBalance;
  let totalContributions = currentBalance;

  // Sort milestone ages
  const sortedMilestones = [...milestoneAges].sort((a, b) => a - b);

  for (let age = currentAge; age <= Math.max(...sortedMilestones); age++) {
    // Determine contribution for this year
    let yearlyContribution = monthlyContribution;
    if (phases) {
      const activePhase = phases.find((p) => age >= p.startAge && age < p.endAge);
      yearlyContribution = activePhase?.monthlyContribution || 0;
    }

    // Compound for 12 months
    for (let month = 0; month < 12; month++) {
      balance = balance * (1 + monthlyRate) + yearlyContribution;
      totalContributions += yearlyContribution;
    }

    // Check if this is a milestone age
    if (sortedMilestones.includes(age + 1)) {
      milestones.push({
        age: age + 1,
        year: currentYear + (age + 1 - currentAge),
        balance: Math.round(balance),
        totalContributions: Math.round(totalContributions),
        totalGrowth: Math.round(balance - totalContributions),
      });
    }
  }

  return milestones;
}

/**
 * Generate year-by-year projection data for charting
 * @param currentAge - Current age
 * @param retirementAge - Target retirement age
 * @param currentBalance - Starting balance
 * @param monthlyContribution - Monthly contribution
 * @param annualRate - Annual interest rate
 * @param phases - Optional phased contributions
 * @returns Array of yearly projections
 */
export function generateYearlyProjections(
  currentAge: number,
  retirementAge: number,
  currentBalance: number,
  monthlyContribution: number,
  annualRate: number,
  phases?: ContributionPhase[]
): { age: number; balance: number; contributions: number; growth: number }[] {
  const projections: { age: number; balance: number; contributions: number; growth: number }[] = [];
  const monthlyRate = annualRate / 12;

  let balance = currentBalance;
  let totalContributions = currentBalance;

  // Add starting point
  projections.push({
    age: currentAge,
    balance: Math.round(balance),
    contributions: Math.round(totalContributions),
    growth: 0,
  });

  for (let age = currentAge; age < retirementAge; age++) {
    // Determine contribution for this year
    let yearlyContribution = monthlyContribution;
    if (phases) {
      const activePhase = phases.find((p) => age >= p.startAge && age < p.endAge);
      yearlyContribution = activePhase?.monthlyContribution || 0;
    }

    // Compound for 12 months
    for (let month = 0; month < 12; month++) {
      balance = balance * (1 + monthlyRate) + yearlyContribution;
      totalContributions += yearlyContribution;
    }

    projections.push({
      age: age + 1,
      balance: Math.round(balance),
      contributions: Math.round(totalContributions),
      growth: Math.round(balance - totalContributions),
    });
  }

  return projections;
}

// ============================================
// GAP ANALYSIS FUNCTIONS
// ============================================

export interface GapAnalysis {
  projectedValue: number;
  targetValue: number;
  gap: number;
  isOnTrack: boolean;
  progressPercent: number;
  additionalMonthlyNeeded: number;
  additionalYearsNeeded: number;
  requiredReturnRate: number;
}

/**
 * Analyze gap between projected and target values
 * @param projectedValue - Projected future value
 * @param targetValue - Target future value
 * @param currentBalance - Current balance
 * @param monthlyContribution - Current monthly contribution
 * @param annualRate - Current annual rate
 * @param yearsRemaining - Years until target date
 * @returns Gap analysis object
 */
export function analyzeGap(
  projectedValue: number,
  targetValue: number,
  currentBalance: number,
  monthlyContribution: number,
  annualRate: number,
  yearsRemaining: number
): GapAnalysis {
  const gap = targetValue - projectedValue;
  const isOnTrack = gap <= 0;
  const progressPercent = Math.min(100, (projectedValue / targetValue) * 100);

  // Calculate additional monthly needed to close gap
  const additionalMonthlyNeeded = isOnTrack
    ? 0
    : requiredMonthlyForTarget(targetValue, currentBalance, annualRate, yearsRemaining) -
      monthlyContribution;

  // Calculate additional years needed at current contribution
  let additionalYearsNeeded = 0;
  if (!isOnTrack && monthlyContribution > 0) {
    // Binary search for years needed
    let lowYears = yearsRemaining;
    let highYears = yearsRemaining + 50;
    while (highYears - lowYears > 0.5) {
      const midYears = (lowYears + highYears) / 2;
      const projectedAtMid = futureValueCombined(
        currentBalance,
        monthlyContribution,
        annualRate,
        midYears
      );
      if (projectedAtMid >= targetValue) {
        highYears = midYears;
      } else {
        lowYears = midYears;
      }
    }
    additionalYearsNeeded = Math.ceil(highYears - yearsRemaining);
  }

  // Calculate required return rate to hit target with current contributions
  let requiredReturnRate = annualRate;
  if (!isOnTrack) {
    // Binary search for required rate
    let lowRate = 0;
    let highRate = 0.30; // 30% max
    while (highRate - lowRate > 0.001) {
      const midRate = (lowRate + highRate) / 2;
      const projectedAtRate = futureValueCombined(
        currentBalance,
        monthlyContribution,
        midRate,
        yearsRemaining
      );
      if (projectedAtRate >= targetValue) {
        highRate = midRate;
      } else {
        lowRate = midRate;
      }
    }
    requiredReturnRate = highRate;
  }

  return {
    projectedValue: Math.round(projectedValue),
    targetValue: Math.round(targetValue),
    gap: Math.round(gap),
    isOnTrack,
    progressPercent: Math.round(progressPercent * 10) / 10,
    additionalMonthlyNeeded: Math.round(additionalMonthlyNeeded),
    additionalYearsNeeded,
    requiredReturnRate: Math.round(requiredReturnRate * 1000) / 10, // Convert to percentage
  };
}

// ============================================
// INFLATION ADJUSTMENT
// ============================================

/**
 * Adjust a future value for inflation to show in today's dollars
 * @param futureValue - Future value to adjust
 * @param inflationRate - Annual inflation rate (as decimal)
 * @param years - Number of years
 * @returns Present value in today's dollars
 */
export function adjustForInflation(
  futureValue: number,
  inflationRate: number,
  years: number
): number {
  return futureValue / Math.pow(1 + inflationRate, years);
}

// ============================================
// FORMATTING HELPERS
// ============================================

/**
 * Format a number as currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a number as compact currency (e.g., $1.2M)
 */
export function formatCompactCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return formatCurrency(value);
}

/**
 * Format a percentage
 */
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
