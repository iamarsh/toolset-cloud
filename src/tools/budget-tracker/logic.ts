/**
 * Budget Tracker Logic
 * Track income and expenses by category
 */

export type TransactionType = 'income' | 'expense'
export type Category = 'Salary' | 'Food' | 'Transport' | 'Entertainment' | 'Bills' | 'Other'

export interface Transaction {
  id: string
  type: TransactionType
  category: Category
  amount: number
  description: string
  date: Date
  createdAt: Date
}

export interface Budget {
  id: string
  name: string
  month: string
  transactions: Transaction[]
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
 * Create a new budget
 */
export function createBudget(name: string, month: string): Budget {
  const now = new Date()
  return {
    id: generateId(),
    name,
    month,
    transactions: [],
    createdAt: now,
    updatedAt: now,
  }
}

/**
 * Add transaction
 */
export function addTransaction(
  budget: Budget,
  type: TransactionType,
  category: Category,
  amount: number,
  description: string,
  date: Date
): Budget {
  const newTransaction: Transaction = {
    id: generateId(),
    type,
    category,
    amount,
    description,
    date,
    createdAt: new Date(),
  }

  return {
    ...budget,
    transactions: [...budget.transactions, newTransaction],
    updatedAt: new Date(),
  }
}

/**
 * Delete transaction
 */
export function deleteTransaction(budget: Budget, transactionId: string): Budget {
  return {
    ...budget,
    transactions: budget.transactions.filter((t: Transaction) => t.id !== transactionId),
    updatedAt: new Date(),
  }
}

/**
 * Calculate total income
 */
export function getTotalIncome(budget: Budget): number {
  return budget.transactions
    .filter((t: Transaction) => t.type === 'income')
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0)
}

/**
 * Calculate total expenses
 */
export function getTotalExpenses(budget: Budget): number {
  return budget.transactions
    .filter((t: Transaction) => t.type === 'expense')
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0)
}

/**
 * Calculate balance
 */
export function getBalance(budget: Budget): number {
  return getTotalIncome(budget) - getTotalExpenses(budget)
}

/**
 * Get expenses by category
 */
export function getExpensesByCategory(budget: Budget): Record<Category, number> {
  const categories: Record<Category, number> = {
    Salary: 0,
    Food: 0,
    Transport: 0,
    Entertainment: 0,
    Bills: 0,
    Other: 0,
  }

  budget.transactions
    .filter((t: Transaction) => t.type === 'expense')
    .forEach((t: Transaction) => {
      categories[t.category] += t.amount
    })

  return categories
}

/**
 * Get statistics
 */
export function getStats(budget: Budget): {
  totalIncome: number
  totalExpenses: number
  balance: number
  transactionCount: number
  expensesByCategory: Record<Category, number>
} {
  return {
    totalIncome: getTotalIncome(budget),
    totalExpenses: getTotalExpenses(budget),
    balance: getBalance(budget),
    transactionCount: budget.transactions.length,
    expensesByCategory: getExpensesByCategory(budget),
  }
}

/**
 * Save budget to localStorage
 */
export function saveBudget(budget: Budget): void {
  localStorage.setItem(`budget-${budget.id}`, JSON.stringify(budget))
}

/**
 * Load budget from localStorage
 */
export function loadBudget(id: string): Budget | null {
  try {
    const data = localStorage.getItem(`budget-${id}`)
    if (!data) return null

    const budget = JSON.parse(data) as Budget
    // Convert date strings back to Date objects
    budget.createdAt = new Date(budget.createdAt)
    budget.updatedAt = new Date(budget.updatedAt)
    budget.transactions = budget.transactions.map((t: Transaction) => ({
      ...t,
      date: new Date(t.date),
      createdAt: new Date(t.createdAt),
    }))

    return budget
  } catch {
    return null
  }
}

/**
 * Get all budgets
 */
export function getAllBudgets(): Budget[] {
  const budgets: Budget[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('budget-')) {
      const id = key.replace('budget-', '')
      const budget = loadBudget(id)
      if (budget) budgets.push(budget)
    }
  }

  return budgets.sort((a: Budget, b: Budget) => b.updatedAt.getTime() - a.updatedAt.getTime())
}

/**
 * Delete budget
 */
export function deleteBudget(id: string): void {
  localStorage.removeItem(`budget-${id}`)
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

/**
 * Format date
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Export budget as text
 */
export function exportAsText(budget: Budget): string {
  let text = `${budget.name.toUpperCase()}\n`
  text += '='.repeat(budget.name.length) + '\n\n'
  text += `Month: ${budget.month}\n\n`

  const stats = getStats(budget)
  text += `SUMMARY\n-------\n`
  text += `Total Income: ${formatCurrency(stats.totalIncome)}\n`
  text += `Total Expenses: ${formatCurrency(stats.totalExpenses)}\n`
  text += `Balance: ${formatCurrency(stats.balance)}\n\n`

  text += `EXPENSES BY CATEGORY\n--------------------\n`
  Object.entries(stats.expensesByCategory).forEach(([category, amount]: [string, number]) => {
    if (amount > 0) {
      text += `${category}: ${formatCurrency(amount)}\n`
    }
  })
  text += '\n'

  text += `TRANSACTIONS\n------------\n`
  const sortedTransactions = [...budget.transactions].sort(
    (a: Transaction, b: Transaction) => b.date.getTime() - a.date.getTime()
  )

  sortedTransactions.forEach((t: Transaction) => {
    text += `${formatDate(t.date)} | ${t.type.toUpperCase()} | ${t.category} | ${formatCurrency(t.amount)}\n`
    if (t.description) text += `  ${t.description}\n`
  })

  return text
}

/**
 * Download budget as text file
 */
export function downloadBudget(budget: Budget): void {
  const text = exportAsText(budget)
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${budget.name.toLowerCase().replace(/\s+/g, '-')}-${budget.month}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
