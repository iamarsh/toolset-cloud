'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Download, Users, CheckSquare, Calendar, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  createMeetingNote,
  addAttendee,
  removeAttendee,
  updateNotes,
  addActionItem,
  toggleActionItem,
  deleteActionItem,
  getStats,
  saveMeeting,
  getAllMeetings,
  deleteMeeting as removeMeeting,
  downloadMeeting,
  formatDate,
  type MeetingNote,
  type ActionItem,
} from './logic'

export default function MeetingNotesUI() {
  const [meetings, setMeetings] = useState<MeetingNote[]>([])
  const [activeMeeting, setActiveMeeting] = useState<MeetingNote | null>(null)
  const [newMeetingTitle, setNewMeetingTitle] = useState('')
  const [newMeetingDate, setNewMeetingDate] = useState('')
  const [newAttendee, setNewAttendee] = useState('')
  const [newActionItem, setNewActionItem] = useState({ text: '', assignee: '' })

  useEffect(() => {
    const loaded = getAllMeetings()
    setMeetings(loaded)
    if (loaded.length > 0) {
      setActiveMeeting(loaded[0])
    }
  }, [])

  const handleCreateMeeting = () => {
    if (!newMeetingTitle.trim() || !newMeetingDate) return

    const meeting = createMeetingNote(newMeetingTitle.trim(), new Date(newMeetingDate))
    saveMeeting(meeting)
    setMeetings([meeting, ...meetings])
    setActiveMeeting(meeting)
    setNewMeetingTitle('')
    setNewMeetingDate('')
  }

  const handleAddAttendee = () => {
    if (!activeMeeting || !newAttendee.trim()) return

    const updated = addAttendee(activeMeeting, newAttendee.trim())
    saveMeeting(updated)
    setActiveMeeting(updated)
    setMeetings(meetings.map((m: MeetingNote) => (m.id === updated.id ? updated : m)))
    setNewAttendee('')
  }

  const handleRemoveAttendee = (name: string) => {
    if (!activeMeeting) return

    const updated = removeAttendee(activeMeeting, name)
    saveMeeting(updated)
    setActiveMeeting(updated)
    setMeetings(meetings.map((m: MeetingNote) => (m.id === updated.id ? updated : m)))
  }

  const handleUpdateNotes = (notes: string) => {
    if (!activeMeeting) return

    const updated = updateNotes(activeMeeting, notes)
    saveMeeting(updated)
    setActiveMeeting(updated)
    setMeetings(meetings.map((m: MeetingNote) => (m.id === updated.id ? updated : m)))
  }

  const handleAddActionItem = () => {
    if (!activeMeeting || !newActionItem.text.trim() || !newActionItem.assignee.trim()) return

    const updated = addActionItem(activeMeeting, newActionItem.text.trim(), newActionItem.assignee.trim())
    saveMeeting(updated)
    setActiveMeeting(updated)
    setMeetings(meetings.map((m: MeetingNote) => (m.id === updated.id ? updated : m)))
    setNewActionItem({ text: '', assignee: '' })
  }

  const handleToggleActionItem = (itemId: string) => {
    if (!activeMeeting) return

    const updated = toggleActionItem(activeMeeting, itemId)
    saveMeeting(updated)
    setActiveMeeting(updated)
    setMeetings(meetings.map((m: MeetingNote) => (m.id === updated.id ? updated : m)))
  }

  const handleDeleteActionItem = (itemId: string) => {
    if (!activeMeeting) return

    const updated = deleteActionItem(activeMeeting, itemId)
    saveMeeting(updated)
    setActiveMeeting(updated)
    setMeetings(meetings.map((m: MeetingNote) => (m.id === updated.id ? updated : m)))
  }

  const handleDeleteMeeting = (id: string) => {
    removeMeeting(id)
    const updated = meetings.filter((m: MeetingNote) => m.id !== id)
    setMeetings(updated)
    if (activeMeeting?.id === id) {
      setActiveMeeting(updated.length > 0 ? updated[0] : null)
    }
  }

  const stats = activeMeeting ? getStats(activeMeeting) : null

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Create Meeting */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Create New Meeting</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newMeetingTitle}
            onChange={(e) => setNewMeetingTitle(e.target.value)}
            placeholder="Meeting title..."
            className="md:col-span-2 px-3 py-2 rounded-md border border-input bg-background text-sm"
          />
          <input
            type="date"
            value={newMeetingDate}
            onChange={(e) => setNewMeetingDate(e.target.value)}
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
          />
        </div>
        <Button
          onClick={handleCreateMeeting}
          disabled={!newMeetingTitle.trim() || !newMeetingDate}
          className="mt-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Meeting
        </Button>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meetings Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3">Past Meetings</h3>
            {meetings.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No meetings yet. Create one to get started!
              </p>
            ) : (
              <div className="space-y-2">
                {meetings.map((meeting: MeetingNote) => {
                  const meetingStats = getStats(meeting)
                  return (
                    <button
                      key={meeting.id}
                      onClick={() => setActiveMeeting(meeting)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        activeMeeting?.id === meeting.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{meeting.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {formatDate(meeting.date)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {meetingStats.pendingItems} pending items
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteMeeting(meeting.id)
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Active Meeting */}
        <div className="lg:col-span-2 space-y-6">
          {activeMeeting ? (
            <>
              {/* Header */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{activeMeeting.title}</h2>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {formatDate(activeMeeting.date)}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => downloadMeeting(activeMeeting)}>
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>

                {stats && (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 rounded-lg bg-muted text-center">
                      <div className="text-2xl font-bold">{stats.totalItems}</div>
                      <div className="text-xs text-muted-foreground mt-1">Total Items</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {stats.completedItems}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Completed</div>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-500/10 text-center">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {stats.pendingItems}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Pending</div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Attendees */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Attendees
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newAttendee}
                    onChange={(e) => setNewAttendee(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddAttendee()}
                    placeholder="Add attendee..."
                    className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <Button onClick={handleAddAttendee} disabled={!newAttendee.trim()}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeMeeting.attendees.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No attendees added</p>
                  ) : (
                    activeMeeting.attendees.map((attendee: string) => (
                      <Badge key={attendee} variant="secondary" className="gap-1">
                        {attendee}
                        <button
                          onClick={() => handleRemoveAttendee(attendee)}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))
                  )}
                </div>
              </Card>

              {/* Notes */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Meeting Notes
                </h3>
                <textarea
                  value={activeMeeting.notes}
                  onChange={(e) => handleUpdateNotes(e.target.value)}
                  placeholder="Type your meeting notes here..."
                  className="w-full h-48 p-3 rounded-md border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </Card>

              {/* Action Items */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  Action Items
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newActionItem.text}
                    onChange={(e) => setNewActionItem({ ...newActionItem, text: e.target.value })}
                    placeholder="Action item..."
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="text"
                    value={newActionItem.assignee}
                    onChange={(e) => setNewActionItem({ ...newActionItem, assignee: e.target.value })}
                    placeholder="Assignee..."
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                </div>
                <Button
                  onClick={handleAddActionItem}
                  disabled={!newActionItem.text.trim() || !newActionItem.assignee.trim()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Action Item
                </Button>

                <div className="space-y-2 mt-4">
                  {activeMeeting.actionItems.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No action items yet
                    </p>
                  ) : (
                    activeMeeting.actionItems.map((item: ActionItem) => (
                      <div
                        key={item.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border ${
                          item.completed ? 'bg-muted/50 border-muted' : 'border-border'
                        }`}
                      >
                        <button
                          onClick={() => handleToggleActionItem(item.id)}
                          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            item.completed
                              ? 'bg-primary border-primary'
                              : 'border-input hover:border-primary'
                          }`}
                        >
                          {item.completed && <span className="text-xs text-primary-foreground">✓</span>}
                        </button>
                        <div className="flex-1">
                          <div
                            className={`text-sm ${
                              item.completed ? 'line-through text-muted-foreground' : ''
                            }`}
                          >
                            {item.text}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Assigned to: {item.assignee}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDeleteActionItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-12 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Meeting Selected</h3>
              <p className="text-sm text-muted-foreground">
                Create a new meeting or select one from the sidebar.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
