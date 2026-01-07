'use client'

import { useState, useRef } from 'react'
import { Upload, Download, Image as ImageIcon, RefreshCw, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  removeBackground,
  downloadImage,
  formatFileSize,
  createPreviewUrl,
  type RemovalOptions,
} from './logic'

export default function BackgroundRemoverUI() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [originalUrl, setOriginalUrl] = useState<string>('')
  const [processedUrl, setProcessedUrl] = useState<string>('')
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null)
  const [processedFilename, setProcessedFilename] = useState<string>('')
  const [showComparison, setShowComparison] = useState(false)
  const [options, setOptions] = useState<RemovalOptions>({
    outputFormat: 'png',
    quality: 90,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setOriginalUrl(URL.createObjectURL(selectedFile))
    setProcessedUrl('')
    setProcessedBlob(null)
    setProgress(0)
    setShowComparison(false)
  }

  const handleRemoveBackground = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)

    try {
      const result = await removeBackground(file, options, (p) => setProgress(p))
      setProcessedBlob(result.blob)
      setProcessedFilename(result.filename)
      setProcessedUrl(createPreviewUrl(result.blob))
      setShowComparison(true)
    } catch (error) {
      console.error('Background removal failed:', error)
      alert('Failed to remove background. Please try a different image.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!processedBlob || !processedFilename) return
    downloadImage(processedBlob, processedFilename)
  }

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl)
    if (processedUrl) URL.revokeObjectURL(processedUrl)
    setFile(null)
    setOriginalUrl('')
    setProcessedUrl('')
    setProcessedBlob(null)
    setProgress(0)
    setShowComparison(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Upload */}
      <Card className="p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-500/10">
            <ImageIcon className="h-10 w-10 text-pink-500" />
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

      {/* Settings */}
      {file && !processedUrl && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Background Removal Settings</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Output Format</label>
              <div className="grid grid-cols-2 gap-2">
                {(['png', 'webp'] as const).map((format) => (
                  <button
                    key={format}
                    onClick={() => setOptions({ ...options, outputFormat: format })}
                    className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                      options.outputFormat === format
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-input hover:bg-muted'
                    }`}
                  >
                    {format.toUpperCase()}
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
          </div>

          <Button onClick={handleRemoveBackground} disabled={isProcessing} className="w-full">
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Processing... {progress}%
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Remove Background
              </>
            )}
          </Button>

          {isProcessing && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-muted-foreground text-center">
                This may take 5-10 seconds...
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Before/After Comparison */}
      {showComparison && originalUrl && processedUrl && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Before & After</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Original</p>
              <div className="relative aspect-square rounded-lg overflow-hidden border bg-muted">
                <img
                  src={originalUrl}
                  alt="Original"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Background Removed</p>
              <div className="relative aspect-square rounded-lg overflow-hidden border bg-[linear-gradient(45deg,#e5e7eb_25%,transparent_25%,transparent_75%,#e5e7eb_75%,#e5e7eb),linear-gradient(45deg,#e5e7eb_25%,transparent_25%,transparent_75%,#e5e7eb_75%,#e5e7eb)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]">
                <img
                  src={processedUrl}
                  alt="Processed"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
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
      <Card className="p-4 border-blue-500/50 bg-blue-500/5">
        <div className="flex gap-2">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground space-y-2">
            <div>
              <strong>Note:</strong> This tool uses a simplified background removal algorithm. For
              production use with AI-based removal, consider using @imgly/background-removal
              library.
            </div>
            <div>
              <strong>Best results:</strong> Images with clear subjects and solid/bright backgrounds
              work best.
            </div>
            <div>
              <strong>Privacy:</strong> All processing happens in your browser. No images are
              uploaded.
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
