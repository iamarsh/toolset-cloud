/**
 * Loan Calculator Logic
 */

export interface LoanResult {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  schedule: AmortizationRow[]
}

export interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export function calculateLoan(
  principal: number,
  annualRate: number,
  termMonths: number
): LoanResult {
  if (principal <= 0 || termMonths <= 0) {
    return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0, schedule: [] }
  }

  const monthlyRate = annualRate / 100 / 12

  let monthlyPayment: number
  if (monthlyRate === 0) {
    monthlyPayment = principal / termMonths
  } else {
    monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1)
  }

  const totalPayment = monthlyPayment * termMonths
  const totalInterest = totalPayment - principal

  // Generate amortization schedule
  const schedule: AmortizationRow[] = []
  let balance = principal

  for (let month = 1; month <= termMonths; month++) {
    const interestPayment = balance * monthlyRate
    const principalPayment = monthlyPayment - interestPayment
    balance = Math.max(0, balance - principalPayment)

    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance,
    })
  }

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    schedule,
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}
