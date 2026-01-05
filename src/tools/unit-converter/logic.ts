type CategoryId = 'length' | 'weight' | 'temperature'

type Unit = {
  id: string
  label: string
  toBase: (value: number) => number
  fromBase: (value: number) => number
}

const categories: Record<CategoryId, { name: string; units: Unit[] }> = {
  length: {
    name: 'Length',
    units: [
      { id: 'm', label: 'Meters', toBase: (v) => v, fromBase: (v) => v },
      { id: 'km', label: 'Kilometers', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'mi', label: 'Miles', toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
      { id: 'ft', label: 'Feet', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    ],
  },
  weight: {
    name: 'Weight',
    units: [
      { id: 'g', label: 'Grams', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kg', label: 'Kilograms', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'lb', label: 'Pounds', toBase: (v) => v * 453.592, fromBase: (v) => v / 453.592 },
      { id: 'oz', label: 'Ounces', toBase: (v) => v * 28.3495, fromBase: (v) => v / 28.3495 },
    ],
  },
  temperature: {
    name: 'Temperature',
    units: [
      { id: 'c', label: 'Celsius', toBase: (v) => v, fromBase: (v) => v },
      { id: 'f', label: 'Fahrenheit', toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
      { id: 'k', label: 'Kelvin', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
}

export function getCategories() {
  return categories
}

export function convertValue(
  category: CategoryId,
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  const categoryUnits = categories[category]
  const from = categoryUnits.units.find((u) => u.id === fromUnit)
  const to = categoryUnits.units.find((u) => u.id === toUnit)

  if (!from || !to) return value

  const base = from.toBase(value)
  return to.fromBase(base)
}
