/**
 * Goal Planner Logic
 * Set goals with milestones and track progress
 */

export interface Milestone {
  id: string
  title: string
  completed: boolean
  completedAt: Date | null
  createdAt: Date
}

export interface Goal {
  id: string
  title: string
  description: string
  targetDate: Date
  milestones: Milestone[]
  createdAt: Date
  updatedAt: Date
}

export interface GoalPlanner {
  id: string
  name: string
  goals: Goal[]
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
 * Create a new goal planner
 */
export function createGoalPlanner(name: string): GoalPlanner {
  const now = new Date()
  return {
    id: generateId(),
    name,
    goals: [],
    createdAt: now,
    updatedAt: now,
  }
}

/**
 * Add goal
 */
export function addGoal(
  planner: GoalPlanner,
  title: string,
  description: string,
  targetDate: Date
): GoalPlanner {
  const newGoal: Goal = {
    id: generateId(),
    title,
    description,
    targetDate,
    milestones: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return {
    ...planner,
    goals: [...planner.goals, newGoal],
    updatedAt: new Date(),
  }
}

/**
 * Update goal
 */
export function updateGoal(
  planner: GoalPlanner,
  goalId: string,
  updates: {
    title?: string
    description?: string
    targetDate?: Date
  }
): GoalPlanner {
  const goals = planner.goals.map((goal: Goal) =>
    goal.id === goalId
      ? {
          ...goal,
          ...updates,
          updatedAt: new Date(),
        }
      : goal
  )

  return {
    ...planner,
    goals,
    updatedAt: new Date(),
  }
}

/**
 * Delete goal
 */
export function deleteGoal(planner: GoalPlanner, goalId: string): GoalPlanner {
  return {
    ...planner,
    goals: planner.goals.filter((g: Goal) => g.id !== goalId),
    updatedAt: new Date(),
  }
}

/**
 * Add milestone to goal
 */
export function addMilestone(
  planner: GoalPlanner,
  goalId: string,
  title: string
): GoalPlanner {
  const newMilestone: Milestone = {
    id: generateId(),
    title,
    completed: false,
    completedAt: null,
    createdAt: new Date(),
  }

  const goals = planner.goals.map((goal: Goal) =>
    goal.id === goalId
      ? {
          ...goal,
          milestones: [...goal.milestones, newMilestone],
          updatedAt: new Date(),
        }
      : goal
  )

  return {
    ...planner,
    goals,
    updatedAt: new Date(),
  }
}

/**
 * Toggle milestone completion
 */
export function toggleMilestone(
  planner: GoalPlanner,
  goalId: string,
  milestoneId: string
): GoalPlanner {
  const goals = planner.goals.map((goal: Goal) => {
    if (goal.id !== goalId) return goal

    const milestones = goal.milestones.map((milestone: Milestone) =>
      milestone.id === milestoneId
        ? {
            ...milestone,
            completed: !milestone.completed,
            completedAt: !milestone.completed ? new Date() : null,
          }
        : milestone
    )

    return {
      ...goal,
      milestones,
      updatedAt: new Date(),
    }
  })

  return {
    ...planner,
    goals,
    updatedAt: new Date(),
  }
}

/**
 * Delete milestone
 */
export function deleteMilestone(
  planner: GoalPlanner,
  goalId: string,
  milestoneId: string
): GoalPlanner {
  const goals = planner.goals.map((goal: Goal) =>
    goal.id === goalId
      ? {
          ...goal,
          milestones: goal.milestones.filter((m: Milestone) => m.id !== milestoneId),
          updatedAt: new Date(),
        }
      : goal
  )

  return {
    ...planner,
    goals,
    updatedAt: new Date(),
  }
}

/**
 * Calculate goal progress (percentage)
 */
export function getGoalProgress(goal: Goal): number {
  if (goal.milestones.length === 0) return 0

  const completedCount = goal.milestones.filter((m: Milestone) => m.completed).length
  return Math.round((completedCount / goal.milestones.length) * 100)
}

/**
 * Check if goal is overdue
 */
export function isGoalOverdue(goal: Goal): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(goal.targetDate)
  target.setHours(0, 0, 0, 0)
  return target < today && getGoalProgress(goal) < 100
}

/**
 * Get days until target date
 */
export function getDaysUntilTarget(goal: Goal): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(goal.targetDate)
  target.setHours(0, 0, 0, 0)
  const diffTime = target.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Get goal statistics
 */
export function getGoalStats(goal: Goal): {
  progress: number
  completedMilestones: number
  totalMilestones: number
  daysUntilTarget: number
  isOverdue: boolean
} {
  return {
    progress: getGoalProgress(goal),
    completedMilestones: goal.milestones.filter((m: Milestone) => m.completed).length,
    totalMilestones: goal.milestones.length,
    daysUntilTarget: getDaysUntilTarget(goal),
    isOverdue: isGoalOverdue(goal),
  }
}

/**
 * Get planner statistics
 */
export function getPlannerStats(planner: GoalPlanner): {
  totalGoals: number
  completedGoals: number
  activeGoals: number
  overdueGoals: number
} {
  const completedGoals = planner.goals.filter((g: Goal) => getGoalProgress(g) === 100).length
  const overdueGoals = planner.goals.filter((g: Goal) => isGoalOverdue(g)).length

  return {
    totalGoals: planner.goals.length,
    completedGoals,
    activeGoals: planner.goals.length - completedGoals,
    overdueGoals,
  }
}

/**
 * Save goal planner to localStorage
 */
export function saveGoalPlanner(planner: GoalPlanner): void {
  localStorage.setItem(`goalplanner-${planner.id}`, JSON.stringify(planner))
}

/**
 * Load goal planner from localStorage
 */
export function loadGoalPlanner(id: string): GoalPlanner | null {
  try {
    const data = localStorage.getItem(`goalplanner-${id}`)
    if (!data) return null

    const planner = JSON.parse(data) as GoalPlanner
    // Convert date strings back to Date objects
    planner.createdAt = new Date(planner.createdAt)
    planner.updatedAt = new Date(planner.updatedAt)
    planner.goals = planner.goals.map((g: Goal) => ({
      ...g,
      targetDate: new Date(g.targetDate),
      createdAt: new Date(g.createdAt),
      updatedAt: new Date(g.updatedAt),
      milestones: g.milestones.map((m: Milestone) => ({
        ...m,
        completedAt: m.completedAt ? new Date(m.completedAt) : null,
        createdAt: new Date(m.createdAt),
      })),
    }))

    return planner
  } catch {
    return null
  }
}

/**
 * Get all goal planners
 */
export function getAllGoalPlanners(): GoalPlanner[] {
  const planners: GoalPlanner[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('goalplanner-')) {
      const id = key.replace('goalplanner-', '')
      const planner = loadGoalPlanner(id)
      if (planner) planners.push(planner)
    }
  }

