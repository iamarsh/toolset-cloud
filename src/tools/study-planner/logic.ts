/**
 * Study Planner Logic
 * Plan study sessions and track progress
 */

export interface StudySession {
  id: string
  subject: string
  topic: string
  duration: number // minutes
  date: Date
  completed: boolean
  notes: string
}

export interface StudyPlan {
  id: string
  name: string
  sessions: StudySession[]
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
 * Create study plan
 */
export function createStudyPlan(name: string): StudyPlan {
  const now = new Date()
  return {
    id: generateId(),
    name,
    sessions: [],
    createdAt: now,
    updatedAt: now,
  }
}

/**
 * Add session to plan
 */
export function addSession(
  plan: StudyPlan,
  subject: string,
  topic: string,
  duration: number,
  date: Date
): StudyPlan {
  const newSession: StudySession = {
    id: generateId(),
    subject,
    topic,
    duration,
    date,
    completed: false,
    notes: '',
  }

  return {
    ...plan,
    sessions: [...plan.sessions, newSession],
    updatedAt: new Date(),
  }
}

/**
 * Toggle session completion
 */
export function toggleSession(plan: StudyPlan, sessionId: string): StudyPlan {
  return {
    ...plan,
    sessions: plan.sessions.map((session: StudySession) =>
      session.id === sessionId ? { ...session, completed: !session.completed } : session
    ),
    updatedAt: new Date(),
  }
}

/**
 * Update session notes
 */
export function updateNotes(plan: StudyPlan, sessionId: string, notes: string): StudyPlan {
  return {
    ...plan,
    sessions: plan.sessions.map((session: StudySession) =>
      session.id === sessionId ? { ...session, notes } : session
    ),
    updatedAt: new Date(),
  }
}

/**
 * Delete session
 */
export function deleteSession(plan: StudyPlan, sessionId: string): StudyPlan {
  return {
    ...plan,
    sessions: plan.sessions.filter((session: StudySession) => session.id !== sessionId),
    updatedAt: new Date(),
  }
}

/**
 * Get study statistics
 */
export function getStats(plan: StudyPlan): {
  totalSessions: number
  completedSessions: number
  totalHours: number
  completedHours: number
  upcomingSessions: number
} {
  const totalSessions = plan.sessions.length
  const completedSessions = plan.sessions.filter((s: StudySession) => s.completed).length
  const totalHours = plan.sessions.reduce((sum: number, s: StudySession) => sum + s.duration, 0) / 60
  const completedHours =
    plan.sessions
      .filter((s: StudySession) => s.completed)
      .reduce((sum: number, s: StudySession) => sum + s.duration, 0) / 60
  const now = new Date()
  const upcomingSessions = plan.sessions.filter(
    (s: StudySession) => !s.completed && s.date > now
  ).length

  return {
    totalSessions,
    completedSessions,
    totalHours: Math.round(totalHours * 10) / 10,
    completedHours: Math.round(completedHours * 10) / 10,
    upcomingSessions,
  }
}

/**
 * Save study plan to localStorage
 */
export function savePlan(plan: StudyPlan): void {
  localStorage.setItem(`study-plan-${plan.id}`, JSON.stringify(plan))
}

/**
 * Load study plan from localStorage
 */
export function loadPlan(id: string): StudyPlan | null {
  try {
    const data = localStorage.getItem(`study-plan-${id}`)
    if (!data) return null

    const plan = JSON.parse(data) as StudyPlan
    plan.createdAt = new Date(plan.createdAt)
    plan.updatedAt = new Date(plan.updatedAt)
    plan.sessions = plan.sessions.map((session: StudySession) => ({
      ...session,
      date: new Date(session.date),
    }))

    return plan
  } catch {
    return null
  }
}

/**
 * Get all study plans
 */
export function getAllPlans(): StudyPlan[] {
  const plans: StudyPlan[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('study-plan-')) {
      const id = key.replace('study-plan-', '')
      const plan = loadPlan(id)
      if (plan) plans.push(plan)
    }
  }

  return plans.sort((a: StudyPlan, b: StudyPlan) =>
    b.updatedAt.getTime() - a.updatedAt.getTime()
  )
}

/**
 * Delete study plan
 */
export function deletePlan(id: string): void {
  localStorage.removeItem(`study-plan-${id}`)
}

/**
 * Format date
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

/**
 * Format time
 */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

/**
 * Export plan as text
 */
export function exportPlan(plan: StudyPlan): string {
  let text = `${plan.name}\n`
  text += '='.repeat(plan.name.length) + '\n\n'

  // Group by date
  const sessionsByDate = new Map<string, StudySession[]>()
  plan.sessions.forEach((session: StudySession) => {
    const dateKey = formatDate(session.date)
    if (!sessionsByDate.has(dateKey)) {
      sessionsByDate.set(dateKey, [])
    }
    sessionsByDate.get(dateKey)?.push(session)
  })

  sessionsByDate.forEach((sessions: StudySession[], date: string) => {
    text += `\n${date}\n${'-'.repeat(date.length)}\n`
    sessions.forEach((session: StudySession) => {
      const checkbox = session.completed ? '[x]' : '[ ]'
      text += `${checkbox} ${session.subject}: ${session.topic} (${session.duration}min)\n`
      if (session.notes) {
        text += `    Notes: ${session.notes}\n`
      }
    })
  })

  const stats = getStats(plan)
  text += `\n---\nTotal: ${stats.completedSessions}/${stats.totalSessions} sessions (${stats.completedHours}/${stats.totalHours} hours)`

  return text
}

/**
 * Download plan as text file
 */
export function downloadPlan(plan: StudyPlan): void {
  const text = exportPlan(plan)
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${plan.name.toLowerCase().replace(/\s+/g, '-')}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
