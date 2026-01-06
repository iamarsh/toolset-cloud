/**
 * Focus Music Logic
 * Generate ambient soundscapes using Web Audio API
 */

export interface SoundPreset {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export const soundPresets: SoundPreset[] = [
  {
    id: 'rain',
    name: 'Rain',
    description: 'Gentle rain sounds',
    icon: 'CloudRain',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    description: 'Calming ocean waves',
    icon: 'Waves',
    color: 'bg-cyan-500/10 text-cyan-500',
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Birds and nature',
    icon: 'Trees',
    color: 'bg-green-500/10 text-green-500',
  },
  {
    id: 'whitenoise',
    name: 'White Noise',
    description: 'Pure white noise',
    icon: 'Radio',
    color: 'bg-gray-500/10 text-gray-500',
  },
  {
    id: 'brownnoise',
    name: 'Brown Noise',
    description: 'Deep rumbling noise',
    icon: 'Wind',
    color: 'bg-amber-500/10 text-amber-500',
  },
  {
    id: 'pinknoise',
    name: 'Pink Noise',
    description: 'Balanced noise',
    icon: 'Sparkles',
    color: 'bg-pink-500/10 text-pink-500',
  },
]

/**
 * Audio generator class using Web Audio API
 */
export class AudioGenerator {
  private audioContext: AudioContext | null = null
  private gainNode: GainNode | null = null
  private currentSource: AudioBufferSourceNode | null = null

  /**
   * Initialize audio context
   */
  init(): void {
    if (this.audioContext) return

    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    this.gainNode = this.audioContext.createGain()
    this.gainNode.connect(this.audioContext.destination)
    this.gainNode.gain.value = 0.5
  }

  /**
   * Set volume (0 to 1)
   */
  setVolume(volume: number): void {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, volume))
    }
  }

  /**
   * Generate white noise
   */
  generateWhiteNoise(): void {
    if (!this.audioContext || !this.gainNode) return

    this.stop()

    const bufferSize = this.audioContext.sampleRate * 2
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    this.currentSource = this.audioContext.createBufferSource()
    this.currentSource.buffer = buffer
    this.currentSource.loop = true
    this.currentSource.connect(this.gainNode)
    this.currentSource.start(0)
  }

  /**
   * Generate pink noise
   */
  generatePinkNoise(): void {
    if (!this.audioContext || !this.gainNode) return

    this.stop()

    const bufferSize = this.audioContext.sampleRate * 2
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
    const data = buffer.getChannelData(0)

    let b0 = 0
    let b1 = 0
    let b2 = 0
    let b3 = 0
    let b4 = 0
    let b5 = 0
    let b6 = 0

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
      data[i] *= 0.11
      b6 = white * 0.115926
    }

    this.currentSource = this.audioContext.createBufferSource()
    this.currentSource.buffer = buffer
    this.currentSource.loop = true
    this.currentSource.connect(this.gainNode)
    this.currentSource.start(0)
  }

  /**
   * Generate brown noise
   */
  generateBrownNoise(): void {
    if (!this.audioContext || !this.gainNode) return

    this.stop()

    const bufferSize = this.audioContext.sampleRate * 2
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
    const data = buffer.getChannelData(0)

    let lastOut = 0

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      data[i] = (lastOut + 0.02 * white) / 1.02
      lastOut = data[i]
      data[i] *= 3.5
    }

    this.currentSource = this.audioContext.createBufferSource()
    this.currentSource.buffer = buffer
    this.currentSource.loop = true
    this.currentSource.connect(this.gainNode)
    this.currentSource.start(0)
  }

  /**
   * Play preset sound
   */
  play(presetId: string): void {
    this.init()

    switch (presetId) {
      case 'whitenoise':
        this.generateWhiteNoise()
        break
      case 'pinknoise':
        this.generatePinkNoise()
        break
      case 'brownnoise':
        this.generateBrownNoise()
        break
      case 'rain':
        this.generatePinkNoise() // Approximation
        break
      case 'ocean':
        this.generateBrownNoise() // Approximation
        break
      case 'forest':
        this.generatePinkNoise() // Approximation
        break
    }
  }

  /**
   * Stop playback
   */
  stop(): void {
    if (this.currentSource) {
      try {
        this.currentSource.stop()
        this.currentSource.disconnect()
      } catch (e) {
        // Ignore errors from already stopped sources
      }
      this.currentSource = null
    }
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    this.stop()
    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
    }
  }
}
