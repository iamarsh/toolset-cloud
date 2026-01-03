'use client'

import { useState, useMemo, useCallback } from 'react'
import { Copy, Check, Trash2, FileText, Clock, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { copyToClipboard } from '@/lib/utils'
import { countText, getTopWords } from './logic'

export default function WordCounterUI() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const stats = useMemo(() => countText(text), [text])
  const topWords = useMemo(() => getTopWords(text, 5), [text])

  const handleCopy = useCallback(async () => {
    const statsText = `Words: ${stats.words}
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Lines: ${stats.lines}
Reading time: ${stats.readingTime}
Speaking time: ${stats.speakingTime}`

    const success = await copyToClipboard(statsText)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [stats])

  const handleClear = useCallback(() => {
    setText('')
  }, [])

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setText(clipboardText)
    } catch {
      // Clipboard read failed
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={handlePaste} variant="secondary" size="sm">
          Paste Text
        </Button>
        <Button onClick={handleClear} variant="ghost" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear
        </Button>
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="sm"
          className="ml-auto"
          disabled={!text}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2 text-emerald-500" />
              Copied Stats!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy Stats
            </>
          )}
        </Button>
      </div>

      {/* Text input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Enter or paste your text</label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="min-h-[300px] text-base"
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Words"
          value={stats.words}
          icon={<FileText className="h-4 w-4" />}
          highlight
        />
        <StatCard
          label="Characters"
          value={stats.characters}
        />
        <StatCard
          label="No Spaces"
          value={stats.charactersNoSpaces}
        />
        <StatCard
          label="Sentences"
          value={stats.sentences}
        />
        <StatCard
          label="Paragraphs"
          value={stats.paragraphs}
        />
        <StatCard
          label="Lines"
          value={stats.lines}
        />
        <StatCard
          label="Reading Time"
          value={stats.readingTime}
          icon={<Clock className="h-4 w-4" />}
          isString
        />
        <StatCard
          label="Speaking Time"
          value={stats.speakingTime}
          icon={<Mic className="h-4 w-4" />}
          isString
        />
      </div>

      {/* Top words */}
      {topWords.length > 0 && (
        <div className="p-4 rounded-lg bg-muted/50">
          <h3 className="text-sm font-medium mb-3">Top Words</h3>
          <div className="flex flex-wrap gap-2">
            {topWords.map(({ word, count }) => (
              <div
                key={word}
                className="px-3 py-1.5 rounded-full bg-background border border-border text-sm"
              >
                <span className="font-medium">{word}</span>
                <span className="text-muted-foreground ml-2">×{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="text-sm text-muted-foreground">
        <p>
          <strong>Tip:</strong> Reading time is calculated at 225 words per minute. 
          Speaking time is calculated at 150 words per minute.
        </p>
      </div>
    </div>
  )
}

interface StatCardProps {
  label: string
  value: number | string
  icon?: React.ReactNode
  highlight?: boolean
  isString?: boolean
}

function StatCard({ label, value, icon, highlight, isString }: StatCardProps) {
  return (
    <div className={`p-4 rounded-lg border border-border ${highlight ? 'bg-primary/5' : 'bg-card'}`}>
      <div className="flex items-center gap-2 mb-1">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className={`font-bold ${isString ? 'text-lg' : 'text-2xl'}`}>
        {isString ? value : value.toLocaleString()}
      </p>
    </div>
  )
}
