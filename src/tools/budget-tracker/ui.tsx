'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Download, DollarSign, TrendingUp, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  createBudget,
  addTransaction,
  deleteTransaction,
  getStats,
  saveBudget,
  getAllBudgets,
  deleteBudget as removeBudget,
  downloadBudget,
  formatCurrency,
  formatDate,
  type Budget,
  type Transaction,
  type TransactionType,
  type Category,
} from './logic'

const CATEGORIES: Category[] = ['Salary', 'Food', 'Transport', 'Entertainment', 'Bills', 'Other']

export default function BudgetTrackerUI() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [activeBudget, setActiveBudget] = useState<Budget | null>(null)
  const [newBudgetName, setNewBudgetName] = useState('')
  const [newBudgetMonth, setNewBudgetMonth] = useState('')
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense' as TransactionType,
    category: 'Food' as Category,
    amount: 0,
    description: '',
    date: '',
  })

  useEffect(() => {
    const loaded = getAllBudgets()
    setBudgets(loaded)
    if (loaded.length > 0) {
      setActiveBudget(loaded[0])
    }
  }, [])

  const handleCreateBudget = () => {
    if (!newBudgetName.trim() || !newBudgetMonth) return

    const budget = createBudget(newBudgetName.trim(), newBudgetMonth)
    saveBudget(budget)
    setBudgets([budget, ...budgets])
    setActiveBudget(budget)
    setNewBudgetName('')
    setNewBudgetMonth('')
  }

  const handleAddTransaction = () => {
    if (!activeBudget || newTransaction.amount <= 0 || !newTransaction.date) return

    const updated = addTransaction(
      activeBudget,
      newTransaction.type,
      newTransaction.category,
      newTransaction.amount,
      newTransaction.description.trim(),
      new Date(newTransaction.date)
    )
    saveBudget(updated)
    setActiveBudget(updated)
    setBudgets(budgets.map((b: Budget) => (b.id === updated.id ? updated : b)))
    setNewTransaction({
      type: 'expense',
      category: 'Food',
      amount: 0,
      description: '',
      date: '',
    })
  }

  const handleDeleteTransaction = (transactionId: string) => {
    if (!activeBudget) return

    const updated = deleteTransaction(activeBudget, transactionId)
    saveBudget(updated)
    setActiveBudget(updated)
    setBudgets(budgets.map((b: Budget) => (b.id === updated.id ? updated : b)))
  }

  const handleDeleteBudget = (id: string) => {
    removeBudget(id)
    const updated = budgets.filter((b: Budget) => b.id !== id)
    setBudgets(updated)
    if (activeBudget?.id === id) {
      setActiveBudget(updated.length > 0 ? updated[0] : null)
    }
  }

  const stats = activeBudget ? getStats(activeBudget) : null

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Create Budget */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Create New Budget</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newBudgetName}
            onChange={(e) => setNewBudgetName(e.target.value)}
            placeholder="Budget name..."
            className="md:col-span-2 px-3 py-2 rounded-md border border-input bg-background text-sm"
          />
          <input
            type="month"
            value={newBudgetMonth}
            onChange={(e) => setNewBudgetMonth(e.target.value)}
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
          />
        </div>
        <Button
          onClick={handleCreateBudget}
          disabled={!newBudgetName.trim() || !newBudgetMonth}
          className="mt-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Budget
        </Button>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budgets Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3">Your Budgets</h3>
            {budgets.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No budgets yet</p>
            ) : (
              <div className="space-y-2">
                {budgets.map((budget: Budget) => {
                  const budgetStats = getStats(budget)
                  return (
                    <button
                      key={budget.id}
                      onClick={() => setActiveBudget(budget)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        activeBudget?.id === budget.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{budget.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">{budget.month}</div>
                          <div
                            className={`text-xs font-medium mt-1 ${
                              budgetStats.balance >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {formatCurrency(budgetStats.balance)}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteBudget(budget.id)
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

        {/* Active Budget */}
        <div className="lg:col-span-2 space-y-6">
          {activeBudget && stats ? (
            <>
              {/* Header */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{activeBudget.name}</h2>
                    <div className="text-sm text-muted-foreground mt-1">{activeBudget.month}</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadBudget(activeBudget)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-green-500/10 text-center">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-600 dark:text-green-400">
                      <TrendingUp className="w-5 h-5" />
                      {formatCurrency(stats.totalIncome)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Income</div>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/10 text-center">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-red-600 dark:text-red-400">
                      <TrendingDown className="w-5 h-5" />
                      {formatCurrency(stats.totalExpenses)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Expenses</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted text-center">
                    <div
                      className={`text-2xl font-bold ${
                        stats.balance >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {formatCurrency(stats.balance)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Balance</div>
                  </div>
                </div>
              </Card>

              {/* Expenses by Category Chart */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Expenses by Category</h3>
                <div className="space-y-3">
                  {Object.entries(stats.expensesByCategory).map(([category, amount]: [string, number]) => {
                    const percentage =
                      stats.totalExpenses > 0 ? (amount / stats.totalExpenses) * 100 : 0
                    return (
                      <div key={category}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{category}</span>
                          <span className="font-medium">{formatCurrency(amount)}</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>

              {/* Add Transaction */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Add Transaction
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={newTransaction.type}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        type: e.target.value as TransactionType,
                      })
                    }
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                  <select
                    value={newTransaction.category}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        category: e.target.value as Category,
                      })
                    }
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  >
                    {CATEGORIES.map((cat: Category) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={newTransaction.amount || ''}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        amount: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="Amount"
                    min="0"
                    step="0.01"
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, date: e.target.value })
                    }
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, description: e.target.value })
                    }
                    placeholder="Description (optional)"
                    className="md:col-span-2 px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                </div>
                <Button
                  onClick={handleAddTransaction}
                  disabled={newTransaction.amount <= 0 || !newTransaction.date}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Transaction
                </Button>
              </Card>

              {/* Transactions List */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Transactions</h3>
                {activeBudget.transactions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No transactions yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {[...activeBudget.transactions]
                      .sort((a: Transaction, b: Transaction) => b.date.getTime() - a.date.getTime())
                      .map((transaction: Transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  transaction.type === 'income' ? 'default' : 'secondary'
                                }
                              >
                                {transaction.type}
                              </Badge>
                              <span className="text-sm font-medium">{transaction.category}</span>
                            </div>
                            {transaction.description && (
                              <div className="text-sm text-muted-foreground mt-1">
                                {transaction.description}
                              </div>
                            )}
                            <div className="text-xs text-muted-foreground mt-1">
                              {formatDate(transaction.date)}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div
                              className={`text-lg font-bold ${
                                transaction.type === 'income'
                                  ? 'text-green-600 dark:text-green-400'
                                  : 'text-red-600 dark:text-red-400'
                              }`}
                            >
                              {transaction.type === 'income' ? '+' : '-'}
                              {formatCurrency(transaction.amount)}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleDeleteTransaction(transaction.id)}
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
              <DollarSign className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Budget Selected</h3>
              <p className="text-sm text-muted-foreground">
                Create a new budget to start tracking your finances.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
