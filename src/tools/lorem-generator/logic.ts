/**
 * Lorem Ipsum Generator Logic
 */

const words = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
]

function randomWord(): string {
  return words[Math.floor(Math.random() * words.length)]
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function generateSentence(minWords = 5, maxWords = 15): string {
  const count = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords
  const sentence = Array.from({ length: count }, () => randomWord()).join(' ')
  return capitalize(sentence) + '.'
}

export function generateParagraph(sentences = 4): string {
  return Array.from({ length: sentences }, () => generateSentence()).join(' ')
}

export function generateParagraphs(count: number): string {
  return Array.from({ length: count }, () => generateParagraph()).join('\n\n')
}

export function generateWords(count: number): string {
  return Array.from({ length: count }, () => randomWord()).join(' ')
}
