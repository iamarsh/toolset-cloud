'use client'

import { useState } from 'react'
import { Copy, Check, Trash2, Plus, Code, Link, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { detectType, generateId, formatTimestamp, type ClipboardItem } from './logic'

export default function OnlineClipboardUI() {
  const [items, setItems] = useState<ClipboardItem[]>([])
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const handleAdd = () => {
    if (!input.trim()) return
    const newItem: ClipboardItem = {
      id: generateId(),
      content: input.trim(),
      timestamp: Date.now(),
      type: detectType(input.trim()),
    }
    setItems([newItem, ...items])
    setInput('')
  }

  const handleCopy = async (item: ClipboardItem) => {
    await navigator.clipboard.writeText(item.content)
    setCopied(item.id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleClear = () => setItems([])

  const typeIcons = {
    text: FileText,
    code: Code,
    url: Link,
  }

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-3">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste or type anything here..."
          className="min-h-[100px] font-mono text-sm"
        />
        <div className="flex gap-2">
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            Add to Clipboard
          </Button>
          {items.length > 0 && (
            <Button variant="outline" onClick={handleClear}>
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Your clipboard is empty. Add some content above.
          </div>
        ) : (
          items.map((item) => {
            const TypeIcon = typeIcons[item.type]
            return (
              <div
                key={item.id}
                className="p-4 rounded-lg border border-border bg-card group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <TypeIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground capitalize">{item.type}</span>
                      <span className="text-xs text-muted-foreground">• {formatTimestamp(item.timestamp)}</span>
                    </div>
                    <pre className="text-sm font-mono whitespace-pre-wrap break-all bg-muted/30 p-2 rounded max-h-[100px] overflow-auto">
                      {item.content}
                    </pre>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(item)}
                    >
                      {copied === item.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(item.id)}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
