'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Download, Play, Square, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  createTimeTracker,
  addProject,
  deleteProject,
  startTimer,
  stopTimer,
  deleteEntry,
  getActiveEntry,
  getProjectTotalTime,
  getTotalTime,
  getProjectName,
  getProjectColor,
  formatDuration,
  formatHours,
  saveTimeTracker,
  getAllTimeTrackers,
  deleteTimeTracker as removeTimeTracker,
  downloadTimeTracker,
  formatDate,
  formatTime,
  type TimeTracker,
  type Project,
  type TimeEntry,
} from './logic'

export default function TimeTrackerUI() {
  const [trackers, setTrackers] = useState<TimeTracker[]>([])
  const [activeTracker, setActiveTracker] = useState<TimeTracker | null>(null)
  const [newTrackerName, setNewTrackerName] = useState('')
  const [newProjectName, setNewProjectName] = useState('')
  const [newEntryDescription, setNewEntryDescription] = useState('')
  const [selectedProject, setSelectedProject] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every second for active timer display
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const loaded = getAllTimeTrackers()
    setTrackers(loaded)
    if (loaded.length > 0) {
      setActiveTracker(loaded[0])
    }
  }, [])

  const handleCreateTracker = () => {
    if (!newTrackerName.trim()) return

    const tracker = createTimeTracker(newTrackerName.trim())
    saveTimeTracker(tracker)
    setTrackers([tracker, ...trackers])
    setActiveTracker(tracker)
    setNewTrackerName('')
  }

  const handleAddProject = () => {
    if (!activeTracker || !newProjectName.trim()) return

    const updated = addProject(activeTracker, newProjectName.trim())
    saveTimeTracker(updated)
    setActiveTracker(updated)
    setTrackers(trackers.map((t: TimeTracker) => (t.id === updated.id ? updated : t)))
    setNewProjectName('')
  }

  const handleDeleteProject = (projectId: string) => {
    if (!activeTracker) return

    const updated = deleteProject(activeTracker, projectId)
    saveTimeTracker(updated)
    setActiveTracker(updated)
    setTrackers(trackers.map((t: TimeTracker) => (t.id === updated.id ? updated : t)))
  }

  const handleStartTimer = () => {
    if (!activeTracker || !selectedProject) return

    const updated = startTimer(activeTracker, selectedProject, newEntryDescription.trim())
    saveTimeTracker(updated)
    setActiveTracker(updated)
    setTrackers(trackers.map((t: TimeTracker) => (t.id === updated.id ? updated : t)))
    setNewEntryDescription('')
  }

  const handleStopTimer = () => {
    if (!activeTracker) return

    const updated = stopTimer(activeTracker)
    saveTimeTracker(updated)
    setActiveTracker(updated)
    setTrackers(trackers.map((t: TimeTracker) => (t.id === updated.id ? updated : t)))
  }

  const handleDeleteEntry = (entryId: string) => {
    if (!activeTracker) return

    const updated = deleteEntry(activeTracker, entryId)
    saveTimeTracker(updated)
    setActiveTracker(updated)
    setTrackers(trackers.map((t: TimeTracker) => (t.id === updated.id ? updated : t)))
  }

  const handleDeleteTracker = (id: string) => {
    removeTimeTracker(id)
    const updated = trackers.filter((t: TimeTracker) => t.id !== id)
    setTrackers(updated)
    if (activeTracker?.id === id) {
      setActiveTracker(updated.length > 0 ? updated[0] : null)
    }
  }

  const activeEntry = activeTracker ? getActiveEntry(activeTracker) : null

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Create Tracker */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Create New Time Tracker</h3>
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
                {trackers.map((tracker: TimeTracker) => (
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
                          {tracker.projects.length} projects
                        </div>
                        <div className="text-xs font-medium mt-1">
                          {formatHours(getTotalTime(tracker))}
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
                  <div>
                    <h2 className="text-2xl font-bold">{activeTracker.name}</h2>
                    <div className="text-sm text-muted-foreground mt-1">
                      Total: {formatHours(getTotalTime(activeTracker))}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadTimeTracker(activeTracker)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </Card>

              {/* Active Timer */}
              {activeEntry && (
                <Card className="p-6 bg-primary/5 border-primary">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getProjectColor(activeTracker, activeEntry.projectId) }}
                        />
                        <span className="font-semibold">
                          {getProjectName(activeTracker, activeEntry.projectId)}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activeEntry.description || 'No description'}
                      </div>
                      <div className="text-3xl font-bold mt-2">
                        {formatDuration(activeEntry.duration)}
                      </div>
                    </div>
                    <Button onClick={handleStopTimer} variant="destructive" size="lg">
                      <Square className="w-5 h-5 mr-2" />
                      Stop
                    </Button>
                  </div>
                </Card>
              )}

              {/* Start Timer */}
              {!activeEntry && activeTracker.projects.length > 0 && (
                <Card className="p-6 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Start Timer
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="">Select project...</option>
                      {activeTracker.projects.map((project: Project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={newEntryDescription}
                      onChange={(e) => setNewEntryDescription(e.target.value)}
                      placeholder="What are you working on?"
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                    />
                  </div>
                  <Button onClick={handleStartTimer} disabled={!selectedProject} size="lg">
                    <Play className="w-5 h-5 mr-2" />
                    Start Timer
                  </Button>
                </Card>
              )}

              {/* Projects */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold">Projects</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddProject()}
                    placeholder="Add project..."
                    className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <Button onClick={handleAddProject} disabled={!newProjectName.trim()}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeTracker.projects.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4 col-span-2">
                      No projects yet
                    </p>
                  ) : (
                    activeTracker.projects.map((project: Project) => {
                      const totalTime = getProjectTotalTime(activeTracker, project.id)
                      return (
                        <div
                          key={project.id}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div
                              className="w-4 h-4 rounded-full flex-shrink-0"
                              style={{ backgroundColor: project.color }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{project.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {formatHours(totalTime)}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )
                    })
                  )}
                </div>
              </Card>

              {/* Time Entries */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Recent Entries</h3>
                {activeTracker.entries.filter((e: TimeEntry) => e.endTime !== null).length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No time entries yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {[...activeTracker.entries]
                      .filter((e: TimeEntry) => e.endTime !== null)
                      .sort((a: TimeEntry, b: TimeEntry) => b.startTime.getTime() - a.startTime.getTime())
                      .map((entry: TimeEntry) => (
                        <div
                          key={entry.id}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: getProjectColor(activeTracker, entry.projectId) }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {getProjectName(activeTracker, entry.projectId)}
                                </span>
                                {entry.description && (
                                  <span className="text-sm text-muted-foreground truncate">
                                    • {entry.description}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {formatDate(entry.startTime)} • {formatTime(entry.startTime)} -{' '}
                                {formatTime(entry.endTime!)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary">{formatDuration(entry.duration)}</Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleDeleteEntry(entry.id)}
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
              <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Tracker Selected</h3>
              <p className="text-sm text-muted-foreground">
                Create a new tracker to start tracking time.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
