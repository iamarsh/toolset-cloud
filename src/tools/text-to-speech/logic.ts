export interface TTSSettings {
  rate: number // 0.5 to 2
  pitch: number // 0 to 2
  volume: number // 0 to 1
  voice: string
}

/**
 * Get available voices
 */
export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined') return []
  return window.speechSynthesis.getVoices()
}

/**
 * Speak text with settings
 */
export function speak(text: string, settings: TTSSettings): SpeechSynthesisUtterance {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = settings.rate
  utterance.pitch = settings.pitch
  utterance.volume = settings.volume

  // Find and set voice
  const voices = getAvailableVoices()
  const selectedVoice = voices.find((v) => v.name === settings.voice)
  if (selectedVoice) {
    utterance.voice = selectedVoice
  }

  window.speechSynthesis.speak(utterance)
  return utterance
}

/**
 * Stop speaking
 */
export function stop(): void {
  if (typeof window !== 'undefined') {
    window.speechSynthesis.cancel()
  }
}

/**
 * Pause speaking
 */
export function pause(): void {
  if (typeof window !== 'undefined') {
    window.speechSynthesis.pause()
  }
}

/**
 * Resume speaking
 */
export function resume(): void {
  if (typeof window !== 'undefined') {
    window.speechSynthesis.resume()
  }
}

/**
 * Check if speaking
 */
export function isSpeaking(): boolean {
  if (typeof window === 'undefined') return false
  return window.speechSynthesis.speaking
}
