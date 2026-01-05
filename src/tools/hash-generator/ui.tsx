'use client'

import { useState } from 'react'
import { Copy, Check, Shield } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { copyToClipboard } from '@/lib/utils'
import { hashAlgorithms, type HashAlgorithm, hashText } from './logic'

export default function HashGeneratorUI() {
  const [input, setInput] = useState('')
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const handleHash = async () => {
    try {
      const hashed = await hashText(input, algorithm)
      setOutput(hashed)
      setError(undefined)
    } catch (e) {
      setError('Unable to hash text in this browser.')
      setOutput('')
    }
  }

  const handleCopy = async () => {
    if (!output) return
    const success = await copyToClipboard(output)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Text to hash</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            className="min-h-[160px] font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Algorithm</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as HashAlgorithm)}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {hashAlgorithms.map((alg) => (
              <option key={alg} value={alg}>
                {alg}
              </option>
            ))}
          </select>
          <Button onClick={handleHash} className="w-full">Hash</Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Result</label>
        <div className="flex flex-col md:flex-row gap-2">
          <Textarea
            value={output}
            readOnly
            placeholder="Hash output will appear here..."
            className="min-h-[120px] font-mono text-sm"
          />
          <Button variant="outline" onClick={handleCopy} disabled={!output} className="gap-2 md:w-40">
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-500" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3 w-3" />
          Runs client-side via Web Crypto; supports SHA-1, SHA-256, and SHA-512.
        </p>
      </div>
    </div>
  )
}
