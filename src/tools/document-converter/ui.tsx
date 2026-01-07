'use client'

import { useState, useRef } from 'react'
import { Upload, Download, FileText, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  convertDocument,
  downloadDocument,
  detectFormat,
  formatFileSize,
  getSupportedConversions,
  type DocumentFormat,
  type ConversionOptions,
} from './logic'

export default function DocumentConverterUI() {
  const [file, setFile] = useState<File | null>(null)
  const [sourceFormat, setSourceFormat] = useState<DocumentFormat>('txt')
  const [targetFormat, setTargetFormat] = useState<DocumentFormat>('pdf')
  const [isConverting, setIsConverting] = useState(false)
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null)
  const [convertedFilename, setConvertedFilename] = useState<string>('')
  const [preserveFormatting, setPreserveFormatting] = useState(true)
  const [batchFiles, setBatchFiles] = useState<File[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length === 0) return

    const firstFile = selectedFiles[0]
    setFile(firstFile)
    const detected = detectFormat(firstFile)
    setSourceFormat(detected)

    // Set default target format
    const supported = getSupportedConversions(detected)
    if (supported.length > 0 && !supported.includes(targetFormat)) {
      setTargetFormat(supported[0])
    }

    // For batch conversion
    if (selectedFiles.length > 1) {
      setBatchFiles(selectedFiles)
    }

    setConvertedBlob(null)
    setConvertedFilename('')
  }

  const handleConvert = async () => {
    if (!file) return

    setIsConverting(true)

    try {
      const options: ConversionOptions = {
        sourceFormat,
        targetFormat,
        preserveFormatting,
        pageSize: 'A4',
        margin: 20,
      }

      const result = await convertDocument(file, options)
      setConvertedBlob(result.blob)
      setConvertedFilename(result.filename)
    } catch (error) {
      console.error('Conversion failed:', error)
      alert('Failed to convert document. Please try a different format or file.')
    } finally {
      setIsConverting(false)
    }
  }

  const handleDownload = () => {
    if (!convertedBlob || !convertedFilename) return
    downloadDocument(convertedBlob, convertedFilename)
  }

  const handleReset = () => {
    setFile(null)
    setConvertedBlob(null)
    setConvertedFilename('')
    setBatchFiles([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const supportedFormats = file ? getSupportedConversions(sourceFormat) : []

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload */}
      <Card className="p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10">
            <FileText className="h-10 w-10 text-blue-500" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Upload Document</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Supports DOCX, PDF, TXT, RTF, HTML, Markdown
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".docx,.pdf,.txt,.rtf,.html,.htm,.md,.markdown"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button onClick={() => fileInputRef.current?.click()} disabled={isConverting}>
            <Upload className="w-4 h-4 mr-2" />
            {file ? 'Change File' : 'Select File'}
          </Button>
        </div>
      </Card>

      {/* File Info & Settings */}
      {file && (
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">File Information</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{file.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span className="font-medium">{formatFileSize(file.size)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Format:</span>
                <span className="font-medium uppercase">{sourceFormat}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Conversion Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2">From Format</label>
                <select
                  value={sourceFormat}
                  onChange={(e) => setSourceFormat(e.target.value as DocumentFormat)}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                  disabled
                >
                  <option value="docx">DOCX</option>
                  <option value="pdf">PDF</option>
                  <option value="txt">TXT</option>
                  <option value="rtf">RTF</option>
                  <option value="html">HTML</option>
                  <option value="markdown">Markdown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">To Format</label>
                <select
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value as DocumentFormat)}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                >
                  {supportedFormats.map((format) => (
                    <option key={format} value={format}>
                      {format.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="preserve"
                  checked={preserveFormatting}
                  onChange={(e) => setPreserveFormatting(e.target.checked)}
                  className="w-4 h-4 rounded border-input"
                />
                <label htmlFor="preserve" className="text-sm cursor-pointer">
                  Preserve formatting (when possible)
                </label>
              </div>
            </div>
          </div>

          <Button onClick={handleConvert} disabled={isConverting} className="w-full">
            {isConverting ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Convert to {targetFormat.toUpperCase()}
              </>
            )}
          </Button>
        </Card>
      )}

      {/* Converted Result */}
      {convertedBlob && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
              <FileText className="h-6 w-6 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Conversion Complete</h3>
              <p className="text-sm text-muted-foreground">{convertedFilename}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleReset} variant="outline">
              Convert Another
            </Button>
          </div>
        </Card>
      )}

      {/* Batch Info */}
      {batchFiles.length > 1 && (
        <Card className="p-4 border-yellow-500/50 bg-yellow-500/5">
          <p className="text-sm text-muted-foreground">
            <strong>Batch mode:</strong> {batchFiles.length} files selected. Currently converting
            one at a time. Download and convert the next file manually.
          </p>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>Supported formats:</strong> DOCX, PDF, TXT, RTF, HTML, Markdown
          </div>
          <div>
            <strong>Tip:</strong> For best results, start with formats that preserve structure
            (HTML, Markdown). PDF conversion may require additional processing time.
          </div>
          <div>
            <strong>Privacy:</strong> All conversions happen in your browser. No files are uploaded
            to any server.
          </div>
        </div>
      </Card>
    </div>
  )
}
