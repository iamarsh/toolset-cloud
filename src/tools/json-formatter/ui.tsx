'use client'

import { useState, useCallback } from 'react'
import { Copy, Check, AlertCircle, Minimize2, Maximize2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { copyToClipboard } from '@/lib/utils'
import { formatJson, minifyJson, validateJson } from './logic'

export default function JsonFormatterUI() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [indent, setIndent] = useState(2)
  const [stats, setStats] = useState<{ keys: number; depth: number; size: number } | null>(null)

  const handleFormat = useCallback(() => {
    const result = formatJson(input, indent)
    if (result.success && result.formatted) {
      setOutput(result.formatted)
      setError(null)
      setStats(result.stats || null)
    } else {
      setError(result.error || 'Unknown error')
      setOutput('')
      setStats(null)
    }
  }, [input, indent])

  const handleMinify = useCallback(() => {
    const result = minifyJson(input)
    if (result.success && result.formatted) {
      setOutput(result.formatted)
      setError(null)
      setStats(null)
    } else {
      setError(result.error || 'Unknown error')
      setOutput('')
    }
  }, [input])

  const handleCopy = useCallback(async () => {
    if (!output) return
    const success = await copyToClipboard(output)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
    setError(null)
    setStats(null)
  }, [])

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInput(text)
      // Auto-format on paste
      const result = formatJson(text, indent)
      if (result.success && result.formatted) {
        setOutput(result.formatted)
        setError(null)
        setStats(result.stats || null)
      }
    } catch {
      // Clipboard read failed
    }
  }, [indent])

  const validation = input ? validateJson(input) : null

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Indent:</label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>1 space</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleFormat} size="sm">
            <Maximize2 className="h-4 w-4 mr-2" />
            Format
          </Button>
          <Button onClick={handleMinify} variant="secondary" size="sm">
            <Minimize2 className="h-4 w-4 mr-2" />
            Minify
          </Button>
          <Button onClick={handlePaste} variant="secondary" size="sm">
            Paste
          </Button>
          <Button onClick={handleClear} variant="ghost" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>

        {/* Validation indicator */}
        {validation && (
          <Badge
            variant={validation.valid ? 'popular' : 'destructive'}
            className={cn(
              'ml-auto',
              validation.valid ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
            )}
          >
            {validation.valid ? '✓ Valid JSON' : '✗ Invalid JSON'}
          </Badge>
        )}
      </div>

      {/* Input/Output panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Input JSON</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here...\n\n{"example": "data"}'
            className="min-h-[400px] font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Formatted Output</label>
            {output && (
              <Button
                onClick={handleCopy}
                variant="ghost"
                size="sm"
                className="h-8"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2 text-emerald-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            )}
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            className={cn(
              'min-h-[400px] font-mono text-sm',
              error && 'border-red-500/50'
            )}
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-500">Error</p>
            <p className="text-sm text-red-500/80">{error}</p>
          </div>
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="flex flex-wrap gap-6 p-4 rounded-lg bg-muted/50">
          <div>
            <p className="text-sm text-muted-foreground">Total Keys</p>
            <p className="text-2xl font-bold">{stats.keys}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Max Depth</p>
            <p className="text-2xl font-bold">{stats.depth}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Size</p>
            <p className="text-2xl font-bold">{stats.size} bytes</p>
          </div>
        </div>
      )}
    </div>
  )
}
