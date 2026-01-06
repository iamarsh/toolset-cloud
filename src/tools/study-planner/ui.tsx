'use client'

import { useState, useEffect } from 'react'
import { Plus, Calendar, Clock, Trash2, Download, BookOpen, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  createStudyPlan,
  addSession,
  toggleSession,
  updateNotes,
  deleteSession,
  getStats,
  savePlan,
  getAllPlans,
  deletePlan as removePlan,
  downloadPlan,
  formatDate,
  formatTime,
  type StudyPlan,
  type StudySession,
} from './logic'

export default function StudyPlannerUI() {
  const [plans, setPlans] = useState<StudyPlan[]>([])
  const [activePlan, setActivePlan] = useState<StudyPlan | null>(null)
  const [newPlanName, setNewPlanName] = useState('')
  const [newSession, setNewSession] = useState({
    subject: '',
    topic: '',
    duration: 60,
    date: '',
    time: '',
  })

  useEffect(() => {
    const loaded = getAllPlans()
    setPlans(loaded)
    if (loaded.length > 0) {
      setActivePlan(loaded[0])
    }
  }, [])

  const handleCreatePlan = () => {
    if (!newPlanName.trim()) return

    const plan = createStudyPlan(newPlanName.trim())
    savePlan(plan)
    setPlans([plan, ...plans])
    setActivePlan(plan)
    setNewPlanName('')
  }

  const handleAddSession = () => {
    if (!activePlan || !newSession.subject || !newSession.topic || !newSession.date) return

    const dateTime = new Date(`${newSession.date}T${newSession.time || '09:00'}`)
    const updated = addSession(
      activePlan,
      newSession.subject,
      newSession.topic,
      newSession.duration,
      dateTime
    )
    savePlan(updated)
    setActivePlan(updated)
    setPlans(plans.map((p: StudyPlan) => (p.id === updated.id ? updated : p)))
    setNewSession({ subject: '', topic: '', duration: 60, date: '', time: '' })
  }

  const handleToggleSession = (sessionId: string) => {
    if (!activePlan) return

    const updated = toggleSession(activePlan, sessionId)
    savePlan(updated)
    setActivePlan(updated)
    setPlans(plans.map((p: StudyPlan) => (p.id === updated.id ? updated : p)))
  }

  const handleDeleteSession = (sessionId: string) => {
    if (!activePlan) return

    const updated = deleteSession(activePlan, sessionId)
    savePlan(updated)
    setActivePlan(updated)
    setPlans(plans.map((p: StudyPlan) => (p.id === updated.id ? updated : p)))
  }

  const handleDeletePlan = (id: string) => {
    removePlan(id)
    const updated = plans.filter((p: StudyPlan) => p.id !== id)
    setPlans(updated)
    if (activePlan?.id === id) {
      setActivePlan(updated.length > 0 ? updated[0] : null)
    }
  }

  const stats = activePlan ? getStats(activePlan) : null

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Create Plan */}
      <Card className="p-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newPlanName}
            onChange={(e) => setNewPlanName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreatePlan()}
            placeholder="Create a new study plan..."
            className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
          />
          <Button onClick={handleCreatePlan} disabled={!newPlanName.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Create Plan
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plans Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3">Study Plans</h3>
            {plans.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No plans yet. Create one to get started!
              </p>
            ) : (
              <div className="space-y-2">
                {plans.map((plan: StudyPlan) => {
                  const planStats = getStats(plan)
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setActivePlan(plan)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        activePlan?.id === plan.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{plan.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {planStats.completedSessions}/{planStats.totalSessions} completed
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeletePlan(plan.id)
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

        {/* Active Plan */}
        <div className="lg:col-span-2 space-y-6">
          {activePlan ? (
            <>
              {/* Stats */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{activePlan.name}</h2>
                    {stats && (
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{stats.upcomingSessions} upcoming</span>
                        <span>{stats.completedHours}h completed</span>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => downloadPlan(activePlan)}>
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>

                {stats && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 rounded-lg bg-muted text-center">
                      <div className="text-2xl font-bold">{stats.totalSessions}</div>
                      <div className="text-xs text-muted-foreground mt-1">Total Sessions</div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted text-center">
                      <div className="text-2xl font-bold">{stats.completedSessions}</div>
                      <div className="text-xs text-muted-foreground mt-1">Completed</div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted text-center">
                      <div className="text-2xl font-bold">{stats.totalHours}h</div>
                      <div className="text-xs text-muted-foreground mt-1">Total Hours</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {stats.completedHours}h
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Completed</div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Add Session */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold">Add Study Session</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newSession.subject}
                    onChange={(e) => setNewSession({ ...newSession, subject: e.target.value })}
                    placeholder="Subject (e.g., Math)"
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="text"
                    value={newSession.topic}
                    onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })}
                    placeholder="Topic (e.g., Algebra)"
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="date"
                    value={newSession.date}
                    onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="time"
                    value={newSession.time}
                    onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="number"
                    value={newSession.duration}
                    onChange={(e) =>
                      setNewSession({ ...newSession, duration: parseInt(e.target.value) })
                    }
                    min="15"
                    step="15"
                    placeholder="Duration (minutes)"
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <Button onClick={handleAddSession} className="md:col-span-1">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Session
                  </Button>
                </div>
              </Card>

              {/* Sessions */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Study Sessions</h3>
                {activePlan.sessions.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No sessions yet. Add your first study session above!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activePlan.sessions
                      .sort((a: StudySession, b: StudySession) =>
                        a.date.getTime() - b.date.getTime()
                      )
                      .map((session: StudySession) => (
                        <div
                          key={session.id}
                          className={`p-4 rounded-lg border ${
                            session.completed
                              ? 'bg-muted/50 border-muted'
                              : 'border-border'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => handleToggleSession(session.id)}
                              className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                session.completed
                                  ? 'bg-primary border-primary'
                                  : 'border-input hover:border-primary'
                              }`}
                            >
                              {session.completed && (
                                <Check className="w-3 h-3 text-primary-foreground" />
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <div
                                className={`font-medium ${
                                  session.completed ? 'line-through text-muted-foreground' : ''
                                }`}
                              >
                                {session.subject}: {session.topic}
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(session.date)} {formatTime(session.date)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {session.duration} min
                                </span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleDeleteSession(session.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </Card>
            </>
          ) : (
            <Card className="p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Plan Selected</h3>
              <p className="text-sm text-muted-foreground">
                Create a new study plan or select one from the sidebar.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>Features:</strong> Create study plans, schedule sessions, track progress,
            and export to text files.
          </div>
          <div>
            <strong>Tip:</strong> Plan your study sessions in advance and mark them complete
            as you finish to track your progress.
          </div>
        </div>
      </Card>
    </div>
  )
}
