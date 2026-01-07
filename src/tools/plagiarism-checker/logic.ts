export interface SimilarityResult {
  similarity: number // 0-100
  matchingPhrases: string[]
  totalWords: { text1: number; text2: number }
  totalChars: { text1: number; text2: number }
}

/**
 * Calculate text similarity percentage using n-gram matching
 */
export function calculateSimilarity(text1: string, text2: string): SimilarityResult {
  const words1 = tokenize(text1)
  const words2 = tokenize(text2)

  if (words1.length === 0 || words2.length === 0) {
    return {
      similarity: 0,
      matchingPhrases: [],
      totalWords: { text1: words1.length, text2: words2.length },
      totalChars: { text1: text1.length, text2: text2.length },
    }
  }

  // Find matching n-grams (3-word phrases)
  const ngrams1 = generateNGrams(words1, 3)
  const ngrams2 = generateNGrams(words2, 3)

  const matchingPhrases: string[] = []
  const matches = new Set<string>()

  ngrams1.forEach((ngram) => {
    if (ngrams2.includes(ngram) && !matches.has(ngram)) {
      matches.add(ngram)
      matchingPhrases.push(ngram)
    }
  })

  // Calculate similarity based on matching n-grams
  const maxNGrams = Math.max(ngrams1.length, ngrams2.length)
  const similarity = maxNGrams > 0 ? (matches.size / maxNGrams) * 100 : 0

  return {
    similarity: Math.round(similarity * 10) / 10,
    matchingPhrases,
    totalWords: { text1: words1.length, text2: words2.length },
    totalChars: { text1: text1.length, text2: text2.length },
  }
}

/**
 * Tokenize text into words
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 0)
}

/**
 * Generate n-grams from words array
 */
function generateNGrams(words: string[], n: number): string[] {
  const ngrams: string[] = []

  for (let i = 0; i <= words.length - n; i++) {
    ngrams.push(words.slice(i, i + n).join(' '))
  }

  return ngrams
}

/**
 * Highlight matching phrases in text
 */
export function highlightMatches(text: string, phrases: string[]): string {
  let highlighted = text

  phrases.forEach((phrase) => {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi')
    highlighted = highlighted.replace(
      regex,
      (match) => `<mark class="bg-yellow-200 dark:bg-yellow-800">${match}</mark>`
    )
  })

  return highlighted
}

/**
 * Get similarity level description
 */
export function getSimilarityLevel(similarity: number): {
  level: string
  color: string
  description: string
} {
  if (similarity >= 75) {
    return {
      level: 'Very High',
      color: 'text-red-600 dark:text-red-400',
      description: 'Significant overlap detected',
    }
  } else if (similarity >= 50) {
    return {
      level: 'High',
      color: 'text-orange-600 dark:text-orange-400',
      description: 'Substantial similarity found',
    }
  } else if (similarity >= 25) {
    return {
      level: 'Moderate',
      color: 'text-yellow-600 dark:text-yellow-400',
      description: 'Some similarities detected',
    }
  } else {
    return {
      level: 'Low',
      color: 'text-green-600 dark:text-green-400',
      description: 'Minimal overlap',
    }
  }
}
