'use client'

import { useState } from 'react'
import { calculateDateDiff, formatDate } from './logic'

export default function DateDiffCalculatorUI() {
  const today = new Date().toISOString().split('T')[0]
  const [date1, setDate1] = useState(today)
  const [date2, setDate2] = useState(today)

  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const isValid = !isNaN(d1.getTime()) && !isNaN(d2.getTime())
  const diff = isValid ? calculateDateDiff(d1, d2) : null

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      {/* Date Inputs */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">End Date</label>
          <input
            type="date"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background"
          />
        </div>
      </div>

      {/* Results */}
      {diff && (
        <div className="space-y-4">
          {/* Primary Result */}
          <div className="p-6 rounded-lg bg-primary/5 border border-primary/20 text-center">
            <div className="text-3xl font-bold">
              {diff.years > 0 && <span>{diff.years} years </span>}
              {diff.months > 0 && <span>{diff.months} months </span>}
              <span>{diff.days} days</span>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              between {formatDate(d1 < d2 ? d1 : d2)} and {formatDate(d1 < d2 ? d2 : d1)}
            </div>
          </div>

          {/* Detailed Results */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <div className="text-2xl font-mono">{diff.totalDays.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Days</div>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <div className="text-2xl font-mono">{diff.totalWeeks.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Weeks</div>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <div className="text-2xl font-mono">{diff.totalHours.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Hours</div>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <div className="text-2xl font-mono">{diff.totalMinutes.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Minutes</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
