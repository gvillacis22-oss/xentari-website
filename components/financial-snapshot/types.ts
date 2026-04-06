// Financial Snapshot Types

export interface BasicProfile {
  employmentStatus: "employed" | "self-employed" | "business-owner" | "exploring" | "";
  ownsBusiness: "yes" | "no" | "planning" | "";
  ownsHome: "yes" | "no" | "";
  age: string;
  maritalStatus: "single" | "married" | "divorced" | "widowed" | "";
  dependents: string;
}

export interface ProfessionalProfile {
  isBusinessOwner: "yes" | "no" | "";
  industry: string;
}

export interface IncomeInfo {
  householdIncomeRange: string;
  businessRevenueRange: string;
  otherIncome: string;
}

export interface MonthlyExpenses {
  housing: string;
  utilities: string;
  insurance: string;
  transportation: string;
  food: string;
  subscriptions: string;
  debtPayments: string;
  miscellaneous: string;
}

export interface SavingsAssets {
  cashSavingsRange: string;
  investmentsRange: string;
  retirementAccounts: string[];
}

export interface DebtInfo {
  creditCardDebtRange: string;
  loansRange: string;
  hasMortgage: "yes" | "no" | "";
}

export interface Goals {
  selectedGoals: string[];
}

export interface FinancialSnapshot {
  basicProfile: BasicProfile;
  professionalProfile: ProfessionalProfile;
  income: IncomeInfo;
  expenses: MonthlyExpenses;
  savings: SavingsAssets;
  debt: DebtInfo;
  goals: Goals;
}

export const initialSnapshot: FinancialSnapshot = {
  basicProfile: {
    employmentStatus: "",
    ownsBusiness: "",
    ownsHome: "",
    age: "",
    maritalStatus: "",
    dependents: "",
  },
  professionalProfile: {
    isBusinessOwner: "",
    industry: "",
  },
  income: {
    householdIncomeRange: "",
    businessRevenueRange: "",
    otherIncome: "",
  },
  expenses: {
    housing: "",
    utilities: "",
    insurance: "",
    transportation: "",
    food: "",
    subscriptions: "",
    debtPayments: "",
    miscellaneous: "",
  },
  savings: {
    cashSavingsRange: "",
    investmentsRange: "",
    retirementAccounts: [],
  },
  debt: {
    creditCardDebtRange: "",
    loansRange: "",
    hasMortgage: "",
  },
  goals: {
    selectedGoals: [],
  },
};

// Range options
export const incomeRanges = [
  { value: "0-30000", label: "Under $30,000", midpoint: 15000 },
  { value: "30000-50000", label: "$30,000 - $50,000", midpoint: 40000 },
  { value: "50000-75000", label: "$50,000 - $75,000", midpoint: 62500 },
  { value: "75000-100000", label: "$75,000 - $100,000", midpoint: 87500 },
  { value: "100000-150000", label: "$100,000 - $150,000", midpoint: 125000 },
  { value: "150000-250000", label: "$150,000 - $250,000", midpoint: 200000 },
  { value: "250000-500000", label: "$250,000 - $500,000", midpoint: 375000 },
  { value: "500000+", label: "$500,000+", midpoint: 600000 },
];

export const businessRevenueRanges = [
  { value: "0-50000", label: "Under $50,000", midpoint: 25000 },
  { value: "50000-100000", label: "$50,000 - $100,000", midpoint: 75000 },
  { value: "100000-250000", label: "$100,000 - $250,000", midpoint: 175000 },
  { value: "250000-500000", label: "$250,000 - $500,000", midpoint: 375000 },
  { value: "500000-1000000", label: "$500,000 - $1M", midpoint: 750000 },
  { value: "1000000+", label: "$1M+", midpoint: 1500000 },
];

export const savingsRanges = [
  { value: "0-1000", label: "Under $1,000", midpoint: 500 },
  { value: "1000-5000", label: "$1,000 - $5,000", midpoint: 3000 },
  { value: "5000-10000", label: "$5,000 - $10,000", midpoint: 7500 },
  { value: "10000-25000", label: "$10,000 - $25,000", midpoint: 17500 },
  { value: "25000-50000", label: "$25,000 - $50,000", midpoint: 37500 },
  { value: "50000-100000", label: "$50,000 - $100,000", midpoint: 75000 },
  { value: "100000-250000", label: "$100,000 - $250,000", midpoint: 175000 },
  { value: "250000+", label: "$250,000+", midpoint: 350000 },
];

export const debtRanges = [
  { value: "0", label: "None", midpoint: 0 },
  { value: "1-5000", label: "Under $5,000", midpoint: 2500 },
  { value: "5000-10000", label: "$5,000 - $10,000", midpoint: 7500 },
  { value: "10000-25000", label: "$10,000 - $25,000", midpoint: 17500 },
  { value: "25000-50000", label: "$25,000 - $50,000", midpoint: 37500 },
  { value: "50000-100000", label: "$50,000 - $100,000", midpoint: 75000 },
  { value: "100000+", label: "$100,000+", midpoint: 125000 },
];

export const retirementAccountTypes = [
  { value: "401k", label: "401(k)" },
  { value: "ira", label: "Traditional IRA" },
  { value: "roth-ira", label: "Roth IRA" },
  { value: "sep-ira", label: "SEP IRA" },
  { value: "simple-ira", label: "SIMPLE IRA" },
  { value: "none", label: "None" },
  { value: "not-sure", label: "Not sure" },
];

export const financialGoals = [
  { value: "reduce-taxes", label: "Reduce taxes" },
  { value: "improve-cash-flow", label: "Improve cash flow" },
  { value: "start-investing", label: "Start investing" },
  { value: "retirement-planning", label: "Retirement planning" },
  { value: "business-growth", label: "Business growth" },
  { value: "protect-family", label: "Protect family / income" },
];

export const industryOptions = [
  { value: "sales", label: "Sales" },
  { value: "finance", label: "Finance" },
  { value: "real-estate", label: "Real Estate" },
  { value: "marketing-agency", label: "Marketing / Agency" },
  { value: "consulting", label: "Consulting" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "healthcare", label: "Healthcare" },
  { value: "entertainment", label: "Entertainment" },
  { value: "technology", label: "Technology" },
  { value: "construction", label: "Construction" },
  { value: "other", label: "Other" },
];
