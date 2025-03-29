/**
 * Finance utility functions for various calculations related to personal finance
 */

/**
 * Calculate the future value of an investment with regular contributions
 * @param principal Initial investment amount
 * @param monthlyContribution Monthly contribution amount
 * @param ratePercent Annual interest rate (as a percentage)
 * @param years Number of years
 * @returns Future value
 */
export function calculateInvestmentGrowth(
  principal: number,
  monthlyContribution: number,
  ratePercent: number,
  years: number
): number {
  const monthlyRate = ratePercent / 100 / 12;
  const months = years * 12;
  
  // Future Value = P(1 + r)^n + PMT * ((1 + r)^n - 1) / r
  // Where P = initial principal, r = interest rate per period, n = number of periods, PMT = payment per period
  const futureValue = 
    principal * Math.pow(1 + monthlyRate, months) + 
    monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
  
  return futureValue;
}

/**
 * Calculate the amount needed to save monthly to reach a goal
 * @param goalAmount Target amount
 * @param currentAmount Current savings
 * @param ratePercent Annual interest rate (as a percentage)
 * @param years Number of years
 * @returns Monthly contribution needed
 */
export function calculateRequiredSavings(
  goalAmount: number,
  currentAmount: number,
  ratePercent: number,
  years: number
): number {
  const monthlyRate = ratePercent / 100 / 12;
  const months = years * 12;
  
  // PMT = (FV - P(1 + r)^n) * r / ((1 + r)^n - 1)
  // Where FV = future value, P = initial principal, r = monthly interest rate, n = number of months
  const monthlyContribution = 
    (goalAmount - currentAmount * Math.pow(1 + monthlyRate, months)) * 
    monthlyRate / 
    (Math.pow(1 + monthlyRate, months) - 1);
  
  return Math.max(0, monthlyContribution);
}

/**
 * Calculate loan payment
 * @param principal Loan amount
 * @param ratePercent Annual interest rate (as a percentage)
 * @param years Loan term in years
 * @returns Monthly payment amount
 */
export function calculateLoanPayment(
  principal: number,
  ratePercent: number,
  years: number
): number {
  const monthlyRate = ratePercent / 100 / 12;
  const months = years * 12;
  
  // PMT = P * r * (1 + r)^n / ((1 + r)^n - 1)
  // Where P = principal, r = monthly interest rate, n = number of months
  const payment = 
    principal * 
    monthlyRate * 
    Math.pow(1 + monthlyRate, months) / 
    (Math.pow(1 + monthlyRate, months) - 1);
  
  return payment;
}

/**
 * Calculate the debt payoff period
 * @param balance Current debt balance
 * @param ratePercent Annual interest rate (as a percentage)
 * @param monthlyPayment Monthly payment amount
 * @returns Number of months to pay off debt
 */
export function calculateDebtPayoffPeriod(
  balance: number,
  ratePercent: number,
  monthlyPayment: number
): number {
  const monthlyRate = ratePercent / 100 / 12;
  
  // n = -log(1 - (P * r) / PMT) / log(1 + r)
  // Where P = principal, r = monthly interest rate, PMT = monthly payment
  const months = 
    -Math.log(1 - (balance * monthlyRate) / monthlyPayment) / 
    Math.log(1 + monthlyRate);
  
  return Math.ceil(months);
}

/**
 * Calculate the compound interest
 * @param principal Initial amount
 * @param ratePercent Annual interest rate (as a percentage)
 * @param years Number of years
 * @param compoundsPerYear Number of times interest is compounded per year (default: 12)
 * @returns Future value
 */
export function calculateCompoundInterest(
  principal: number,
  ratePercent: number,
  years: number,
  compoundsPerYear: number = 12
): number {
  const rate = ratePercent / 100;
  
  // A = P(1 + r/n)^(nt)
  // Where A = final amount, P = principal, r = annual interest rate, n = compounds per year, t = time in years
  const futureValue = 
    principal * 
    Math.pow(1 + rate / compoundsPerYear, compoundsPerYear * years);
  
  return futureValue;
}

