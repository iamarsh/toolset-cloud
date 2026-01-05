'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { copyToClipboard } from '@/lib/utils'
import { convertCase, type CaseMode } from './logic'

const modes: { value: CaseMode; label: string }[] = [
  { value: 'lower', label: 'lowercase' },
  { value: 'upper', label: 'UPPERCASE' },
  { value: 'title', label: 'Title Case' },
  { value: 'sentence', label: 'Sentence case' },
]

export default function CaseConverterUI() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<CaseMode>('sentence')
  const [copied, setCopied] = useState(false)

  const output = convertCase(input, mode)

  const handleCopy = async () => {
    if (!output) return
    const success = await copyToClipboard(output)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {modes.map((item) => (
          <Button
            key={item.value}
            variant={mode === item.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Input</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste or type your text..."
            className="min-h-[180px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Output</label>
          <Textarea value={output} readOnly className="min-h-[180px]" />
        </div>
      </div>

      <Button onClick={handleCopy} variant="outline" className="gap-2" disabled={!output}>
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-500" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy output
          </>
        )}
      </Button>
    </div>
  )
}
