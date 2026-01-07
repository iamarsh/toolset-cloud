'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, Play, Pause, Download, Scissors, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loadAudioFile, trimAudioBuffer, audioBufferToWav, formatTime, parseTime, type AudioInfo, type TrimSettings } from './logic'

export default function AudioTrimmerUI() {
  const [file, setFile] = useState<File | null>(null)
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null)
  const [audioInfo, setAudioInfo] = useState<AudioInfo | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [fadeIn, setFadeIn] = useState(0)
  const [fadeOut, setFadeOut] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)
  const startTimeRef = useRef(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new AudioContext()
    return () => {
      audioContextRef.current?.close()
    }
  }, [])

  // Update playback position
  useEffect(() => {
    let animationFrame: number
    const updateTime = () => {
      if (isPlaying && audioContextRef.current) {
        const elapsed = audioContextRef.current.currentTime - startTimeRef.current
        setCurrentTime(elapsed)
        animationFrame = requestAnimationFrame(updateTime)
      }
    }

    if (isPlaying) {
      animationFrame = requestAnimationFrame(updateTime)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isPlaying])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    try {
      setError(undefined)
      setIsProcessing(true)
      setFile(selectedFile)

      const { audioBuffer, info } = await loadAudioFile(selectedFile)
      setAudioBuffer(audioBuffer)
      setAudioInfo(info)
      setEndTime(info.duration)
      setIsProcessing(false)
    } catch (err) {
      setError('Failed to load audio file. Please try a different file.')
      setIsProcessing(false)
    }
  }

  const handlePlayPause = () => {
    if (!audioBuffer || !audioContextRef.current) return

    if (isPlaying) {
      sourceRef.current?.stop()
      sourceRef.current = null
      setIsPlaying(false)
    } else {
      const source = audioContextRef.current.createBufferSource()
      source.buffer = audioBuffer
      source.connect(audioContextRef.current.destination)

      startTimeRef.current = audioContextRef.current.currentTime - currentTime
      source.start(0, startTime + currentTime, endTime - startTime - currentTime)

      source.onended = () => {
        setIsPlaying(false)
        setCurrentTime(0)
      }

      sourceRef.current = source
      setIsPlaying(true)
    }
  }

  const handleTrimAndDownload = async () => {
    if (!audioBuffer) return

    try {
      setIsProcessing(true)

      const settings: TrimSettings = {
        startTime,
        endTime,
        fadeIn,
        fadeOut,
      }

      const trimmedBuffer = trimAudioBuffer(audioBuffer, settings)
      const blob = audioBufferToWav(trimmedBuffer)

      // Download
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `trimmed-${file?.name || 'audio'}.wav`
      a.click()
      URL.revokeObjectURL(url)

      setIsProcessing(false)
    } catch (err) {
      setError('Failed to trim audio. Please try again.')
      setIsProcessing(false)
    }
  }

  const progressPercentage = audioInfo ? ((startTime + currentTime) / audioInfo.duration) * 100 : 0
  const trimStartPercentage = audioInfo ? (startTime / audioInfo.duration) * 100 : 0
  const trimEndPercentage = audioInfo ? (endTime / audioInfo.duration) * 100 : 100

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Audio File</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium">
            {file ? file.name : 'Click to upload audio file'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Supports MP3, WAV, OGG, and other audio formats
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {audioInfo && audioBuffer && (
        <>
          {/* Audio Info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm font-medium">{formatTime(audioInfo.duration)}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Sample Rate</p>
              <p className="text-sm font-medium">{audioInfo.sampleRate} Hz</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Channels</p>
              <p className="text-sm font-medium">{audioInfo.numberOfChannels}</p>
            </div>
          </div>

          {/* Waveform/Timeline */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Timeline</label>
            <div className="relative h-20 bg-muted/50 rounded-lg overflow-hidden">
              {/* Trim range highlight */}
              <div
                className="absolute top-0 bottom-0 bg-primary/20"
                style={{
                  left: `${trimStartPercentage}%`,
                  right: `${100 - trimEndPercentage}%`,
                }}
              />
              {/* Playback position */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-primary"
                style={{ left: `${progressPercentage}%` }}
              />
              {/* Start marker */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-blue-500 cursor-ew-resize"
                style={{ left: `${trimStartPercentage}%` }}
              />
              {/* End marker */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-blue-500 cursor-ew-resize"
                style={{ left: `${trimEndPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0:00</span>
              <span>{formatTime(audioInfo.duration)}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={handlePlayPause}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  Play Selection
                </>
              )}
            </Button>
          </div>

          {/* Trim Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Time</label>
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
              <label className="text-sm font-medium">End Time</label>
              <Input
                type="number"
                min={startTime}
                max={audioInfo.duration}
                step={0.1}
                value={endTime.toFixed(1)}
                onChange={(e) => setEndTime(Math.min(audioInfo.duration, parseFloat(e.target.value) || audioInfo.duration))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fade In (seconds)</label>
              <Input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={fadeIn.toFixed(1)}
                onChange={(e) => setFadeIn(Math.max(0, parseFloat(e.target.value) || 0))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fade Out (seconds)</label>
              <Input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={fadeOut.toFixed(1)}
                onChange={(e) => setFadeOut(Math.max(0, parseFloat(e.target.value) || 0))}
              />
            </div>
          </div>

          {/* Export Button */}
          <Button
            onClick={handleTrimAndDownload}
            disabled={isProcessing}
            className="w-full gap-2"
            size="lg"
          >
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <Download className="h-5 w-5" />
                Download Trimmed Audio (WAV)
              </>
            )}
          </Button>

          {/* Info */}
          <div className="text-xs text-muted-foreground text-center">
            Selection: {formatTime(endTime - startTime)} ({formatTime(startTime)} → {formatTime(endTime)})
          </div>
        </>
      )}

      {/* Help Text */}
      <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-2">
        <p className="font-medium flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          Audio Trimmer
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Upload audio files in MP3, WAV, OGG, or other formats</li>
          <li>Set start and end times to trim your audio</li>
          <li>Add fade in/out effects for smooth transitions</li>
          <li>Preview your selection before downloading</li>
          <li>Export as WAV format (lossless quality)</li>
          <li>All processing happens in your browser</li>
        </ul>
      </div>
    </div>
  )
}
