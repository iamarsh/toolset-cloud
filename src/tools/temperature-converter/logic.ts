/**
 * Temperature Converter Logic
 */

export type TempUnit = 'celsius' | 'fahrenheit' | 'kelvin'

export function convertTemperature(
  value: number,
  from: TempUnit,
  to: TempUnit
): number {
  if (from === to) return value

  // Convert to Celsius first
  let celsius: number
  switch (from) {
    case 'celsius':
      celsius = value
      break
    case 'fahrenheit':
      celsius = (value - 32) * (5 / 9)
      break
    case 'kelvin':
      celsius = value - 273.15
      break
  }

  // Convert from Celsius to target
  switch (to) {
    case 'celsius':
      return celsius
    case 'fahrenheit':
      return celsius * (9 / 5) + 32
    case 'kelvin':
      return celsius + 273.15
  }
}

export function getAllConversions(value: number, from: TempUnit) {
  return {
    celsius: convertTemperature(value, from, 'celsius'),
    fahrenheit: convertTemperature(value, from, 'fahrenheit'),
    kelvin: convertTemperature(value, from, 'kelvin'),
  }
}

export const unitLabels: Record<TempUnit, string> = {
  celsius: '°C',
  fahrenheit: '°F',
  kelvin: 'K',
}
