'use client'

import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { copyToClipboard } from '@/lib/utils'
import { generateUUID } from './logic'

export default function UUIDGeneratorUI() {
  const [uuids, setUuids] = useState<string[]>([generateUUID()])
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setUuids([generateUUID(), ...uuids].slice(0, 5))
  }

  const handleCopy = async () => {
    const success = await copyToClipboard(uuids.join('\n'))
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const handleReset = () => {
    setUuids([generateUUID()])
    setCopied(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleGenerate} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Generate UUID
        </Button>
        <Button variant="outline" onClick={handleCopy} disabled={!uuids.length} className="gap-2">
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-500" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy all
            </>
          )}
        </Button>
        <Button variant="ghost" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Recent UUIDs</label>
        <Textarea
          value={uuids.join('\n')}
          readOnly
          className="min-h-[200px] font-mono text-sm"
        />
      </div>
    </div>
  )
}
