/**
 * JSON Formatter - Pure logic functions
 */

export interface JsonFormatResult {
  success: boolean
  formatted?: string
  error?: string
  stats?: {
    keys: number
    depth: number
    size: number
  }
}

/**
 * Validate and format JSON string
 */
export function formatJson(input: string, indent: number = 2): JsonFormatResult {
  if (!input.trim()) {
    return {
      success: false,
      error: 'Please enter some JSON to format',
    }
  }

  try {
    const parsed = JSON.parse(input)
    const formatted = JSON.stringify(parsed, null, indent)
    const stats = analyzeJson(parsed)

    return {
      success: true,
      formatted,
      stats,
    }
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Invalid JSON'
    return {
      success: false,
      error: `Parse error: ${error}`,
    }
  }
}

/**
 * Minify JSON string
 */
export function minifyJson(input: string): JsonFormatResult {
  if (!input.trim()) {
    return {
      success: false,
      error: 'Please enter some JSON to minify',
    }
  }

  try {
    const parsed = JSON.parse(input)
    const formatted = JSON.stringify(parsed)

    return {
      success: true,
      formatted,
    }
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Invalid JSON'
    return {
      success: false,
      error: `Parse error: ${error}`,
    }
  }
}

/**
 * Validate JSON string
 */
export function validateJson(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) {
    return { valid: false, error: 'Empty input' }
  }

  try {
    JSON.parse(input)
    return { valid: true }
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Invalid JSON'
    return { valid: false, error }
  }
}

/**
 * Analyze JSON structure
 */
export function analyzeJson(obj: unknown): { keys: number; depth: number; size: number } {
  let keys = 0
  let maxDepth = 0

  function traverse(value: unknown, depth: number) {
    maxDepth = Math.max(maxDepth, depth)

    if (Array.isArray(value)) {
      for (const item of value) {
        traverse(item, depth + 1)
      }
    } else if (value !== null && typeof value === 'object') {
      const objValue = value as Record<string, unknown>
      keys += Object.keys(objValue).length
      for (const key in objValue) {
        traverse(objValue[key], depth + 1)
      }
    }
  }

  traverse(obj, 0)

  return {
    keys,
    depth: maxDepth,
    size: JSON.stringify(obj).length,
  }
}

/**
 * Build a tree structure from JSON for visualization
 */
export interface JsonTreeNode {
  key: string
  value: unknown
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null'
  children?: JsonTreeNode[]
}

export function buildJsonTree(obj: unknown, key: string = 'root'): JsonTreeNode {
  if (obj === null) {
    return { key, value: null, type: 'null' }
  }

  if (Array.isArray(obj)) {
    return {
      key,
      value: `Array(${obj.length})`,
      type: 'array',
      children: obj.map((item, index) => buildJsonTree(item, `[${index}]`)),
    }
  }

  if (typeof obj === 'object') {
    const objValue = obj as Record<string, unknown>
    return {
      key,
      value: `Object(${Object.keys(objValue).length})`,
      type: 'object',
      children: Object.entries(objValue).map(([k, v]) => buildJsonTree(v, k)),
    }
  }

  return {
    key,
    value: obj,
    type: typeof obj as 'string' | 'number' | 'boolean',
  }
}
