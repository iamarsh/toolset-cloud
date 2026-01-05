'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { numberToWords, wordsToOrdinal } from './logic'

export default function NumberToWordsUI() {
  const [input, setInput] = useState('123')
  const [copied, setCopied] = useState<string | null>(null)

  const num = parseFloat(input)
  const words = !isNaN(num) ? numberToWords(num) : ''
  const ordinal = words ? wordsToOrdinal(words) : ''

  const handleCopy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Enter a Number</label>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="123"
          className="text-2xl font-mono text-center"
        />
      </div>

      {/* Results */}
      {words && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border bg-muted/30">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">Cardinal (words)</div>
                <div className="text-xl font-medium capitalize">{words}</div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => handleCopy(words, 'words')}>
                {copied === 'words' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border bg-muted/30">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">Ordinal</div>
                <div className="text-xl font-medium capitalize">{ordinal}</div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => handleCopy(ordinal, 'ordinal')}>
                {copied === 'ordinal' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Examples */}
      <div className="p-4 rounded-lg bg-muted/50 text-sm">
        <div className="font-medium mb-2">Quick Examples</div>
        <div className="flex flex-wrap gap-2">
          {['42', '100', '1000', '1234567', '3.14'].map((n) => (
            <button
              key={n}
              onClick={() => setInput(n)}
              className="px-3 py-1 rounded bg-background border border-border hover:bg-muted"
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
