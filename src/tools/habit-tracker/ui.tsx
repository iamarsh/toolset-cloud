'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Download, CheckCircle2, Circle, TrendingUp, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  createHabitTracker,
  addHabit,
  deleteHabit,
  toggleHabitCompletion,
  isHabitCompleted,
  getHabitStats,
  saveHabitTracker,
  getAllHabitTrackers,
  deleteHabitTracker as removeHabitTracker,
  downloadHabitTracker,
  getDateString,
  type HabitTracker,
  type Habit,
} from './logic'

export default function HabitTrackerUI() {
  const [trackers, setTrackers] = useState<HabitTracker[]>([])
  const [activeTracker, setActiveTracker] = useState<HabitTracker | null>(null)
  const [newTrackerName, setNewTrackerName] = useState('')
  const [newHabit, setNewHabit] = useState({ name: '', description: '' })

  useEffect(() => {
    const loaded = getAllHabitTrackers()
    setTrackers(loaded)
    if (loaded.length > 0) {
      setActiveTracker(loaded[0])
    }
  }, [])

  const handleCreateTracker = () => {
    if (!newTrackerName.trim()) return

    const tracker = createHabitTracker(newTrackerName.trim())
    saveHabitTracker(tracker)
    setTrackers([tracker, ...trackers])
    setActiveTracker(tracker)
    setNewTrackerName('')
  }

  const handleAddHabit = () => {
    if (!activeTracker || !newHabit.name.trim()) return

    const updated = addHabit(activeTracker, newHabit.name.trim(), newHabit.description.trim())
    saveHabitTracker(updated)
    setActiveTracker(updated)
    setTrackers(trackers.map((t: HabitTracker) => (t.id === updated.id ? updated : t)))
    setNewHabit({ name: '', description: '' })
  }

  const handleDeleteHabit = (habitId: string) => {
    if (!activeTracker) return

    const updated = deleteHabit(activeTracker, habitId)
    saveHabitTracker(updated)
    setActiveTracker(updated)
    setTrackers(trackers.map((t: HabitTracker) => (t.id === updated.id ? updated : t)))
  }

  const handleToggleCompletion = (habitId: string, date: Date) => {
    if (!activeTracker) return

    const updated = toggleHabitCompletion(activeTracker, habitId, date)
    saveHabitTracker(updated)
    setActiveTracker(updated)
    setTrackers(trackers.map((t: HabitTracker) => (t.id === updated.id ? updated : t)))
  }

  const handleDeleteTracker = (id: string) => {
    removeHabitTracker(id)
    const updated = trackers.filter((t: HabitTracker) => t.id !== id)
    setTrackers(updated)
    if (activeTracker?.id === id) {
      setActiveTracker(updated.length > 0 ? updated[0] : null)
    }
  }

  // Generate last 7 days for display
  const getLast7Days = (): Date[] => {
    const days: Date[] = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push(date)
    }
    return days
  }

  const last7Days = getLast7Days()

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Create Tracker */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Create New Habit Tracker</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={newTrackerName}
            onChange={(e) => setNewTrackerName(e.target.value)}
            placeholder="Tracker name..."
            className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
          />
          <Button onClick={handleCreateTracker} disabled={!newTrackerName.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Create Tracker
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Trackers Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3">Your Trackers</h3>
            {trackers.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No trackers yet</p>
            ) : (
              <div className="space-y-2">
                {trackers.map((tracker: HabitTracker) => (
                  <button
                    key={tracker.id}
                    onClick={() => setActiveTracker(tracker)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      activeTracker?.id === tracker.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{tracker.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {tracker.habits.length} habits
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteTracker(tracker.id)
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Active Tracker */}
        <div className="lg:col-span-3 space-y-6">
          {activeTracker ? (
            <>
              {/* Header */}
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-2xl font-bold">{activeTracker.name}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadHabitTracker(activeTracker)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </Card>

              {/* Add Habit */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold">Add New Habit</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newHabit.name}
                    onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                    placeholder="Habit name..."
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="text"
                    value={newHabit.description}
                    onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                    placeholder="Description (optional)..."
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <Button onClick={handleAddHabit} disabled={!newHabit.name.trim()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Habit
                  </Button>
                </div>
              </Card>

              {/* Habits List */}
              {activeTracker.habits.length === 0 ? (
                <Card className="p-12 text-center">
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No Habits Yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Add a habit to start tracking your progress.
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {activeTracker.habits.map((habit: Habit) => {
                    const stats = getHabitStats(habit)
                    return (
                      <Card key={habit.id} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{habit.name}</h3>
                            {habit.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {habit.description}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDeleteHabit(habit.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                          <div className="p-3 rounded-lg bg-primary/10 text-center">
                            <div className="flex items-center justify-center gap-1 text-xl font-bold text-primary">
                              <TrendingUp className="w-4 h-4" />
                              {stats.currentStreak}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Current Streak
                            </div>
                          </div>
                          <div className="p-3 rounded-lg bg-orange-500/10 text-center">
                            <div className="flex items-center justify-center gap-1 text-xl font-bold text-orange-600 dark:text-orange-400">
                              <Award className="w-4 h-4" />
                              {stats.longestStreak}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Longest Streak
                            </div>
                          </div>
                          <div className="p-3 rounded-lg bg-green-500/10 text-center">
                            <div className="text-xl font-bold text-green-600 dark:text-green-400">
                              {stats.completionRate30Days}%
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">30-Day Rate</div>
                          </div>
                          <div className="p-3 rounded-lg bg-muted text-center">
                            <div className="text-xl font-bold">{stats.totalCompletions}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Total Done
                            </div>
                          </div>
                        </div>

                        {/* Last 7 Days */}
                        <div>
                          <div className="text-sm font-medium mb-2">Last 7 Days</div>
                          <div className="grid grid-cols-7 gap-2">
                            {last7Days.map((date: Date) => {
                              const completed = isHabitCompleted(habit, date)
                              const isToday = getDateString(date) === getDateString(new Date())
                              return (
                                <button
                                  key={date.toISOString()}
                                  onClick={() => handleToggleCompletion(habit.id, date)}
                                  className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all hover:scale-105 ${
                                    completed
                                      ? 'border-primary bg-primary/10'
                                      : 'border-border hover:border-primary/50'
                                  } ${isToday ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                                >
                                  {completed ? (
                                    <CheckCircle2 className="w-6 h-6 text-primary" />
                                  ) : (
                                    <Circle className="w-6 h-6 text-muted-foreground" />
                                  )}
                                  <div className="text-xs mt-1">
                                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {date.getDate()}
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              )}
            </>
          ) : (
            <Card className="p-12 text-center">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Tracker Selected</h3>
              <p className="text-sm text-muted-foreground">
                Create a new tracker to start building habits.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
