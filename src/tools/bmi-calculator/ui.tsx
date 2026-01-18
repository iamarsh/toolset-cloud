'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { calculateBMI } from './logic'

export default function BmiCalculatorUI() {
  const [weight, setWeight] = useState('70')
  const [height, setHeight] = useState('170')
  const { bmi, category } = calculateBMI(parseFloat(weight), parseFloat(height))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Weight (kg)</label>
          <Input
            type="number"
            min="1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Height (cm)</label>
          <Input
            type="number"
            min="1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">BMI</p>
          <p className="text-2xl font-semibold">{bmi ? bmi.toFixed(1) : '-'}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Category</p>
          <p className="text-lg font-medium">{category}</p>
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={() => {
          setWeight('70')
          setHeight('170')
        }}
      >
        Reset defaults
      </Button>
    </div>
  )
}
