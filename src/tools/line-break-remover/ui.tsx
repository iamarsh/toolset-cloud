'use client'

import { useState } from 'react'
import { Copy, Check, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { removeLineBreaks, getStats, type LineBreakMode } from './logic'

export default function LineBreakRemoverUI() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<LineBreakMode>('space')
  const [customSeparator, setCustomSeparator] = useState('')
  const [trimLines, setTrimLines] = useState(true)
  const [removeEmpty, setRemoveEmpty] = useState(true)
  const [copied, setCopied] = useState(false)

  const output = removeLineBreaks(input, {
    mode,
    customSeparator,
    trimLines,
    removeEmpty,
  })

  const stats = getStats(input)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInput('')
  }

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="flex flex-wrap gap-2">
        {[
          { value: 'remove', label: 'Remove All' },
          { value: 'space', label: 'Replace with Space' },
          { value: 'comma', label: 'Replace with Comma' },
          { value: 'custom', label: 'Custom' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setMode(option.value as LineBreakMode)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === option.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Custom Separator Input */}
      {mode === 'custom' && (
        <input
          type="text"
          value={customSeparator}
          onChange={(e) => setCustomSeparator(e.target.value)}
          placeholder="Enter custom separator..."
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
        />
      )}

      {/* Options */}
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
            className="rounded"
          />
          Trim lines
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={removeEmpty}
            onChange={(e) => setRemoveEmpty(e.target.checked)}
            className="rounded"
          />
          Remove empty lines
        </label>
      </div>

      {/* Input/Output */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Input</label>
            <span className="text-xs text-muted-foreground">
              {stats.lines} lines, {stats.lineBreaks} breaks
            </span>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text with line breaks..."
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Output</label>
            <span className="text-xs text-muted-foreground">
              {output.length} chars
            </span>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="min-h-[200px] font-mono text-sm bg-muted/30"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button onClick={handleCopy} disabled={!output} className="gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy Result'}
        </Button>
        <Button variant="outline" onClick={handleClear} className="gap-2">
          <Trash2 className="h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  )
}
