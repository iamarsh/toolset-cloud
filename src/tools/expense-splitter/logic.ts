/**
 * Expense Splitter Logic
 * Split expenses among group members and calculate settlements
 */

export interface Member {
  id: string
  name: string
}

export interface Split {
  memberId: string
  amount: number
}

export interface Expense {
  id: string
  description: string
  amount: number
  paidBy: string
  splits: Split[]
  date: Date
  createdAt: Date
}

export interface ExpenseGroup {
  id: string
  name: string
  members: Member[]
  expenses: Expense[]
  createdAt: Date
  updatedAt: Date
}

export interface Settlement {
  from: string
  to: string
  amount: number
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

/**
 * Create a new expense group
 */
export function createExpenseGroup(name: string): ExpenseGroup {
  const now = new Date()
  return {
    id: generateId(),
    name,
    members: [],
    expenses: [],
    createdAt: now,
    updatedAt: now,
  }
}

/**
 * Add member
 */
export function addMember(group: ExpenseGroup, name: string): ExpenseGroup {
  const newMember: Member = {
    id: generateId(),
    name,
  }

  return {
    ...group,
    members: [...group.members, newMember],
    updatedAt: new Date(),
  }
}

/**
 * Remove member
 */
export function removeMember(group: ExpenseGroup, memberId: string): ExpenseGroup {
  return {
    ...group,
    members: group.members.filter((m: Member) => m.id !== memberId),
    updatedAt: new Date(),
  }
}

/**
 * Add expense with equal split
 */
export function addExpenseEqualSplit(
  group: ExpenseGroup,
  description: string,
  amount: number,
  paidBy: string,
  date: Date
): ExpenseGroup {
  const splitAmount = amount / group.members.length
  const splits: Split[] = group.members.map((member: Member) => ({
    memberId: member.id,
    amount: splitAmount,
  }))

  const newExpense: Expense = {
    id: generateId(),
    description,
    amount,
    paidBy,
    splits,
    date,
    createdAt: new Date(),
  }

  return {
    ...group,
    expenses: [...group.expenses, newExpense],
    updatedAt: new Date(),
  }
}

/**
 * Add expense with custom split
 */
export function addExpenseCustomSplit(
  group: ExpenseGroup,
  description: string,
  amount: number,
  paidBy: string,
  splits: Split[],
  date: Date
): ExpenseGroup {
  const newExpense: Expense = {
    id: generateId(),
    description,
    amount,
    paidBy,
    splits,
    date,
    createdAt: new Date(),
  }

  return {
    ...group,
    expenses: [...group.expenses, newExpense],
    updatedAt: new Date(),
  }
}

/**
 * Delete expense
 */
export function deleteExpense(group: ExpenseGroup, expenseId: string): ExpenseGroup {
  return {
    ...group,
    expenses: group.expenses.filter((e: Expense) => e.id !== expenseId),
    updatedAt: new Date(),
  }
}

/**
 * Calculate balances for each member
 */
export function calculateBalances(group: ExpenseGroup): Record<string, number> {
  const balances: Record<string, number> = {}

  // Initialize balances
  group.members.forEach((member: Member) => {
    balances[member.id] = 0
  })

  // Calculate balances based on expenses
  group.expenses.forEach((expense: Expense) => {
    // Add amount paid
    balances[expense.paidBy] = (balances[expense.paidBy] || 0) + expense.amount

    // Subtract splits
    expense.splits.forEach((split: Split) => {
      balances[split.memberId] = (balances[split.memberId] || 0) - split.amount
    })
  })

  return balances
}

/**
 * Calculate settlements (who owes whom)
 */
export function calculateSettlements(group: ExpenseGroup): Settlement[] {
  const balances = calculateBalances(group)
  const settlements: Settlement[] = []

  // Separate creditors and debtors
  const creditors: { id: string; amount: number }[] = []
  const debtors: { id: string; amount: number }[] = []

  Object.entries(balances).forEach(([memberId, balance]: [string, number]) => {
    if (balance > 0.01) {
      creditors.push({ id: memberId, amount: balance })
    } else if (balance < -0.01) {
      debtors.push({ id: memberId, amount: -balance })
    }
  })

  // Sort by amount (descending)
  creditors.sort((a, b) => b.amount - a.amount)
  debtors.sort((a, b) => b.amount - a.amount)

  // Match debtors with creditors
  let i = 0
  let j = 0

  while (i < creditors.length && j < debtors.length) {
    const creditor = creditors[i]
    const debtor = debtors[j]
    const amount = Math.min(creditor.amount, debtor.amount)

    if (amount > 0.01) {
      settlements.push({
        from: debtor.id,
        to: creditor.id,
        amount: Math.round(amount * 100) / 100,
      })
    }

    creditor.amount -= amount
    debtor.amount -= amount

    if (creditor.amount < 0.01) i++
    if (debtor.amount < 0.01) j++
  }

  return settlements
}

/**
 * Get member name by ID
 */
export function getMemberName(group: ExpenseGroup, memberId: string): string {
  const member = group.members.find((m: Member) => m.id === memberId)
  return member?.name || 'Unknown'
}

/**
 * Get total expenses
 */
export function getTotalExpenses(group: ExpenseGroup): number {
  return group.expenses.reduce((sum: number, expense: Expense) => sum + expense.amount, 0)
}

/**
 * Get member statistics
 */
export function getMemberStats(
  group: ExpenseGroup,
  memberId: string
): {
  totalPaid: number
  totalOwed: number
  balance: number
} {
  const balances = calculateBalances(group)
  const totalPaid = group.expenses
    .filter((e: Expense) => e.paidBy === memberId)
    .reduce((sum: number, e: Expense) => sum + e.amount, 0)

  const totalOwed = group.expenses.reduce((sum: number, expense: Expense) => {
    const split = expense.splits.find((s: Split) => s.memberId === memberId)
    return sum + (split?.amount || 0)
  }, 0)

  return {
    totalPaid,
    totalOwed,
    balance: balances[memberId] || 0,
  }
}

/**
 * Save expense group to localStorage
 */
export function saveExpenseGroup(group: ExpenseGroup): void {
  localStorage.setItem(`expensegroup-${group.id}`, JSON.stringify(group))
}

/**
 * Load expense group from localStorage
 */
export function loadExpenseGroup(id: string): ExpenseGroup | null {
  try {
    const data = localStorage.getItem(`expensegroup-${id}`)
    if (!data) return null

    const group = JSON.parse(data) as ExpenseGroup
    // Convert date strings back to Date objects
    group.createdAt = new Date(group.createdAt)
    group.updatedAt = new Date(group.updatedAt)
    group.expenses = group.expenses.map((e: Expense) => ({
      ...e,
      date: new Date(e.date),
      createdAt: new Date(e.createdAt),
    }))

    return group
  } catch {
    return null
  }
}

/**
 * Get all expense groups
 */
export function getAllExpenseGroups(): ExpenseGroup[] {
  const groups: ExpenseGroup[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('expensegroup-')) {
      const id = key.replace('expensegroup-', '')
      const group = loadExpenseGroup(id)
      if (group) groups.push(group)
    }
  }

