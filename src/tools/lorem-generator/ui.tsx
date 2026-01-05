'use client'

import { useState, useCallback } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { generateParagraphs, generateWords } from './logic'

export default function LoremGeneratorUI() {
  const [mode, setMode] = useState<'paragraphs' | 'words'>('paragraphs')
  const [count, setCount] = useState(3)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    if (mode === 'paragraphs') {
      setOutput(generateParagraphs(count))
    } else {
      setOutput(generateWords(count))
    }
  }, [mode, count])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <div className="flex gap-2">
            {(['paragraphs', 'words'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                  mode === m ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Count</label>
          <input
            type="number"
            min={1}
            max={mode === 'paragraphs' ? 20 : 500}
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-24 px-4 py-2 rounded-lg border border-border bg-background"
          />
        </div>
        <Button onClick={generate} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Generate
        </Button>
      </div>

      {/* Output */}
      <Textarea
        value={output}
        readOnly
        placeholder="Click Generate to create lorem ipsum text..."
        className="min-h-[250px] font-serif"
      />

      {/* Copy */}
      <Button onClick={handleCopy} disabled={!output} className="gap-2">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied!' : 'Copy Text'}
      </Button>
    </div>
  )
}
