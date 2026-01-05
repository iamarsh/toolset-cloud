'use client'

import { useState } from 'react'
import { ArrowRightLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { calculatePercentage, percentageChange } from './logic'

export default function PercentageCalculatorUI() {
  const [base, setBase] = useState('100')
  const [percent, setPercent] = useState('10')
  const [original, setOriginal] = useState('100')
  const [newValue, setNewValue] = useState('120')

  const percentResult = calculatePercentage(parseFloat(base) || 0, parseFloat(percent) || 0)
  const changeResult = percentageChange(parseFloat(original) || 0, parseFloat(newValue) || 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Base value</label>
          <Input type="number" value={base} onChange={(e) => setBase(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Percent (%)</label>
          <Input type="number" value={percent} onChange={(e) => setPercent(e.target.value)} />
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Result</p>
          <p className="text-xl font-semibold">{percentResult.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ArrowRightLeft className="h-4 w-4" />
        Percentage of base and change between values
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Original value</label>
          <Input type="number" value={original} onChange={(e) => setOriginal(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">New value</label>
          <Input type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
        </div>
        <div className="rounded-lg border border-border bg-card p-4 md:col-span-2">
          <p className="text-sm text-muted-foreground">% Change</p>
          <p className="text-xl font-semibold">{changeResult.toFixed(2)}%</p>
        </div>
      </div>

      <Button variant="ghost" onClick={() => {
        setBase('100')
        setPercent('10')
        setOriginal('100')
        setNewValue('120')
      }}>
        Reset defaults
      </Button>
    </div>
  )
}
