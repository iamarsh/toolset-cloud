'use client'

import { useState } from 'react'
import { FileText, Download, Copy, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { copyToClipboard } from '@/lib/utils'
import {
  extractTextFromPDF,
  formatFileSize,
  countWords,
  exportToTextFile,
  type ExtractionProgress,
} from './logic'

export default function PDFTextExtractorUI() {
  const [file, setFile] = useState<File | null>(null)
  const [extractedText, setExtractedText] = useState('')
  const [pageCount, setPageCount] = useState(0)
  const [isExtracting, setIsExtracting] = useState(false)
  const [progress, setProgress] = useState<ExtractionProgress | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setExtractedText('')
      setError('')
      setProgress(null)
    } else {
      setError('Please select a valid PDF file')
    }
  }

  const handleExtract = async () => {
    if (!file) return

    setIsExtracting(true)
    setError('')
    setProgress({ current: 0, total: 0, percentage: 0 })

    const result = await extractTextFromPDF(file, (prog) => {
      setProgress(prog)
    })

    setIsExtracting(false)

    if (result.success && result.text) {
      setExtractedText(result.text)
      setPageCount(result.pageCount || 0)
      setProgress(null)
    } else {
      setError(result.error || 'Failed to extract text')
      setProgress(null)
    }
  }

  const handleCopy = async () => {
    if (!extractedText) return
    await copyToClipboard(extractedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!extractedText || !file) return
    const filename = file.name.replace('.pdf', '') + '-extracted.txt'
    exportToTextFile(extractedText, filename)
  }

  const handleClear = () => {
    setFile(null)
    setExtractedText('')
    setError('')
    setProgress(null)
    setPageCount(0)
  }

  const wordCount = extractedText ? countWords(extractedText) : 0
  const charCount = extractedText.length

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
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
            <div className="p-3 rounded-md bg-red-500/10 text-red-500 text-sm">
              {error}
            </div>
          )}

          <Button
            onClick={handleExtract}
            disabled={!file || isExtracting}
            className="w-full"
          >
            {isExtracting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Extracting...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Extract Text
              </>
            )}
          </Button>

          {progress && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Processing page {progress.current} of {progress.total}</span>
                <span>{progress.percentage}%</span>
              </div>
              <Progress value={progress.percentage} />
            </div>
          )}
        </div>
      </Card>

      {/* Extracted Text */}
      {extractedText && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Extracted Text</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <span>{pageCount} pages</span>
                <span>{wordCount.toLocaleString()} words</span>
                <span>{charCount.toLocaleString()} characters</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          <textarea
            value={extractedText}
            readOnly
            className="w-full h-96 p-3 rounded-md border border-input bg-muted font-mono text-sm resize-none focus:outline-none"
          />
        </Card>
      )}

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>How it works:</strong> Upload a PDF and extract all text content
            from every page. Perfect for copying text from scanned documents or PDFs.
          </div>
          <div>
            <strong>Privacy:</strong> All processing happens locally in your browser.
            Your PDF never leaves your device.
          </div>
          <div>
            <strong>Tip:</strong> For best results, use PDFs with selectable text.
            Scanned PDFs without OCR may not extract properly.
          </div>
        </div>
      </Card>
    </div>
  )
}
