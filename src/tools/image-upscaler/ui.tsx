'use client'

import { useState, useRef } from 'react'
import { Upload, Download, ZoomIn, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  upscaleImage,
  downloadImage,
  formatFileSize,
  createPreviewUrl,
  type ScaleFactor,
  type UpscaleOptions,
} from './logic'

export default function ImageUpscalerUI() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [originalUrl, setOriginalUrl] = useState<string>('')
  const [upscaledUrl, setUpscaledUrl] = useState<string>('')
  const [upscaledBlob, setUpscaledBlob] = useState<Blob | null>(null)
  const [upscaledFilename, setUpscaledFilename] = useState<string>('')
  const [originalWidth, setOriginalWidth] = useState(0)
  const [originalHeight, setOriginalHeight] = useState(0)
  const [upscaledWidth, setUpscaledWidth] = useState(0)
  const [upscaledHeight, setUpscaledHeight] = useState(0)
  const [options, setOptions] = useState<UpscaleOptions>({
    scaleFactor: 2,
    quality: 90,
    maintainAspectRatio: true,
    outputFormat: 'png',
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setOriginalUrl(URL.createObjectURL(selectedFile))
    setUpscaledUrl('')
    setUpscaledBlob(null)
    setProgress(0)

    // Get image dimensions
    const img = new Image()
    img.onload = () => {
      setOriginalWidth(img.width)
      setOriginalHeight(img.height)
      URL.revokeObjectURL(img.src)
    }
    img.src = URL.createObjectURL(selectedFile)
  }

  const handleUpscale = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)

    try {
      const result = await upscaleImage(file, options, (p) => setProgress(p))
      setUpscaledBlob(result.blob)
      setUpscaledFilename(result.filename)
      setUpscaledUrl(createPreviewUrl(result.blob))
      setUpscaledWidth(result.upscaledWidth)
      setUpscaledHeight(result.upscaledHeight)
    } catch (error) {
      console.error('Upscaling failed:', error)
      alert('Failed to upscale image. Please try a different image.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!upscaledBlob || !upscaledFilename) return
    downloadImage(upscaledBlob, upscaledFilename)
  }

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl)
    if (upscaledUrl) URL.revokeObjectURL(upscaledUrl)
    setFile(null)
    setOriginalUrl('')
    setUpscaledUrl('')
    setUpscaledBlob(null)
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Upload */}
      <Card className="p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10">
            <ZoomIn className="h-10 w-10 text-purple-500" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Upload Image</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Supports JPG, PNG, WebP (Max 5MB)
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button onClick={() => fileInputRef.current?.click()} disabled={isProcessing}>
            <Upload className="w-4 h-4 mr-2" />
            {file ? 'Change Image' : 'Select Image'}
          </Button>
        </div>
      </Card>

      {/* Image Info & Settings */}
      {file && (
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Image Information</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dimensions:</span>
                <span className="font-medium">
                  {originalWidth} × {originalHeight}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span className="font-medium">{formatFileSize(file.size)}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Upscale Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Scale Factor</label>
                <div className="grid grid-cols-2 gap-2">
                  {([2, 4] as ScaleFactor[]).map((factor) => (
                    <button
                      key={factor}
                      onClick={() => setOptions({ ...options, scaleFactor: factor })}
                      className={`px-4 py-3 rounded-md border text-sm font-medium transition-colors ${
                        options.scaleFactor === factor
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-input hover:bg-muted'
                      }`}
                    >
                      <div className="text-lg font-bold">{factor}x</div>
                      <div className="text-xs opacity-90">
                        {originalWidth * factor} × {originalHeight * factor}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Quality: {options.quality}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={options.quality}
                  onChange={(e) => setOptions({ ...options, quality: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Output Format</label>
                <select
                  value={options.outputFormat}
                  onChange={(e) =>
                    setOptions({ ...options, outputFormat: e.target.value as any })
                  }
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>
            </div>
          </div>

          <Button onClick={handleUpscale} disabled={isProcessing} className="w-full">
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Upscaling... {progress}%
              </>
            ) : (
              <>
                <ZoomIn className="w-4 h-4 mr-2" />
                Upscale Image
              </>
            )}
          </Button>

          {isProcessing && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </Card>
      )}

      {/* Comparison */}
      {upscaledUrl && originalUrl && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Original vs Upscaled</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Original</span>
                <span className="font-medium">
                  {originalWidth} × {originalHeight}
                </span>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden border bg-muted">
                <img
                  src={originalUrl}
                  alt="Original"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Upscaled {options.scaleFactor}x</span>
                <span className="font-medium">
                  {upscaledWidth} × {upscaledHeight}
                </span>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden border bg-muted">
                <img
                  src={upscaledUrl}
                  alt="Upscaled"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download Upscaled
            </Button>
            <Button onClick={handleReset} variant="outline">
              Upscale Another
            </Button>
          </div>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>How it works:</strong> Uses bicubic interpolation with high-quality smoothing
            for upscaling. 4x upscaling includes sharpening for better results.
          </div>
          <div>
            <strong>Best for:</strong> Photos, artwork, and graphics. Results depend on original
            image quality.
          </div>
          <div>
            <strong>Privacy:</strong> All processing happens in your browser. No images are
            uploaded.
          </div>
        </div>
      </Card>
    </div>
  )
}
