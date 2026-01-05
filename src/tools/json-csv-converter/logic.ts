/**
 * JSON to CSV Converter Logic
 */

export function jsonToCsv(jsonString: string): { csv: string; error?: string } {
  try {
    const data = JSON.parse(jsonString)
    
    if (!Array.isArray(data)) {
      return { csv: '', error: 'Input must be an array of objects' }
    }
    
    if (data.length === 0) {
      return { csv: '', error: 'Array is empty' }
    }

    // Get all unique keys from all objects
    const headers = [...new Set(data.flatMap((obj) => Object.keys(obj)))]
    
    // Create CSV rows
    const csvRows = [
      headers.join(','),
      ...data.map((obj) =>
        headers
          .map((header) => {
            const value = obj[header]
            if (value === null || value === undefined) return ''
            const str = String(value)
            // Escape quotes and wrap in quotes if contains comma, quote, or newline
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
              return `"${str.replace(/"/g, '""')}"`
            }
            return str
          })
          .join(',')
      ),
    ]

    return { csv: csvRows.join('\n') }
  } catch {
    return { csv: '', error: 'Invalid JSON' }
  }
}

export function csvToJson(csvString: string): { json: string; error?: string } {
  try {
    const lines = csvString.trim().split('\n')
    if (lines.length < 2) {
      return { json: '[]', error: 'CSV must have header and at least one data row' }
    }

    const headers = parseCsvLine(lines[0])
    const result = []

    for (let i = 1; i < lines.length; i++) {
      const values = parseCsvLine(lines[i])
      const obj: Record<string, string> = {}
      headers.forEach((header, index) => {
        obj[header] = values[index] || ''
      })
      result.push(obj)
    }

    return { json: JSON.stringify(result, null, 2) }
  } catch {
    return { json: '[]', error: 'Invalid CSV format' }
  }
}

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}
