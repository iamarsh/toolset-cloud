/**
 * Meeting Notes Logic
 * Take and organize meeting notes with action items
 */

export interface ActionItem {
  id: string
  text: string
  assignee: string
  completed: boolean
  createdAt: Date
}

export interface MeetingNote {
  id: string
  title: string
  date: Date
  attendees: string[]
  notes: string
  actionItems: ActionItem[]
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
 * Create a new meeting note
 */
export function createMeetingNote(title: string, date: Date): MeetingNote {
  const now = new Date()
  return {
    id: generateId(),
    title,
    date,
    attendees: [],
    notes: '',
    actionItems: [],
    createdAt: now,
    updatedAt: now,
  }
}

/**
 * Add attendee to meeting
 */
export function addAttendee(meeting: MeetingNote, name: string): MeetingNote {
  return {
    ...meeting,
    attendees: [...meeting.attendees, name],
    updatedAt: new Date(),
  }
}

/**
 * Remove attendee from meeting
 */
export function removeAttendee(meeting: MeetingNote, name: string): MeetingNote {
  return {
    ...meeting,
    attendees: meeting.attendees.filter((attendee: string) => attendee !== name),
    updatedAt: new Date(),
  }
}

/**
 * Update meeting notes
 */
export function updateNotes(meeting: MeetingNote, notes: string): MeetingNote {
  return {
    ...meeting,
    notes,
    updatedAt: new Date(),
  }
}

/**
 * Add action item
 */
export function addActionItem(
  meeting: MeetingNote,
  text: string,
  assignee: string
): MeetingNote {
  const newItem: ActionItem = {
    id: generateId(),
    text,
    assignee,
    completed: false,
    createdAt: new Date(),
  }

  return {
    ...meeting,
    actionItems: [...meeting.actionItems, newItem],
    updatedAt: new Date(),
  }
}

/**
 * Toggle action item completion
 */
export function toggleActionItem(meeting: MeetingNote, itemId: string): MeetingNote {
  return {
    ...meeting,
    actionItems: meeting.actionItems.map((item: ActionItem) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ),
    updatedAt: new Date(),
  }
}

/**
 * Delete action item
 */
export function deleteActionItem(meeting: MeetingNote, itemId: string): MeetingNote {
  return {
    ...meeting,
    actionItems: meeting.actionItems.filter((item: ActionItem) => item.id !== itemId),
    updatedAt: new Date(),
  }
}

/**
 * Get meeting statistics
 */
export function getStats(meeting: MeetingNote): {
  totalItems: number
  completedItems: number
  pendingItems: number
} {
  const totalItems = meeting.actionItems.length
  const completedItems = meeting.actionItems.filter((item: ActionItem) => item.completed).length
  const pendingItems = totalItems - completedItems

  return { totalItems, completedItems, pendingItems }
}

/**
 * Save meeting to localStorage
 */
export function saveMeeting(meeting: MeetingNote): void {
  localStorage.setItem(`meeting-${meeting.id}`, JSON.stringify(meeting))
}

/**
 * Load meeting from localStorage
 */
export function loadMeeting(id: string): MeetingNote | null {
  try {
    const data = localStorage.getItem(`meeting-${id}`)
    if (!data) return null

    const meeting = JSON.parse(data) as MeetingNote
    // Convert date strings back to Date objects
    meeting.date = new Date(meeting.date)
    meeting.createdAt = new Date(meeting.createdAt)
    meeting.updatedAt = new Date(meeting.updatedAt)
    meeting.actionItems = meeting.actionItems.map((item: ActionItem) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }))

    return meeting
  } catch {
    return null
  }
}

/**
 * Get all meetings
 */
export function getAllMeetings(): MeetingNote[] {
  const meetings: MeetingNote[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('meeting-')) {
      const id = key.replace('meeting-', '')
      const meeting = loadMeeting(id)
      if (meeting) meetings.push(meeting)
    }
  }

  return meetings.sort((a: MeetingNote, b: MeetingNote) =>
    b.date.getTime() - a.date.getTime()
  )
}

/**
 * Delete meeting
 */
export function deleteMeeting(id: string): void {
  localStorage.removeItem(`meeting-${id}`)
}

/**
 * Export meeting as text
 */
export function exportAsText(meeting: MeetingNote): string {
  let text = `${meeting.title}\n`
  text += '='.repeat(meeting.title.length) + '\n\n'
  text += `Date: ${formatDate(meeting.date)}\n`
  text += `Attendees: ${meeting.attendees.join(', ') || 'None'}\n\n`
  text += `Notes:\n${meeting.notes || 'No notes taken'}\n\n`
  text += `Action Items:\n`

  if (meeting.actionItems.length === 0) {
    text += 'No action items\n'
  } else {
    meeting.actionItems.forEach((item: ActionItem, index: number) => {
      const checkbox = item.completed ? '[x]' : '[ ]'
      text += `${index + 1}. ${checkbox} ${item.text} (${item.assignee})\n`
    })
  }

  return text
}

/**
 * Download meeting as text file
 */
export function downloadMeeting(meeting: MeetingNote): void {
  const text = exportAsText(meeting)
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${meeting.title.toLowerCase().replace(/\s+/g, '-')}-${formatDate(meeting.date)}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
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
 * Format time for display
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
