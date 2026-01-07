'use client'

import { useState, useRef } from 'react'
import { Upload, Film, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loadVideo, calculateDimensions, formatTime, estimateGifSize, type GifSettings, type GifResolution, type GifLoop } from './logic'

export default function GifMakerUI() {
  const [file, setFile] = useState<File | null>(null)
  const [videoInfo, setVideoInfo] = useState<{ duration: number; width: number; height: number } | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [fps, setFps] = useState(10)
  const [resolution, setResolution] = useState<GifResolution>('480p')
  const [loop, setLoop] = useState<GifLoop>('infinite')
  const [quality, setQuality] = useState(7)
  const [error, setError] = useState<string | undefined>()

  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    try {
      setError(undefined)
      setFile(selectedFile)

      const info = await loadVideo(selectedFile)
      setVideoInfo(info)
      setEndTime(Math.min(10, info.duration)) // Default to 10 seconds or video length

      const url = URL.createObjectURL(selectedFile)
      setVideoUrl(url)
    } catch (err) {
      setError('Failed to load video file. Please try a different file.')
    }
  }

  const outputDimensions = videoInfo ? calculateDimensions(videoInfo.width, videoInfo.height, resolution) : null
  const frameCount = (endTime - startTime) * fps
  const estimatedSize = outputDimensions ? estimateGifSize(frameCount, outputDimensions.width, outputDimensions.height, quality) : null

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Video or Images</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium">
            {file ? file.name : 'Click to upload video or images'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Supports MP4, MOV, WebM, and image sequences
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {videoUrl && videoInfo && (
        <>
          {/* Video Preview */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Preview</label>
            <div className="relative rounded-lg overflow-hidden bg-black">
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                className="w-full"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>

          {/* Time Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Time (seconds)</label>
              <Input
                type="number"
                min={0}
                max={endTime}
                step={0.1}
                value={startTime.toFixed(1)}
                onChange={(e) => setStartTime(Math.max(0, parseFloat(e.target.value) || 0))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Time (seconds)</label>
              <Input
                type="number"
                min={startTime}
                max={videoInfo.duration}
                step={0.1}
                value={endTime.toFixed(1)}
                onChange={(e) => setEndTime(Math.min(videoInfo.duration, parseFloat(e.target.value) || videoInfo.duration))}
              />
            </div>
          </div>

          {/* GIF Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Frame Rate (FPS)</label>
              <Input
                type="number"
                min={1}
                max={30}
                value={fps}
                onChange={(e) => setFps(Math.min(30, Math.max(1, parseInt(e.target.value) || 10)))}
              />
              <p className="text-xs text-muted-foreground">Lower FPS = smaller file size</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Resolution</label>
              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value as GifResolution)}
                className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm"
              >
                <option value="original">Original</option>
                <option value="480p">480p</option>
                <option value="360p">360p</option>
                <option value="240p">240p</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Quality (1-10)</label>
              <Input
                type="number"
                min={1}
                max={10}
                value={quality}
                onChange={(e) => setQuality(Math.min(10, Math.max(1, parseInt(e.target.value) || 7)))}
              />
              <p className="text-xs text-muted-foreground">Higher quality = larger file</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Loop</label>
              <select
                value={loop}
                onChange={(e) => setLoop(e.target.value as GifLoop)}
                className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm"
              >
                <option value="infinite">Loop Forever</option>
                <option value="once">Play Once</option>
                <option value="custom">Custom Count</option>
              </select>
            </div>
          </div>

          {/* Output Info */}
          <div className="rounded-lg bg-blue-500/10 p-4 space-y-2">
            <p className="text-sm font-medium flex items-center gap-2">
              <Film className="h-4 w-4" />
              Output Preview
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Duration:</span>{' '}
                <span className="font-medium">{formatTime(endTime - startTime)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Frames:</span>{' '}
                <span className="font-medium">{Math.floor(frameCount)}</span>
              </div>
              {outputDimensions && (
                <div>
                  <span className="text-muted-foreground">Size:</span>{' '}
                  <span className="font-medium">{outputDimensions.width}x{outputDimensions.height}</span>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">Est. Size:</span>{' '}
                <span className="font-medium">{estimatedSize}</span>
              </div>
            </div>
          </div>

          {/* Browser Limitation Note */}
          <div className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-700 dark:text-yellow-400">
                Browser Limitation
              </p>
              <p className="text-yellow-600 dark:text-yellow-500 mt-1">
                GIF encoding requires external libraries (like gif.js) which are not included by default.
                This tool provides configuration and preview. For actual GIF creation, consider using
                libraries like gif.js, or online services like GIPHY, ezgif.com, or desktop tools like FFmpeg.
              </p>
            </div>
          </div>
        </>
      )}

      {/* Help Text */}
      <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-2">
        <p className="font-medium">GIF Maker</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Upload a video to convert to GIF</li>
          <li>Set start and end times for your GIF clip</li>
          <li>Adjust frame rate (FPS) - lower values create smaller files</li>
          <li>Choose resolution to balance quality and file size</li>
          <li>Preview settings and estimated file size</li>
          <li>Note: Actual GIF encoding requires gif.js library (production enhancement)</li>
        </ul>
      </div>
    </div>
  )
}
