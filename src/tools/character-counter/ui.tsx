'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { countCharacters, platforms, getProgress, getStatus } from './logic'

export default function CharacterCounterUI() {
  const [text, setText] = useState('')
  const stats = countCharacters(text)

  return (
    <div className="space-y-6">
      {/* Input */}
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="min-h-[150px]"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Characters', value: stats.characters },
          { label: 'No Spaces', value: stats.charactersNoSpaces },
          { label: 'Words', value: stats.words },
          { label: 'Lines', value: stats.lines },
        ].map(({ label, value }) => (
          <div key={label} className="p-3 rounded-lg bg-muted/50 text-center">
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      {/* Platform Limits */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Platform Limits</h3>
        <div className="grid gap-2">
          {platforms.map(({ name, limit, icon }) => {
            const progress = getProgress(stats.characters, limit)
            const status = getStatus(stats.characters, limit)
            const colors = {
              ok: 'bg-green-500',
              warning: 'bg-yellow-500',
              over: 'bg-red-500',
            }
            return (
              <div key={name} className="p-3 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm flex items-center gap-2">
                    <span>{icon}</span>
                    {name}
                  </span>
                  <span className={`text-sm font-mono ${status === 'over' ? 'text-red-500' : ''}`}>
                    {stats.characters}/{limit}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full transition-all ${colors[status]}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
