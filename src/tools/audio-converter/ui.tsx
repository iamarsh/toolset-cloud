'use client'

import { useState, useRef } from 'react'
import { Upload, Download, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { loadAudio, audioBufferToWav, estimateFileSize, type AudioFormat, type AudioQuality, type SampleRate } from './logic'

export default function AudioConverterUI() {
  const [file, setFile] = useState<File | null>(null)
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null)
  const [format, setFormat] = useState<AudioFormat>('wav')
  const [quality, setQuality] = useState<AudioQuality>(192)
  const [sampleRate, setSampleRate] = useState<SampleRate>(44100)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    try {
      setError(undefined)
      setIsProcessing(true)
      setFile(selectedFile)

      const buffer = await loadAudio(selectedFile)
      setAudioBuffer(buffer)
      setIsProcessing(false)
    } catch (err) {
      setError('Failed to load audio file. Please try a different file.')
      setIsProcessing(false)
    }
  }

  const handleConvert = async () => {
    if (!audioBuffer || !file) return

    try {
      setIsProcessing(true)

      // Currently only WAV is supported (MP3/OGG require external libraries)
      const blob = audioBufferToWav(audioBuffer, sampleRate)

      // Download
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const outputName = file.name.replace(/\.[^.]+$/, `.${format}`)
      a.download = outputName
      a.click()
      URL.revokeObjectURL(url)

      setIsProcessing(false)
    } catch (err) {
      setError('Failed to convert audio. Please try again.')
      setIsProcessing(false)
    }
  }

  const estimatedSize = audioBuffer ? estimateFileSize(audioBuffer, format, quality, sampleRate) : null

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

      {audioBuffer && (
        <>
          {/* File Info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm font-medium">{audioBuffer.duration.toFixed(1)}s</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Sample Rate</p>
              <p className="text-sm font-medium">{audioBuffer.sampleRate} Hz</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Channels</p>
              <p className="text-sm font-medium">{audioBuffer.numberOfChannels}</p>
            </div>
          </div>

          {/* Conversion Settings */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Output Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as AudioFormat)}
                className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm"
              >
                <option value="wav">WAV (Lossless)</option>
                <option value="mp3" disabled>MP3 (Coming Soon)</option>
                <option value="ogg" disabled>OGG (Coming Soon)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sample Rate</label>
              <select
                value={sampleRate}
                onChange={(e) => setSampleRate(parseInt(e.target.value) as SampleRate)}
                className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm"
              >
                <option value="44100">44.1 kHz (CD Quality)</option>
                <option value="48000">48 kHz (Studio Quality)</option>
              </select>
            </div>

            {format !== 'wav' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Bitrate</label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value) as AudioQuality)}
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm"
                >
                  <option value="64">64 kbps</option>
                  <option value="128">128 kbps</option>
                  <option value="192">192 kbps (Recommended)</option>
                  <option value="256">256 kbps</option>
                  <option value="320">320 kbps (Maximum)</option>
                </select>
              </div>
            )}
          </div>

          {/* File Size Estimate */}
          {estimatedSize && (
            <div className="rounded-lg bg-blue-500/10 p-3 text-sm">
              <p className="text-muted-foreground">Estimated output size: <span className="font-medium text-foreground">{estimatedSize}</span></p>
            </div>
          )}

          {/* Convert Button */}
          <Button
            onClick={handleConvert}
            disabled={isProcessing}
            className="w-full gap-2"
            size="lg"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                Convert & Download
              </>
            )}
          </Button>
        </>
      )}

      {/* Help Text */}
      <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-2">
        <p className="font-medium">Audio Converter</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Convert audio files between different formats</li>
          <li>Adjust sample rate for quality and file size</li>
          <li>Choose bitrate for compressed formats (MP3/OGG)</li>
          <li>WAV format provides lossless quality</li>
          <li>All conversion happens in your browser</li>
          <li>Note: MP3 and OGG export coming soon (requires additional libraries)</li>
        </ul>
      </div>
    </div>
  )
}
