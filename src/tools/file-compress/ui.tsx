'use client'

import { useState } from 'react'
import { FileArchive, Download, Loader2, File } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  compressFile,
  downloadCompressedFile,
  formatFileSize,
  getFileTypeColor,
  type CompressResult,
} from './logic'

export default function FileCompressUI() {
  const [file, setFile] = useState<File | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [result, setResult] = useState<CompressResult | null>(null)
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
      setError('')
    }
  }

  const handleCompress = async () => {
    if (!file) return

    setIsCompressing(true)
    setError('')

    const compressResult = await compressFile(file)

    setIsCompressing(false)

    if (compressResult.success && compressResult.compressedBlob) {
      setResult(compressResult)
    } else {
      setError(compressResult.error || 'Compression failed')
    }
  }

  const handleDownload = () => {
    if (!result || !result.compressedBlob || !file) return
    downloadCompressedFile(result.compressedBlob, file.name)
  }

  const handleClear = () => {
    setFile(null)
    setResult(null)
    setError('')
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* File Upload */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select File to Compress</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Any file type supported. Best for text files, documents, and logs.
            </p>
          </div>

          {file && (
            <div className="flex items-center justify-between p-3 rounded-md bg-muted">
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{file.name}</span>
                <Badge variant="secondary" className={getFileTypeColor(file.name)}>
                  {formatFileSize(file.size)}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={handleClear}>
                Clear
              </Button>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-md bg-red-500/10 text-red-500 text-sm">{error}</div>
          )}

          {file && !result && (
            <Button onClick={handleCompress} disabled={isCompressing} className="w-full">
              {isCompressing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Compressing...
                </>
              ) : (
                <>
                  <FileArchive className="w-4 h-4 mr-2" />
                  Compress File
                </>
              )}
            </Button>
          )}
        </div>
      </Card>

      {/* Compression Result */}
      {result && result.success && (
        <Card className="p-6 space-y-4">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-green-500/10">
              <FileArchive className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Compression Complete!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                File compressed successfully using gzip
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted text-center">
              <div className="text-2xl font-bold">{formatFileSize(result.originalSize)}</div>
              <div className="text-xs text-muted-foreground mt-1">Original Size</div>
            </div>
            <div className="p-4 rounded-lg bg-muted text-center">
              <div className="text-2xl font-bold">{formatFileSize(result.compressedSize)}</div>
              <div className="text-xs text-muted-foreground mt-1">Compressed Size</div>
            </div>
            <div className="p-4 rounded-lg bg-green-500/10 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {result.compressionRatio.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">Size Reduction</div>
            </div>
          </div>

          <Button onClick={handleDownload} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Compressed File (.gz)
          </Button>

          <Button variant="outline" onClick={handleClear} className="w-full">
            Compress Another File
          </Button>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>How it works:</strong> Files are compressed using gzip compression
            algorithm directly in your browser. The output is a .gz file.
          </div>
          <div>
            <strong>Best for:</strong> Text files, logs, JSON, XML, code files, and
            documents. Already-compressed formats (images, videos) won't compress much.
          </div>
          <div>
            <strong>Privacy:</strong> All compression happens locally in your browser. Your
            files never leave your device.
          </div>
          <div>
            <strong>To decompress:</strong> Use any standard decompression tool that
            supports gzip (.gz) files.
          </div>
        </div>
      </Card>
    </div>
  )
}
