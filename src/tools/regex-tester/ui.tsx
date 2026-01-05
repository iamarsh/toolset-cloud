'use client'

import { useState } from 'react'
import { Copy, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { testRegex, commonPatterns } from './logic'

export default function RegexTesterUI() {
  const [pattern, setPattern] = useState('')
  const [testString, setTestString] = useState('')
  const [flags, setFlags] = useState('g')
  const [copied, setCopied] = useState(false)

  const result = testRegex(pattern, testString, flags)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pattern)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ''))
    } else {
      setFlags(flags + flag)
    }
  }

  const applyPattern = (p: string) => {
    setPattern(p)
  }

  return (
    <div className="space-y-6">
      {/* Pattern Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Regex Pattern</label>
          <div className="flex gap-1">
            {['g', 'i', 'm', 's'].map((flag) => (
              <button
                key={flag}
                onClick={() => toggleFlag(flag)}
                className={`px-2 py-1 text-xs font-mono rounded ${
                  flags.includes(flag)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
                title={
                  flag === 'g' ? 'Global' :
                  flag === 'i' ? 'Case insensitive' :
                  flag === 'm' ? 'Multiline' : 'Dotall'
                }
              >
                {flag}
              </button>
            ))}
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern..."
            className={`w-full px-4 py-3 rounded-lg border font-mono text-sm ${
              !result.isValid ? 'border-red-500' : 'border-border'
            } bg-background`}
          />
          {!result.isValid && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
        {!result.isValid && (
          <p className="text-sm text-red-500">{result.error}</p>
        )}
      </div>

      {/* Common Patterns */}
      <div className="flex flex-wrap gap-2">
        {commonPatterns.map((p) => (
          <button
            key={p.name}
            onClick={() => applyPattern(p.pattern)}
            className="px-3 py-1 text-xs rounded-full bg-muted hover:bg-muted/80 transition-colors"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Test String */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Test String</label>
        <Textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter text to test against..."
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      {/* Results */}
      <div className="p-4 rounded-lg border border-border bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">
            {result.matchCount} match{result.matchCount !== 1 ? 'es' : ''} found
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            disabled={!pattern}
            className="gap-2"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? 'Copied' : 'Copy Pattern'}
          </Button>
        </div>
        
        {result.matches.length > 0 ? (
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {result.matches.map((match, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded bg-background text-sm"
              >
                <span className="text-muted-foreground text-xs w-8">#{index + 1}</span>
                <code className="font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                  {match.match}
                </code>
                <span className="text-muted-foreground text-xs">
                  index: {match.index}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {pattern ? 'No matches found' : 'Enter a pattern to start testing'}
          </p>
        )}
      </div>
    </div>
  )
}
