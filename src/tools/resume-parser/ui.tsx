'use client'

import { useState, useRef } from 'react'
import { Upload, Download, Copy, Check, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import * as pdfjsLib from 'pdfjs-dist'
import {
  parseResumeText,
  exportAsJSON,
  exportAsCSV,
  copyToClipboard,
  type ParsedResume,
} from './logic'

// Set up PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
}

export default function ResumeParserUI() {
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ')
      fullText += pageText + '\n'
    }

    return fullText
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsProcessing(true)

    try {
      let text = ''

      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file)
      } else if (file.type === 'text/plain') {
        text = await file.text()
      } else {
        alert('Only PDF and TXT files are supported currently')
        setIsProcessing(false)
        return
      }

      const parsed = parseResumeText(text)
      setParsedResume(parsed)
    } catch (error) {
      console.error('Error parsing resume:', error)
      alert('Failed to parse resume. Please make sure the file is a valid PDF or TXT file.')
    } finally {
      setIsProcessing(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleCopy = async (field: string, value: string) => {
    await copyToClipboard(value)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const CopyButton = ({ field, value }: { field: string; value: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleCopy(field, value)}
      className="h-8"
    >
      {copiedField === field ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </Button>
  )

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Upload */}
      <Card className="p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="w-full h-24 text-lg"
        >
          <Upload className="w-6 h-6 mr-2" />
          {isProcessing ? 'Parsing Resume...' : 'Upload Resume (PDF or TXT)'}
        </Button>
        <p className="text-sm text-muted-foreground text-center mt-2">
          Upload a PDF or TXT resume to extract structured data
        </p>
      </Card>

      {/* Parsed Data */}
      {parsedResume && (
        <>
          {/* Basic Info */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => exportAsJSON(parsedResume)}>
                  <Download className="w-4 h-4 mr-1" />
                  JSON
                </Button>
                <Button variant="outline" size="sm" onClick={() => exportAsCSV(parsedResume)}>
                  <Download className="w-4 h-4 mr-1" />
                  CSV
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parsedResume.name && (
                <div className="flex items-start justify-between p-3 border rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Name</div>
                    <div className="font-medium">{parsedResume.name}</div>
                  </div>
                  <CopyButton field="name" value={parsedResume.name} />
                </div>
              )}

              {parsedResume.email && (
                <div className="flex items-start justify-between p-3 border rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Email</div>
                    <div className="font-medium">{parsedResume.email}</div>
                  </div>
                  <CopyButton field="email" value={parsedResume.email} />
                </div>
              )}

              {parsedResume.phone && (
                <div className="flex items-start justify-between p-3 border rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Phone</div>
                    <div className="font-medium">{parsedResume.phone}</div>
                  </div>
                  <CopyButton field="phone" value={parsedResume.phone} />
                </div>
              )}

              {parsedResume.location && (
                <div className="flex items-start justify-between p-3 border rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Location</div>
                    <div className="font-medium">{parsedResume.location}</div>
                  </div>
                  <CopyButton field="location" value={parsedResume.location} />
                </div>
              )}
            </div>
          </Card>

          {/* Summary */}
          {parsedResume.summary && (
            <Card className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Professional Summary</h3>
                <CopyButton field="summary" value={parsedResume.summary} />
              </div>
              <p className="text-sm">{parsedResume.summary}</p>
            </Card>
          )}

          {/* Skills */}
          {parsedResume.skills.length > 0 && (
            <Card className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Skills ({parsedResume.skills.length})</h3>
                <CopyButton field="skills" value={parsedResume.skills.join(', ')} />
              </div>
              <div className="flex flex-wrap gap-2">
                {parsedResume.skills.map((skill: string) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Education */}
          {parsedResume.education.length > 0 && (
            <Card className="p-6 space-y-3">
              <h3 className="font-semibold">Education</h3>
              <div className="space-y-3">
                {parsedResume.education.map((edu, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium">{edu.degree}</div>
                    <div className="text-sm text-muted-foreground">
                      {edu.institution} • {edu.year}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Experience */}
          {parsedResume.experience.length > 0 && (
            <Card className="p-6 space-y-3">
              <h3 className="font-semibold">Work Experience</h3>
              <div className="space-y-3">
                {parsedResume.experience.map((exp, index: number) => (
                  <div key={index} className="p-3 border rounded-lg space-y-1">
                    <div className="font-medium">{exp.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {exp.company} • {exp.duration}
                    </div>
                    {exp.description && (
                      <p className="text-sm mt-2">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Raw Text */}
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Raw Text</h3>
              <CopyButton field="raw" value={parsedResume.rawText} />
            </div>
            <div className="p-3 bg-muted/50 rounded-lg max-h-64 overflow-y-auto">
              <pre className="text-xs whitespace-pre-wrap">{parsedResume.rawText}</pre>
            </div>
          </Card>
        </>
      )}

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>How to use:</strong> Upload a PDF or TXT resume file, and we'll extract contact
            info, skills, education, and work experience.
          </div>
          <div>
            <strong>Tip:</strong> The parser works best with standard resume formats. Export the
            parsed data as JSON or CSV for further use.
          </div>
          <div>
            <strong>Privacy:</strong> All parsing happens in your browser. No data is sent to servers.
          </div>
        </div>
      </Card>
    </div>
  )
}
