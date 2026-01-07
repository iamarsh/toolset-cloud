'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'
import { Plus, Trash2, Copy, Save, X } from 'lucide-react'
import { toast } from 'sonner'
import {
  type ColorStop,
  type GradientType,
  type GradientPreset,
  generateId,
  generateGradientCSS,
  gradientPresets,
  loadSavedPresets,
  savePreset,
  deletePreset,
} from './logic'

export default function ColorGradientGeneratorTool() {
  const [type, setType] = useState<GradientType>('linear')
  const [angle, setAngle] = useState<number>(90)
  const [stops, setStops] = useState<ColorStop[]>([
    { id: generateId(), color: '#667eea', position: 0 },
    { id: generateId(), color: '#764ba2', position: 100 },
  ])
  const [savedPresets, setSavedPresets] = useState<GradientPreset[]>([])

  useEffect(() => {
    setSavedPresets(loadSavedPresets())
  }, [])

  const gradientCSS = generateGradientCSS(type, stops, angle)

  const addStop = () => {
    if (stops.length >= 10) {
      toast.error('Maximum 10 color stops allowed')
      return
    }

    const newPosition = 50
    setStops([...stops, { id: generateId(), color: '#ffffff', position: newPosition }])
  }

  const removeStop = (id: string) => {
    if (stops.length <= 2) {
      toast.error('You need at least 2 color stops')
      return
    }
    setStops(stops.filter((stop) => stop.id !== id))
  }

  const updateStop = (id: string, updates: Partial<ColorStop>) => {
    setStops(stops.map((stop) => (stop.id === id ? { ...stop, ...updates } : stop)))
  }

  const copyCSS = () => {
    navigator.clipboard.writeText(`background: ${gradientCSS};`)
    toast.success('CSS copied to clipboard')
  }

  const handleSavePreset = () => {
    const name = prompt('Enter a name for this gradient:')
    if (!name) return

    const preset: GradientPreset = {
      id: generateId(),
      name,
      type,
      angle: type === 'linear' ? angle : undefined,
      stops: stops.map(({ color, position }) => ({ color, position })),
    }

    savePreset(preset)
    setSavedPresets(loadSavedPresets())
    toast.success('Gradient saved')
  }

  const loadPreset = (preset: GradientPreset) => {
    setType(preset.type)
    if (preset.angle !== undefined) setAngle(preset.angle)
    setStops(
      preset.stops.map((stop) => ({
        id: generateId(),
        color: stop.color,
        position: stop.position,
      }))
    )
    toast.success('Gradient loaded')
  }

  const handleDeletePreset = (id: string) => {
    deletePreset(id)
    setSavedPresets(loadSavedPresets())
    toast.success('Gradient deleted')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Preview */}
      <Card className="p-6">
        <div
          className="w-full h-64 rounded-lg border"
          style={{ background: gradientCSS }}
        />
      </Card>

      {/* Controls */}
      <Card className="p-6">
        <div className="space-y-6">
          {/* Type */}
          <div className="space-y-3">
            <Label>Gradient Type</Label>
            <RadioGroup value={type} onValueChange={(v) => setType(v as GradientType)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="linear" id="linear" />
                <Label htmlFor="linear" className="font-normal cursor-pointer">
                  Linear
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="radial" id="radial" />
                <Label htmlFor="radial" className="font-normal cursor-pointer">
                  Radial
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Angle (linear only) */}
          {type === 'linear' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Angle</Label>
                <span className="text-sm font-medium">{angle}°</span>
              </div>
              <Slider
                value={[angle]}
                onValueChange={(val) => setAngle(val[0])}
                min={0}
                max={360}
                step={1}
              />
            </div>
          )}

          {/* Color Stops */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Color Stops</Label>
              <Button onClick={addStop} size="sm" disabled={stops.length >= 10}>
                <Plus className="h-4 w-4 mr-2" />
                Add Stop
              </Button>
            </div>

            <div className="space-y-3">
              {stops
                .sort((a, b) => a.position - b.position)
                .map((stop) => (
                  <div key={stop.id} className="flex gap-3 items-center">
                    <Input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                      className="w-16 h-10 cursor-pointer"
                    />
                    <Input
                      value={stop.color}
                      onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                    <div className="flex items-center gap-2 w-32">
                      <Input
                        type="number"
                        value={stop.position}
                        onChange={(e) =>
                          updateStop(stop.id, { position: Math.max(0, Math.min(100, Number(e.target.value))) })
                        }
                        min={0}
                        max={100}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeStop(stop.id)}
                      disabled={stops.length <= 2}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Card>

      {/* CSS Output */}
      <Card className="p-6">
        <div className="space-y-3">
          <Label>CSS Code</Label>
          <div className="relative">
            <pre className="p-4 rounded-lg bg-muted font-mono text-sm overflow-x-auto">
              background: {gradientCSS};
            </pre>
            <Button
              variant="outline"
              size="sm"
              onClick={copyCSS}
              className="absolute top-2 right-2"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>

        <Button onClick={handleSavePreset} className="mt-4 w-full" variant="secondary">
          <Save className="h-4 w-4 mr-2" />
          Save Gradient
        </Button>
      </Card>

      {/* Presets */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Preset Gradients</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {gradientPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadPreset(preset)}
              className="group relative h-24 rounded-lg border overflow-hidden hover:ring-2 hover:ring-primary transition-all"
              style={{
                background: generateGradientCSS(
                  preset.type,
                  preset.stops.map((s) => ({ ...s, id: generateId() })),
                  preset.angle
                ),
              }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white text-xs">
                {preset.name}
              </div>
            </button>
          ))}
        </div>

        {savedPresets.length > 0 && (
          <>
            <h3 className="text-sm font-semibold mb-3">Saved Gradients</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {savedPresets.map((preset) => (
                <div key={preset.id} className="relative group">
                  <button
                    onClick={() => loadPreset(preset)}
                    className="w-full h-24 rounded-lg border overflow-hidden hover:ring-2 hover:ring-primary transition-all"
                    style={{
                      background: generateGradientCSS(
                        preset.type,
                        preset.stops.map((s) => ({ ...s, id: generateId() })),
                        preset.angle
                      ),
                    }}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white text-xs">
                      {preset.name}
                    </div>
                  </button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeletePreset(preset.id)}
                    className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
