'use client'

import { useMemo, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { convertValue, getCategories } from './logic'

const categories = getCategories()
const categoryIds = Object.keys(categories) as (keyof typeof categories)[]

export default function UnitConverterUI() {
  const [category, setCategory] = useState<(typeof categoryIds)[number]>('length')
  const [fromUnit, setFromUnit] = useState('m')
  const [toUnit, setToUnit] = useState('km')
  const [inputValue, setInputValue] = useState('1')

  const units = categories[category].units

  const result = useMemo(() => {
    const num = parseFloat(inputValue) || 0
    const converted = convertValue(category, num, fromUnit, toUnit)
    return Number.isFinite(converted) ? converted : 0
  }, [category, inputValue, fromUnit, toUnit])

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  const handleCategoryChange = (next: (typeof categoryIds)[number]) => {
    setCategory(next)
    const units = categories[next].units
    setFromUnit(units[0].id)
    setToUnit(units[1]?.id || units[0].id)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Category</label>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value as (typeof categoryIds)[number])}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {categoryIds.map((id) => (
              <option key={id} value={id}>
                {categories[id].name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_auto_1.5fr] items-end gap-3">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Value</label>
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            min="0"
            step="any"
          />
        </div>
        <div className="flex justify-center pb-1">
          <Button type="button" variant="outline" size="icon" onClick={handleSwap}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Result</label>
          <Input value={result.toLocaleString(undefined, { maximumFractionDigits: 6 })} readOnly />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Conversions run locally in your browser. Temperature conversions normalize to Celsius, length to meters, and weight to grams before converting.
      </p>
    </div>
  )
}
