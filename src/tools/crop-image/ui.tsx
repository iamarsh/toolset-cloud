'use client'

import { useState } from 'react'
import { Upload, Download, Crop as CropIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  cropImage,
  calculateCropAreaFromAspectRatio,
  aspectRatioPresets,
  type CropArea,
} from './logic'

export default function CropImageUI() {
  const [file, setFile] = useState<File | null>(null)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 })
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [cropping, setCropping] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)
      setCroppedImage(null)

      const img = new Image()
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height })
        // Default: use full image
        setCropArea({ x: 0, y: 0, width: img.width, height: img.height })
      }
      img.src = URL.createObjectURL(selectedFile)
    }
  }

  const selectAspectRatio = (ratio: number) => {
    const newCropArea = calculateCropAreaFromAspectRatio(
      imageDimensions.width,
      imageDimensions.height,
      ratio
    )
    setCropArea(newCropArea)
  }

  const handleCrop = async () => {
    if (!file) return
    setCropping(true)
    try {
      const result = await cropImage(file, cropArea)
      setCroppedImage(result.dataUrl)
    } catch (error) {
      console.error('Crop failed:', error)
    } finally {
      setCropping(false)
    }
  }

  const handleDownload = () => {
    if (!croppedImage) return
    const link = document.createElement('a')
    link.href = croppedImage
    link.download = `cropped-${Date.now()}.png`
    link.click()
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {!file ? (
        <Card className="p-6">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 border-muted-foreground/25"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> image to crop
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, WEBP (MAX. 10MB)
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Aspect Ratio Presets */}
          <Card className="p-4">
            <div className="text-sm font-medium mb-3">Aspect Ratio Presets</div>
            <div className="flex flex-wrap gap-2">
              {aspectRatioPresets.map((preset) => (
                <Badge
                  key={preset.name}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => selectAspectRatio(preset.ratio)}
                >
                  {preset.name}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Manual Crop Controls */}
          <Card className="p-4 space-y-3">
            <div className="text-sm font-medium">Manual Crop Area</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">X</label>
                <Input
                  type="number"
                  min="0"
                  max={imageDimensions.width}
                  value={cropArea.x}
                  onChange={(e) =>
                    setCropArea((prev) => ({ ...prev, x: Number(e.target.value) }))
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Y</label>
                <Input
                  type="number"
                  min="0"
                  max={imageDimensions.height}
                  value={cropArea.y}
                  onChange={(e) =>
                    setCropArea((prev) => ({ ...prev, y: Number(e.target.value) }))
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Width</label>
                <Input
                  type="number"
                  min="1"
                  max={imageDimensions.width}
                  value={cropArea.width}
                  onChange={(e) =>
                    setCropArea((prev) => ({ ...prev, width: Number(e.target.value) }))
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Height</label>
                <Input
                  type="number"
                  min="1"
                  max={imageDimensions.height}
                  value={cropArea.height}
                  onChange={(e) =>
                    setCropArea((prev) => ({ ...prev, height: Number(e.target.value) }))
                  }
                />
              </div>
            </div>
          </Card>

          {/* Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 space-y-2">
              <div className="text-sm font-medium">Original</div>
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                {file && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Original"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {imageDimensions.width} × {imageDimensions.height}
              </div>
            </Card>

            {croppedImage && (
              <Card className="p-4 space-y-2">
                <div className="text-sm font-medium">Cropped</div>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={croppedImage}
                    alt="Cropped"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  {cropArea.width} × {cropArea.height}
                </div>
              </Card>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={handleCrop} disabled={cropping} className="flex-1">
              <CropIcon className="w-4 h-4 mr-2" />
              {cropping ? 'Cropping...' : 'Crop Image'}
            </Button>
            {croppedImage && (
              <Button onClick={handleDownload} variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
