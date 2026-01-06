/**
 * Code Formatter Logic
 */

import * as prettier from 'prettier'
import parserBabel from 'prettier/parser-babel'
import parserHtml from 'prettier/parser-html'
import parserPostcss from 'prettier/parser-postcss'

export type CodeLanguage = 'html' | 'css' | 'javascript' | 'json'

export interface FormatResult {
  success: boolean
  formatted?: string
  error?: string
}

export function formatCode(
  code: string,
  language: CodeLanguage,
  indent: number = 2
): FormatResult {
  try {
    let parser: string

    switch (language) {
      case 'html':
        parser = 'html'
        break
      case 'css':
        parser = 'css'
        break
      case 'javascript':
        parser = 'babel'
        break
      case 'json':
        // JSON uses native JSON.parse/stringify
        const parsed = JSON.parse(code)
        const formatted = JSON.stringify(parsed, null, indent)
        return { success: true, formatted }
      default:
        return { success: false, error: 'Unsupported language' }
    }

    const formatted = prettier.format(code, {
      parser,
      plugins: [parserBabel, parserHtml, parserPostcss],
      tabWidth: indent,
      semi: true,
      singleQuote: true,
    })

    return { success: true, formatted }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Formatting failed',
    }
  }
}

export function detectLanguage(code: string): CodeLanguage {
  const trimmed = code.trim()

  // JSON detection
  if (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  ) {
    try {
      JSON.parse(trimmed)
      return 'json'
    } catch {
      // Not valid JSON, continue
    }
  }

  // HTML detection
  if (
    trimmed.includes('<!DOCTYPE') ||
    trimmed.startsWith('<html') ||
    /<[a-z][\s\S]*>/i.test(trimmed)
  ) {
    return 'html'
  }

  // CSS detection
  if (/[.#]?[\w-]+\s*\{[\s\S]*\}/.test(trimmed)) {
    return 'css'
  }

  // Default to JavaScript
  return 'javascript'
}

export function minifyCode(code: string, language: CodeLanguage): FormatResult {
  try {
    if (language === 'json') {
      const parsed = JSON.parse(code)
      return { success: true, formatted: JSON.stringify(parsed) }
    }

    // For other languages, use compact formatting
    const formatted = prettier.format(code, {
      parser: language === 'html' ? 'html' : language === 'css' ? 'css' : 'babel',
      plugins: [parserBabel, parserHtml, parserPostcss],
      printWidth: 1000,
      tabWidth: 0,
      semi: true,
      singleQuote: true,
    })

    return { success: true, formatted: formatted.replace(/\s+/g, ' ').trim() }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Minify failed',
    }
  }
}
