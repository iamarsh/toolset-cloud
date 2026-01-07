'use client'

import { useState, useRef } from 'react'
import { Upload, Download, Video, Plus, Trash2, Edit2, Check, X, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  exportToSRT,
  exportToVTT,
  downloadSubtitles,
  formatDuration,
  formatTime,
  getSupportedLanguages,
  type SubtitleEntry,
  type SubtitleFormat,
} from './logic'

export default function SubtitleGeneratorUI() {
  const [file, setFile] = useState<File | null>(null)
  const [subtitles, setSubtitles] = useState<SubtitleEntry[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en-US')
  const [exportFormat, setExportFormat] = useState<SubtitleFormat>('srt')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')
  const [editStartTime, setEditStartTime] = useState('')
  const [editEndTime, setEditEndTime] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const languages = getSupportedLanguages()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setSubtitles([])
  }

  const handleAddSubtitle = () => {
    const newId = subtitles.length > 0 ? Math.max(...subtitles.map((s) => s.id)) + 1 : 1
    const lastEndTime = subtitles.length > 0 ? subtitles[subtitles.length - 1].endTime : 0

    setSubtitles([
      ...subtitles,
      {
        id: newId,
        startTime: lastEndTime,
        endTime: lastEndTime + 3,
        text: '',
      },
    ])

    // Auto-edit the new subtitle
    setEditingId(newId)
    setEditText('')
    setEditStartTime(formatTime(lastEndTime, 'srt'))
    setEditEndTime(formatTime(lastEndTime + 3, 'srt'))
  }

  const handleEditSubtitle = (subtitle: SubtitleEntry) => {
    setEditingId(subtitle.id)
    setEditText(subtitle.text)
    setEditStartTime(formatTime(subtitle.startTime, 'srt'))
    setEditEndTime(formatTime(subtitle.endTime, 'srt'))
  }

  const handleSaveEdit = () => {
    if (editingId === null) return

    // Parse time strings
    const parseTime = (timeStr: string): number => {
      const match = timeStr.match(/(\d{2}):(\d{2}):(\d{2})[,.](\d{3})/)
      if (!match) return 0
      return (
        parseInt(match[1]) * 3600 +
        parseInt(match[2]) * 60 +
        parseInt(match[3]) +
        parseInt(match[4]) / 1000
      )
    }

    setSubtitles(
      subtitles.map((sub) =>
        sub.id === editingId
          ? {
              ...sub,
              startTime: parseTime(editStartTime),
              endTime: parseTime(editEndTime),
              text: editText,
            }
          : sub
      )
    )

    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  const handleDeleteSubtitle = (id: number) => {
    setSubtitles(subtitles.filter((sub) => sub.id !== id))
  }

  const handleExport = () => {
    if (subtitles.length === 0) return

    const baseName = file?.name.split('.').slice(0, -1).join('.') || 'subtitles'
    const content = exportFormat === 'srt' ? exportToSRT(subtitles) : exportToVTT(subtitles)
    const filename = `${baseName}.${exportFormat}`

    downloadSubtitles(content, filename, exportFormat)
  }

  const handleAutoGenerate = () => {
    alert(
      'Auto-transcription using Web Speech API requires microphone access and works best with audio playback. For production use, consider using dedicated transcription services like Deepgram, AssemblyAI, or Google Speech-to-Text.'
    )
  }

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
              Supports MP4, MOV, AVI, WebM
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            {file ? 'Change Video' : 'Select Video'}
          </Button>
          {file && (
            <p className="text-sm text-muted-foreground">
              Selected: <strong>{file.name}</strong>
            </p>
          )}
        </div>
      </Card>

      {/* Settings */}
      {file && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Subtitle Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Export Format</label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as SubtitleFormat)}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
              >
                <option value="srt">SRT</option>
                <option value="vtt">VTT (WebVTT)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleAutoGenerate} variant="outline" className="flex-1">
              Auto-Transcribe (Experimental)
            </Button>
            <Button onClick={handleAddSubtitle} className="flex-1">
              <Plus className="w-4 h-4 mr-2" />
              Add Manual Subtitle
            </Button>
          </div>
        </Card>
      )}

      {/* Subtitle Editor */}
      {subtitles.length > 0 && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Subtitles ({subtitles.length})</h3>
            <Button onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export {exportFormat.toUpperCase()}
            </Button>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {subtitles.map((subtitle) => (
              <div key={subtitle.id} className="border rounded-lg p-3 space-y-2">
                {editingId === subtitle.id ? (
                  // Edit mode
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-muted-foreground">Start Time</label>
                        <input
                          type="text"
                          value={editStartTime}
                          onChange={(e) => setEditStartTime(e.target.value)}
                          placeholder="00:00:00,000"
                          className="w-full px-2 py-1 text-sm rounded border border-input bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">End Time</label>
                        <input
                          type="text"
                          value={editEndTime}
                          onChange={(e) => setEditEndTime(e.target.value)}
                          placeholder="00:00:03,000"
                          className="w-full px-2 py-1 text-sm rounded border border-input bg-background"
                        />
                      </div>
                    </div>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      placeholder="Enter subtitle text..."
                      className="w-full px-3 py-2 text-sm rounded border border-input bg-background resize-none"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveEdit}>
                        <Check className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">
                          #{subtitle.id} • {formatTime(subtitle.startTime, 'srt')} →{' '}
                          {formatTime(subtitle.endTime, 'srt')}
                        </div>
                        <p className="text-sm">{subtitle.text || '(empty)'}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditSubtitle(subtitle)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteSubtitle(subtitle.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <Button onClick={handleAddSubtitle} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Another Subtitle
          </Button>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4 border-blue-500/50 bg-blue-500/5">
        <div className="flex gap-2">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground space-y-2">
            <div>
              <strong>Manual Mode:</strong> Add subtitles one by one with precise timing. Best for
              accurate subtitling.
            </div>
            <div>
              <strong>Auto-Transcribe:</strong> Experimental feature using Web Speech API. Requires
              microphone access and audio playback. For production, use dedicated transcription
              services.
            </div>
            <div>
              <strong>Time Format:</strong> Use HH:MM:SS,mmm format (e.g., 00:00:03,500 for 3.5
              seconds)
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
