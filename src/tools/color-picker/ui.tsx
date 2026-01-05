'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { hexToRgb, rgbToHsl, getContrastColor } from './logic'

export default function ColorPickerUI() {
  const [color, setColor] = useState('#3b82f6')
  const [copied, setCopied] = useState<string | null>(null)

  const rgb = hexToRgb(color)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null
  const contrast = getContrastColor(color)

  const formats = [
    { label: 'HEX', value: color.toUpperCase() },
    { label: 'RGB', value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '' },
    { label: 'HSL', value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '' },
  ]

  const handleCopy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Color Preview */}
      <div
        className="h-40 rounded-lg border border-border flex items-center justify-center text-2xl font-mono"
        style={{ backgroundColor: color, color: contrast }}
      >
        {color.toUpperCase()}
      </div>

      {/* Color Picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Pick a Color</label>
        <div className="flex gap-3">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-12 w-20 rounded cursor-pointer"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background font-mono uppercase"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Color Formats */}
      <div className="space-y-3">
        {formats.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
          >
            <div>
              <div className="text-xs text-muted-foreground">{label}</div>
              <div className="font-mono">{value}</div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleCopy(value, label)}
              className="gap-2"
            >
              {copied === label ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
      </div>

      {/* Preset Colors */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Presets</label>
        <div className="flex flex-wrap gap-2">
          {['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#000000', '#ffffff'].map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="h-8 w-8 rounded-lg border border-border transition-transform hover:scale-110"
              style={{ backgroundColor: c }}
              aria-label={c}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
