'use client'

import { useState, useRef } from 'react'
import { Upload, Download, Video, RefreshCw, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  compressVideo,
  downloadVideo,
  getVideoInfo,
  formatFileSize,
  formatDuration,
  getResolutionPresets,
  type VideoInfo,
  type CompressionSettings,
  type QualityPreset,
  type VideoFormat,
} from './logic'

export default function VideoCompressorUI() {
  const [file, setFile] = useState<File | null>(null)
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null)
  const [compressedFilename, setCompressedFilename] = useState<string>('')
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [settings, setSettings] = useState<CompressionSettings>({
    quality: 'medium',
    resolution: '',
    format: 'mp4',
    maintainAspectRatio: true,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const resolutionPresets = getResolutionPresets()

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setCompressedBlob(null)
    setProgress(0)

    try {
      const info = await getVideoInfo(selectedFile)
      setVideoInfo(info)
    } catch (error) {
      console.error('Failed to load video info:', error)
      alert('Failed to load video information. Please try a different file.')
    }
  }

  const handleCompress = async () => {
    if (!file) return

    setIsCompressing(true)
    setProgress(0)

    try {
      const result = await compressVideo(file, settings, (p) => setProgress(p))
      setCompressedBlob(result.blob)
      setCompressedFilename(result.filename)
      setOriginalSize(result.originalSize)
      setCompressedSize(result.compressedSize)
    } catch (error) {
      console.error('Compression failed:', error)
      alert('Failed to compress video. Please try different settings or a smaller file.')
    } finally {
      setIsCompressing(false)
    }
  }

  const handleDownload = () => {
    if (!compressedBlob || !compressedFilename) return
    downloadVideo(compressedBlob, compressedFilename)
  }

  const handleReset = () => {
    setFile(null)
    setVideoInfo(null)
    setCompressedBlob(null)
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const compressionRatio =
    originalSize > 0 ? (((originalSize - compressedSize) / originalSize) * 100).toFixed(1) : 0

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload */}
      <Card className="p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10">
            <Video className="h-10 w-10 text-purple-500" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Upload Video</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Supports MP4, MOV, AVI, WebM (Max 100MB)
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button onClick={() => fileInputRef.current?.click()} disabled={isCompressing}>
            <Upload className="w-4 h-4 mr-2" />
            {file ? 'Change Video' : 'Select Video'}
          </Button>
        </div>
      </Card>

      {/* Video Info */}
      {videoInfo && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Video Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Name:</span>
              <p className="font-medium truncate">{videoInfo.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Size:</span>
              <p className="font-medium">{formatFileSize(videoInfo.size)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Duration:</span>
              <p className="font-medium">{formatDuration(videoInfo.duration)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Resolution:</span>
              <p className="font-medium">
                {videoInfo.width}x{videoInfo.height}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Settings */}
      {file && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Compression Settings</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Quality Preset</label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as QualityPreset[]).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setSettings({ ...settings, quality: preset })}
                    className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                      settings.quality === preset
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-input hover:bg-muted'
                    }`}
                  >
                    {preset.charAt(0).toUpperCase() + preset.slice(1)}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Low: Smallest file, Medium: Balanced, High: Best quality
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Resolution</label>
              <select
                value={settings.resolution}
                onChange={(e) => setSettings({ ...settings, resolution: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              >
                {resolutionPresets.map((preset) => (
                  <option key={preset.value} value={preset.value}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Output Format</label>
              <select
                value={settings.format}
                onChange={(e) => setSettings({ ...settings, format: e.target.value as VideoFormat })}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              >
                <option value="mp4">MP4</option>
                <option value="webm">WebM</option>
                <option value="mov">MOV</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="aspect-ratio"
                checked={settings.maintainAspectRatio}
                onChange={(e) =>
                  setSettings({ ...settings, maintainAspectRatio: e.target.checked })
                }
                className="w-4 h-4 rounded border-input"
              />
              <label htmlFor="aspect-ratio" className="text-sm cursor-pointer">
                Maintain aspect ratio
              </label>
            </div>
          </div>

          <Button onClick={handleCompress} disabled={isCompressing} className="w-full">
            {isCompressing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Compressing... {progress}%
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Compress Video
              </>
            )}
          </Button>

          {isCompressing && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-muted-foreground text-center">
                This may take a few moments...
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Result */}
      {compressedBlob && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
              <Video className="h-6 w-6 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Compression Complete</h3>
              <p className="text-sm text-muted-foreground">{compressedFilename}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Original:</span>
              <p className="font-medium">{formatFileSize(originalSize)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Compressed:</span>
              <p className="font-medium">{formatFileSize(compressedSize)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Saved:</span>
              <p className="font-medium text-green-600">{compressionRatio}%</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleReset} variant="outline">
              Compress Another
            </Button>
          </div>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4 border-blue-500/50 bg-blue-500/5">
        <div className="flex gap-2">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground space-y-2">
            <div>
              <strong>Note:</strong> This is a browser-based compression tool with limited
              capabilities. For full video compression with ffmpeg.wasm, additional processing is
              required.
            </div>
            <div>
              <strong>Privacy:</strong> All processing happens in your browser. No files are
              uploaded to any server.
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
