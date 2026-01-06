'use client'

import { useState } from 'react'
import { Calculator, Copy, History, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { copyToClipboard } from '@/lib/utils'
import {
  calculate,
  scientificFunctions,
  constants,
  type CalculationHistory,
} from './logic'

export default function SmartCalculatorUI() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [history, setHistory] = useState<CalculationHistory[]>([])

  const handleCalculate = () => {
    if (!expression.trim()) return

    const calcResult = calculate(expression)

    if (calcResult.success && calcResult.result !== undefined) {
      const resultStr = String(calcResult.result)
      setResult(resultStr)
      setError('')
      setHistory((prev) => [
        {
          expression,
          result: resultStr,
          timestamp: Date.now(),
        },
        ...prev.slice(0, 9), // Keep last 10
      ])
    } else {
      setResult('')
      setError(calcResult.error || 'Calculation failed')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate()
    }
  }

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      handleCalculate()
    } else if (value === 'C') {
      setExpression('')
      setResult('')
      setError('')
    } else if (value === 'DEL') {
      setExpression((prev) => prev.slice(0, -1))
    } else {
      setExpression((prev) => prev + value)
    }
  }

  const insertFunction = (fn: string) => {
    setExpression((prev) => prev + fn + '(')
  }

  const insertConstant = (constant: string) => {
    setExpression((prev) => prev + constant)
  }

  const clearHistory = () => {
    setHistory([])
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 space-y-4">
            {/* Display */}
            <div className="space-y-2">
              <Input
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter expression (e.g., sqrt(16) + sin(30))..."
                className="text-lg font-mono"
              />
              {result && (
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                  <div className="text-2xl font-mono font-bold">{result}</div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(result)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              )}
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Basic Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {['7', '8', '9', '÷'].map((btn) => (
                <Button
                  key={btn}
                  variant="outline"
                  onClick={() => handleButtonClick(btn === '÷' ? '/' : btn)}
                >
                  {btn}
                </Button>
              ))}
              {['4', '5', '6', '×'].map((btn) => (
                <Button
                  key={btn}
                  variant="outline"
                  onClick={() => handleButtonClick(btn === '×' ? '*' : btn)}
                >
                  {btn}
                </Button>
              ))}
              {['1', '2', '3', '-'].map((btn) => (
                <Button
                  key={btn}
                  variant="outline"
                  onClick={() => handleButtonClick(btn)}
                >
                  {btn}
                </Button>
              ))}
              {['0', '.', '=', '+'].map((btn) => (
                <Button
                  key={btn}
                  variant={btn === '=' ? 'default' : 'outline'}
                  onClick={() => handleButtonClick(btn)}
                >
                  {btn}
                </Button>
              ))}
            </div>

            {/* Function Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleButtonClick('(')}
              >
                (
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleButtonClick(')')}
              >
                )
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleButtonClick('^')}
              >
                x^y
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleButtonClick('C')}
              >
                C
              </Button>
            </div>

            <Button onClick={handleCalculate} className="w-full">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate
            </Button>
          </Card>

          {/* Functions & Constants */}
          <Card className="p-4 space-y-3">
            <div className="text-sm font-medium">Functions</div>
            <div className="flex flex-wrap gap-2">
              {scientificFunctions.map((fn) => (
                <Badge
                  key={fn.name}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => insertFunction(fn.name)}
                >
                  {fn.name}()
                </Badge>
              ))}
            </div>
            <div className="text-sm font-medium pt-2">Constants</div>
            <div className="flex flex-wrap gap-2">
              {constants.map((c) => (
                <Badge
                  key={c.name}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => insertConstant(c.name)}
                >
                  {c.symbol} ({c.name})
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* History */}
        <div className="lg:col-span-1">
          <Card className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <History className="w-4 h-4" />
                History
              </div>
              {history.length > 0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearHistory}
                  className="h-6 px-2"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-8">
                No calculations yet
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => setExpression(item.expression)}
                  >
                    <div className="text-xs font-mono text-muted-foreground truncate">
                      {item.expression}
                    </div>
                    <div className="text-sm font-mono font-medium">
                      = {item.result}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
