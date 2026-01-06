/**
 * Time Tracker Logic
 * Track time spent on tasks and projects
 */

export interface TimeEntry {
  id: string
  projectId: string
  description: string
  startTime: Date
  endTime: Date | null
  duration: number // in seconds
  createdAt: Date
}

export interface Project {
  id: string
  name: string
  color: string
}

export interface TimeTracker {
  id: string
  name: string
  projects: Project[]
  entries: TimeEntry[]
  activeEntry: string | null
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
 * Generate random color
 */
export function generateColor(): string {
  const colors = [
    '#ef4444',
    '#f97316',
    '#f59e0b',
    '#84cc16',
    '#10b981',
    '#06b6d4',
    '#3b82f6',
    '#6366f1',
    '#8b5cf6',
    '#ec4899',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

/**
 * Create a new time tracker
 */
export function createTimeTracker(name: string): TimeTracker {
  const now = new Date()
  return {
    id: generateId(),
    name,
    projects: [],
    entries: [],
    activeEntry: null,
    createdAt: now,
    updatedAt: now,
  }
}

/**
 * Add project
 */
export function addProject(tracker: TimeTracker, name: string): TimeTracker {
  const newProject: Project = {
    id: generateId(),
    name,
    color: generateColor(),
  }

  return {
    ...tracker,
    projects: [...tracker.projects, newProject],
    updatedAt: new Date(),
  }
}

/**
 * Delete project
 */
export function deleteProject(tracker: TimeTracker, projectId: string): TimeTracker {
  return {
    ...tracker,
    projects: tracker.projects.filter((p: Project) => p.id !== projectId),
    entries: tracker.entries.filter((e: TimeEntry) => e.projectId !== projectId),
    updatedAt: new Date(),
  }
}

/**
 * Start timer
 */
export function startTimer(
  tracker: TimeTracker,
  projectId: string,
  description: string
): TimeTracker {
  // Stop any active timer first
  let updatedTracker = tracker
  if (tracker.activeEntry) {
    updatedTracker = stopTimer(tracker)
  }

  const newEntry: TimeEntry = {
    id: generateId(),
    projectId,
    description,
    startTime: new Date(),
    endTime: null,
    duration: 0,
    createdAt: new Date(),
  }

  return {
    ...updatedTracker,
    entries: [...updatedTracker.entries, newEntry],
    activeEntry: newEntry.id,
    updatedAt: new Date(),
  }
}

/**
 * Stop timer
 */
export function stopTimer(tracker: TimeTracker): TimeTracker {
  if (!tracker.activeEntry) return tracker

  const now = new Date()
  const entries = tracker.entries.map((entry: TimeEntry) => {
    if (entry.id === tracker.activeEntry) {
      const duration = Math.floor((now.getTime() - entry.startTime.getTime()) / 1000)
      return {
        ...entry,
        endTime: now,
        duration,
      }
    }
    return entry
  })

  return {
    ...tracker,
    entries,
    activeEntry: null,
    updatedAt: new Date(),
  }
}

/**
 * Delete time entry
 */
export function deleteEntry(tracker: TimeTracker, entryId: string): TimeTracker {
  return {
    ...tracker,
    entries: tracker.entries.filter((e: TimeEntry) => e.id !== entryId),
    activeEntry: tracker.activeEntry === entryId ? null : tracker.activeEntry,
    updatedAt: new Date(),
  }
}

/**
 * Get active entry with current duration
 */
export function getActiveEntry(tracker: TimeTracker): TimeEntry | null {
  if (!tracker.activeEntry) return null

  const entry = tracker.entries.find((e: TimeEntry) => e.id === tracker.activeEntry)
  if (!entry) return null

  const duration = Math.floor((new Date().getTime() - entry.startTime.getTime()) / 1000)
  return { ...entry, duration }
}

/**
 * Calculate total time for project (in seconds)
 */
export function getProjectTotalTime(tracker: TimeTracker, projectId: string): number {
  return tracker.entries
    .filter((e: TimeEntry) => e.projectId === projectId && e.endTime !== null)
    .reduce((sum: number, e: TimeEntry) => sum + e.duration, 0)
}

/**
 * Calculate total time for all projects (in seconds)
 */
export function getTotalTime(tracker: TimeTracker): number {
  return tracker.entries
    .filter((e: TimeEntry) => e.endTime !== null)
    .reduce((sum: number, e: TimeEntry) => sum + e.duration, 0)
}

/**
 * Get project name by ID
 */
export function getProjectName(tracker: TimeTracker, projectId: string): string {
  const project = tracker.projects.find((p: Project) => p.id === projectId)
  return project?.name || 'Unknown Project'
}

/**
 * Get project color by ID
 */
export function getProjectColor(tracker: TimeTracker, projectId: string): string {
  const project = tracker.projects.find((p: Project) => p.id === projectId)
  return project?.color || '#6b7280'
}

/**
 * Format duration (seconds to HH:MM:SS)
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/**
 * Format duration to hours (for display)
 */
export function formatHours(seconds: number): string {
  const hours = (seconds / 3600).toFixed(2)
  return `${hours}h`
}

/**
 * Save time tracker to localStorage
 */
export function saveTimeTracker(tracker: TimeTracker): void {
  localStorage.setItem(`timetracker-${tracker.id}`, JSON.stringify(tracker))
}

/**
 * Load time tracker from localStorage
 */
export function loadTimeTracker(id: string): TimeTracker | null {
  try {
    const data = localStorage.getItem(`timetracker-${id}`)
    if (!data) return null

    const tracker = JSON.parse(data) as TimeTracker
    // Convert date strings back to Date objects
    tracker.createdAt = new Date(tracker.createdAt)
    tracker.updatedAt = new Date(tracker.updatedAt)
    tracker.entries = tracker.entries.map((e: TimeEntry) => ({
      ...e,
      startTime: new Date(e.startTime),
      endTime: e.endTime ? new Date(e.endTime) : null,
      createdAt: new Date(e.createdAt),
    }))

    return tracker
  } catch {
    return null
  }
}

/**
 * Get all time trackers
 */
export function getAllTimeTrackers(): TimeTracker[] {
  const trackers: TimeTracker[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('timetracker-')) {
      const id = key.replace('timetracker-', '')
      const tracker = loadTimeTracker(id)
      if (tracker) trackers.push(tracker)
    }
  }

  return trackers.sort((a: TimeTracker, b: TimeTracker) =>
    b.updatedAt.getTime() - a.updatedAt.getTime()
  )
}

/**
 * Delete time tracker
 */
export function deleteTimeTracker(id: string): void {
  localStorage.removeItem(`timetracker-${id}`)
}

/**
 * Format date
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Format time
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Export time tracker as text
 */
export function exportAsText(tracker: TimeTracker): string {
  let text = `${tracker.name.toUpperCase()}\n`
  text += '='.repeat(tracker.name.length) + '\n\n'

  text += `PROJECTS\n--------\n`
  tracker.projects.forEach((project: Project) => {
    const totalTime = getProjectTotalTime(tracker, project.id)
    text += `${project.name}: ${formatHours(totalTime)}\n`
  })
  text += `\nTotal Time: ${formatHours(getTotalTime(tracker))}\n\n`

  text += `TIME ENTRIES\n------------\n`
  const completedEntries = tracker.entries
    .filter((e: TimeEntry) => e.endTime !== null)
    .sort((a: TimeEntry, b: TimeEntry) => b.startTime.getTime() - a.startTime.getTime())

  completedEntries.forEach((entry: TimeEntry) => {
    text += `${formatDate(entry.startTime)} | ${formatTime(entry.startTime)} - ${formatTime(entry.endTime!)}\n`
    text += `Project: ${getProjectName(tracker, entry.projectId)}\n`
    text += `Description: ${entry.description || 'No description'}\n`
    text += `Duration: ${formatDuration(entry.duration)}\n\n`
  })

  return text
}

/**
 * Download time tracker as text file
 */
export function downloadTimeTracker(tracker: TimeTracker): void {
  const text = exportAsText(tracker)
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${tracker.name.toLowerCase().replace(/\s+/g, '-')}-time-tracker.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