  return planners.sort((a: GoalPlanner, b: GoalPlanner) =>
    b.updatedAt.getTime() - a.updatedAt.getTime()
  )
}

/**
 * Delete goal planner
 */
export function deleteGoalPlanner(id: string): void {
  localStorage.removeItem(`goalplanner-${id}`)
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
 * Export goal planner as text
 */
export function exportAsText(planner: GoalPlanner): string {
  let text = `${planner.name.toUpperCase()}\n`
  text += '='.repeat(planner.name.length) + '\n\n'

  const stats = getPlannerStats(planner)
  text += `SUMMARY\n-------\n`
  text += `Total Goals: ${stats.totalGoals}\n`
  text += `Completed: ${stats.completedGoals}\n`
  text += `Active: ${stats.activeGoals}\n`
  text += `Overdue: ${stats.overdueGoals}\n\n`

  text += `GOALS\n-----\n`
  planner.goals.forEach((goal: Goal) => {
    const goalStats = getGoalStats(goal)
    text += `\n${goal.title}\n`
    text += `Target Date: ${formatDate(goal.targetDate)}`
    if (goalStats.isOverdue) {
      text += ` (OVERDUE by ${Math.abs(goalStats.daysUntilTarget)} days)`
    } else if (goalStats.daysUntilTarget >= 0) {
      text += ` (${goalStats.daysUntilTarget} days remaining)`
    }
    text += `\n`
    if (goal.description) text += `Description: ${goal.description}\n`
    text += `Progress: ${goalStats.progress}% (${goalStats.completedMilestones}/${goalStats.totalMilestones} milestones)\n`

    if (goal.milestones.length > 0) {
      text += `\nMilestones:\n`
      goal.milestones.forEach((milestone: Milestone, index: number) => {
        const checkbox = milestone.completed ? '[x]' : '[ ]'
        text += `  ${index + 1}. ${checkbox} ${milestone.title}`
        if (milestone.completed && milestone.completedAt) {
          text += ` (completed ${formatDate(milestone.completedAt)})`
        }
        text += '\n'
      })
    }
    text += '\n'
  })

  return text
}

/**
 * Download goal planner as text file
 */
export function downloadGoalPlanner(planner: GoalPlanner): void {
  const text = exportAsText(planner)
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${planner.name.toLowerCase().replace(/\s+/g, '-')}-goals.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
