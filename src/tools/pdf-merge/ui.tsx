'use client'

import { useState, useEffect } from 'react'
import { FilePlus, Download, Trash2, GripVertical, Loader2, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  mergePDFs,
  getPDFPageCount,
  downloadPDF,
  formatFileSize,
  generateId,
  type FileWithPages,
} from './logic'

export default function PDFMergeUI() {
  const [files, setFiles] = useState<FileWithPages[]>([])
  const [isMerging, setIsMerging] = useState(false)
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null)
  const [mergedPageCount, setMergedPageCount] = useState(0)
  const [error, setError] = useState('')

  const handleFileAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const pdfFiles = selectedFiles.filter((file) => file.type === 'application/pdf')

    if (pdfFiles.length === 0) {
      setError('Please select PDF files only')
      return
    }

    setError('')

    // Get page counts for each file
    const filesWithPages: FileWithPages[] = await Promise.all(
      pdfFiles.map(async (file) => ({
        file,
        pageCount: await getPDFPageCount(file),
        id: generateId(),
      }))
    )

    setFiles((prev) => [...prev, ...filesWithPages])
    setMergedBlob(null)

    // Reset input
    e.target.value = ''
  }

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
    setMergedBlob(null)
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const newFiles = [...files]
    ;[newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]]
    setFiles(newFiles)
    setMergedBlob(null)
  }

  const handleMoveDown = (index: number) => {
    if (index === files.length - 1) return
    const newFiles = [...files]
    ;[newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]]
    setFiles(newFiles)
    setMergedBlob(null)
  }

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please add at least 2 PDF files to merge')
      return
    }

    setIsMerging(true)
    setError('')

    const result = await mergePDFs(files.map((f) => f.file))

    setIsMerging(false)

    if (result.success && result.pdfBlob) {
      setMergedBlob(result.pdfBlob)
      setMergedPageCount(result.pageCount || 0)
    } else {
      setError(result.error || 'Failed to merge PDFs')
    }
  }

  const handleDownload = () => {
    if (!mergedBlob) return
    downloadPDF(mergedBlob, 'merged-document.pdf')
  }

  const handleClear = () => {
    setFiles([])
    setMergedBlob(null)
    setError('')
  }

  const totalPages = files.reduce((sum, f) => sum + f.pageCount, 0)

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* File Upload */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Add PDF Files</label>
            <input
              type="file"
              accept=".pdf,application/pdf"
              multiple
              onChange={handleFileAdd}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-500/10 text-red-500 text-sm">{error}</div>
          )}

          {files.length > 0 && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {files.length} file{files.length !== 1 ? 's' : ''} • {totalPages} total pages
              </span>
              <Button variant="ghost" size="sm" onClick={handleClear}>
                Clear All
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="p-4">
          <div className="space-y-2">
            <div className="text-sm font-medium mb-3">Files to Merge (in order)</div>
            {files.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-md bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-6 p-0"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-6 p-0"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === files.length - 1}
                  >
                    ↓
                  </Button>
                </div>

                <GripVertical className="w-4 h-4 text-muted-foreground" />

                <Badge variant="secondary">{index + 1}</Badge>

                <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{item.file.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatFileSize(item.file.size)} • {item.pageCount} page
                    {item.pageCount !== 1 ? 's' : ''}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(item.id)}
                  className="flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button onClick={handleMerge} disabled={files.length < 2 || isMerging} className="w-full mt-4">
            {isMerging ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Merging PDFs...
              </>
            ) : (
              <>
                <FilePlus className="w-4 h-4 mr-2" />
                Merge {files.length} PDFs
              </>
            )}
          </Button>
        </Card>
      )}

      {/* Merged Result */}
      {mergedBlob && (
        <Card className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-green-500/10">
              <FileText className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">PDF Merged Successfully!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {mergedPageCount} pages • {formatFileSize(mergedBlob.size)}
              </p>
            </div>
            <Button onClick={handleDownload} className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Download Merged PDF
            </Button>
          </div>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>How it works:</strong> Add multiple PDF files, arrange them in the
            desired order, and merge them into a single PDF document.
          </div>
          <div>
            <strong>Privacy:</strong> All merging happens locally in your browser. Your
            files never leave your device.
          </div>
          <div>
            <strong>Tip:</strong> Use the arrow buttons to reorder files before merging.
            The final PDF will have pages in the order shown.
          </div>
        </div>
      </Card>
    </div>
  )
}
