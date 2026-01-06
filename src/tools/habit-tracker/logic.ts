/**
 * Habit Tracker Logic
 * Track daily habits with streaks
 */

export interface HabitCompletion {
  date: string // YYYY-MM-DD format
  completed: boolean
}

export interface Habit {
  id: string
  name: string
  description: string
  completions: HabitCompletion[]
  createdAt: Date
}

export interface HabitTracker {
  id: string
  name: string
  habits: Habit[]
  createdAt: Date
  updatedAt: Date
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

/**
 * Create a new habit tracker
 */
export function createHabitTracker(name: string): HabitTracker {
  const now = new Date()
  return {
    id: generateId(),
    name,
    habits: [],
    createdAt: now,
    updatedAt: now,
  }
}

/**
 * Add habit
 */
export function addHabit(
  tracker: HabitTracker,
  name: string,
  description: string
): HabitTracker {
  const newHabit: Habit = {
    id: generateId(),
    name,
    description,
    completions: [],
    createdAt: new Date(),
  }

  return {
    ...tracker,
    habits: [...tracker.habits, newHabit],
    updatedAt: new Date(),
  }
}

/**
 * Delete habit
 */
export function deleteHabit(tracker: HabitTracker, habitId: string): HabitTracker {
  return {
    ...tracker,
    habits: tracker.habits.filter((h: Habit) => h.id !== habitId),
    updatedAt: new Date(),
  }
}

/**
 * Get date string in YYYY-MM-DD format
 */
export function getDateString(date: Date): string {
  return date.toISOString().split('T')[0]
}

/**
 * Toggle habit completion for a date
 */
export function toggleHabitCompletion(
  tracker: HabitTracker,
  habitId: string,
  date: Date
): HabitTracker {
  const dateString = getDateString(date)

  const habits = tracker.habits.map((habit: Habit) => {
    if (habit.id !== habitId) return habit

    const existingIndex = habit.completions.findIndex(
      (c: HabitCompletion) => c.date === dateString
    )

    if (existingIndex >= 0) {
      // Toggle existing completion
      const completions = [...habit.completions]
      completions[existingIndex] = {
        ...completions[existingIndex],
        completed: !completions[existingIndex].completed,
      }
      return { ...habit, completions }
    } else {
      // Add new completion
      return {
        ...habit,
        completions: [...habit.completions, { date: dateString, completed: true }],
      }
    }
  })

  return {
    ...tracker,
    habits,
    updatedAt: new Date(),
  }
}

/**
 * Check if habit is completed on a specific date
 */
export function isHabitCompleted(habit: Habit, date: Date): boolean {
  const dateString = getDateString(date)
  const completion = habit.completions.find((c: HabitCompletion) => c.date === dateString)
  return completion?.completed || false
}

/**
 * Calculate current streak
 */
export function getCurrentStreak(habit: Habit): number {
  const today = new Date()
  let streak = 0
  let currentDate = new Date(today)

  while (true) {
    if (isHabitCompleted(habit, currentDate)) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      // Check if today is incomplete but yesterday was completed
      if (streak === 0 && getDateString(currentDate) === getDateString(today)) {
        currentDate.setDate(currentDate.getDate() - 1)
        continue
      }
      break
    }
  }

  return streak
}

/**
 * Calculate longest streak
 */
export function getLongestStreak(habit: Habit): number {
  if (habit.completions.length === 0) return 0

  const completedDates = habit.completions
    .filter((c: HabitCompletion) => c.completed)
    .map((c: HabitCompletion) => new Date(c.date))
    .sort((a: Date, b: Date) => a.getTime() - b.getTime())

  if (completedDates.length === 0) return 0

  let maxStreak = 1
  let currentStreak = 1

  for (let i = 1; i < completedDates.length; i++) {
    const prevDate = completedDates[i - 1]
    const currDate = completedDates[i]
    const dayDiff = Math.floor(
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (dayDiff === 1) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      currentStreak = 1
    }
  }

  return maxStreak
}

/**
 * Get completion rate for last N days
 */
export function getCompletionRate(habit: Habit, days: number): number {
  const today = new Date()
  let completed = 0

  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    if (isHabitCompleted(habit, date)) {
      completed++
    }
  }

  return days > 0 ? Math.round((completed / days) * 100) : 0
}

/**
 * Get habit statistics
 */
export function getHabitStats(habit: Habit): {
  currentStreak: number
  longestStreak: number
  completionRate30Days: number
  totalCompletions: number
} {
  return {
    currentStreak: getCurrentStreak(habit),
    longestStreak: getLongestStreak(habit),
    completionRate30Days: getCompletionRate(habit, 30),
    totalCompletions: habit.completions.filter((c: HabitCompletion) => c.completed).length,
  }
}

/**
 * Save habit tracker to localStorage
 */
export function saveHabitTracker(tracker: HabitTracker): void {
  localStorage.setItem(`habittracker-${tracker.id}`, JSON.stringify(tracker))
}

/**
 * Load habit tracker from localStorage
 */
export function loadHabitTracker(id: string): HabitTracker | null {
  try {
    const data = localStorage.getItem(`habittracker-${id}`)
    if (!data) return null

    const tracker = JSON.parse(data) as HabitTracker
    // Convert date strings back to Date objects
    tracker.createdAt = new Date(tracker.createdAt)
    tracker.updatedAt = new Date(tracker.updatedAt)
    tracker.habits = tracker.habits.map((h: Habit) => ({
      ...h,
      createdAt: new Date(h.createdAt),
    }))

    return tracker
  } catch {
    return null
  }
}

/**
 * Get all habit trackers
 */
export function getAllHabitTrackers(): HabitTracker[] {
  const trackers: HabitTracker[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('habittracker-')) {
      const id = key.replace('habittracker-', '')
      const tracker = loadHabitTracker(id)
      if (tracker) trackers.push(tracker)
    }
  }

  return trackers.sort((a: HabitTracker, b: HabitTracker) =>
    b.updatedAt.getTime() - a.updatedAt.getTime()
  )
}

/**
 * Delete habit tracker
 */
export function deleteHabitTracker(id: string): void {
  localStorage.removeItem(`habittracker-${id}`)
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Export habit tracker as text
 */
export function exportAsText(tracker: HabitTracker): string {
  let text = `${tracker.name.toUpperCase()}\n`
  text += '='.repeat(tracker.name.length) + '\n\n'

  tracker.habits.forEach((habit: Habit) => {
    const stats = getHabitStats(habit)
    text += `${habit.name}\n`
    text += '-'.repeat(habit.name.length) + '\n'
    if (habit.description) text += `${habit.description}\n`
    text += `Current Streak: ${stats.currentStreak} days\n`
    text += `Longest Streak: ${stats.longestStreak} days\n`
    text += `30-Day Completion Rate: ${stats.completionRate30Days}%\n`
    text += `Total Completions: ${stats.totalCompletions}\n\n`
  })

  return text
}

/**
 * Download habit tracker as text file
 */
export function downloadHabitTracker(tracker: HabitTracker): void {
  const text = exportAsText(tracker)
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${tracker.name.toLowerCase().replace(/\s+/g, '-')}-habits.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
