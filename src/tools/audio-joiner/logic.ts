/**
 * Audio Joiner Logic
 * Merge multiple audio files into one
 */

export interface AudioFile {
  id: string
  file: File
  name: string
  duration: number
  buffer: AudioBuffer | null
}

export interface JoinSettings {
  fadeInDuration: number // seconds
  fadeOutDuration: number // seconds
  normalizeVolume: boolean
  outputFormat: 'wav' | 'mp3'
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

/**
 * Load audio file into AudioBuffer
 */
export async function loadAudioFile(file: File, audioContext: AudioContext): Promise<AudioBuffer> {
  const arrayBuffer = await file.arrayBuffer()
  return await audioContext.decodeAudioData(arrayBuffer)
}

/**
 * Create AudioFile object from File
 */
export async function createAudioFile(file: File, audioContext: AudioContext): Promise<AudioFile> {
  const buffer = await loadAudioFile(file, audioContext)
  return {
    id: generateId(),
    file,
    name: file.name,
    duration: buffer.duration,
    buffer,
  }
}

/**
 * Merge multiple audio buffers into one
 */
export async function mergeAudioBuffers(
  audioFiles: AudioFile[],
  audioContext: AudioContext,
  settings: JoinSettings
): Promise<AudioBuffer> {
  if (audioFiles.length === 0) {
    throw new Error('No audio files to merge')
  }

  // Calculate total duration with fades
  const totalDuration = audioFiles.reduce((sum: number, file: AudioFile) => sum + file.duration, 0)

  // Determine output channels (max of all inputs)
  const numberOfChannels = Math.max(...audioFiles.map((f: AudioFile) => f.buffer?.numberOfChannels || 2))

  // Determine sample rate (use context's sample rate)
  const sampleRate = audioContext.sampleRate

  // Create output buffer
  const outputBuffer = audioContext.createBuffer(
    numberOfChannels,
    Math.ceil(totalDuration * sampleRate),
    sampleRate
  )

  // Copy each audio file into the output buffer
  let currentTime = 0

  for (const audioFile of audioFiles) {
    if (!audioFile.buffer) continue

    const startFrame = Math.floor(currentTime * sampleRate)
    const fadeInFrames = Math.floor(settings.fadeInDuration * sampleRate)
    const fadeOutFrames = Math.floor(settings.fadeOutDuration * sampleRate)

    for (let channel = 0; channel < numberOfChannels; channel++) {
      const outputData = outputBuffer.getChannelData(channel)
      const inputChannel = Math.min(channel, audioFile.buffer.numberOfChannels - 1)
      const inputData = audioFile.buffer.getChannelData(inputChannel)

      // Normalize volume if enabled
      let maxAmplitude = 1.0
      if (settings.normalizeVolume) {
        maxAmplitude = Math.max(...Array.from(inputData).map((v: number) => Math.abs(v)))
        if (maxAmplitude === 0) maxAmplitude = 1.0
      }

      for (let i = 0; i < inputData.length; i++) {
        const outputIndex = startFrame + i
        if (outputIndex >= outputData.length) break

        let sample = inputData[i]

        // Normalize
        if (settings.normalizeVolume && maxAmplitude > 0) {
          sample = sample / maxAmplitude
        }

        // Apply fade in
        if (i < fadeInFrames && settings.fadeInDuration > 0) {
          sample *= i / fadeInFrames
        }

        // Apply fade out
        if (i > inputData.length - fadeOutFrames && settings.fadeOutDuration > 0) {
          const fadeOutProgress = (inputData.length - i) / fadeOutFrames
          sample *= fadeOutProgress
        }

        outputData[outputIndex] = sample
      }
    }

    currentTime += audioFile.duration
  }

  return outputBuffer
}

/**
 * Convert AudioBuffer to WAV file
 */
export function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numberOfChannels = buffer.numberOfChannels
  const length = buffer.length * numberOfChannels * 2
  const arrayBuffer = new ArrayBuffer(44 + length)
  const view = new DataView(arrayBuffer)

  // Write WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }

  writeString(0, 'RIFF')
  view.setUint32(4, 36 + length, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true) // PCM
  view.setUint16(20, 1, true) // PCM format
  view.setUint16(22, numberOfChannels, true)
  view.setUint32(24, buffer.sampleRate, true)
  view.setUint32(28, buffer.sampleRate * numberOfChannels * 2, true) // byte rate
  view.setUint16(32, numberOfChannels * 2, true) // block align
  view.setUint16(34, 16, true) // bits per sample
  writeString(36, 'data')
  view.setUint32(40, length, true)

  // Write audio data
  const offset = 44
  const channels = []
  for (let i = 0; i < numberOfChannels; i++) {
    channels.push(buffer.getChannelData(i))
  }

  let index = offset
  for (let i = 0; i < buffer.length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, channels[channel][i]))
      view.setInt16(index, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true)
      index += 2
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' })
}

/**
 * Download merged audio
 */
export function downloadAudio(blob: Blob, filename: string = 'merged-audio.wav'): void {
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
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
