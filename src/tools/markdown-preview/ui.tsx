'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { parseMarkdown } from './logic'

const sampleMd = `# Hello World

This is a **bold** and *italic* text.

## Features
- Item one
- Item two
- Item three

> This is a blockquote

\`inline code\` example

[Link to Google](https://google.com)

---

### Code Block
\`\`\`
const hello = "world"
\`\`\`
`

export default function MarkdownPreviewUI() {
  const [markdown, setMarkdown] = useState(sampleMd)

  const html = parseMarkdown(markdown)

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Editor */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Markdown</label>
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type markdown here..."
            className="min-h-[400px] font-mono text-sm"
          />
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Preview</label>
          <div
            className="min-h-[400px] p-4 rounded-lg border border-border bg-card prose prose-sm dark:prose-invert max-w-none overflow-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  )
}
