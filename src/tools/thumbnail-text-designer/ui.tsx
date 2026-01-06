'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, Download, Plus, Trash2, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  createTextLayer,
  renderThumbnailToCanvas,
  exportThumbnail,
  fontOptions,
  type TextLayer,
} from './logic'

export default function ThumbnailTextDesignerUI() {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [textLayers, setTextLayers] = useState<TextLayer[]>([])
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const selectedLayer = textLayers.find((l) => l.id === selectedLayerId)

  useEffect(() => {
    if (image && canvasRef.current) {
      renderThumbnailToCanvas(image, textLayers, canvasRef.current)
    }
  }, [image, textLayers])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      const img = new Image()
      img.onload = () => setImage(img)
      img.src = URL.createObjectURL(file)
    }
  }

  const addTextLayer = () => {
    const newLayer = createTextLayer()
    setTextLayers((prev) => [...prev, newLayer])
    setSelectedLayerId(newLayer.id)
  }

  const updateLayer = (id: string, updates: Partial<TextLayer>) => {
    setTextLayers((prev) =>
      prev.map((layer) => (layer.id === id ? { ...layer, ...updates } : layer))
    )
  }

  const deleteLayer = (id: string) => {
    setTextLayers((prev) => prev.filter((l) => l.id !== id))
    if (selectedLayerId === id) setSelectedLayerId(null)
  }

  const handleExport = async () => {
    if (!image) return
    try {
      const { blob } = await exportThumbnail(image, textLayers)
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `thumbnail-${Date.now()}.png`
      link.click()
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {!image ? (
        <Card className="p-6">
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 border-muted-foreground/25"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> base
                image
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, WEBP (Recommended: 1280×720 for YouTube)
              </p>
            </div>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas Preview */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-4">
              <canvas ref={canvasRef} className="w-full h-auto rounded-lg" />
            </Card>
            <div className="flex gap-2">
              <Button onClick={addTextLayer} className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                Add Text Layer
              </Button>
              <Button onClick={handleExport} variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Export PNG
              </Button>
            </div>
          </div>

          {/* Text Layer Controls */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-4">
              <div className="text-sm font-medium mb-3">Text Layers</div>
              {textLayers.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No text layers. Click "Add Text Layer" to start.
                </div>
              ) : (
                <div className="space-y-2">
                  {textLayers.map((layer) => (
                    <div
                      key={layer.id}
                      className={`p-2 rounded-lg cursor-pointer flex items-center justify-between ${
                        selectedLayerId === layer.id
                          ? 'bg-primary/10 border border-primary/20'
                          : 'bg-muted/50 hover:bg-muted'
                      }`}
                      onClick={() => setSelectedLayerId(layer.id)}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Type className="w-3 h-3 shrink-0" />
                        <span className="text-sm truncate">{layer.text}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteLayer(layer.id)
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Edit Selected Layer */}
            {selectedLayer && (
              <Card className="p-4 space-y-3">
                <div className="text-sm font-medium">Edit Layer</div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Text</label>
                  <Input
                    value={selectedLayer.text}
                    onChange={(e) =>
                      updateLayer(selectedLayer.id, { text: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">X Position</label>
                    <Input
                      type="number"
                      value={selectedLayer.x}
                      onChange={(e) =>
                        updateLayer(selectedLayer.id, { x: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Y Position</label>
                    <Input
                      type="number"
                      value={selectedLayer.y}
                      onChange={(e) =>
                        updateLayer(selectedLayer.id, { y: Number(e.target.value) })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Font Size</label>
                  <Input
                    type="number"
                    value={selectedLayer.fontSize}
                    onChange={(e) =>
                      updateLayer(selectedLayer.id, {
                        fontSize: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Font Family</label>
                  <select
                    value={selectedLayer.fontFamily}
                    onChange={(e) =>
                      updateLayer(selectedLayer.id, { fontFamily: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                  >
                    {fontOptions.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Text Color</label>
                    <Input
                      type="color"
                      value={selectedLayer.color}
                      onChange={(e) =>
                        updateLayer(selectedLayer.id, { color: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Stroke Color</label>
                    <Input
                      type="color"
                      value={selectedLayer.strokeColor || '#000000'}
                      onChange={(e) =>
                        updateLayer(selectedLayer.id, { strokeColor: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Stroke Width</label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    value={selectedLayer.strokeWidth || 0}
                    onChange={(e) =>
                      updateLayer(selectedLayer.id, {
                        strokeWidth: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="flex gap-2">
                  <Badge
                    variant={selectedLayer.bold ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() =>
                      updateLayer(selectedLayer.id, { bold: !selectedLayer.bold })
                    }
                  >
                    <strong>B</strong>
                  </Badge>
                  <Badge
                    variant={selectedLayer.italic ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() =>
                      updateLayer(selectedLayer.id, {
                        italic: !selectedLayer.italic,
                      })
                    }
                  >
                    <em>I</em>
                  </Badge>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
