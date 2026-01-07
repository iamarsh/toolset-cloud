'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, Download, Eraser, RefreshCw, Trash2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  removeWatermark,
  downloadImage,
  formatFileSize,
  createPreviewUrl,
  type SelectionArea,
  type RemovalOptions,
} from './logic'

export default function WatermarkRemoverUI() {
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selections, setSelections] = useState<SelectionArea[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentSelection, setCurrentSelection] = useState<SelectionArea | null>(null)
  const [processedUrl, setProcessedUrl] = useState<string>('')
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null)
  const [processedFilename, setProcessedFilename] = useState<string>('')
  const [options, setOptions] = useState<RemovalOptions>({
    selections: [],
    fillMethod: 'blur',
    outputFormat: 'png',
    quality: 90,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (file && canvasRef.current) {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current!
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          drawSelections(ctx)
        }
        URL.revokeObjectURL(img.src)
      }
      img.src = URL.createObjectURL(file)
    }
  }, [file, selections])

  const drawSelections = (ctx: CanvasRenderingContext2D) => {
    selections.forEach((sel) => {
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 2
      ctx.strokeRect(sel.x, sel.y, sel.width, sel.height)
    })

    if (currentSelection) {
      ctx.strokeStyle = 'yellow'
      ctx.lineWidth = 2
      ctx.strokeRect(
        currentSelection.x,
        currentSelection.y,
        currentSelection.width,
        currentSelection.height
      )
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setImageUrl(URL.createObjectURL(selectedFile))
    setSelections([])
    setProcessedUrl('')
    setProcessedBlob(null)
    setProgress(0)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    setIsDrawing(true)
    setCurrentSelection({ x, y, width: 0, height: 0 })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentSelection) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    setCurrentSelection({
      ...currentSelection,
      width: x - currentSelection.x,
      height: y - currentSelection.y,
    })

    // Redraw
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        drawSelections(ctx)
        URL.revokeObjectURL(img.src)
      }
      img.src = imageUrl
    }
  }

  const handleMouseUp = () => {
    if (currentSelection && Math.abs(currentSelection.width) > 10 && Math.abs(currentSelection.height) > 10) {
      setSelections([...selections, currentSelection])
    }
    setIsDrawing(false)
    setCurrentSelection(null)
  }

  const handleRemoveSelection = (index: number) => {
    setSelections(selections.filter((_, i) => i !== index))
  }

  const handleProcess = async () => {
    if (!file || selections.length === 0) return

    setIsProcessing(true)
    setProgress(0)

    try {
      const processOptions: RemovalOptions = {
        ...options,
        selections,
      }

      const result = await removeWatermark(file, processOptions, (p) => setProgress(p))
      setProcessedBlob(result.blob)
      setProcessedFilename(result.filename)
      setProcessedUrl(createPreviewUrl(result.blob))
    } catch (error) {
      console.error('Watermark removal failed:', error)
      alert('Failed to remove watermark. Please try different settings.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!processedBlob || !processedFilename) return
    downloadImage(processedBlob, processedFilename)
  }

  const handleReset = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    if (processedUrl) URL.revokeObjectURL(processedUrl)
    setFile(null)
    setImageUrl('')
    setSelections([])
    setProcessedUrl('')
    setProcessedBlob(null)
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
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/10">
            <Eraser className="h-10 w-10 text-orange-500" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Upload Image</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Supports JPG, PNG, WebP (Max 10MB)
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

      {/* Selection Tool */}
      {file && !processedUrl && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Draw Selection Areas</h3>
            <span className="text-sm text-muted-foreground">{selections.length} selected</span>
          </div>

          <div className="border rounded-lg p-2 bg-muted/30 max-h-[500px] overflow-auto">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="max-w-full h-auto cursor-crosshair"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Click and drag to select watermark areas. You can add multiple selections.
          </p>

          {selections.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Selected Areas:</h4>
              <div className="space-y-1">
                {selections.map((sel, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">
                      Area {idx + 1}: {Math.abs(sel.width).toFixed(0)}×
                      {Math.abs(sel.height).toFixed(0)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSelection(idx)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Settings */}
      {file && selections.length > 0 && !processedUrl && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Removal Settings</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Fill Method</label>
              <select
                value={options.fillMethod}
                onChange={(e) => setOptions({ ...options, fillMethod: e.target.value as any })}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              >
                <option value="blur">Blur (Fast)</option>
                <option value="inpaint">Content-Aware (Better)</option>
                <option value="clone">Clone Nearby Area</option>
              </select>
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
          </div>

          <Button onClick={handleProcess} disabled={isProcessing} className="w-full">
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Removing... {progress}%
              </>
            ) : (
              <>
                <Eraser className="w-4 h-4 mr-2" />
                Remove Watermark
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

      {/* Result */}
      {processedUrl && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Watermark Removed</h3>

          <div className="border rounded-lg p-2 bg-muted/30">
            <img src={processedUrl} alt="Processed" className="max-w-full h-auto" />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleReset} variant="outline">
              Process Another
            </Button>
          </div>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>How to use:</strong> Draw rectangles around watermarks by clicking and
            dragging. Add multiple selections if needed.
          </div>
          <div>
            <strong>Fill methods:</strong> Blur is fastest, Content-Aware gives better results, Clone
            duplicates nearby areas.
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
