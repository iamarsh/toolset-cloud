'use client'

import { useState, useRef } from 'react'
import { Upload, Play, Pause, Trash2, Download, Plus, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  createAudioFile,
  mergeAudioBuffers,
  audioBufferToWav,
  downloadAudio,
  formatDuration,
  formatFileSize,
  type AudioFile,
  type JoinSettings,
} from './logic'

export default function AudioJoinerUI() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [mergedAudioUrl, setMergedAudioUrl] = useState<string | null>(null)
  const [settings, setSettings] = useState<JoinSettings>({
    fadeInDuration: 0.5,
    fadeOutDuration: 0.5,
    normalizeVolume: true,
    outputFormat: 'wav',
  })
  const [playingId, setPlayingId] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map())

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContextRef.current
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setIsProcessing(true)
    const audioContext = getAudioContext()

    try {
      const newAudioFiles = await Promise.all(
        files.map((file: File) => createAudioFile(file, audioContext))
      )
      setAudioFiles([...audioFiles, ...newAudioFiles])
    } catch (error) {
      console.error('Error loading audio files:', error)
      alert('Failed to load some audio files. Please make sure they are valid audio files.')
    } finally {
      setIsProcessing(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = (id: string) => {
    setAudioFiles(audioFiles.filter((file: AudioFile) => file.id !== id))
    const audio = audioElementsRef.current.get(id)
    if (audio) {
      audio.pause()
      audioElementsRef.current.delete(id)
    }
    if (playingId === id) {
      setPlayingId(null)
    }
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const newFiles = [...audioFiles]
    ;[newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]]
    setAudioFiles(newFiles)
  }

  const handleMoveDown = (index: number) => {
    if (index === audioFiles.length - 1) return
    const newFiles = [...audioFiles]
    ;[newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]]
    setAudioFiles(newFiles)
  }

  const handlePlayPause = (id: string, file: File) => {
    if (playingId === id) {
      const audio = audioElementsRef.current.get(id)
      audio?.pause()
      setPlayingId(null)
      return
    }

    // Pause any currently playing audio
    if (playingId) {
      const currentAudio = audioElementsRef.current.get(playingId)
      currentAudio?.pause()
    }

    // Create or get audio element
    let audio = audioElementsRef.current.get(id)
    if (!audio) {
      audio = new Audio(URL.createObjectURL(file))
      audio.onended = () => setPlayingId(null)
      audioElementsRef.current.set(id, audio)
    }

    audio.play()
    setPlayingId(id)
  }

  const handleMerge = async () => {
    if (audioFiles.length === 0) return

    setIsProcessing(true)
    const audioContext = getAudioContext()

    try {
      const mergedBuffer = await mergeAudioBuffers(audioFiles, audioContext, settings)
      const wavBlob = audioBufferToWav(mergedBuffer)
      const url = URL.createObjectURL(wavBlob)
      setMergedAudioUrl(url)
    } catch (error) {
      console.error('Error merging audio:', error)
      alert('Failed to merge audio files. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!mergedAudioUrl) return

    fetch(mergedAudioUrl)
      .then((res) => res.blob())
      .then((blob) => {
        downloadAudio(blob, `merged-audio-${Date.now()}.wav`)
      })
  }

  const totalDuration = audioFiles.reduce((sum: number, file: AudioFile) => sum + file.duration, 0)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Upload */}
      <Card className="p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="w-full h-24 text-lg"
        >
          <Plus className="w-6 h-6 mr-2" />
          {audioFiles.length === 0 ? 'Upload Audio Files' : 'Add More Files'}
        </Button>
        <p className="text-sm text-muted-foreground text-center mt-2">
          Supports MP3, WAV, OGG, and other audio formats
        </p>
      </Card>

      {/* Settings */}
      {audioFiles.length > 0 && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Merge Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Fade In Duration (seconds)
              </label>
              <input
                type="number"
                value={settings.fadeInDuration}
                onChange={(e) =>
                  setSettings({ ...settings, fadeInDuration: parseFloat(e.target.value) || 0 })
                }
                min="0"
                max="5"
                step="0.1"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Fade Out Duration (seconds)
              </label>
              <input
                type="number"
                value={settings.fadeOutDuration}
                onChange={(e) =>
                  setSettings({ ...settings, fadeOutDuration: parseFloat(e.target.value) || 0 })
                }
                min="0"
                max="5"
                step="0.1"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="normalize"
              checked={settings.normalizeVolume}
              onChange={(e) => setSettings({ ...settings, normalizeVolume: e.target.checked })}
              className="w-4 h-4 rounded border-input"
            />
            <label htmlFor="normalize" className="text-sm cursor-pointer">
              Normalize volume across all clips
            </label>
          </div>
        </Card>
      )}

      {/* Audio Files List */}
      {audioFiles.length > 0 && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Audio Files ({audioFiles.length})</h3>
            <div className="text-sm text-muted-foreground">
              Total: {formatDuration(totalDuration)}
            </div>
          </div>

          <div className="space-y-2">
            {audioFiles.map((audioFile: AudioFile, index: number) => (
              <div
                key={audioFile.id}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 p-0"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                  >
                    <GripVertical className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 p-0"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === audioFiles.length - 1}
                  >
                    <GripVertical className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{audioFile.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDuration(audioFile.duration)} • {formatFileSize(audioFile.file.size)}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePlayPause(audioFile.id, audioFile.file)}
                  >
                    {playingId === audioFile.id ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleRemove(audioFile.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={handleMerge} disabled={isProcessing} className="w-full">
            {isProcessing ? 'Merging...' : 'Merge Audio Files'}
          </Button>
        </Card>
      )}

      {/* Merged Audio Preview */}
      {mergedAudioUrl && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Merged Audio</h3>
          <audio src={mergedAudioUrl} controls className="w-full" />
          <Button onClick={handleDownload} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Merged Audio
          </Button>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>How to use:</strong> Upload multiple audio files, reorder them if needed, adjust
            merge settings, then click Merge.
          </div>
          <div>
            <strong>Tip:</strong> Enable "Normalize volume" to balance audio levels across all clips.
            Add fade in/out for smooth transitions.
          </div>
        </div>
      </Card>
    </div>
  )
}
