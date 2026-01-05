'use client'

import { useState } from 'react'
import { Copy, Check, ArrowDownUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { encodeHtml, decodeHtml } from './logic'

export default function HtmlEncoderUI() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const output = mode === 'encode' ? encodeHtml(input) : decodeHtml(input)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSwap = () => {
    setInput(output)
    setMode(mode === 'encode' ? 'decode' : 'encode')
  }

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-2 justify-center">
        {(['encode', 'decode'] as const).map((m) => (
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

      {/* Input/Output */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Input</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? '<div>Hello & World</div>' : '&lt;div&gt;Hello &amp; World&lt;/div&gt;'}
            className="min-h-[200px] font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Output</label>
          <Textarea
            value={output}
            readOnly
            className="min-h-[200px] font-mono text-sm bg-muted/30"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button onClick={handleCopy} disabled={!output} className="gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button variant="outline" onClick={handleSwap} disabled={!output} className="gap-2">
          <ArrowDownUp className="h-4 w-4" />
          Swap
        </Button>
      </div>
    </div>
  )
}
