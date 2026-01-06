/**
 * Checklist Maker Logic
 * Create and manage checklists with localStorage persistence
 */

export interface ChecklistItem {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export interface Checklist {
  id: string
  title: string
  items: ChecklistItem[]
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
 * Create a new checklist
 */
export function createChecklist(title: string): Checklist {
  const now = new Date()
  return {
    id: generateId(),
    title,
    items: [],
    createdAt: now,
    updatedAt: now,
  }
}

/**
 * Add item to checklist
 */
export function addItem(checklist: Checklist, text: string): Checklist {
  const newItem: ChecklistItem = {
    id: generateId(),
    text,
    completed: false,
    createdAt: new Date(),
  }

  return {
    ...checklist,
    items: [...checklist.items, newItem],
    updatedAt: new Date(),
  }
}

/**
 * Toggle item completion
 */
export function toggleItem(checklist: Checklist, itemId: string): Checklist {
  return {
    ...checklist,
    items: checklist.items.map((item: ChecklistItem) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ),
    updatedAt: new Date(),
  }
}

/**
 * Delete item from checklist
 */
export function deleteItem(checklist: Checklist, itemId: string): Checklist {
  return {
    ...checklist,
    items: checklist.items.filter((item: ChecklistItem) => item.id !== itemId),
    updatedAt: new Date(),
  }
}

/**
 * Update item text
 */
export function updateItemText(checklist: Checklist, itemId: string, text: string): Checklist {
  return {
    ...checklist,
    items: checklist.items.map((item: ChecklistItem) =>
      item.id === itemId ? { ...item, text } : item
    ),
    updatedAt: new Date(),
  }
}

/**
 * Clear completed items
 */
export function clearCompleted(checklist: Checklist): Checklist {
  return {
    ...checklist,
    items: checklist.items.filter((item: ChecklistItem) => !item.completed),
    updatedAt: new Date(),
  }
}

/**
 * Get checklist statistics
 */
export function getStats(checklist: Checklist): {
  total: number
  completed: number
  remaining: number
  percentage: number
} {
  const total = checklist.items.length
  const completed = checklist.items.filter((item: ChecklistItem) => item.completed).length
  const remaining = total - completed
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return { total, completed, remaining, percentage }
}

/**
 * Save checklist to localStorage
 */
export function saveChecklist(checklist: Checklist): void {
  localStorage.setItem(`checklist-${checklist.id}`, JSON.stringify(checklist))
}

/**
 * Load checklist from localStorage
 */
export function loadChecklist(id: string): Checklist | null {
  try {
    const data = localStorage.getItem(`checklist-${id}`)
    if (!data) return null

    const checklist = JSON.parse(data) as Checklist
    // Convert date strings back to Date objects
    checklist.createdAt = new Date(checklist.createdAt)
    checklist.updatedAt = new Date(checklist.updatedAt)
    checklist.items = checklist.items.map((item: ChecklistItem) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }))

    return checklist
  } catch {
    return null
  }
}

/**
 * Get all checklists
 */
export function getAllChecklists(): Checklist[] {
  const checklists: Checklist[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('checklist-')) {
      const id = key.replace('checklist-', '')
      const checklist = loadChecklist(id)
      if (checklist) checklists.push(checklist)
    }
  }

  return checklists.sort((a: Checklist, b: Checklist) =>
    b.updatedAt.getTime() - a.updatedAt.getTime()
  )
}

/**
 * Delete checklist
 */
export function deleteChecklist(id: string): void {
  localStorage.removeItem(`checklist-${id}`)
}

/**
 * Export checklist as text
 */
export function exportAsText(checklist: Checklist): string {
  let text = `${checklist.title}\n`
  text += '='.repeat(checklist.title.length) + '\n\n'

  checklist.items.forEach((item: ChecklistItem, index: number) => {
    const checkbox = item.completed ? '[x]' : '[ ]'
    text += `${index + 1}. ${checkbox} ${item.text}\n`
  })

  const stats = getStats(checklist)
  text += `\n---\nProgress: ${stats.completed}/${stats.total} (${stats.percentage}%)`

  return text
}

/**
 * Download checklist as text file
 */
export function downloadChecklist(checklist: Checklist): void {
  const text = exportAsText(checklist)
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${checklist.title.toLowerCase().replace(/\s+/g, '-')}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