  return groups.sort((a: ExpenseGroup, b: ExpenseGroup) =>
    b.updatedAt.getTime() - a.updatedAt.getTime()
  )
}

/**
 * Delete expense group
 */
export function deleteExpenseGroup(id: string): void {
  localStorage.removeItem(`expensegroup-${id}`)
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
 * Export expense group as text
 */
export function exportAsText(group: ExpenseGroup): string {
  let text = `${group.name.toUpperCase()}\n`
  text += '='.repeat(group.name.length) + '\n\n'

  text += `MEMBERS\n-------\n`
  group.members.forEach((member: Member) => {
    const stats = getMemberStats(group, member.id)
    text += `${member.name}: Balance ${formatCurrency(stats.balance)}\n`
  })
  text += '\n'

  text += `EXPENSES\n--------\n`
  group.expenses.forEach((expense: Expense) => {
    text += `${formatDate(expense.date)} | ${expense.description}\n`
    text += `Amount: ${formatCurrency(expense.amount)} | Paid by: ${getMemberName(group, expense.paidBy)}\n`
    text += 'Split:\n'
    expense.splits.forEach((split: Split) => {
      text += `  ${getMemberName(group, split.memberId)}: ${formatCurrency(split.amount)}\n`
    })
    text += '\n'
  })

  text += `SETTLEMENTS\n-----------\n`
  const settlements = calculateSettlements(group)
  if (settlements.length === 0) {
    text += 'All settled up!\n'
  } else {
    settlements.forEach((settlement: Settlement) => {
      text += `${getMemberName(group, settlement.from)} owes ${getMemberName(group, settlement.to)} ${formatCurrency(settlement.amount)}\n`
    })
  }

  return text
}

/**
 * Download expense group as text file
 */
export function downloadExpenseGroup(group: ExpenseGroup): void {
  const text = exportAsText(group)
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${group.name.toLowerCase().replace(/\s+/g, '-')}-expenses.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
