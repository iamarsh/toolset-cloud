'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Download, Users, DollarSign, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  createExpenseGroup,
  addMember,
  removeMember,
  addExpenseEqualSplit,
  addExpenseCustomSplit,
  deleteExpense,
  calculateSettlements,
  getMemberName,
  getTotalExpenses,
  getMemberStats,
  saveExpenseGroup,
  getAllExpenseGroups,
  deleteExpenseGroup as removeExpenseGroup,
  downloadExpenseGroup,
  formatCurrency,
  formatDate,
  type ExpenseGroup,
  type Member,
  type Expense,
  type Split,
  type Settlement,
} from './logic'

export default function ExpenseSplitterUI() {
  const [groups, setGroups] = useState<ExpenseGroup[]>([])
  const [activeGroup, setActiveGroup] = useState<ExpenseGroup | null>(null)
  const [newGroupName, setNewGroupName] = useState('')
  const [newMemberName, setNewMemberName] = useState('')
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: 0,
    paidBy: '',
    date: '',
    splitType: 'equal' as 'equal' | 'custom',
  })
  const [customSplits, setCustomSplits] = useState<Record<string, number>>({})

  useEffect(() => {
    const loaded = getAllExpenseGroups()
    setGroups(loaded)
    if (loaded.length > 0) {
      setActiveGroup(loaded[0])
    }
  }, [])

  useEffect(() => {
    if (activeGroup) {
      const splits: Record<string, number> = {}
      activeGroup.members.forEach((member: Member) => {
        splits[member.id] = 0
      })
      setCustomSplits(splits)
    }
  }, [activeGroup])

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return

    const group = createExpenseGroup(newGroupName.trim())
    saveExpenseGroup(group)
    setGroups([group, ...groups])
    setActiveGroup(group)
    setNewGroupName('')
  }

  const handleAddMember = () => {
    if (!activeGroup || !newMemberName.trim()) return

    const updated = addMember(activeGroup, newMemberName.trim())
    saveExpenseGroup(updated)
    setActiveGroup(updated)
    setGroups(groups.map((g: ExpenseGroup) => (g.id === updated.id ? updated : g)))
    setNewMemberName('')
  }

  const handleRemoveMember = (memberId: string) => {
    if (!activeGroup) return

    const updated = removeMember(activeGroup, memberId)
    saveExpenseGroup(updated)
    setActiveGroup(updated)
    setGroups(groups.map((g: ExpenseGroup) => (g.id === updated.id ? updated : g)))
  }

  const handleAddExpense = () => {
    if (
      !activeGroup ||
      !newExpense.description.trim() ||
      newExpense.amount <= 0 ||
      !newExpense.paidBy ||
      !newExpense.date
    )
      return

    let updated: ExpenseGroup

    if (newExpense.splitType === 'equal') {
      updated = addExpenseEqualSplit(
        activeGroup,
        newExpense.description.trim(),
        newExpense.amount,
        newExpense.paidBy,
        new Date(newExpense.date)
      )
    } else {
      const splits: Split[] = Object.entries(customSplits)
        .filter(([, amount]: [string, number]) => amount > 0)
        .map(([memberId, amount]: [string, number]) => ({ memberId, amount }))

      updated = addExpenseCustomSplit(
        activeGroup,
        newExpense.description.trim(),
        newExpense.amount,
        newExpense.paidBy,
        splits,
        new Date(newExpense.date)
      )
    }

    saveExpenseGroup(updated)
    setActiveGroup(updated)
    setGroups(groups.map((g: ExpenseGroup) => (g.id === updated.id ? updated : g)))
    setNewExpense({
      description: '',
      amount: 0,
      paidBy: '',
      date: '',
      splitType: 'equal',
    })
  }

  const handleDeleteExpense = (expenseId: string) => {
    if (!activeGroup) return

    const updated = deleteExpense(activeGroup, expenseId)
    saveExpenseGroup(updated)
    setActiveGroup(updated)
    setGroups(groups.map((g: ExpenseGroup) => (g.id === updated.id ? updated : g)))
  }

  const handleDeleteGroup = (id: string) => {
    removeExpenseGroup(id)
    const updated = groups.filter((g: ExpenseGroup) => g.id !== id)
    setGroups(updated)
    if (activeGroup?.id === id) {
      setActiveGroup(updated.length > 0 ? updated[0] : null)
    }
  }

  const settlements = activeGroup ? calculateSettlements(activeGroup) : []

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Create Group */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Create New Group</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Group name..."
            className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
          />
          <Button onClick={handleCreateGroup} disabled={!newGroupName.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Create Group
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Groups Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3">Your Groups</h3>
            {groups.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No groups yet</p>
            ) : (
              <div className="space-y-2">
                {groups.map((group: ExpenseGroup) => (
                  <button
                    key={group.id}
                    onClick={() => setActiveGroup(group)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      activeGroup?.id === group.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{group.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {group.members.length} members • {group.expenses.length} expenses
                        </div>
                        <div className="text-xs font-medium mt-1">
                          {formatCurrency(getTotalExpenses(group))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteGroup(group.id)
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

        {/* Active Group */}
        <div className="lg:col-span-2 space-y-6">
          {activeGroup ? (
            <>
              {/* Header */}
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{activeGroup.name}</h2>
                    <div className="text-sm text-muted-foreground mt-1">
                      Total: {formatCurrency(getTotalExpenses(activeGroup))}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadExpenseGroup(activeGroup)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </Card>

              {/* Members */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Members
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddMember()}
                    placeholder="Add member..."
                    className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <Button onClick={handleAddMember} disabled={!newMemberName.trim()}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {activeGroup.members.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No members added
                    </p>
                  ) : (
                    activeGroup.members.map((member: Member) => {
                      const stats = getMemberStats(activeGroup, member.id)
                      return (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div className="flex-1">
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Paid: {formatCurrency(stats.totalPaid)} • Owes:{' '}
                              {formatCurrency(stats.totalOwed)}
                            </div>
                            <div
                              className={`text-sm font-medium ${
                                stats.balance >= 0 ? 'text-green-600' : 'text-red-600'
                              }`}
                            >
                              Balance: {formatCurrency(stats.balance)}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )
                    })
                  )}
                </div>
              </Card>

              {/* Add Expense */}
              {activeGroup.members.length > 0 && (
                <Card className="p-6 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Add Expense
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={newExpense.description}
                      onChange={(e) =>
                        setNewExpense({ ...newExpense, description: e.target.value })
                      }
                      placeholder="Description"
                      className="md:col-span-2 px-3 py-2 rounded-md border border-input bg-background text-sm"
                    />
                    <input
                      type="number"
                      value={newExpense.amount || ''}
                      onChange={(e) =>
                        setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })
                      }
                      placeholder="Amount"
                      min="0"
                      step="0.01"
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                    />
                    <select
                      value={newExpense.paidBy}
                      onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="">Paid by...</option>
                      {activeGroup.members.map((member: Member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                    />
                    <select
                      value={newExpense.splitType}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          splitType: e.target.value as 'equal' | 'custom',
                        })
                      }
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="equal">Split Equally</option>
                      <option value="custom">Custom Split</option>
                    </select>
                  </div>

                  {newExpense.splitType === 'custom' && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Custom Split Amounts:</div>
                      {activeGroup.members.map((member: Member) => (
                        <div key={member.id} className="flex items-center gap-2">
                          <label className="flex-1 text-sm">{member.name}</label>
                          <input
                            type="number"
                            value={customSplits[member.id] || 0}
                            onChange={(e) =>
                              setCustomSplits({
                                ...customSplits,
                                [member.id]: parseFloat(e.target.value) || 0,
                              })
                            }
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className="w-32 px-3 py-2 rounded-md border border-input bg-background text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <Button
                    onClick={handleAddExpense}
                    disabled={
                      !newExpense.description.trim() ||
                      newExpense.amount <= 0 ||
                      !newExpense.paidBy ||
                      !newExpense.date
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Expense
                  </Button>
                </Card>
              )}

              {/* Settlements */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Who Owes Whom</h3>
                {settlements.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-lg font-medium text-green-600">All Settled Up!</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Everyone has paid their share
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {settlements.map((settlement: Settlement, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg border bg-muted/30"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Badge variant="secondary">
                            {getMemberName(activeGroup, settlement.from)}
                          </Badge>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          <Badge variant="default">
                            {getMemberName(activeGroup, settlement.to)}
                          </Badge>
                        </div>
                        <div className="text-lg font-bold text-primary">
                          {formatCurrency(settlement.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Expenses List */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Expenses</h3>
                {activeGroup.expenses.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No expenses yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {[...activeGroup.expenses]
                      .sort((a: Expense, b: Expense) => b.date.getTime() - a.date.getTime())
                      .map((expense: Expense) => (
                        <div key={expense.id} className="p-4 rounded-lg border">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="font-medium">{expense.description}</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Paid by {getMemberName(activeGroup, expense.paidBy)} •{' '}
                                {formatDate(expense.date)}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-lg font-bold">
                                {formatCurrency(expense.amount)}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleDeleteExpense(expense.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Split:{' '}
                            {expense.splits
                              .map(
                                (split: Split) =>
                                  `${getMemberName(activeGroup, split.memberId)} (${formatCurrency(split.amount)})`
                              )
                              .join(', ')}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </Card>
            </>
          ) : (
            <Card className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Group Selected</h3>
              <p className="text-sm text-muted-foreground">
                Create a new group to start splitting expenses.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
