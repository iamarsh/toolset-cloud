'use client'

import { useState } from 'react'
import { getAllConversions, unitLabels, type TempUnit } from './logic'

export default function TemperatureConverterUI() {
  const [value, setValue] = useState('')
  const [unit, setUnit] = useState<TempUnit>('celsius')

  const numValue = parseFloat(value) || 0
  const conversions = getAllConversions(numValue, unit)

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Enter Temperature</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0"
            className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-lg font-mono"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as TempUnit)}
            className="px-4 py-3 rounded-lg border border-border bg-background"
          >
            <option value="celsius">Celsius (°C)</option>
            <option value="fahrenheit">Fahrenheit (°F)</option>
            <option value="kelvin">Kelvin (K)</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-3">
        {(Object.keys(conversions) as TempUnit[]).map((key) => (
          <div
            key={key}
            className={`p-4 rounded-lg border ${
              key === unit ? 'border-primary bg-primary/5' : 'border-border'
            }`}
          >
            <div className="text-sm text-muted-foreground capitalize">{key}</div>
            <div className="text-2xl font-mono">
              {value ? conversions[key].toFixed(2) : '0.00'} {unitLabels[key]}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Conversions */}
      <div className="text-sm text-muted-foreground space-y-1">
        <p>• Water freezes at 0°C = 32°F = 273.15K</p>
        <p>• Water boils at 100°C = 212°F = 373.15K</p>
        <p>• Absolute zero is -273.15°C = -459.67°F = 0K</p>
      </div>
    </div>
  )
}
