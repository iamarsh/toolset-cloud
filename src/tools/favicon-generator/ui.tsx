'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, Download } from 'lucide-react'
import { toast } from 'sonner'
import { generateFavicon, downloadBlob, FAVICON_SIZES } from './logic'

export default function FaviconGeneratorTool() {
  const [file, setFile] = useState<File | null>(null)
  const [previews, setPreviews] = useState<Record<number, string>>({})
  const [generating, setGenerating] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    setFile(selectedFile)
    await generatePreviews(selectedFile)
  }

  const generatePreviews = async (file: File) => {
    setGenerating(true)
    const newPreviews: Record<number, string> = {}

    try {
      for (const size of FAVICON_SIZES) {
        const blob = await generateFavicon(file, size)
        newPreviews[size] = URL.createObjectURL(blob)
      }
      setPreviews(newPreviews)
      toast.success('Favicons generated successfully')
    } catch (error) {
      toast.error('Error generating favicons')
      console.error(error)
    } finally {
      setGenerating(false)
    }
  }

  const downloadFavicon = async (size: number) => {
    if (!file) return

    try {
      const blob = await generateFavicon(file, size)
      downloadBlob(blob, `favicon-${size}x${size}.png`)
      toast.success(`Downloaded ${size}x${size} favicon`)
    } catch (error) {
      toast.error('Error downloading favicon')
      console.error(error)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Upload Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, or GIF</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
      </Card>

      {file && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Generated Favicons</h2>

          {generating ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {FAVICON_SIZES.map((size) => (
                <div
                  key={size}
                  className="p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="bg-white dark:bg-gray-800 p-2 rounded border"
                      style={{ width: size, height: size }}
                    >
                      {previews[size] && (
                        <img
                          src={previews[size]}
                          alt={`${size}x${size}`}
                          className="w-full h-full"
                        />
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">{size}x{size}</div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadFavicon(size)}
                        className="mt-2"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> ICO format conversion is not supported in browser. Download PNG files
          and use an external converter for ICO format if needed.
        </p>
      </Card>
    </div>
  )
}