/**
 * Format currency for display
 * @param amount Amount to format
 * @param currency Currency code (default: USD)
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  decimals: number = 2
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/**
 * Calculate debt-to-income ratio
 * @param monthlyDebtPayments Total monthly debt payments
 * @param grossMonthlyIncome Gross monthly income
 * @returns Debt-to-income ratio as a percentage
 */
export function calculateDebtToIncomeRatio(
  monthlyDebtPayments: number,
  grossMonthlyIncome: number
): number {
  if (grossMonthlyIncome <= 0) {
    return 0;
  }
  
  return (monthlyDebtPayments / grossMonthlyIncome) * 100;
}

/**
 * Determine if a debt-to-income ratio is healthy
 * @param ratio Debt-to-income ratio as a percentage
 * @returns Assessment of the DTI ratio
 */
export function assessDebtToIncomeRatio(ratio: number): {
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical',
  message: string
} {
  if (ratio < 15) {
    return {
      status: 'excellent',
      message: 'Your debt load is very manageable relative to your income.'
    };
  } else if (ratio < 30) {
    return {
      status: 'good',
      message: 'You have a healthy balance between debt and income.'
    };
  } else if (ratio < 40) {
    return {
      status: 'fair',
      message: 'Your debt is still manageable but consider reducing it before taking on more.'
    };
  } else if (ratio < 50) {
    return {
      status: 'poor',
      message: 'Your debt level is concerning. Focus on debt reduction strategies.'
    };
  } else {
    return {
      status: 'critical',
      message: 'Your debt level is very high. Consider debt counseling or consolidation.'
    };
  }
}

/**
 * Calculate emergency fund target based on monthly expenses
 * @param monthlyExpenses Total monthly expenses
 * @param multiplier Number of months to cover (default: 6)
 * @returns Emergency fund target amount
 */
export function calculateEmergencyFundTarget(
  monthlyExpenses: number,
  multiplier: number = 6
): number {
  return monthlyExpenses * multiplier;
}

/**
 * Calculate retirement savings target
 * @param currentAge Current age
 * @param retirementAge Desired retirement age
 * @param annualIncome Current annual income
 * @param replacementRatio Income replacement ratio (percentage of pre-retirement income needed, default: 80%)
 * @param lifeExpectancy Expected age at end of life
 * @param currentSavings Current retirement savings
 * @param annualReturnPercent Expected annual return on investments (percentage)
 * @param inflationPercent Expected annual inflation rate (percentage, default: 2.5%)
 * @returns Target retirement savings
 */
export function calculateRetirementSavingsTarget(
  currentAge: number,
  retirementAge: number,
  annualIncome: number,
  replacementRatio: number = 80,
  lifeExpectancy: number,
  currentSavings: number,
  annualReturnPercent: number,
  inflationPercent: number = 2.5
): number {
  const yearsUntilRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;
  
  // Adjust for inflation
  const inflationAdjustedReturn = (1 + annualReturnPercent / 100) / (1 + inflationPercent / 100) - 1;
  
  // Calculate annual income needed in retirement (adjusted for inflation)
  const retirementIncomeNeeded = annualIncome * (replacementRatio / 100) * 
                                Math.pow(1 + inflationPercent / 100, yearsUntilRetirement);
  
  // Calculate present value of retirement income needed
  const presentValueOfRetirementNeeds = retirementIncomeNeeded * 
                                      (1 - Math.pow(1 + inflationAdjustedReturn, -yearsInRetirement)) / 
                                      inflationAdjustedReturn;
  
  // Calculate future value of current savings
  const futureValueOfCurrentSavings = currentSavings * 
                                    Math.pow(1 + annualReturnPercent / 100, yearsUntilRetirement);
  
  // Target is the difference between what you need and what your current savings will provide
  return Math.max(0, presentValueOfRetirementNeeds - futureValueOfCurrentSavings);
}
