'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getAllFormats, type NumberBase } from './logic'

export default function BinaryConverterUI() {
  const [input, setInput] = useState('')
  const [base, setBase] = useState<NumberBase>('decimal')
  const [copied, setCopied] = useState<string | null>(null)

  const results = getAllFormats(input, base)

  const handleCopy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const bases: { key: NumberBase; label: string; prefix: string }[] = [
    { key: 'binary', label: 'Binary', prefix: '0b' },
    { key: 'octal', label: 'Octal', prefix: '0o' },
    { key: 'decimal', label: 'Decimal', prefix: '' },
    { key: 'hex', label: 'Hexadecimal', prefix: '0x' },
  ]

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Input Base</label>
          <div className="flex flex-wrap gap-2">
            {bases.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setBase(key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  base === key ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter ${base} number...`}
          className="font-mono text-lg"
        />
      </div>

      {/* Results */}
      <div className="space-y-3">
        {bases.map(({ key, label, prefix }) => (
          <div
            key={key}
            className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
          >
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground">{label}</div>
              <div className="font-mono text-lg truncate">
                {prefix}{results[key] || '-'}
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleCopy(results[key], key)}
              disabled={!results[key] || results[key] === 'Invalid input'}
            >
              {copied === key ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
