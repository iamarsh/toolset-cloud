/**
 * Number to Words Logic
 */

const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
const scales = ['', 'thousand', 'million', 'billion', 'trillion']

function convertHundreds(num: number): string {
  if (num === 0) return ''
  if (num < 20) return ones[num]
  if (num < 100) {
    return tens[Math.floor(num / 10)] + (num % 10 ? '-' + ones[num % 10] : '')
  }
  return ones[Math.floor(num / 100)] + ' hundred' + (num % 100 ? ' ' + convertHundreds(num % 100) : '')
}

export function numberToWords(num: number): string {
  if (num === 0) return 'zero'
  if (num < 0) return 'negative ' + numberToWords(-num)
  if (!Number.isInteger(num)) {
    const [whole, decimal] = num.toString().split('.')
    return numberToWords(parseInt(whole)) + ' point ' + decimal.split('').map(d => ones[parseInt(d)] || 'zero').join(' ')
  }

  let result = ''
  let scaleIndex = 0

  while (num > 0) {
    const chunk = num % 1000
    if (chunk > 0) {
      const chunkWords = convertHundreds(chunk)
      result = chunkWords + (scales[scaleIndex] ? ' ' + scales[scaleIndex] : '') + (result ? ' ' + result : '')
    }
    num = Math.floor(num / 1000)
    scaleIndex++
  }

  return result.trim()
}

export function wordsToOrdinal(words: string): string {
  const ordinalMap: Record<string, string> = {
    'one': 'first', 'two': 'second', 'three': 'third', 'four': 'fourth', 'five': 'fifth',
    'six': 'sixth', 'seven': 'seventh', 'eight': 'eighth', 'nine': 'ninth', 'ten': 'tenth',
    'eleven': 'eleventh', 'twelve': 'twelfth', 'twenty': 'twentieth', 'thirty': 'thirtieth',
    'forty': 'fortieth', 'fifty': 'fiftieth', 'hundred': 'hundredth', 'thousand': 'thousandth',
    'million': 'millionth', 'billion': 'billionth',
  }
  
  const wordArr = words.split(' ')
  const lastWord = wordArr[wordArr.length - 1]
  
  if (ordinalMap[lastWord]) {
    wordArr[wordArr.length - 1] = ordinalMap[lastWord]
  } else if (lastWord.includes('-')) {
    const [first, second] = lastWord.split('-')
    wordArr[wordArr.length - 1] = first + '-' + (ordinalMap[second] || second + 'th')
  } else {
    wordArr[wordArr.length - 1] = lastWord + 'th'
  }
  
  return wordArr.join(' ')
}
