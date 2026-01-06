'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Download, Target, Calendar, CheckCircle2, Circle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  createGoalPlanner,
  addGoal,
  deleteGoal,
  addMilestone,
  toggleMilestone,
  deleteMilestone,
  getGoalStats,
  getPlannerStats,
  saveGoalPlanner,
  getAllGoalPlanners,
  deleteGoalPlanner as removeGoalPlanner,
  downloadGoalPlanner,
  formatDate,
  type GoalPlanner,
  type Goal,
  type Milestone,
} from './logic'

export default function GoalPlannerUI() {
  const [planners, setPlanners] = useState<GoalPlanner[]>([])
  const [activePlanner, setActivePlanner] = useState<GoalPlanner | null>(null)
  const [newPlannerName, setNewPlannerName] = useState('')
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
  })
  const [newMilestones, setNewMilestones] = useState<Record<string, string>>({})

  useEffect(() => {
    const loaded = getAllGoalPlanners()
    setPlanners(loaded)
    if (loaded.length > 0) {
      setActivePlanner(loaded[0])
    }
  }, [])

  const handleCreatePlanner = () => {
    if (!newPlannerName.trim()) return

    const planner = createGoalPlanner(newPlannerName.trim())
    saveGoalPlanner(planner)
    setPlanners([planner, ...planners])
    setActivePlanner(planner)
    setNewPlannerName('')
  }

  const handleAddGoal = () => {
    if (!activePlanner || !newGoal.title.trim() || !newGoal.targetDate) return

    const updated = addGoal(
      activePlanner,
      newGoal.title.trim(),
      newGoal.description.trim(),
      new Date(newGoal.targetDate)
    )
    saveGoalPlanner(updated)
    setActivePlanner(updated)
    setPlanners(planners.map((p: GoalPlanner) => (p.id === updated.id ? updated : p)))
    setNewGoal({ title: '', description: '', targetDate: '' })
  }

  const handleDeleteGoal = (goalId: string) => {
    if (!activePlanner) return

    const updated = deleteGoal(activePlanner, goalId)
    saveGoalPlanner(updated)
    setActivePlanner(updated)
    setPlanners(planners.map((p: GoalPlanner) => (p.id === updated.id ? updated : p)))
  }

  const handleAddMilestone = (goalId: string) => {
    if (!activePlanner || !newMilestones[goalId]?.trim()) return

    const updated = addMilestone(activePlanner, goalId, newMilestones[goalId].trim())
    saveGoalPlanner(updated)
    setActivePlanner(updated)
    setPlanners(planners.map((p: GoalPlanner) => (p.id === updated.id ? updated : p)))
    setNewMilestones({ ...newMilestones, [goalId]: '' })
  }

  const handleToggleMilestone = (goalId: string, milestoneId: string) => {
    if (!activePlanner) return

    const updated = toggleMilestone(activePlanner, goalId, milestoneId)
    saveGoalPlanner(updated)
    setActivePlanner(updated)
    setPlanners(planners.map((p: GoalPlanner) => (p.id === updated.id ? updated : p)))
  }

  const handleDeleteMilestone = (goalId: string, milestoneId: string) => {
    if (!activePlanner) return

    const updated = deleteMilestone(activePlanner, goalId, milestoneId)
    saveGoalPlanner(updated)
    setActivePlanner(updated)
    setPlanners(planners.map((p: GoalPlanner) => (p.id === updated.id ? updated : p)))
  }

  const handleDeletePlanner = (id: string) => {
    removeGoalPlanner(id)
    const updated = planners.filter((p: GoalPlanner) => p.id !== id)
    setPlanners(updated)
    if (activePlanner?.id === id) {
      setActivePlanner(updated.length > 0 ? updated[0] : null)
    }
  }

  const stats = activePlanner ? getPlannerStats(activePlanner) : null

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Create Planner */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Create New Goal Planner</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={newPlannerName}
            onChange={(e) => setNewPlannerName(e.target.value)}
            placeholder="Planner name..."
            className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
          />
          <Button onClick={handleCreatePlanner} disabled={!newPlannerName.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Create Planner
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Planners Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3">Your Planners</h3>
            {planners.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No planners yet</p>
            ) : (
              <div className="space-y-2">
                {planners.map((planner: GoalPlanner) => {
                  const plannerStats = getPlannerStats(planner)
                  return (
                    <button
                      key={planner.id}
                      onClick={() => setActivePlanner(planner)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        activePlanner?.id === planner.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{planner.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {plannerStats.activeGoals} active • {plannerStats.completedGoals}{' '}
                            completed
                          </div>
                          {plannerStats.overdueGoals > 0 && (
                            <div className="text-xs text-red-600 mt-1">
                              {plannerStats.overdueGoals} overdue
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeletePlanner(planner.id)
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

        {/* Active Planner */}
        <div className="lg:col-span-2 space-y-6">
          {activePlanner && stats ? (
            <>
              {/* Header */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold">{activePlanner.name}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadGoalPlanner(activePlanner)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-muted text-center">
                    <div className="text-2xl font-bold">{stats.totalGoals}</div>
                    <div className="text-xs text-muted-foreground mt-1">Total Goals</div>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10 text-center">
                    <div className="text-2xl font-bold text-primary">{stats.activeGoals}</div>
                    <div className="text-xs text-muted-foreground mt-1">Active</div>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {stats.completedGoals}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Completed</div>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/10 text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {stats.overdueGoals}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Overdue</div>
                  </div>
                </div>
              </Card>

              {/* Add Goal */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Add New Goal
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    placeholder="Goal title..."
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    placeholder="Description (optional)..."
                    className="w-full h-20 px-3 py-2 rounded-md border border-input bg-background text-sm resize-none"
                  />
                  <div className="flex gap-3">
                    <input
                      type="date"
                      value={newGoal.targetDate}
                      onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
                    />
                    <Button
                      onClick={handleAddGoal}
                      disabled={!newGoal.title.trim() || !newGoal.targetDate}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Goal
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Goals List */}
              {activePlanner.goals.length === 0 ? (
                <Card className="p-12 text-center">
                  <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No Goals Yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Add a goal to start planning and tracking progress.
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {activePlanner.goals.map((goal: Goal) => {
                    const goalStats = getGoalStats(goal)
                    return (
                      <Card key={goal.id} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                              {goal.title}
                              {goalStats.progress === 100 && (
                                <Badge variant="default" className="bg-green-600">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Complete
                                </Badge>
                              )}
                              {goalStats.isOverdue && (
                                <Badge variant="destructive">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Overdue
                                </Badge>
                              )}
                            </h3>
                            {goal.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {goal.description}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>Target: {formatDate(goal.targetDate)}</span>
                              {goalStats.daysUntilTarget >= 0 ? (
                                <span>({goalStats.daysUntilTarget} days remaining)</span>
                              ) : (
                                <span className="text-red-600">
                                  ({Math.abs(goalStats.daysUntilTarget)} days overdue)
                                </span>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDeleteGoal(goal.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span className="font-medium">{goalStats.progress}%</span>
                          </div>
                          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                goalStats.progress === 100
                                  ? 'bg-green-600'
                                  : goalStats.isOverdue
                                    ? 'bg-red-600'
                                    : 'bg-primary'
                              }`}
                              style={{ width: `${goalStats.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Add Milestone */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={newMilestones[goal.id] || ''}
                              onChange={(e) =>
                                setNewMilestones({ ...newMilestones, [goal.id]: e.target.value })
                              }
                              onKeyDown={(e) =>
                                e.key === 'Enter' && handleAddMilestone(goal.id)
                              }
                              placeholder="Add milestone..."
                              className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
                            />
                            <Button
                              size="sm"
                              onClick={() => handleAddMilestone(goal.id)}
                              disabled={!newMilestones[goal.id]?.trim()}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Milestones */}
                        <div className="space-y-2">
                          {goal.milestones.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-4">
                              No milestones yet
                            </p>
                          ) : (
                            goal.milestones.map((milestone: Milestone) => (
                              <div
                                key={milestone.id}
                                className={`flex items-start gap-3 p-3 rounded-lg border ${
                                  milestone.completed ? 'bg-muted/50 border-muted' : 'border-border'
                                }`}
                              >
                                <button
                                  onClick={() => handleToggleMilestone(goal.id, milestone.id)}
                                  className="flex-shrink-0 mt-0.5"
                                >
                                  {milestone.completed ? (
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-muted-foreground" />
                                  )}
                                </button>
                                <div className="flex-1">
                                  <div
                                    className={`text-sm ${
                                      milestone.completed
                                        ? 'line-through text-muted-foreground'
                                        : ''
                                    }`}
                                  >
                                    {milestone.title}
                                  </div>
                                  {milestone.completed && milestone.completedAt && (
                                    <div className="text-xs text-muted-foreground mt-1">
                                      Completed {formatDate(milestone.completedAt)}
                                    </div>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleDeleteMilestone(goal.id, milestone.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))
                          )}
                        </div>
                      </Card>
                    )
                  })}
                </div>
              )}
            </>
          ) : (
            <Card className="p-12 text-center">
              <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Planner Selected</h3>
              <p className="text-sm text-muted-foreground">
                Create a new planner to start setting goals.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
