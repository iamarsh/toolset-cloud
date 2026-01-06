'use client'

import { useState, useRef, useEffect } from 'react'
import { Pen, Type, Upload, Download, Trash2, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  createSignatureFromCanvas,
  drawTypedSignature,
  getSignatureFonts,
  getSignatureSizes,
  downloadSignature,
  downloadSignatureAsSVG,
  saveSignature,
  getAllSignatures,
  deleteSignature,
  resizeCanvas,
  clearCanvas,
  loadImageToCanvas,
  formatDate,
  type Signature,
  type SignatureFont,
  type SignatureSize,
} from './logic'

export default function SignatureMakerUI() {
  const [mode, setMode] = useState<'draw' | 'type' | 'upload'>('draw')
  const [typedText, setTypedText] = useState('')
  const [selectedFont, setSelectedFont] = useState<SignatureFont>('Dancing Script')
  const [signatureColor, setSignatureColor] = useState('#000000')
  const [signatureSize, setSignatureSize] = useState<SignatureSize>('medium')
  const [savedSignatures, setSavedSignatures] = useState<Signature[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [signatureName, setSignatureName] = useState('')

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fonts = getSignatureFonts()
  const sizes = getSignatureSizes()

  useEffect(() => {
    setSavedSignatures(getAllSignatures())
    if (canvasRef.current) {
      resizeCanvas(canvasRef.current, signatureSize)
      setupCanvas()
    }
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      resizeCanvas(canvasRef.current, signatureSize)
      if (mode === 'type' && typedText) {
        drawTypedSignature(canvasRef.current, typedText, selectedFont, signatureColor)
      }
    }
  }, [signatureSize])

  useEffect(() => {
    if (mode === 'type' && canvasRef.current && typedText) {
      drawTypedSignature(canvasRef.current, typedText, selectedFont, signatureColor)
    }
  }, [mode, typedText, selectedFont, signatureColor])

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.strokeStyle = signatureColor
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (mode !== 'draw') return
    setIsDrawing(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || mode !== 'draw') return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const handleClear = () => {
    if (canvasRef.current) {
      clearCanvas(canvasRef.current)
    }
    if (mode === 'type') {
      setTypedText('')
    }
  }

  const handleModeChange = (newMode: 'draw' | 'type' | 'upload') => {
    setMode(newMode)
    if (canvasRef.current) {
      clearCanvas(canvasRef.current)
    }
    setTypedText('')
    setupCanvas()
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !canvasRef.current) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      const imageUrl = event.target?.result as string
      if (canvasRef.current) {
        try {
          await loadImageToCanvas(canvasRef.current, imageUrl)
        } catch (error) {
          console.error('Failed to load image:', error)
        }
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (!canvasRef.current) return

    const name = signatureName.trim() || 'My Signature'
    const signature = createSignatureFromCanvas(canvasRef.current, name, mode)
    saveSignature(signature)
    setSavedSignatures(getAllSignatures())
    setSignatureName('')
  }

  const handleDownloadPNG = () => {
    if (!canvasRef.current) return
    const signature = createSignatureFromCanvas(canvasRef.current, 'signature', mode)
    downloadSignature(signature)
  }

  const handleDownloadSVG = () => {
    if (!canvasRef.current) return
    downloadSignatureAsSVG(canvasRef.current)
  }

  const handleDeleteSaved = (id: string) => {
    deleteSignature(id)
    setSavedSignatures(getAllSignatures())
  }

  const handleLoadSaved = async (signature: Signature) => {
    if (!canvasRef.current) return
    try {
      await loadImageToCanvas(canvasRef.current, signature.data)
      setMode(signature.type)
    } catch (error) {
      console.error('Failed to load signature:', error)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Mode Selection */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Create Signature</h3>
        <div className="grid grid-cols-3 gap-4">
          <Button
            variant={mode === 'draw' ? 'default' : 'outline'}
            onClick={() => handleModeChange('draw')}
            className="h-20"
          >
            <Pen className="w-5 h-5 mr-2" />
            Draw
          </Button>
          <Button
            variant={mode === 'type' ? 'default' : 'outline'}
            onClick={() => handleModeChange('type')}
            className="h-20"
          >
            <Type className="w-5 h-5 mr-2" />
            Type
          </Button>
          <Button
            variant={mode === 'upload' ? 'default' : 'outline'}
            onClick={() => handleModeChange('upload')}
            className="h-20"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload
          </Button>
        </div>
      </Card>

      {/* Type Mode Controls */}
      {mode === 'type' && (
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Font Style</label>
              <select
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value as SignatureFont)}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              >
                {fonts.map((font: SignatureFont) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={signatureColor}
                  onChange={(e) => setSignatureColor(e.target.value)}
                  className="w-16 h-10 rounded-md border border-input cursor-pointer"
                />
                <input
                  type="text"
                  value={signatureColor}
                  onChange={(e) => setSignatureColor(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
                />
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Upload Mode Controls */}
      {mode === 'upload' && (
        <Card className="p-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button onClick={() => fileInputRef.current?.click()} className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            Upload Signature Image
          </Button>
        </Card>
      )}

      {/* Canvas */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Signature Preview</h3>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Size:</label>
            <select
              value={signatureSize}
              onChange={(e) => setSignatureSize(e.target.value as SignatureSize)}
              className="px-3 py-1 rounded-md border border-input bg-background text-sm"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center border rounded-lg p-4 bg-muted/20">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="border-2 border-dashed border-border bg-white cursor-crosshair touch-none"
            style={{ maxWidth: '100%' }}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={handleClear}>
            <X className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              placeholder="Signature name (optional)"
              className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
            />
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
          <Button variant="outline" onClick={handleDownloadPNG}>
            <Download className="w-4 h-4 mr-2" />
            PNG
          </Button>
          <Button variant="outline" onClick={handleDownloadSVG}>
            <Download className="w-4 h-4 mr-2" />
            SVG
          </Button>
        </div>
      </Card>

      {/* Saved Signatures */}
      {savedSignatures.length > 0 && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Saved Signatures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedSignatures.map((signature: Signature) => (
              <div key={signature.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{signature.name}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(signature.createdAt)}</div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {signature.type}
                  </Badge>
                </div>
                <div className="flex justify-center border rounded bg-muted/10 p-2">
                  <img src={signature.data} alt={signature.name} className="max-h-20" />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleLoadSaved(signature)}
                  >
                    Load
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => downloadSignature(signature)}
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSaved(signature.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>How to use:</strong> Choose a mode (Draw, Type, or Upload), create your signature,
            then save or download it.
          </div>
          <div>
            <strong>Tip:</strong> Signatures are saved locally in your browser. Download them as PNG or
            SVG for transparent backgrounds.
          </div>
        </div>
      </Card>
    </div>
  )
}
