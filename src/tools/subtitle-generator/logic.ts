/**
 * Subtitle Generator Logic
 * Generate subtitles for video files using Web Speech API
 */

export type SubtitleFormat = 'srt' | 'vtt'

export interface SubtitleEntry {
  id: number
  startTime: number
  endTime: number
  text: string
}

export interface TranscriptionOptions {
  language: string
  maxDuration?: number
}

/**
 * Extract audio from video file
 */
export async function extractAudio(file: File): Promise<MediaStream> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.muted = true
    video.src = URL.createObjectURL(file)

    video.onloadedmetadata = async () => {
      try {
        const stream = (video as any).captureStream()
        resolve(stream)
      } catch (error) {
        reject(error)
      }
    }

    video.onerror = () => reject(new Error('Failed to load video'))
  })
}

/**
 * Transcribe audio using Web Speech API
 * Note: This is a simplified version. Real implementation needs more complex handling
 */
export function transcribeAudio(
  stream: MediaStream,
  options: TranscriptionOptions,
  onTranscript: (entry: SubtitleEntry) => void,
  onProgress?: (progress: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      reject(new Error('Speech recognition not supported in this browser'))
      return
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = options.language

    let subtitleId = 1
    let startTime = 0

    recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1]
      if (result.isFinal) {
        const transcript = result[0].transcript
        const endTime = startTime + 3 // Approximate duration

        onTranscript({
          id: subtitleId++,
          startTime,
          endTime,
          text: transcript,
        })

        startTime = endTime
        onProgress?.((startTime / (options.maxDuration || 60)) * 100)
      }
    }

    recognition.onerror = (event: any) => {
      reject(new Error(`Speech recognition error: ${event.error}`))
    }

    recognition.onend = () => {
      resolve()
    }

    // Start recognition
    try {
      recognition.start()

      // Stop after max duration or when stream ends
      if (options.maxDuration) {
        setTimeout(() => {
          recognition.stop()
        }, options.maxDuration * 1000)
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Format time for subtitles (HH:MM:SS,mmm for SRT, HH:MM:SS.mmm for VTT)
 */
export function formatTime(seconds: number, format: SubtitleFormat): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const millis = Math.floor((seconds % 1) * 1000)

  const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`

  if (format === 'srt') {
    return `${timeStr},${millis.toString().padStart(3, '0')}`
  } else {
    return `${timeStr}.${millis.toString().padStart(3, '0')}`
  }
}

/**
 * Export subtitles to SRT format
 */
export function exportToSRT(entries: SubtitleEntry[]): string {
  return entries
    .map((entry) => {
      const startTime = formatTime(entry.startTime, 'srt')
      const endTime = formatTime(entry.endTime, 'srt')
      return `${entry.id}\n${startTime} --> ${endTime}\n${entry.text}\n`
    })
    .join('\n')
}

/**
 * Export subtitles to VTT format
 */
export function exportToVTT(entries: SubtitleEntry[]): string {
  const header = 'WEBVTT\n\n'
  const subtitles = entries
    .map((entry) => {
      const startTime = formatTime(entry.startTime, 'vtt')
      const endTime = formatTime(entry.endTime, 'vtt')
      return `${startTime} --> ${endTime}\n${entry.text}\n`
    })
    .join('\n')
  return header + subtitles
}

/**
 * Download subtitle file
 */
export function downloadSubtitles(content: string, filename: string, format: SubtitleFormat): void {
  const mimeType = format === 'srt' ? 'text/srt' : 'text/vtt'
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Format duration (seconds to MM:SS)
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * Get supported languages for speech recognition
 */
export function getSupportedLanguages(): Array<{ code: string; name: string }> {
  return [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish (Spain)' },
    { code: 'es-MX', name: 'Spanish (Mexico)' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'ru-RU', name: 'Russian' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'zh-CN', name: 'Chinese (Simplified)' },
  ]
}

/**
 * Parse SRT content (for editing)
 */
export function parseSRT(content: string): SubtitleEntry[] {
  const entries: SubtitleEntry[] = []
  const blocks = content.split('\n\n').filter((block) => block.trim())

  for (const block of blocks) {
    const lines = block.split('\n')
    if (lines.length < 3) continue

    const id = parseInt(lines[0])
    const timeMatch = lines[1].match(/(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})/)
    if (!timeMatch) continue

    const startTime =
      parseInt(timeMatch[1]) * 3600 +
      parseInt(timeMatch[2]) * 60 +
      parseInt(timeMatch[3]) +
      parseInt(timeMatch[4]) / 1000
    const endTime =
      parseInt(timeMatch[5]) * 3600 +
      parseInt(timeMatch[6]) * 60 +
      parseInt(timeMatch[7]) +
      parseInt(timeMatch[8]) / 1000

    const text = lines.slice(2).join('\n')

    entries.push({ id, startTime, endTime, text })
  }

  return entries
}
