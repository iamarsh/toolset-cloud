'use client'

import { useState, useRef } from 'react'
import { FileText, PenTool, Download, Loader2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  signPDF,
  getPDFInfo,
  imageToDataURL,
  downloadPDF,
  formatFileSize,
  getCurrentDate,
  type SignatureData,
  type SignaturePosition,
} from './logic'

export default function ESignDocumentUI() {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [signatureData, setSignatureData] = useState<SignatureData>({
    name: '',
    date: getCurrentDate(),
    title: '',
    company: '',
  })
  const [signatureImage, setSignatureImage] = useState<string | null>(null)
  const [position, setPosition] = useState<SignaturePosition>({
    pageNumber: 1,
    x: 50,
    y: 650,
    width: 200,
    height: 100,
  })
  const [isSigning, setIsSigning] = useState(false)
  const [signedBlob, setSignedBlob] = useState<Blob | null>(null)
  const [error, setError] = useState('')
  const signatureInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setError('')
      setSignedBlob(null)

      const info = await getPDFInfo(selectedFile)
      setPageCount(info.pageCount)
    } else {
      setError('Please select a valid PDF file')
    }
  }

  const handleSignatureImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0]
    if (imageFile && imageFile.type.startsWith('image/')) {
      try {
        const dataURL = await imageToDataURL(imageFile)
        setSignatureImage(dataURL)
      } catch (err) {
        setError('Failed to load signature image')
      }
    }
  }

  const handleSign = async () => {
    if (!file) return

    if (!signatureData.name.trim()) {
      setError('Please enter your name')
      return
    }

    setIsSigning(true)
    setError('')

    const fullSignatureData: SignatureData = {
      ...signatureData,
      signatureImage: signatureImage || undefined,
    }

    const result = await signPDF(file, fullSignatureData, position)

    setIsSigning(false)

    if (result.success && result.pdfBlob) {
      setSignedBlob(result.pdfBlob)
    } else {
      setError(result.error || 'Failed to sign PDF')
    }
  }

  const handleDownload = () => {
    if (!signedBlob || !file) return
    const basename = file.name.replace('.pdf', '')
    downloadPDF(signedBlob, `${basename}-signed.pdf`)
  }

  const handleClear = () => {
    setFile(null)
    setSignedBlob(null)
    setError('')
    setSignatureImage(null)
    setSignatureData({
      name: '',
      date: getCurrentDate(),
      title: '',
      company: '',
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* File Upload */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Upload Document (PDF)</label>
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

      {/* Signature Details */}
      {file && (
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Signature Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name (Required)</label>
              <input
                type="text"
                value={signatureData.name}
                onChange={(e) =>
                  setSignatureData({ ...signatureData, name: e.target.value })
                }
                placeholder="John Doe"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="text"
                value={signatureData.date}
                onChange={(e) =>
                  setSignatureData({ ...signatureData, date: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Title (Optional)</label>
              <input
                type="text"
                value={signatureData.title}
                onChange={(e) =>
                  setSignatureData({ ...signatureData, title: e.target.value })
                }
                placeholder="CEO, Manager, etc."
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company (Optional)</label>
              <input
                type="text"
                value={signatureData.company}
                onChange={(e) =>
                  setSignatureData({ ...signatureData, company: e.target.value })
                }
                placeholder="Company Name"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Signature Image (Optional)
            </label>
            <input
              ref={signatureInputRef}
              type="file"
              accept="image/*"
              onChange={handleSignatureImageChange}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => signatureInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Signature Image
            </Button>
            {signatureImage && (
              <div className="mt-2 p-2 border border-border rounded-md">
                <img
                  src={signatureImage}
                  alt="Signature"
                  className="h-16 object-contain"
                />
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Signature Position */}
      {file && (
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Signature Position</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Page</label>
              <input
                type="number"
                value={position.pageNumber}
                onChange={(e) =>
                  setPosition({ ...position, pageNumber: parseInt(e.target.value) })
                }
                min="1"
                max={pageCount}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">X Position</label>
              <input
                type="number"
                value={position.x}
                onChange={(e) =>
                  setPosition({ ...position, x: parseInt(e.target.value) })
                }
                min="0"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Y Position</label>
              <input
                type="number"
                value={position.y}
                onChange={(e) =>
                  setPosition({ ...position, y: parseInt(e.target.value) })
                }
                min="0"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Width</label>
              <input
                type="number"
                value={position.width}
                onChange={(e) =>
                  setPosition({ ...position, width: parseInt(e.target.value) })
                }
                min="50"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPosition({ ...position, x: 50, y: 650 })}
            >
              Top Left
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPosition({ ...position, x: 350, y: 650 })}
            >
              Top Right
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPosition({ ...position, x: 50, y: 100 })}
            >
              Bottom Left
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPosition({ ...position, x: 350, y: 100 })}
            >
              Bottom Right
            </Button>
          </div>

          <Button onClick={handleSign} disabled={isSigning} className="w-full">
            {isSigning ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing Document...
              </>
            ) : (
              <>
                <PenTool className="w-4 h-4 mr-2" />
                Sign Document
              </>
            )}
          </Button>
        </Card>
      )}

      {/* Result */}
      {signedBlob && (
        <Card className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-green-500/10">
              <PenTool className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Document Signed Successfully!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your signature has been added to the document
              </p>
            </div>
            <Button onClick={handleDownload} className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Download Signed PDF
            </Button>
          </div>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>How it works:</strong> Upload your PDF, enter signature details,
            position the signature, and sign the document digitally.
          </div>
          <div>
            <strong>Privacy:</strong> All signing happens locally in your browser. Your
            documents never leave your device.
          </div>
          <div>
            <strong>Note:</strong> This creates a visual signature. For legally binding
            digital signatures, consider using certified eSignature services.
          </div>
        </div>
      </Card>
    </div>
  )
}
