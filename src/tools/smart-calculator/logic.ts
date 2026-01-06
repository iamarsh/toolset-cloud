/**
 * Smart Calculator Logic
 */

import { evaluate, format } from 'mathjs'

export interface CalculationResult {
  success: boolean
  result?: string | number
  error?: string
}

export interface CalculationHistory {
  expression: string
  result: string
  timestamp: number
}

export function calculate(expression: string): CalculationResult {
  try {
    // Replace common text representations
    const normalized = expression
      .replace(/π/g, 'pi')
      .replace(/×/g, '*')
      .replace(/÷/g, '/')

    const result = evaluate(normalized)

    return {
      success: true,
      result: format(result, { precision: 14 }),
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid expression',
    }
  }
}

export const scientificFunctions = [
  { name: 'sin', description: 'Sine' },
  { name: 'cos', description: 'Cosine' },
  { name: 'tan', description: 'Tangent' },
  { name: 'asin', description: 'Arcsine' },
  { name: 'acos', description: 'Arccosine' },
  { name: 'atan', description: 'Arctangent' },
  { name: 'sqrt', description: 'Square root' },
  { name: 'log', description: 'Logarithm (base 10)' },
  { name: 'ln', description: 'Natural logarithm' },
  { name: 'exp', description: 'e^x' },
  { name: 'abs', description: 'Absolute value' },
  { name: 'ceil', description: 'Ceiling' },
  { name: 'floor', description: 'Floor' },
  { name: 'round', description: 'Round' },
]

export const constants = [
  { symbol: 'π', name: 'pi', value: Math.PI },
  { symbol: 'e', name: 'e', value: Math.E },
]

export const basicButtons = [
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '÷', value: '/' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '×', value: '*' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '-', value: '-' },
  { label: '0', value: '0' },
  { label: '.', value: '.' },
  { label: '=', value: '=' },
  { label: '+', value: '+' },
]
