'use client'

import { useState, useEffect } from 'react'
import { DollarSign, ArrowLeftRight, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import {
  fetchExchangeRates,
  convertCurrency,
  formatCurrency,
  popularCurrencies,
  type ExchangeRates,
  type ConversionResult,
} from './logic'

export default function CurrencyConverterUI() {
  const [amount, setAmount] = useState('100')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [rates, setRates] = useState<ExchangeRates | null>(null)
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadRates()
  }, [])

  const loadRates = async () => {
    setLoading(true)
    setError('')
    try {
      const exchangeRates = await fetchExchangeRates('USD')
      setRates(exchangeRates)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load rates')
    } finally {
      setLoading(false)
    }
  }

  const handleConvert = () => {
    if (!rates || !amount) return

    const numAmount = parseFloat(amount)
    if (isNaN(numAmount)) return

    const conversion = convertCurrency(numAmount, fromCurrency, toCurrency, rates)
    setResult(conversion)
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setResult(null)
  }

  useEffect(() => {
    if (rates && amount) {
      handleConvert()
    }
  }, [amount, fromCurrency, toCurrency, rates])

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="p-6 space-y-6">
        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="text-lg"
          />
        </div>

        {/* From Currency */}
        <div className="space-y-2">
          <label className="text-sm font-medium">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-base"
          >
            {popularCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={swapCurrencies}
            className="rounded-full"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </Button>
        </div>

        {/* To Currency */}
        <div className="space-y-2">
          <label className="text-sm font-medium">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-base"
          >
            {popularCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center text-sm text-muted-foreground">
            Loading exchange rates...
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <div className="p-6 rounded-lg bg-muted space-y-3">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">
                {formatCurrency(result.amount, result.from)}
              </div>
              <div className="text-3xl font-bold">
                {formatCurrency(result.result, result.to)}
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              1 {result.from} = {result.rate.toFixed(4)} {result.to}
            </div>
            <div className="text-center text-xs text-muted-foreground">
              Last updated: {new Date(result.timestamp).toLocaleString()}
            </div>
          </div>
        )}

        {/* Refresh Button */}
        <Button onClick={loadRates} variant="outline" className="w-full">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Rates
        </Button>
      </Card>

      {/* Popular Currency Quick Access */}
      <Card className="p-4">
        <div className="text-sm font-medium mb-3">Popular Conversions</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            { from: 'USD', to: 'EUR' },
            { from: 'USD', to: 'GBP' },
            { from: 'USD', to: 'JPY' },
            { from: 'EUR', to: 'USD' },
            { from: 'GBP', to: 'USD' },
            { from: 'USD', to: 'INR' },
          ].map((pair) => (
            <Button
              key={`${pair.from}-${pair.to}`}
              variant="outline"
              size="sm"
              onClick={() => {
                setFromCurrency(pair.from)
                setToCurrency(pair.to)
              }}
            >
              {pair.from} → {pair.to}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}
