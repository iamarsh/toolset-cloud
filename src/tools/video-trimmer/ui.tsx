'use client'

import { useState, useRef } from 'react'
import { Upload, Play, Pause, Scissors, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loadVideoFile, formatTime, estimateTrimmedSize, type VideoInfo } from './logic'

export default function VideoTrimmerUI() {
  const [file, setFile] = useState<File | null>(null)
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [error, setError] = useState<string | undefined>()

  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    try {
      setError(undefined)
      setFile(selectedFile)

      const info = await loadVideoFile(selectedFile)
      setVideoInfo(info)
      setEndTime(info.duration)

      const url = URL.createObjectURL(selectedFile)
      setVideoUrl(url)
    } catch (err) {
      setError('Failed to load video file. Please try a different file.')
    }
  }

  const handlePlayPause = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    setCurrentTime(videoRef.current.currentTime)

    // Stop at end time
    if (videoRef.current.currentTime >= endTime) {
      videoRef.current.pause()
      setIsPlaying(false)
      videoRef.current.currentTime = startTime
    }
  }

  const handleSeek = (time: number) => {
    if (!videoRef.current) return
    videoRef.current.currentTime = time
    setCurrentTime(time)
  }

  const estimatedSize = videoInfo ? estimateTrimmedSize(videoInfo.size, videoInfo.duration, endTime - startTime) : null

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Video File</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium">
            {file ? file.name : 'Click to upload video file'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Supports MP4, MOV, AVI, WebM, and other video formats
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
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                className="w-full"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>

          {/* Video Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm font-medium">{formatTime(videoInfo.duration)}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Resolution</p>
              <p className="text-sm font-medium">{videoInfo.width}x{videoInfo.height}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">File Size</p>
              <p className="text-sm font-medium">{formatTime(videoInfo.size)}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Current Time</p>
              <p className="text-sm font-medium">{formatTime(currentTime)}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Timeline</label>
            <input
              type="range"
              min={0}
              max={videoInfo.duration}
              step={0.1}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button onClick={() => handleSeek(startTime)} variant="outline">
              Go to Start
            </Button>
            <Button onClick={handlePlayPause} size="lg" className="gap-2">
              {isPlaying ? (
                <>
                  <Pause className="h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  Play
                </>
              )}
            </Button>
            <Button onClick={() => handleSeek(endTime)} variant="outline">
              Go to End
            </Button>
          </div>

          {/* Trim Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Time (seconds)</label>
              <Input
                type="number"
                min={0}
                max={endTime}
                step={0.1}
                value={startTime.toFixed(1)}
                onChange={(e) => {
                  const value = Math.max(0, parseFloat(e.target.value) || 0)
                  setStartTime(value)
                  handleSeek(value)
                }}
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

          {/* Output Info */}
          <div className="rounded-lg bg-blue-500/10 p-4 space-y-2">
            <p className="text-sm font-medium">Trimmed Video Info</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Duration:</span>{' '}
                <span className="font-medium">{formatTime(endTime - startTime)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Estimated Size:</span>{' '}
                <span className="font-medium">{estimatedSize}</span>
              </div>
            </div>
          </div>

          {/* Note about video re-encoding */}
          <div className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-700 dark:text-yellow-400">
                Browser Limitation
              </p>
              <p className="text-yellow-600 dark:text-yellow-500 mt-1">
                Video trimming requires re-encoding which cannot be done efficiently in the browser.
                This tool provides preview and timeline controls. For actual video trimming, please use
                desktop software like FFmpeg, Adobe Premiere, or online services.
              </p>
            </div>
          </div>
        </>
      )}

      {/* Help Text */}
      <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-2">
        <p className="font-medium">Video Trimmer</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Upload video files to preview and set trim points</li>
          <li>Use the timeline to navigate through your video</li>
          <li>Set start and end times for your trimmed section</li>
          <li>Preview the selected portion before processing</li>
          <li>Note: Actual video encoding requires external tools or server-side processing</li>
        </ul>
      </div>
    </div>
  )
}
