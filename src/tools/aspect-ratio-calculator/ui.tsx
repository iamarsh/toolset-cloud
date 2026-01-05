'use client'

import { useState } from 'react'
import { simplifyRatio, calculateDimension, commonRatios } from './logic'

export default function AspectRatioCalculatorUI() {
  const [width, setWidth] = useState(1920)
  const [height, setHeight] = useState(1080)
  const [targetWidth, setTargetWidth] = useState(1280)

  const ratio = simplifyRatio(width, height)
  const calculatedHeight = calculateDimension(targetWidth, ratio.width, ratio.height, 'width')

  const handlePreset = (w: number, h: number) => {
    setWidth(w)
    setHeight(h)
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Original Dimensions */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Original Dimensions</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Width</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Height</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
        </div>
      </div>

      {/* Aspect Ratio Result */}
      <div className="p-6 rounded-lg bg-primary/5 border border-primary/20 text-center">
        <div className="text-sm text-muted-foreground mb-1">Aspect Ratio</div>
        <div className="text-4xl font-bold">
          {ratio.width}:{ratio.height}
        </div>
      </div>

      {/* Scale Calculator */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Scale to Width</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">New Width</label>
            <input
              type="number"
              value={targetWidth}
              onChange={(e) => setTargetWidth(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">New Height</label>
            <div className="px-4 py-2 rounded-lg border border-border bg-muted/50 font-mono">
              {calculatedHeight || '—'}
            </div>
          </div>
        </div>
      </div>

      {/* Common Presets */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Common Ratios</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {commonRatios.map(({ name, w, h, use }) => (
            <button
              key={name}
              onClick={() => handlePreset(w * 100, h * 100)}
              className="p-3 rounded-lg border border-border hover:bg-muted/50 text-left"
            >
              <div className="font-mono font-bold">{name}</div>
              <div className="text-xs text-muted-foreground">{use}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
