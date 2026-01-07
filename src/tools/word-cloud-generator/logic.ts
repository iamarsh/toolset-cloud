export interface WordFrequency {
  word: string
  count: number
  size: number
}

const STOP_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their',
])

/**
 * Analyze text and get word frequencies
 */
export function analyzeText(text: string, maxWords: number = 100, removeStopWords: boolean = true): WordFrequency[] {
  if (!text.trim()) return []

  // Tokenize and clean
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .filter((word) => !removeStopWords || !STOP_WORDS.has(word))

  // Count frequencies
  const frequencies = new Map<string, number>()
  words.forEach((word) => {
    frequencies.set(word, (frequencies.get(word) || 0) + 1)
  })

  // Convert to array and sort
  const sorted = Array.from(frequencies.entries())
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, maxWords)

  // Calculate sizes (10-60px based on frequency)
  const maxCount = sorted[0]?.count || 1
  const minCount = sorted[sorted.length - 1]?.count || 1

  return sorted.map((item) => {
    const normalized = (item.count - minCount) / (maxCount - minCount || 1)
    const size = 12 + normalized * 48 // 12px to 60px
    return { ...item, size }
  })
}

/**
 * Generate random position for word
 */
export function generatePosition(index: number, total: number): { x: number; y: number; rotation: number } {
  const angle = (index / total) * Math.PI * 2
  const radius = 30 + (index % 5) * 15
  const x = 50 + Math.cos(angle) * radius
  const y = 50 + Math.sin(angle) * radius
  const rotation = (Math.random() - 0.5) * 30 // -15 to 15 degrees

  return { x, y, rotation }
}
