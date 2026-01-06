'use client'

import { useState } from 'react'
import { Upload, ScanLine, Copy, Check, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { copyToClipboard } from '@/lib/utils'
import { scanQRFromImage, isUrl, type QRScanResult } from './logic'

export default function QRScannerUI() {
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [result, setResult] = useState<QRScanResult | null>(null)
  const [scanning, setScanning] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)
      setImagePreview(URL.createObjectURL(selectedFile))
      setResult(null)
      setCopied(false)

      // Auto-scan
      setScanning(true)
      const scanResult = await scanQRFromImage(selectedFile)
      setResult(scanResult)
      setScanning(false)
    }
  }

  const handleCopy = async () => {
    if (!result?.data) return
    await copyToClipboard(result.data)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setFile(null)
    setImagePreview(null)
    setResult(null)
    setCopied(false)
  }

  const isResultUrl = result?.data ? isUrl(result.data) : false

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {!file ? (
        <Card className="p-6">
          <label
            htmlFor="qr-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 border-muted-foreground/25"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> QR code image
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, WEBP (MAX. 10MB)
              </p>
            </div>
            <input
              id="qr-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Image Preview */}
          <Card className="p-4">
            <div className="text-sm font-medium mb-3">Uploaded Image</div>
            <div className="aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="QR Code"
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </Card>

          {/* Scanning State */}
          {scanning && (
            <Card className="p-6">
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <ScanLine className="w-5 h-5 animate-pulse" />
                <span>Scanning QR code...</span>
              </div>
            </Card>
          )}

          {/* Results */}
          {!scanning && result && (
            <Card className="p-6 space-y-4">
              {result.success && result.data ? (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-muted-foreground mb-2">
                        Decoded Data
                      </div>
                      <div className="p-3 rounded-lg bg-muted font-mono text-sm break-all">
                        {result.data}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleCopy} variant="outline" className="flex-1">
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                    {isResultUrl && (
                      <Button
                        onClick={() => window.open(result.data, '_blank')}
                        variant="outline"
                        className="flex-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open URL
                      </Button>
                    )}
                  </div>

                  {isResultUrl && (
                    <div className="text-xs text-muted-foreground">
                      This appears to be a URL. Click "Open URL" to visit it in a new tab.
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center space-y-2">
                  <div className="text-red-500 font-medium">Scan Failed</div>
                  <div className="text-sm text-muted-foreground">{result.error}</div>
                </div>
              )}
            </Card>
          )}

          {/* Actions */}
          <Button onClick={handleReset} variant="outline" className="w-full">
            Scan Another QR Code
          </Button>
        </div>
      )}

      {/* Tips */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>Tips for best results:</strong>
          </div>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Use clear, high-resolution images</li>
            <li>Ensure good contrast (black QR on white background works best)</li>
            <li>Crop image to focus on the QR code if needed</li>
            <li>Screenshots work great - no need to take new photos</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}
