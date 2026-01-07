export type GradientType = 'linear' | 'radial'

export interface ColorStop {
  id: string
  color: string
  position: number
}

export interface GradientPreset {
  id: string
  name: string
  stops: Omit<ColorStop, 'id'>[]
  type: GradientType
  angle?: number
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Generate CSS gradient string
 */
export function generateGradientCSS(
  type: GradientType,
  stops: ColorStop[],
  angle: number = 90
): string {
  const sortedStops = [...stops].sort((a, b) => a.position - b.position)
  const stopsString = sortedStops.map((stop) => `${stop.color} ${stop.position}%`).join(', ')

  if (type === 'linear') {
    return `linear-gradient(${angle}deg, ${stopsString})`
  } else {
    return `radial-gradient(circle, ${stopsString})`
  }
}

/**
 * Predefined gradient presets
 */
export const gradientPresets: GradientPreset[] = [
  {
    id: 'sunset',
    name: 'Sunset',
    type: 'linear',
    angle: 90,
    stops: [
      { color: '#ff6b6b', position: 0 },
      { color: '#feca57', position: 50 },
      { color: '#ff6348', position: 100 },
    ],
  },
  {
    id: 'ocean',
    name: 'Ocean',
    type: 'linear',
    angle: 135,
    stops: [
      { color: '#0abde3', position: 0 },
      { color: '#48dbfb', position: 100 },
    ],
  },
  {
    id: 'forest',
    name: 'Forest',
    type: 'linear',
    angle: 180,
    stops: [
      { color: '#10ac84', position: 0 },
      { color: '#1dd1a1', position: 100 },
    ],
  },
  {
    id: 'purple-bliss',
    name: 'Purple Bliss',
    type: 'linear',
    angle: 45,
    stops: [
      { color: '#5f27cd', position: 0 },
      { color: '#341f97', position: 100 },
    ],
  },
  {
    id: 'fire',
    name: 'Fire',
    type: 'radial',
    stops: [
      { color: '#feca57', position: 0 },
      { color: '#ff6348', position: 50 },
      { color: '#ee5a6f', position: 100 },
    ],
  },
  {
    id: 'cool-sky',
    name: 'Cool Sky',
    type: 'linear',
    angle: 0,
    stops: [
      { color: '#2980b9', position: 0 },
      { color: '#6dd5fa', position: 50 },
      { color: '#ffffff', position: 100 },
    ],
  },
]

/**
 * Load saved presets from localStorage
 */
export function loadSavedPresets(): GradientPreset[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem('gradient-presets')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Save preset to localStorage
 */
export function savePreset(preset: GradientPreset): void {
  if (typeof window === 'undefined') return

  try {
    const presets = loadSavedPresets()
    presets.push(preset)
    localStorage.setItem('gradient-presets', JSON.stringify(presets))
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Delete saved preset
 */
export function deletePreset(id: string): void {
  if (typeof window === 'undefined') return

  try {
    const presets = loadSavedPresets()
    const filtered = presets.filter((p) => p.id !== id)
    localStorage.setItem('gradient-presets', JSON.stringify(filtered))
  } catch {
    // Ignore localStorage errors
  }
}
