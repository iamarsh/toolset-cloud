'use client'

import { useState } from 'react'
import { calculateLoan, formatCurrency } from './logic'

export default function LoanCalculatorUI() {
  const [principal, setPrincipal] = useState(250000)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(30)

  const result = calculateLoan(principal, rate, years * 12)

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Inputs */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Loan Amount</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Term (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background"
          />
        </div>
      </div>

      {/* Results */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
          <div className="text-sm text-muted-foreground">Monthly Payment</div>
          <div className="text-2xl font-bold text-primary">{formatCurrency(result.monthlyPayment)}</div>
        </div>
        <div className="p-4 rounded-lg bg-muted/50 border border-border text-center">
          <div className="text-sm text-muted-foreground">Total Payment</div>
          <div className="text-2xl font-bold">{formatCurrency(result.totalPayment)}</div>
        </div>
        <div className="p-4 rounded-lg bg-muted/50 border border-border text-center">
          <div className="text-sm text-muted-foreground">Total Interest</div>
          <div className="text-2xl font-bold">{formatCurrency(result.totalInterest)}</div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 rounded-lg border border-border bg-muted/30">
        <div className="text-sm text-muted-foreground mb-2">Breakdown</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-4 rounded-full overflow-hidden bg-muted flex">
            <div
              className="h-full bg-primary"
              style={{ width: `${(principal / result.totalPayment) * 100}%` }}
            />
            <div
              className="h-full bg-orange-500"
              style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span>Principal: {formatCurrency(principal)}</span>
          <span>Interest: {formatCurrency(result.totalInterest)}</span>
        </div>
      </div>
    </div>
  )
}
