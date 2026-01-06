'use client'

import { useState } from 'react'
import { FileText, Scissors, Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  splitIntoPages,
  splitByRanges,
  extractPages,
  getPDFPageCount,
  downloadPDF,
  downloadAllAsZip,
  formatFileSize,
  type PageRange,
} from './logic'

type SplitMode = 'all' | 'range' | 'extract'

export default function SplitPDFUI() {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [mode, setMode] = useState<SplitMode>('all')
  const [ranges, setRanges] = useState<PageRange[]>([])
  const [extractPageNumbers, setExtractPageNumbers] = useState('')
  const [isSplitting, setIsSplitting] = useState(false)
  const [splitPdfs, setSplitPdfs] = useState<Blob[]>([])
  const [error, setError] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setError('')
      setSplitPdfs([])

      const count = await getPDFPageCount(selectedFile)
      setPageCount(count)
    } else {
      setError('Please select a valid PDF file')
    }
  }

  const handleSplit = async () => {
    if (!file) return

    setIsSplitting(true)
    setError('')

    let result

    if (mode === 'all') {
      result = await splitIntoPages(file)
    } else if (mode === 'range') {
      if (ranges.length === 0) {
        setError('Please add at least one page range')
        setIsSplitting(false)
        return
      }
      result = await splitByRanges(file, ranges)
    } else if (mode === 'extract') {
      const pageNumbers = extractPageNumbers
        .split(',')
        .map((s) => parseInt(s.trim()))
        .filter((n) => !isNaN(n))

      if (pageNumbers.length === 0) {
        setError('Please enter valid page numbers')
        setIsSplitting(false)
        return
      }

      result = await extractPages(file, pageNumbers)
    }

    setIsSplitting(false)

    if (result && result.success && result.pdfs) {
      setSplitPdfs(result.pdfs)
    } else {
      setError(result?.error || 'Failed to split PDF')
    }
  }

  const handleDownloadAll = () => {
    if (splitPdfs.length === 0 || !file) return
    const basename = file.name.replace('.pdf', '')
    downloadAllAsZip(splitPdfs, basename)
  }

  const handleDownloadSingle = (index: number) => {
    if (!file) return
    const basename = file.name.replace('.pdf', '')
    const filename =
      mode === 'all'
        ? `${basename}-page-${index + 1}.pdf`
        : mode === 'range'
        ? `${basename}-${ranges[index]?.name || `part-${index + 1}`}.pdf`
        : `${basename}-extracted.pdf`

    downloadPDF(splitPdfs[index], filename)
  }

  const addRange = () => {
    setRanges([...ranges, { start: 1, end: pageCount, name: `Part ${ranges.length + 1}` }])
  }

  const updateRange = (index: number, field: keyof PageRange, value: string | number) => {
    const newRanges = [...ranges]
    newRanges[index] = { ...newRanges[index], [field]: value }
    setRanges(newRanges)
  }

  const removeRange = (index: number) => {
    setRanges(ranges.filter((_, i) => i !== index))
  }

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
            <div className="flex items-center gap-2 p-3 rounded-md bg-muted">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{file.name}</span>
              <Badge variant="secondary">{pageCount} pages</Badge>
              <span className="text-xs text-muted-foreground ml-auto">
                ({formatFileSize(file.size)})
              </span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-md bg-red-500/10 text-red-500 text-sm">{error}</div>
          )}
        </div>
      </Card>

      {/* Split Options */}
      {file && (
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Split Mode</label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={mode === 'all' ? 'default' : 'outline'}
                onClick={() => setMode('all')}
                className="w-full"
              >
                All Pages
              </Button>
              <Button
                variant={mode === 'range' ? 'default' : 'outline'}
                onClick={() => setMode('range')}
                className="w-full"
              >
                By Range
              </Button>
              <Button
                variant={mode === 'extract' ? 'default' : 'outline'}
                onClick={() => setMode('extract')}
                className="w-full"
              >
                Extract Pages
              </Button>
            </div>
          </div>

          {mode === 'all' && (
            <div className="p-3 rounded-md bg-muted text-sm">
              Split into {pageCount} individual PDF files (one page each)
            </div>
          )}

          {mode === 'range' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Page Ranges</span>
                <Button variant="outline" size="sm" onClick={addRange}>
                  Add Range
                </Button>
              </div>

              {ranges.map((range, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={range.name}
                    onChange={(e) => updateRange(index, 'name', e.target.value)}
                    placeholder="Name"
                    className="w-32 px-2 py-1 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="number"
                    value={range.start}
                    onChange={(e) => updateRange(index, 'start', parseInt(e.target.value))}
                    min="1"
                    max={pageCount}
                    className="w-20 px-2 py-1 rounded-md border border-input bg-background text-sm"
                  />
                  <span className="text-sm">to</span>
                  <input
                    type="number"
                    value={range.end}
                    onChange={(e) => updateRange(index, 'end', parseInt(e.target.value))}
                    min="1"
                    max={pageCount}
                    className="w-20 px-2 py-1 rounded-md border border-input bg-background text-sm"
                  />
                  <Button variant="ghost" size="sm" onClick={() => removeRange(index)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          {mode === 'extract' && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Page Numbers (comma-separated)
              </label>
              <input
                type="text"
                value={extractPageNumbers}
                onChange={(e) => setExtractPageNumbers(e.target.value)}
                placeholder="e.g., 1, 3, 5, 7-10"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Example: 1,3,5 or 1-5 (pages 1 through 5)
              </p>
            </div>
          )}

          <Button
            onClick={handleSplit}
            disabled={isSplitting}
            className="w-full"
          >
            {isSplitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Splitting...
              </>
            ) : (
              <>
                <Scissors className="w-4 h-4 mr-2" />
                Split PDF
              </>
            )}
          </Button>
        </Card>
      )}

      {/* Results */}
      {splitPdfs.length > 0 && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Split Complete!</h3>
              <p className="text-sm text-muted-foreground">
                {splitPdfs.length} PDF{splitPdfs.length !== 1 ? 's' : ''} created
              </p>
            </div>
            {splitPdfs.length > 1 && (
              <Button onClick={handleDownloadAll}>Download All</Button>
            )}
          </div>

          <div className="space-y-2">
            {splitPdfs.map((pdf, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-md bg-muted"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {mode === 'all'
                      ? `Page ${index + 1}`
                      : mode === 'range'
                      ? ranges[index]?.name || `Part ${index + 1}`
                      : 'Extracted Pages'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({formatFileSize(pdf.size)})
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadSingle(index)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>How it works:</strong> Upload a PDF and split it into individual
            pages, custom ranges, or extract specific pages.
          </div>
          <div>
            <strong>Privacy:</strong> All processing happens locally in your browser.
            Your PDF never leaves your device.
          </div>
        </div>
      </Card>
    </div>
  )
}
