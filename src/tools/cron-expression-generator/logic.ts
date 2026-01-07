export interface CronFields {
  minute: string
  hour: string
  dayOfMonth: string
  month: string
  dayOfWeek: string
}

export interface CronPreset {
  id: string
  name: string
  expression: string
  description: string
}

/**
 * Common cron expression presets
 */
export const cronPresets: CronPreset[] = [
  { id: 'every-minute', name: 'Every minute', expression: '* * * * *', description: 'Runs every minute' },
  { id: 'every-5-minutes', name: 'Every 5 minutes', expression: '*/5 * * * *', description: 'Runs every 5 minutes' },
  { id: 'every-15-minutes', name: 'Every 15 minutes', expression: '*/15 * * * *', description: 'Runs every 15 minutes' },
  { id: 'every-30-minutes', name: 'Every 30 minutes', expression: '*/30 * * * *', description: 'Runs every 30 minutes' },
  { id: 'every-hour', name: 'Every hour', expression: '0 * * * *', description: 'Runs at the start of every hour' },
  { id: 'every-day-midnight', name: 'Every day at midnight', expression: '0 0 * * *', description: 'Runs at 12:00 AM every day' },
  { id: 'every-day-noon', name: 'Every day at noon', expression: '0 12 * * *', description: 'Runs at 12:00 PM every day' },
  { id: 'every-week', name: 'Every week (Sunday)', expression: '0 0 * * 0', description: 'Runs at midnight every Sunday' },
  { id: 'every-month', name: 'Every month (1st)', expression: '0 0 1 * *', description: 'Runs at midnight on the 1st of every month' },
  { id: 'weekdays-9am', name: 'Weekdays at 9 AM', expression: '0 9 * * 1-5', description: 'Runs at 9:00 AM Monday through Friday' },
]

/**
 * Build cron expression from fields
 */
export function buildCronExpression(fields: CronFields): string {
  return `${fields.minute} ${fields.hour} ${fields.dayOfMonth} ${fields.month} ${fields.dayOfWeek}`
}

/**
 * Parse cron expression into fields
 */
export function parseCronExpression(expression: string): CronFields | null {
  const parts = expression.trim().split(/\s+/)
  if (parts.length !== 5) return null

  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4],
  }
}

/**
 * Convert cron expression to human-readable description
 */
export function describeCronExpression(expression: string): string {
  const fields = parseCronExpression(expression)
  if (!fields) return 'Invalid cron expression'

  const parts: string[] = []

  // Minute
  if (fields.minute === '*') {
    parts.push('every minute')
  } else if (fields.minute.startsWith('*/')) {
    parts.push(`every ${fields.minute.slice(2)} minutes`)
  } else {
    parts.push(`at minute ${fields.minute}`)
  }

  // Hour
  if (fields.hour !== '*') {
    if (fields.hour.startsWith('*/')) {
      parts.push(`every ${fields.hour.slice(2)} hours`)
    } else {
      const hour = parseInt(fields.hour)
      const period = hour < 12 ? 'AM' : 'PM'
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
      parts.push(`at ${displayHour}:00 ${period}`)
    }
  }

  // Day of month
  if (fields.dayOfMonth !== '*') {
    parts.push(`on day ${fields.dayOfMonth}`)
  }

  // Month
  if (fields.month !== '*') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthNum = parseInt(fields.month) - 1
    if (monthNum >= 0 && monthNum < 12) {
      parts.push(`in ${months[monthNum]}`)
    }
  }

  // Day of week
  if (fields.dayOfWeek !== '*') {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    if (fields.dayOfWeek.includes('-')) {
      const [start, end] = fields.dayOfWeek.split('-').map(Number)
      parts.push(`on ${days[start]} through ${days[end]}`)
    } else {
      const dayNum = parseInt(fields.dayOfWeek)
      if (dayNum >= 0 && dayNum <= 6) {
        parts.push(`on ${days[dayNum]}`)
      }
    }
  }

  return parts.join(' ')
}

/**
 * Calculate next run times
 */
export function calculateNextRuns(expression: string, count: number = 5): Date[] {
  const runs: Date[] = []
  const now = new Date()
  let current = new Date(now)

  const fields = parseCronExpression(expression)
  if (!fields) return []

  for (let i = 0; i < count && runs.length < count; i++) {
    current = new Date(current.getTime() + 60000) // Add 1 minute

    const minute = current.getMinutes()
    const hour = current.getHours()
    const day = current.getDate()
    const month = current.getMonth() + 1
    const dayOfWeek = current.getDay()

    // Check if current time matches cron expression
    const minuteMatch = fields.minute === '*' || fields.minute === String(minute) || (fields.minute.startsWith('*/') && minute % parseInt(fields.minute.slice(2)) === 0)
    const hourMatch = fields.hour === '*' || fields.hour === String(hour) || (fields.hour.startsWith('*/') && hour % parseInt(fields.hour.slice(2)) === 0)
    const dayMatch = fields.dayOfMonth === '*' || fields.dayOfMonth === String(day)
    const monthMatch = fields.month === '*' || fields.month === String(month)
    const dowMatch = fields.dayOfWeek === '*' || fields.dayOfWeek === String(dayOfWeek) || (fields.dayOfWeek.includes('-') && (() => {
      const [start, end] = fields.dayOfWeek.split('-').map(Number)
      return dayOfWeek >= start && dayOfWeek <= end
    })())

    if (minuteMatch && hourMatch && dayMatch && monthMatch && dowMatch) {
      runs.push(new Date(current))
    }

    // Prevent infinite loop
    if (i > 10000) break
  }

  return runs
}
