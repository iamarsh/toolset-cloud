/**
 * Currency Converter Logic
 */

export interface ExchangeRates {
  base: string
  rates: Record<string, number>
  timestamp: number
}

export interface ConversionResult {
  from: string
  to: string
  amount: number
  result: number
  rate: number
  timestamp: number
}

// Popular currencies
export const popularCurrencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
]

// Cache for exchange rates (avoid excessive API calls)
let ratesCache: ExchangeRates | null = null
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

export async function fetchExchangeRates(base: string = 'USD'): Promise<ExchangeRates> {
  // Check cache
  if (
    ratesCache &&
    ratesCache.base === base &&
    Date.now() - ratesCache.timestamp < CACHE_DURATION
  ) {
    return ratesCache
  }

  try {
    // Using exchangerate-api.com free tier
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`)

    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates')
    }

    const data = await response.json()

    ratesCache = {
      base: data.base,
      rates: data.rates,
      timestamp: Date.now(),
    }

    return ratesCache
  } catch (error) {
    throw new Error('Could not fetch exchange rates. Please check your connection.')
  }
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: ExchangeRates
): ConversionResult {
  // If from currency is not the base, we need to convert through base
  const fromRate = rates.rates[fromCurrency] || 1
  const toRate = rates.rates[toCurrency] || 1

  // Convert to base currency first, then to target
  const amountInBase = amount / fromRate
  const result = amountInBase * toRate
  const rate = toRate / fromRate

  return {
    from: fromCurrency,
    to: toCurrency,
    amount,
    result,
    rate,
    timestamp: rates.timestamp,
  }
}

export function formatCurrency(amount: number, currencyCode: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `${amount.toFixed(2)} ${currencyCode}`
  }
}
