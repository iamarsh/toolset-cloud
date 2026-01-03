/**
 * Word Counter - Pure logic functions
 */

export interface WordCountStats {
  characters: number
  charactersNoSpaces: number
  words: number
  sentences: number
  paragraphs: number
  lines: number
  readingTime: string
  speakingTime: string
}

/**
 * Calculate all text statistics
 */
export function countText(text: string): WordCountStats {
  if (!text) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTime: '0 sec',
      speakingTime: '0 sec',
    }
  }

  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const words = countWords(text)
  const sentences = countSentences(text)
  const paragraphs = countParagraphs(text)
  const lines = countLines(text)
  const readingTime = calculateReadingTime(words)
  const speakingTime = calculateSpeakingTime(words)

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    readingTime,
    speakingTime,
  }
}

/**
 * Count words in text
 * A word is defined as a sequence of non-whitespace characters
 */
export function countWords(text: string): number {
  if (!text.trim()) return 0
  
  // Split by whitespace and filter out empty strings
  const words = text.trim().split(/\s+/).filter(word => word.length > 0)
  return words.length
}

/**
 * Count sentences in text
 * A sentence ends with . ! ? or similar punctuation
 */
export function countSentences(text: string): number {
  if (!text.trim()) return 0
  
  // Match sentence-ending punctuation followed by space or end of string
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  return sentences.length
}

/**
 * Count paragraphs in text
 * A paragraph is separated by one or more blank lines
 */
export function countParagraphs(text: string): number {
  if (!text.trim()) return 0
  
  // Split by double newlines or more
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0)
  return paragraphs.length || (text.trim().length > 0 ? 1 : 0)
}

/**
 * Count lines in text
 */
export function countLines(text: string): number {
  if (!text) return 0
  return text.split('\n').length
}

/**
 * Calculate estimated reading time
 * Average reading speed: 200-250 words per minute
 */
export function calculateReadingTime(wordCount: number): string {
  const wordsPerMinute = 225
  const minutes = wordCount / wordsPerMinute
  
  if (minutes < 1) {
    const seconds = Math.round(minutes * 60)
    return `${seconds} sec`
  }
  
  const fullMinutes = Math.floor(minutes)
  const remainingSeconds = Math.round((minutes - fullMinutes) * 60)
  
  if (remainingSeconds === 0) {
    return `${fullMinutes} min`
  }
  
  return `${fullMinutes} min ${remainingSeconds} sec`
}

/**
 * Calculate estimated speaking time
 * Average speaking speed: 125-150 words per minute
 */
export function calculateSpeakingTime(wordCount: number): string {
  const wordsPerMinute = 150
  const minutes = wordCount / wordsPerMinute
  
  if (minutes < 1) {
    const seconds = Math.round(minutes * 60)
    return `${seconds} sec`
  }
  
  const fullMinutes = Math.floor(minutes)
  const remainingSeconds = Math.round((minutes - fullMinutes) * 60)
  
  if (remainingSeconds === 0) {
    return `${fullMinutes} min`
  }
  
  return `${fullMinutes} min ${remainingSeconds} sec`
}

/**
 * Get word frequency map
 */
export function getWordFrequency(text: string): Map<string, number> {
  const frequency = new Map<string, number>()
  
  if (!text.trim()) return frequency
  
  // Extract words, convert to lowercase, remove punctuation
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 0)
  
  for (const word of words) {
    frequency.set(word, (frequency.get(word) || 0) + 1)
  }
  
  return frequency
}

/**
 * Get top N most frequent words
 */
export function getTopWords(text: string, n: number = 10): Array<{ word: string; count: number }> {
  const frequency = getWordFrequency(text)
  
  return Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([word, count]) => ({ word, count }))
}
