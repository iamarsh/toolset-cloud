'use client'

import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { copyToClipboard } from '@/lib/utils'
import { encodeBase64, decodeBase64 } from './logic'

export default function Base64EncoderUI() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const handleProcess = () => {
    if (mode === 'encode') {
      const result = encodeBase64(input)
      setOutput(result)
      setError(undefined)
    } else {
      const result = decodeBase64(input)
      setOutput(result.result)
      setError(result.error)
    }
  }

  const handleCopy = async () => {
    if (!output) return
    const success = await copyToClipboard(output)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  const handleSwap = () => {
    setInput(output)
    setOutput(input)
    setMode(mode === 'encode' ? 'decode' : 'encode')
    setError(undefined)
  }

  return (
    <div className="space-y-6">
      <div className="inline-flex rounded-lg border border-border bg-card p-1">
        <button
          type="button"
          onClick={() => setMode('encode')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            mode === 'encode'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Encode
        </button>
        <button
          type="button"
          onClick={() => setMode('decode')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            mode === 'decode'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Decode
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            {mode === 'encode' ? 'Plain text' : 'Base64 input'}
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode…' : 'Enter Base64 to decode…'}
            className="min-h-[200px] font-mono"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            {mode === 'encode' ? 'Base64 output' : 'Decoded output'}
          </label>
          <Textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder="Result will appear here…"
            className="min-h-[200px] font-mono"
            readOnly
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Button onClick={handleProcess}>Run</Button>
        <Button onClick={handleSwap} variant="secondary" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Swap
        </Button>
        <Button
          onClick={handleCopy}
          variant="outline"
          className="gap-2"
          disabled={!output}
        >
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
    </div>
  )
}
