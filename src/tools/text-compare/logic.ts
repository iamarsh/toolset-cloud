/**
 * Text Compare Logic
 */

export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged'
  content: string
  lineNumber: { left?: number; right?: number }
}

export interface CompareResult {
  lines: DiffLine[]
  stats: {
    added: number
    removed: number
    unchanged: number
  }
}

export function compareTexts(text1: string, text2: string): CompareResult {
  const lines1 = text1.split('\n')
  const lines2 = text2.split('\n')
  
  const result: DiffLine[] = []
  const stats = { added: 0, removed: 0, unchanged: 0 }
  
  // Simple line-by-line comparison using LCS-like approach
  const lcs = longestCommonSubsequence(lines1, lines2)
  
  let i = 0
  let j = 0
  let lcsIndex = 0
  
  while (i < lines1.length || j < lines2.length) {
    if (lcsIndex < lcs.length && i < lines1.length && lines1[i] === lcs[lcsIndex]) {
      if (j < lines2.length && lines2[j] === lcs[lcsIndex]) {
        // Unchanged line
        result.push({
          type: 'unchanged',
          content: lines1[i],
          lineNumber: { left: i + 1, right: j + 1 },
        })
        stats.unchanged++
        i++
        j++
        lcsIndex++
      } else {
        // Line added in text2
        result.push({
          type: 'added',
          content: lines2[j],
          lineNumber: { right: j + 1 },
        })
        stats.added++
        j++
      }
    } else if (i < lines1.length) {
      // Line removed from text1
      result.push({
        type: 'removed',
        content: lines1[i],
        lineNumber: { left: i + 1 },
      })
      stats.removed++
      i++
    } else if (j < lines2.length) {
      // Line added in text2
      result.push({
        type: 'added',
        content: lines2[j],
        lineNumber: { right: j + 1 },
      })
      stats.added++
      j++
    }
  }
  
  return { lines: result, stats }
}

function longestCommonSubsequence(arr1: string[], arr2: string[]): string[] {
  const m = arr1.length
  const n = arr2.length
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  
  // Backtrack to find LCS
  const lcs: string[] = []
  let i = m
  let j = n
  
  while (i > 0 && j > 0) {
    if (arr1[i - 1] === arr2[j - 1]) {
      lcs.unshift(arr1[i - 1])
      i--
      j--
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--
    } else {
      j--
    }
  }
  
  return lcs
}

export function getCharDiff(text1: string, text2: string): { same: number; different: number } {
  const same = [...text1].filter((char, i) => text2[i] === char).length
  const different = Math.max(text1.length, text2.length) - same
  return { same, different }
}
