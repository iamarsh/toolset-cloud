'use client'

import { useState } from 'react'
import { Upload, Download, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { resizeImage, presetSizes, type ImageDimensions } from './logic'

export default function ImageResizerUI() {
  const [file, setFile] = useState<File | null>(null)
  const [originalDimensions, setOriginalDimensions] = useState<ImageDimensions | null>(null)
  const [width, setWidth] = useState<number>(800)
  const [height, setHeight] = useState<number>(600)
  const [maintainAspect, setMaintainAspect] = useState(true)
  const [resizedImage, setResizedImage] = useState<string | null>(null)
  const [resizedDimensions, setResizedDimensions] = useState<ImageDimensions | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)
      setResizedImage(null)
      
      // Get original dimensions
      const img = new Image()
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height })
        setWidth(img.width)
        setHeight(img.height)
      }
      img.src = URL.createObjectURL(selectedFile)
    }
  }

  const handleResize = async () => {
    if (!file) return
    
    setLoading(true)
    try {
      const result = await resizeImage(file, width, height, maintainAspect)
      setResizedImage(result.dataUrl)
      setResizedDimensions(result.dimensions)
    } catch (error) {
      console.error('Resize failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!resizedImage) return
    const link = document.createElement('a')
    link.href = resizedImage
    link.download = `resized-${file?.name || 'image.png'}`
    link.click()
  }

  const applyPreset = (preset: typeof presetSizes[0]) => {
    setWidth(preset.width)
    setHeight(preset.height)
  }

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-8 bg-muted/30">
        <Upload className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-sm text-muted-foreground mb-4">Upload an image to resize</p>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="max-w-xs"
        />
      </div>

      {file && originalDimensions && (
        <>
          {/* Original Image Info */}
          <div className="p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon className="h-4 w-4" />
              <span className="font-medium">{file.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Original: {originalDimensions.width} × {originalDimensions.height}px
            </p>
          </div>

          {/* Presets */}
          <div>
            <label className="text-sm font-medium mb-2 block">Quick Presets</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {presetSizes.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="p-3 text-left rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="font-medium text-sm">{preset.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {preset.width} × {preset.height}
                  </div>
                  <div className="text-xs text-muted-foreground">{preset.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Dimensions */}
          <div className="space-y-4">
            <label className="text-sm font-medium">Custom Dimensions</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Width (px)</label>
                <Input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                  min="1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Height (px)</label>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                  min="1"
                />
              </div>
            </div>
            
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={maintainAspect}
                onChange={(e) => setMaintainAspect(e.target.checked)}
                className="rounded"
              />
              Maintain aspect ratio
            </label>
          </div>

          {/* Resize Button */}
          <Button onClick={handleResize} disabled={loading} className="w-full">
            {loading ? 'Resizing...' : 'Resize Image'}
          </Button>

          {/* Preview & Download */}
          {resizedImage && resizedDimensions && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm font-medium mb-2">
                  Resized: {resizedDimensions.width} × {resizedDimensions.height}px
                </p>
                <img
                  src={resizedImage}
                  alt="Resized preview"
                  className="w-full max-w-md mx-auto rounded border border-border"
                />
              </div>
              
              <Button onClick={handleDownload} variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Resized Image
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
