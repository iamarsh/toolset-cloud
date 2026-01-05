/**
 * Date Difference Calculator Logic
 */

export interface DateDiff {
  years: number
  months: number
  days: number
  totalDays: number
  totalWeeks: number
  totalHours: number
  totalMinutes: number
}

export function calculateDateDiff(date1: Date, date2: Date): DateDiff {
  const start = date1 < date2 ? date1 : date2
  const end = date1 < date2 ? date2 : date1

  const diffMs = end.getTime() - start.getTime()
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const totalWeeks = Math.floor(totalDays / 7)
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60))
  const totalMinutes = Math.floor(diffMs / (1000 * 60))

  // Calculate years, months, days
  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()
  let days = end.getDate() - start.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0)
    days += prevMonth.getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalHours,
    totalMinutes,
  }
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
