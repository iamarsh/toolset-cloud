'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Check, Download, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  createChecklist,
  addItem,
  toggleItem,
  deleteItem,
  clearCompleted,
  getStats,
  saveChecklist,
  getAllChecklists,
  deleteChecklist as removeChecklist,
  downloadChecklist,
  type Checklist,
} from './logic'

export default function ChecklistMakerUI() {
  const [checklists, setChecklists] = useState<Checklist[]>([])
  const [activeChecklist, setActiveChecklist] = useState<Checklist | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [newItemText, setNewItemText] = useState('')

  // Load checklists on mount
  useEffect(() => {
    const loaded = getAllChecklists()
    setChecklists(loaded)
    if (loaded.length > 0) {
      setActiveChecklist(loaded[0])
    }
  }, [])

  const handleCreateChecklist = () => {
    if (!newTitle.trim()) return

    const checklist = createChecklist(newTitle.trim())
    saveChecklist(checklist)
    setChecklists([checklist, ...checklists])
    setActiveChecklist(checklist)
    setNewTitle('')
  }

  const handleAddItem = () => {
    if (!activeChecklist || !newItemText.trim()) return

    const updated = addItem(activeChecklist, newItemText.trim())
    saveChecklist(updated)
    setActiveChecklist(updated)
    setChecklists(checklists.map((c: Checklist) => (c.id === updated.id ? updated : c)))
    setNewItemText('')
  }

  const handleToggleItem = (itemId: string) => {
    if (!activeChecklist) return

    const updated = toggleItem(activeChecklist, itemId)
    saveChecklist(updated)
    setActiveChecklist(updated)
    setChecklists(checklists.map((c: Checklist) => (c.id === updated.id ? updated : c)))
  }

  const handleDeleteItem = (itemId: string) => {
    if (!activeChecklist) return

    const updated = deleteItem(activeChecklist, itemId)
    saveChecklist(updated)
    setActiveChecklist(updated)
    setChecklists(checklists.map((c: Checklist) => (c.id === updated.id ? updated : c)))
  }

  const handleClearCompleted = () => {
    if (!activeChecklist) return

    const updated = clearCompleted(activeChecklist)
    saveChecklist(updated)
    setActiveChecklist(updated)
    setChecklists(checklists.map((c: Checklist) => (c.id === updated.id ? updated : c)))
  }

  const handleDeleteChecklist = (id: string) => {
    removeChecklist(id)
    const updated = checklists.filter((c: Checklist) => c.id !== id)
    setChecklists(updated)
    if (activeChecklist?.id === id) {
      setActiveChecklist(updated.length > 0 ? updated[0] : null)
    }
  }

  const handleDownload = () => {
    if (!activeChecklist) return
    downloadChecklist(activeChecklist)
  }

  const stats = activeChecklist ? getStats(activeChecklist) : null

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Create New Checklist */}
      <Card className="p-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateChecklist()}
            placeholder="Create a new checklist..."
            className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
          />
          <Button onClick={handleCreateChecklist} disabled={!newTitle.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Create
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checklist Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3">Your Checklists</h3>
            {checklists.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No checklists yet. Create one to get started!
              </p>
            ) : (
              <div className="space-y-2">
                {checklists.map((checklist: Checklist) => {
                  const checklistStats = getStats(checklist)
                  return (
                    <button
                      key={checklist.id}
                      onClick={() => setActiveChecklist(checklist)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        activeChecklist?.id === checklist.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{checklist.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {checklistStats.completed}/{checklistStats.total} completed
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteChecklist(checklist.id)
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

        {/* Active Checklist */}
        <div className="lg:col-span-2">
          {activeChecklist ? (
            <Card className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{activeChecklist.title}</h2>
                  {stats && (
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>{stats.completed} completed</span>
                      <span>{stats.remaining} remaining</span>
                      <Badge variant="secondary">{stats.percentage}%</Badge>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearCompleted}
                    disabled={!stats || stats.completed === 0}
                  >
                    Clear Completed
                  </Button>
                </div>
              </div>

              {/* Add Item */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                  placeholder="Add a new item..."
                  className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
                />
                <Button onClick={handleAddItem} disabled={!newItemText.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {activeChecklist.items.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <List className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No items yet. Add your first task above!</p>
                  </div>
                ) : (
                  activeChecklist.items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        item.completed ? 'bg-muted/50 border-muted' : 'border-border'
                      }`}
                    >
                      <button
                        onClick={() => handleToggleItem(item.id)}
                        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          item.completed
                            ? 'bg-primary border-primary'
                            : 'border-input hover:border-primary'
                        }`}
                      >
                        {item.completed && <Check className="w-3 h-3 text-primary-foreground" />}
                      </button>
                      <span
                        className={`flex-1 text-sm ${
                          item.completed
                            ? 'line-through text-muted-foreground'
                            : 'text-foreground'
                        }`}
                      >
                        {item.text}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <List className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Checklist Selected</h3>
              <p className="text-sm text-muted-foreground">
                Create a new checklist or select one from the sidebar to get started.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Info */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>Features:</strong> Create multiple checklists, track progress, export as
            text files, and auto-save to localStorage.
          </div>
          <div>
            <strong>Keyboard shortcuts:</strong> Press Enter to quickly add items or create
            checklists.
          </div>
        </div>
      </Card>
    </div>
  )
}
