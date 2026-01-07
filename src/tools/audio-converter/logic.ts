/**
 * Audio Converter Logic
 * Convert between audio formats using Web Audio API
 */

export type AudioFormat = 'wav' | 'mp3' | 'ogg'
export type AudioQuality = 64 | 128 | 192 | 256 | 320
export type SampleRate = 44100 | 48000

export interface ConversionSettings {
  format: AudioFormat
  quality: AudioQuality
  sampleRate: SampleRate
}

/**
 * Load audio file
 */
export async function loadAudio(file: File): Promise<AudioBuffer> {
  const audioContext = new AudioContext()
  const arrayBuffer = await file.arrayBuffer()
  return await audioContext.decodeAudioData(arrayBuffer)
}

/**
 * Convert audio buffer to WAV
 */
export function audioBufferToWav(audioBuffer: AudioBuffer, sampleRate?: number): Blob {
  const targetSampleRate = sampleRate || audioBuffer.sampleRate
  const numberOfChannels = audioBuffer.numberOfChannels
  const format = 1 // PCM
  const bitDepth = 16

  // Resample if needed
  let buffer = audioBuffer
  if (targetSampleRate !== audioBuffer.sampleRate) {
    buffer = resampleAudioBuffer(audioBuffer, targetSampleRate)
  }

  const bytesPerSample = bitDepth / 8
  const blockAlign = numberOfChannels * bytesPerSample

  const data = new Float32Array(buffer.length * numberOfChannels)
  for (let channel = 0; channel < numberOfChannels; channel++) {
    const channelData = buffer.getChannelData(channel)
    for (let i = 0; i < buffer.length; i++) {
      data[i * numberOfChannels + channel] = channelData[i]
    }
  }

  const dataLength = data.length * bytesPerSample
  const arrayBuffer = new ArrayBuffer(44 + dataLength)
  const view = new DataView(arrayBuffer)

  // WAV header
  writeString(view, 0, 'RIFF')
  view.setUint32(4, 36 + dataLength, true)
  writeString(view, 8, 'WAVE')
  writeString(view, 12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, format, true)
  view.setUint16(22, numberOfChannels, true)
  view.setUint32(24, targetSampleRate, true)
  view.setUint32(28, targetSampleRate * blockAlign, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, bitDepth, true)
  writeString(view, 36, 'data')
  view.setUint32(40, dataLength, true)

  floatTo16BitPCM(view, 44, data)

  return new Blob([arrayBuffer], { type: 'audio/wav' })
}

/**
 * Simple resampling (linear interpolation)
 */
function resampleAudioBuffer(audioBuffer: AudioBuffer, targetSampleRate: number): AudioBuffer {
  const audioContext = new AudioContext()
  const sourceSampleRate = audioBuffer.sampleRate
  const ratio = targetSampleRate / sourceSampleRate
  const newLength = Math.floor(audioBuffer.length * ratio)

  const resampledBuffer = audioContext.createBuffer(
    audioBuffer.numberOfChannels,
    newLength,
    targetSampleRate
  )

  for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
    const sourceData = audioBuffer.getChannelData(channel)
    const targetData = resampledBuffer.getChannelData(channel)

    for (let i = 0; i < newLength; i++) {
      const sourceIndex = i / ratio
      const index0 = Math.floor(sourceIndex)
      const index1 = Math.min(index0 + 1, sourceData.length - 1)
      const fraction = sourceIndex - index0

      targetData[i] = sourceData[index0] * (1 - fraction) + sourceData[index1] * fraction
    }
  }

  return resampledBuffer
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
 * Estimate output file size
 */
export function estimateFileSize(
  audioBuffer: AudioBuffer,
  format: AudioFormat,
  quality: AudioQuality,
  sampleRate: SampleRate
): string {
  const duration = audioBuffer.duration
  let bytesPerSecond: number

  if (format === 'wav') {
    // WAV is uncompressed: sampleRate * channels * bytesPerSample
    bytesPerSecond = sampleRate * audioBuffer.numberOfChannels * 2
  } else {
    // MP3/OGG: use bitrate
    bytesPerSecond = (quality * 1000) / 8
  }

  const totalBytes = bytesPerSecond * duration
  return formatBytes(totalBytes)
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes.toFixed(0)} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
