'use client'

import { useState, useRef } from 'react'
import { Upload, Type, Pen, Highlighter, Download, Trash2, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PDFDocument } from 'pdf-lib'
import {
  loadPDF,
  getPageCount,
  applyAnnotations,
  savePDF,
  downloadPDF,
  rotatePage,
  generateId,
  type Annotation,
} from './logic'

type Tool = 'text' | 'draw' | 'highlight' | 'none'

export default function PDFEditorUI() {
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null)
  const [fileName, setFileName] = useState('')
  const [numPages, setNumPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [activeTool, setActiveTool] = useState<Tool>('none')
  const [textInput, setTextInput] = useState('')
  const [fontSize, setFontSize] = useState(12)
  const [color, setColor] = useState('#000000')
  const [isProcessing, setIsProcessing] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsProcessing(true)

    try {
      const doc = await loadPDF(file)
      setPdfDoc(doc)
      setFileName(file.name)
      setNumPages(getPageCount(doc))
      setCurrentPage(0)
      setAnnotations([])
    } catch (error) {
      console.error('Error loading PDF:', error)
      alert('Failed to load PDF file')
    } finally {
      setIsProcessing(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pdfDoc || activeTool === 'none') return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (activeTool === 'text') {
      if (!textInput.trim()) {
        alert('Please enter text first')
        return
      }

      const annotation: Annotation = {
        id: generateId(),
        type: 'text',
        pageIndex: currentPage,
        x,
        y,
        text: textInput,
        fontSize,
        color,
      }

      setAnnotations([...annotations, annotation])
      setTextInput('')
    } else if (activeTool === 'highlight') {
      const annotation: Annotation = {
        id: generateId(),
        type: 'highlight',
        pageIndex: currentPage,
        x,
        y,
        width: 100,
        height: 20,
        color,
      }

      setAnnotations([...annotations, annotation])
    }
  }

  const handleRotate = () => {
    if (!pdfDoc) return
    rotatePage(pdfDoc, currentPage, 90)
    setPdfDoc(pdfDoc) // Trigger re-render
  }

  const handleDeleteAnnotation = (id: string) => {
    setAnnotations(annotations.filter((ann: Annotation) => ann.id !== id))
  }

  const handleSavePDF = async () => {
    if (!pdfDoc) return

    setIsProcessing(true)

    try {
      // Apply annotations to PDF
      await applyAnnotations(pdfDoc, annotations)

      // Save PDF
      const pdfBytes = await savePDF(pdfDoc)

      // Download
      const baseName = fileName.replace(/\.pdf$/i, '')
      downloadPDF(pdfBytes, `${baseName}-edited.pdf`)
    } catch (error) {
      console.error('Error saving PDF:', error)
      alert('Failed to save PDF')
    } finally {
      setIsProcessing(false)
    }
  }

  const currentPageAnnotations = annotations.filter(
    (ann: Annotation) => ann.pageIndex === currentPage
  )

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Upload */}
      {!pdfDoc && (
        <Card className="p-6">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="w-full h-24 text-lg"
          >
            <Upload className="w-6 h-6 mr-2" />
            {isProcessing ? 'Loading PDF...' : 'Upload PDF to Edit'}
          </Button>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Upload a PDF file to add text, drawings, and highlights
          </p>
        </Card>
      )}

      {/* Editor */}
      {pdfDoc && (
        <>
          {/* Toolbar */}
          <Card className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant={activeTool === 'text' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTool('text')}
                >
                  <Type className="w-4 h-4 mr-1" />
                  Text
                </Button>
                <Button
                  variant={activeTool === 'draw' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTool('draw')}
                  disabled
                  title="Drawing coming soon"
                >
                  <Pen className="w-4 h-4 mr-1" />
                  Draw
                </Button>
                <Button
                  variant={activeTool === 'highlight' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTool('highlight')}
                >
                  <Highlighter className="w-4 h-4 mr-1" />
                  Highlight
                </Button>
              </div>

              {activeTool === 'text' && (
                <>
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter text..."
                    className="flex-1 px-3 py-1.5 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value) || 12)}
                    min="8"
                    max="72"
                    className="w-16 px-2 py-1.5 rounded-md border border-input bg-background text-sm"
                  />
                </>
              )}

              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-9 rounded-md border border-input cursor-pointer"
              />

              <div className="flex-1" />

              <Button variant="outline" size="sm" onClick={handleRotate}>
                <RotateCw className="w-4 h-4" />
              </Button>

              <Button onClick={handleSavePDF} disabled={isProcessing}>
                <Download className="w-4 h-4 mr-1" />
                {isProcessing ? 'Saving...' : 'Save PDF'}
              </Button>
            </div>
          </Card>

          {/* Canvas Area */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">
                Page {currentPage + 1} of {numPages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(numPages - 1, currentPage + 1))}
                  disabled={currentPage === numPages - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div
              className="relative border rounded-lg p-4 bg-muted/20 min-h-[600px] cursor-crosshair"
              onClick={handleCanvasClick}
            >
              <canvas ref={canvasRef} className="mx-auto border bg-white" />

              {/* Render annotations */}
              {currentPageAnnotations.map((ann: Annotation) => (
                <div
                  key={ann.id}
                  className="absolute group"
                  style={{
                    left: ann.x,
                    top: ann.y,
                  }}
                >
                  {ann.type === 'text' && (
                    <div
                      className="relative"
                      style={{
                        fontSize: ann.fontSize,
                        color: ann.color,
                      }}
                    >
                      {ann.text}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-6 h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteAnnotation(ann.id)
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                  {ann.type === 'highlight' && (
                    <div
                      className="relative"
                      style={{
                        width: ann.width,
                        height: ann.height,
                        backgroundColor: ann.color,
                        opacity: 0.3,
                      }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-6 h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteAnnotation(ann.id)
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              {activeTool !== 'none' && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground bg-background px-3 py-1 rounded-md border">
                  {activeTool === 'text' && textInput
                    ? 'Click anywhere to place text'
                    : activeTool === 'text'
                    ? 'Enter text in the toolbar first'
                    : activeTool === 'highlight'
                    ? 'Click to add highlight'
                    : 'Select a tool to start editing'}
                </div>
              )}
            </div>
          </Card>

          {/* Annotations List */}
          {annotations.length > 0 && (
            <Card className="p-6 space-y-3">
              <h3 className="font-semibold">Annotations ({annotations.length})</h3>
              <div className="space-y-2">
                {annotations.map((ann: Annotation) => (
                  <div
                    key={ann.id}
                    className="flex items-center justify-between p-2 border rounded-lg text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Page {ann.pageIndex + 1}:</span>
                      <span className="capitalize">{ann.type}</span>
                      {ann.text && <span className="text-muted-foreground">"{ann.text}"</span>}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAnnotation(ann.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>How to use:</strong> Upload a PDF, select a tool (Text or Highlight), and click
            on the page to add annotations. Save when done.
          </div>
          <div>
            <strong>Tip:</strong> Use the Text tool to fill forms or add notes. Rotate pages if needed.
            All edits are applied when you save.
          </div>
          <div>
            <strong>Privacy:</strong> All PDF editing happens in your browser. No files are uploaded
            to servers.
          </div>
        </div>
      </Card>
    </div>
  )
}
