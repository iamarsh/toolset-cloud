'use client'

import { useState } from 'react'
import { Trash2, ArrowLeftRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { compareTexts } from './logic'

export default function TextCompareUI() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')

  const result = compareTexts(text1, text2)
  const hasContent = text1.length > 0 || text2.length > 0

  const handleSwap = () => {
    const temp = text1
    setText1(text2)
    setText2(temp)
  }

  const handleClear = () => {
    setText1('')
    setText2('')
  }

  return (
    <div className="space-y-6">
      {/* Input Panels */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Original Text</label>
          <Textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Paste original text..."
            className="min-h-[200px] font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Modified Text</label>
          <Textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Paste modified text..."
            className="min-h-[200px] font-mono text-sm"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleSwap} className="gap-2">
          <ArrowLeftRight className="h-4 w-4" />
          Swap
        </Button>
        <Button variant="outline" onClick={handleClear} className="gap-2">
          <Trash2 className="h-4 w-4" />
          Clear
        </Button>
      </div>

      {/* Stats */}
      {hasContent && (
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-green-500/20 border border-green-500" />
            <span>{result.stats.added} added</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-red-500/20 border border-red-500" />
            <span>{result.stats.removed} removed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-muted border border-border" />
            <span>{result.stats.unchanged} unchanged</span>
          </div>
        </div>
      )}

      {/* Diff View */}
      {hasContent && (
        <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
          <div className="p-3 border-b border-border bg-muted/50">
            <span className="text-sm font-medium">Diff Result</span>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {result.lines.map((line, index) => (
              <div
                key={index}
                className={`flex font-mono text-sm ${
                  line.type === 'added'
                    ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                    : line.type === 'removed'
                    ? 'bg-red-500/10 text-red-700 dark:text-red-400'
                    : ''
                }`}
              >
                <div className="w-12 px-2 py-1 text-right text-muted-foreground border-r border-border flex-shrink-0">
                  {line.lineNumber.left || ''}
                </div>
                <div className="w-12 px-2 py-1 text-right text-muted-foreground border-r border-border flex-shrink-0">
                  {line.lineNumber.right || ''}
                </div>
                <div className="w-8 px-2 py-1 text-center border-r border-border flex-shrink-0">
                  {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                </div>
                <div className="px-3 py-1 flex-1 whitespace-pre-wrap break-all">
                  {line.content || ' '}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hasContent && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Enter text in both panels to compare</p>
        </div>
      )}
    </div>
  )
}
