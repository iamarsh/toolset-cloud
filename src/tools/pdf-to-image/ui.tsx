'use client'

import { useState } from 'react'
import { FileText, Image as ImageIcon, Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  convertPDFToImages,
  getPDFPageCount,
  downloadImage,
  downloadAllImages,
  formatFileSize,
  type ImageFormat,
  type ImageQuality,
  type ConversionProgress,
} from './logic'

export default function PDFToImageUI() {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [format, setFormat] = useState<ImageFormat>('png')
  const [quality, setQuality] = useState<ImageQuality>('medium')
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState<ConversionProgress | null>(null)
  const [images, setImages] = useState<Blob[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [error, setError] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setError('')
      setImages([])
      setImagePreviews([])

      const count = await getPDFPageCount(selectedFile)
      setPageCount(count)
    } else {
      setError('Please select a valid PDF file')
    }
  }

  const handleConvert = async () => {
    if (!file) return

    setIsConverting(true)
    setError('')
    setProgress({ current: 0, total: 0, percentage: 0 })

    const result = await convertPDFToImages(
      file,
      { format, quality },
      (prog) => {
        setProgress(prog)
      }
    )

    setIsConverting(false)

    if (result.success && result.images) {
      setImages(result.images)

      // Create preview URLs
      const previews = result.images.map((blob) => URL.createObjectURL(blob))
      setImagePreviews(previews)
      setProgress(null)
    } else {
      setError(result.error || 'Failed to convert PDF')
      setProgress(null)
    }
  }

  const handleDownloadAll = () => {
    if (!file || images.length === 0) return
    const basename = file.name.replace('.pdf', '')
    downloadAllImages(images, basename, format)
  }

  const handleDownloadSingle = (index: number) => {
    if (!file) return
    const basename = file.name.replace('.pdf', '')
    downloadImage(images[index], `${basename}-page-${index + 1}.${format}`)
  }

  const handleClear = () => {
    setFile(null)
    setImages([])
    imagePreviews.forEach((url) => URL.revokeObjectURL(url))
    setImagePreviews([])
    setError('')
    setProgress(null)
  }

  const totalSize = images.reduce((sum, img) => sum + img.size, 0)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* File Upload */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Upload PDF</label>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
          </div>

          {file && (
            <div className="flex items-center justify-between p-3 rounded-md bg-muted">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{file.name}</span>
                <Badge variant="secondary">{pageCount} pages</Badge>
                <span className="text-xs text-muted-foreground">
                  ({formatFileSize(file.size)})
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleClear}>
                Clear
              </Button>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-md bg-red-500/10 text-red-500 text-sm">{error}</div>
          )}
        </div>
      </Card>

      {/* Conversion Options */}
      {file && (
        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Image Format</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={format === 'png' ? 'default' : 'outline'}
                  onClick={() => setFormat('png')}
                  className="w-full"
                >
                  PNG
                </Button>
                <Button
                  variant={format === 'jpeg' ? 'default' : 'outline'}
                  onClick={() => setFormat('jpeg')}
                  className="w-full"
                >
                  JPEG
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Quality</label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={quality === 'low' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setQuality('low')}
                >
                  Low
                </Button>
                <Button
                  variant={quality === 'medium' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setQuality('medium')}
                >
                  Medium
                </Button>
                <Button
                  variant={quality === 'high' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setQuality('high')}
                >
                  High
                </Button>
              </div>
            </div>
          </div>

          <Button onClick={handleConvert} disabled={isConverting} className="w-full">
            {isConverting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4 mr-2" />
                Convert to Images
              </>
            )}
          </Button>

          {progress && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>
                  Converting page {progress.current} of {progress.total}
                </span>
                <span>{progress.percentage}%</span>
              </div>
              <Progress value={progress.percentage} />
            </div>
          )}
        </Card>
      )}

      {/* Results */}
      {images.length > 0 && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Conversion Complete!</h3>
              <p className="text-sm text-muted-foreground">
                {images.length} image{images.length !== 1 ? 's' : ''} •{' '}
                {formatFileSize(totalSize)} total
              </p>
            </div>
            <Button onClick={handleDownloadAll}>
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="space-y-2">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-border bg-muted">
                  <img
                    src={preview}
                    alt={`Page ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Page {index + 1}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadSingle(index)}
                  >
                    <Download className="w-3 h-3" />
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
            <strong>How it works:</strong> Upload a PDF and convert all pages to PNG or
            JPEG images. Choose quality level based on your needs.
          </div>
          <div>
            <strong>Privacy:</strong> All conversion happens locally in your browser.
            Your PDF never leaves your device.
          </div>
          <div>
            <strong>Tip:</strong> Use PNG for crisp text and graphics, JPEG for
            photos. Higher quality produces larger files.
          </div>
        </div>
      </Card>
    </div>
  )
}
