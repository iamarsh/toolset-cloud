'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { generateVariants } from './logic'

export default function SlugGeneratorUI() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const variants = generateVariants(input)

  const handleCopy = async (slug: string, label: string) => {
    await navigator.clipboard.writeText(slug)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="space-y-2">
        <label className="text-sm font-medium">Enter Text</label>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="My Blog Post Title"
          className="text-lg"
        />
      </div>

      <div className="space-y-3">
        {variants.map(({ label, slug }) => (
          <div
            key={label}
            className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
          >
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground mb-1">{label}</div>
              <div className="font-mono text-lg truncate">{slug || '-'}</div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleCopy(slug, label)}
              disabled={!slug}
            >
              {copied === label ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
        <strong>Tip:</strong> Use slugs for URLs, file names, database IDs, and CSS classes.
      </div>
    </div>
  )
}
