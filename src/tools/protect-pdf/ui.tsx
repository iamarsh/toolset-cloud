'use client'

import { useState } from 'react'
import { FileText, Shield, Download, Loader2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  protectPDF,
  addWatermark,
  getPDFPageCount,
  downloadPDF,
  formatFileSize,
  type ProtectionOptions,
} from './logic'

type ProtectionMode = 'password' | 'watermark'

export default function ProtectPDFUI() {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [mode, setMode] = useState<ProtectionMode>('password')
  const [ownerPassword, setOwnerPassword] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL')
  const [showPasswords, setShowPasswords] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [protectedBlob, setProtectedBlob] = useState<Blob | null>(null)
  const [error, setError] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setError('')
      setProtectedBlob(null)

      const count = await getPDFPageCount(selectedFile)
      setPageCount(count)
    } else {
      setError('Please select a valid PDF file')
    }
  }

  const handleProtect = async () => {
    if (!file) return

    if (mode === 'password') {
      if (!ownerPassword) {
        setError('Please enter an owner password')
        return
      }
    } else {
      if (!watermarkText.trim()) {
        setError('Please enter watermark text')
        return
      }
    }

    setIsProcessing(true)
    setError('')

    let result

    if (mode === 'password') {
      const options: ProtectionOptions = {
        ownerPassword,
        userPassword: userPassword || undefined,
        allowPrinting: true,
        allowCopying: false,
        allowModifying: false,
        allowAnnotating: false,
      }
      result = await protectPDF(file, options)
    } else {
      result = await addWatermark(file, watermarkText)
    }

    setIsProcessing(false)

    if (result.success && result.pdfBlob) {
      setProtectedBlob(result.pdfBlob)
    } else {
      setError(result.error || 'Failed to protect PDF')
    }
  }

  const handleDownload = () => {
    if (!protectedBlob || !file) return
    const basename = file.name.replace('.pdf', '')
    const suffix = mode === 'password' ? 'protected' : 'watermarked'
    downloadPDF(protectedBlob, `${basename}-${suffix}.pdf`)
  }

  const handleClear = () => {
    setFile(null)
    setProtectedBlob(null)
    setError('')
    setOwnerPassword('')
    setUserPassword('')
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

      {/* Protection Options */}
      {file && (
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Protection Type</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={mode === 'password' ? 'default' : 'outline'}
                onClick={() => setMode('password')}
                className="w-full"
              >
                Password Protection
              </Button>
              <Button
                variant={mode === 'watermark' ? 'default' : 'outline'}
                onClick={() => setMode('watermark')}
                className="w-full"
              >
                Watermark
              </Button>
            </div>
          </div>

          {mode === 'password' && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Owner Password (Required)
                </label>
                <div className="relative">
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={ownerPassword}
                    onChange={(e) => setOwnerPassword(e.target.value)}
                    placeholder="Enter owner password"
                    className="w-full px-3 py-2 pr-10 rounded-md border border-input bg-background text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPasswords ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Full control password for editing and permissions
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  User Password (Optional)
                </label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  placeholder="Enter user password"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Required to open and view the PDF
                </p>
              </div>

              <div className="p-3 rounded-md bg-amber-500/10 border border-amber-500/20">
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  <strong>Note:</strong> Client-side password protection has limitations.
                  For maximum security, use server-side encryption tools.
                </p>
              </div>
            </div>
          )}

          {mode === 'watermark' && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2">Watermark Text</label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Enter watermark text"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Will appear diagonally across all pages
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {['CONFIDENTIAL', 'DRAFT', 'SAMPLE'].map((preset) => (
                  <Button
                    key={preset}
                    variant="outline"
                    size="sm"
                    onClick={() => setWatermarkText(preset)}
                  >
                    {preset}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <Button onClick={handleProtect} disabled={isProcessing} className="w-full">
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                {mode === 'password' ? 'Protect PDF' : 'Add Watermark'}
              </>
            )}
          </Button>
        </Card>
      )}

      {/* Result */}
      {protectedBlob && (
        <Card className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-green-500/10">
              <Shield className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">PDF Protected Successfully!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {mode === 'password'
                  ? 'Password protection has been applied'
                  : 'Watermark has been added to all pages'}
              </p>
            </div>
            <Button onClick={handleDownload} className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Download Protected PDF
            </Button>
          </div>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>Password Protection:</strong> Adds password requirement to open and
            edit the PDF. Use owner password for full control.
          </div>
          <div>
            <strong>Watermark:</strong> Adds visible text across all pages to mark
            document as confidential, draft, or sample.
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
