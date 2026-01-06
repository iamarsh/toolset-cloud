'use client'

import { useState } from 'react'
import { Upload, Download, Sliders, FileDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { compressImage, formatFileSize, type CompressionResult } from './logic'

export default function ImageCompressorUI() {
  const [file, setFile] = useState<File | null>(null)
  const [quality, setQuality] = useState(80)
  const [compressing, setCompressing] = useState(false)
  const [result, setResult] = useState<CompressionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)
      setResult(null)
      setError(null)
    } else {
      setError('Please select a valid image file')
    }
  }

  const handleCompress = async () => {
    if (!file) return

    setCompressing(true)
    setError(null)

    try {
      const compressionResult = await compressImage(file, quality / 100)
      setResult(compressionResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Compression failed')
    } finally {
      setCompressing(false)
    }
  }

  const handleDownload = () => {
    if (!result) return

    const link = document.createElement('a')
    link.href = result.dataUrl
    link.download = `compressed-${file?.name || 'image.jpg'}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-32 px-4 transition border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 border-muted-foreground/25"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or
                  drag and drop
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
          </div>

          {file && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="font-medium">Selected:</div>
                <div className="text-muted-foreground">{file.name}</div>
                <div className="text-muted-foreground">
                  ({formatFileSize(file.size)})
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    Quality: {quality}%
                  </label>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Smaller file</span>
                  <span>Better quality</span>
                </div>
              </div>

              <Button
                onClick={handleCompress}
                disabled={compressing}
                className="w-full"
              >
                <FileDown className="w-4 h-4 mr-2" />
                {compressing ? 'Compressing...' : 'Compress Image'}
              </Button>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
              {error}
            </div>
          )}
        </div>
      </Card>

      {/* Results Section */}
      {result && (
        <Card className="p-6 space-y-6">
          <div className="text-lg font-medium">Compression Results</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                Original
              </div>
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                {file && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Original"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {formatFileSize(result.originalSize)}
              </div>
            </div>

            {/* Compressed */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                Compressed
              </div>
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={result.dataUrl}
                  alt="Compressed"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {formatFileSize(result.compressedSize)}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-500">
                {Math.round(result.compressionRatio)}%
              </div>
              <div className="text-xs text-muted-foreground">Reduced</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {formatFileSize(result.originalSize - result.compressedSize)}
              </div>
              <div className="text-xs text-muted-foreground">Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{quality}%</div>
              <div className="text-xs text-muted-foreground">Quality</div>
            </div>
          </div>

          <Button onClick={handleDownload} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Compressed Image
          </Button>
        </Card>
      )}
    </div>
  )
}
