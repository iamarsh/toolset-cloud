'use client'

import { useState } from 'react'
import { Copy, Check, ArrowLeftRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { jsonToCsv, csvToJson } from './logic'

export default function JsonCsvConverterUI() {
  const [mode, setMode] = useState<'json-to-csv' | 'csv-to-json'>('json-to-csv')
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const jsonResult = jsonToCsv(input)
  const csvResult = csvToJson(input)
  const output = mode === 'json-to-csv' ? jsonResult.csv : csvResult.json
  const error = mode === 'json-to-csv' ? jsonResult.error : csvResult.error

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const ext = mode === 'json-to-csv' ? 'csv' : 'json'
    const type = mode === 'json-to-csv' ? 'text/csv' : 'application/json'
    const blob = new Blob([output], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `converted.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const sampleJson = `[
  { "name": "Alice", "age": 30, "city": "NYC" },
  { "name": "Bob", "age": 25, "city": "LA" }
]`

  const sampleCsv = `name,age,city
Alice,30,NYC
Bob,25,LA`

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex items-center gap-4 justify-center">
        <button
          onClick={() => { setMode('json-to-csv'); setInput('') }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'json-to-csv' ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}
        >
          JSON → CSV
        </button>
        <button
          onClick={() => { setMode('csv-to-json'); setInput('') }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'csv-to-json' ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}
        >
          CSV → JSON
        </button>
      </div>

      {/* Input/Output */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              {mode === 'json-to-csv' ? 'JSON Input' : 'CSV Input'}
            </label>
            <button
              onClick={() => setInput(mode === 'json-to-csv' ? sampleJson : sampleCsv)}
              className="text-xs text-primary hover:underline"
            >
              Load sample
            </button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'json-to-csv' ? 'Paste JSON array...' : 'Paste CSV...'}
            className="min-h-[250px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {mode === 'json-to-csv' ? 'CSV Output' : 'JSON Output'}
          </label>
          <Textarea
            value={error || output}
            readOnly
            className={`min-h-[250px] font-mono text-sm bg-muted/30 ${error ? 'text-red-500' : ''}`}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button onClick={handleCopy} disabled={!output || !!error} className="gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button variant="outline" onClick={handleDownload} disabled={!output || !!error} className="gap-2">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  )
}
