/**
 * Timezone Converter Logic
 */

export const commonTimezones = [
  { id: 'America/New_York', label: 'New York (EST/EDT)', offset: -5 },
  { id: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)', offset: -8 },
  { id: 'America/Chicago', label: 'Chicago (CST/CDT)', offset: -6 },
  { id: 'America/Toronto', label: 'Toronto (EST/EDT)', offset: -5 },
  { id: 'Europe/London', label: 'London (GMT/BST)', offset: 0 },
  { id: 'Europe/Paris', label: 'Paris (CET/CEST)', offset: 1 },
  { id: 'Europe/Berlin', label: 'Berlin (CET/CEST)', offset: 1 },
  { id: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: 9 },
  { id: 'Asia/Shanghai', label: 'Shanghai (CST)', offset: 8 },
  { id: 'Asia/Dubai', label: 'Dubai (GST)', offset: 4 },
  { id: 'Asia/Singapore', label: 'Singapore (SGT)', offset: 8 },
  { id: 'Asia/Kolkata', label: 'Mumbai (IST)', offset: 5.5 },
  { id: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)', offset: 10 },
  { id: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)', offset: 12 },
  { id: 'UTC', label: 'UTC', offset: 0 },
]

export function convertTime(
  date: Date,
  fromTimezone: string,
  toTimezone: string
): Date {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: toTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }

  const formatter = new Intl.DateTimeFormat('en-US', options)
  const parts = formatter.formatToParts(date)
  
  const get = (type: string) => parts.find(p => p.type === type)?.value || '0'
  
  return new Date(
    parseInt(get('year')),
    parseInt(get('month')) - 1,
    parseInt(get('day')),
    parseInt(get('hour')),
    parseInt(get('minute')),
    parseInt(get('second'))
  )
}

export function formatTimeForZone(date: Date, timezone: string): string {
  return date.toLocaleString('en-US', {
    timeZone: timezone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export function getLocalTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}
