/**
 * Audio Trimmer Logic
 * Uses Web Audio API for client-side audio processing
 */

export interface AudioInfo {
  duration: number
  sampleRate: number
  numberOfChannels: number
}

export interface TrimSettings {
  startTime: number
  endTime: number
  fadeIn: number
  fadeOut: number
}

/**
 * Load audio file and get info
 */
export async function loadAudioFile(file: File): Promise<{
  audioBuffer: AudioBuffer
  info: AudioInfo
}> {
  const audioContext = new AudioContext()
  const arrayBuffer = await file.arrayBuffer()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

  return {
    audioBuffer,
    info: {
      duration: audioBuffer.duration,
      sampleRate: audioBuffer.sampleRate,
      numberOfChannels: audioBuffer.numberOfChannels,
    },
  }
}

/**
 * Trim audio buffer
 */
export function trimAudioBuffer(
  audioBuffer: AudioBuffer,
  settings: TrimSettings
): AudioBuffer {
  const { startTime, endTime, fadeIn, fadeOut } = settings
  const { sampleRate, numberOfChannels } = audioBuffer

  // Calculate sample positions
  const startSample = Math.floor(startTime * sampleRate)
  const endSample = Math.floor(endTime * sampleRate)
  const length = endSample - startSample

  // Create new audio buffer
  const audioContext = new AudioContext()
  const trimmedBuffer = audioContext.createBuffer(numberOfChannels, length, sampleRate)

  // Copy and apply fades
  for (let channel = 0; channel < numberOfChannels; channel++) {
    const sourceData = audioBuffer.getChannelData(channel)
    const targetData = trimmedBuffer.getChannelData(channel)

    // Copy data
    for (let i = 0; i < length; i++) {
      targetData[i] = sourceData[startSample + i]
    }

    // Apply fade in
    if (fadeIn > 0) {
      const fadeSamples = Math.floor(fadeIn * sampleRate)
      for (let i = 0; i < Math.min(fadeSamples, length); i++) {
        const gain = i / fadeSamples
        targetData[i] *= gain
      }
    }

    // Apply fade out
    if (fadeOut > 0) {
      const fadeSamples = Math.floor(fadeOut * sampleRate)
      for (let i = 0; i < Math.min(fadeSamples, length); i++) {
        const gain = i / fadeSamples
        targetData[length - 1 - i] *= gain
      }
    }
  }

  return trimmedBuffer
}

/**
 * Convert audio buffer to WAV blob
 */
export function audioBufferToWav(audioBuffer: AudioBuffer): Blob {
  const numberOfChannels = audioBuffer.numberOfChannels
  const sampleRate = audioBuffer.sampleRate
  const format = 1 // PCM
  const bitDepth = 16

  const bytesPerSample = bitDepth / 8
  const blockAlign = numberOfChannels * bytesPerSample

  const data = new Float32Array(audioBuffer.length * numberOfChannels)
  for (let channel = 0; channel < numberOfChannels; channel++) {
    const channelData = audioBuffer.getChannelData(channel)
    for (let i = 0; i < audioBuffer.length; i++) {
      data[i * numberOfChannels + channel] = channelData[i]
    }
  }

  const dataLength = data.length * bytesPerSample
  const buffer = new ArrayBuffer(44 + dataLength)
  const view = new DataView(buffer)

  // WAV header
  writeString(view, 0, 'RIFF')
  view.setUint32(4, 36 + dataLength, true)
  writeString(view, 8, 'WAVE')
  writeString(view, 12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, format, true)
  view.setUint16(22, numberOfChannels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * blockAlign, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, bitDepth, true)
  writeString(view, 36, 'data')
  view.setUint32(40, dataLength, true)

  // Write audio data
  floatTo16BitPCM(view, 44, data)

  return new Blob([buffer], { type: 'audio/wav' })
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i))
  }
}

function floatTo16BitPCM(view: DataView, offset: number, input: Float32Array) {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]))
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true)
  }
}

/**
 * Format time in HH:MM:SS.mmm
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const ms = Math.floor((seconds % 1) * 1000)

  const parts = []
  if (hours > 0) parts.push(hours.toString().padStart(2, '0'))
  parts.push(minutes.toString().padStart(2, '0'))
  parts.push(secs.toString().padStart(2, '0'))

  return `${parts.join(':')}.${ms.toString().padStart(3, '0')}`
}

/**
 * Parse time string HH:MM:SS.mmm or MM:SS.mmm or SS.mmm
 */
export function parseTime(timeString: string): number {
  const parts = timeString.split(':')
  let seconds = 0

  if (parts.length === 3) {
    // HH:MM:SS.mmm
    seconds = parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2])
  } else if (parts.length === 2) {
    // MM:SS.mmm
    seconds = parseFloat(parts[0]) * 60 + parseFloat(parts[1])
  } else {
    // SS.mmm
    seconds = parseFloat(parts[0])
  }

  return seconds
}
