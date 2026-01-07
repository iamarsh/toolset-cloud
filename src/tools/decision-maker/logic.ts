export interface DecisionOption {
  id: string
  text: string
  weight: number
}

export interface DecisionHistory {
  id: string
  options: string[]
  winner: string
  timestamp: number
}

/**
 * Select a random option from the list based on weights
 */
export function selectRandomOption(options: DecisionOption[]): DecisionOption {
  const totalWeight = options.reduce((sum, opt) => sum + opt.weight, 0)
  let random = Math.random() * totalWeight

  for (const option of options) {
    random -= option.weight
    if (random <= 0) {
      return option
    }
  }

  // Fallback to last option
  return options[options.length - 1]
}

/**
 * Generate a unique ID for options
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Load decision history from localStorage
 */
export function loadHistory(): DecisionHistory[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem('decision-maker-history')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Save decision to history
 */
export function saveToHistory(decision: DecisionHistory): void {
  if (typeof window === 'undefined') return

  try {
    const history = loadHistory()
    history.unshift(decision)
    // Keep only last 20 decisions
    const trimmed = history.slice(0, 20)
    localStorage.setItem('decision-maker-history', JSON.stringify(trimmed))
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Clear decision history
 */
export function clearHistory(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem('decision-maker-history')
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Calculate wheel rotation angle for animation
 */
export function calculateWheelRotation(optionIndex: number, totalOptions: number): number {
  const baseRotations = 5 // Spin 5 full times
  const segmentAngle = 360 / totalOptions
  const targetAngle = optionIndex * segmentAngle
  return baseRotations * 360 + targetAngle
}
