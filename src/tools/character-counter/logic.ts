/**
 * Character Counter Logic (Social Media focused)
 */

export interface CharacterStats {
  characters: number
  charactersNoSpaces: number
  words: number
  lines: number
}

export interface PlatformLimit {
  name: string
  limit: number
  icon: string
}

export const platforms: PlatformLimit[] = [
  { name: 'Twitter/X', limit: 280, icon: '𝕏' },
  { name: 'LinkedIn Post', limit: 3000, icon: '🔗' },
  { name: 'Instagram Caption', limit: 2200, icon: '📷' },
  { name: 'TikTok Caption', limit: 150, icon: '🎵' },
  { name: 'YouTube Title', limit: 100, icon: '▶️' },
  { name: 'Meta Title', limit: 60, icon: '🔍' },
  { name: 'Meta Description', limit: 160, icon: '📝' },
]

export function countCharacters(text: string): CharacterStats {
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const lines = text.split('\n').length

  return { characters, charactersNoSpaces, words, lines }
}

export function getProgress(current: number, limit: number): number {
  return Math.min((current / limit) * 100, 100)
}

export function getStatus(current: number, limit: number): 'ok' | 'warning' | 'over' {
  const ratio = current / limit
  if (ratio > 1) return 'over'
  if (ratio > 0.9) return 'warning'
  return 'ok'
}
