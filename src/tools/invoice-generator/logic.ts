/**
 * Invoice Generator Logic
 * Create professional invoices with line items
 */

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  date: Date
  dueDate: Date
  from: {
    name: string
    email: string
    address: string
  }
  to: {
    name: string
    email: string
    address: string
  }
  items: InvoiceItem[]
  notes: string
  subtotal: number
  tax: number
  total: number
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
 * Generate invoice number
 */
export function generateInvoiceNumber(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')
  return `INV-${year}${month}-${random}`
}

/**
 * Create a new invoice
 */
export function createInvoice(): Invoice {
  const now = new Date()
  const dueDate = new Date(now)
  dueDate.setDate(dueDate.getDate() + 30)

  return {
    id: generateId(),
    invoiceNumber: generateInvoiceNumber(),
    date: now,
    dueDate,
    from: {
      name: '',
      email: '',
      address: '',
    },
    to: {
      name: '',
      email: '',
      address: '',
    },
    items: [],
    notes: '',
    subtotal: 0,
    tax: 0,
    total: 0,
    createdAt: now,
    updatedAt: now,
  }
}

/**
 * Update sender information
 */
export function updateFrom(
  invoice: Invoice,
  from: { name: string; email: string; address: string }
): Invoice {
  return {
    ...invoice,
    from,
    updatedAt: new Date(),
  }
}

/**
 * Update recipient information
 */
export function updateTo(
  invoice: Invoice,
  to: { name: string; email: string; address: string }
): Invoice {
  return {
    ...invoice,
    to,
    updatedAt: new Date(),
  }
}

/**
 * Add line item
 */
export function addItem(
  invoice: Invoice,
  description: string,
  quantity: number,
  rate: number
): Invoice {
  const amount = quantity * rate
  const newItem: InvoiceItem = {
    id: generateId(),
    description,
    quantity,
    rate,
    amount,
  }

  const items = [...invoice.items, newItem]
  return recalculateTotals({ ...invoice, items, updatedAt: new Date() })
}

/**
 * Update line item
 */
export function updateItem(
  invoice: Invoice,
  itemId: string,
  description: string,
  quantity: number,
  rate: number
): Invoice {
  const items = invoice.items.map((item: InvoiceItem) =>
    item.id === itemId
      ? { ...item, description, quantity, rate, amount: quantity * rate }
      : item
  )

  return recalculateTotals({ ...invoice, items, updatedAt: new Date() })
}

/**
 * Delete line item
 */
export function deleteItem(invoice: Invoice, itemId: string): Invoice {
  const items = invoice.items.filter((item: InvoiceItem) => item.id !== itemId)
  return recalculateTotals({ ...invoice, items, updatedAt: new Date() })
}

/**
 * Update tax percentage
 */
export function updateTax(invoice: Invoice, taxPercentage: number): Invoice {
  const subtotal = invoice.items.reduce(
    (sum: number, item: InvoiceItem) => sum + item.amount,
    0
  )
  const tax = subtotal * (taxPercentage / 100)
  const total = subtotal + tax

  return {
    ...invoice,
    subtotal,
    tax,
    total,
    updatedAt: new Date(),
  }
}

/**
 * Recalculate totals
 */
function recalculateTotals(invoice: Invoice): Invoice {
  const subtotal = invoice.items.reduce(
    (sum: number, item: InvoiceItem) => sum + item.amount,
    0
  )
  const taxPercentage = invoice.subtotal > 0 ? (invoice.tax / invoice.subtotal) * 100 : 0
  const tax = subtotal * (taxPercentage / 100)
  const total = subtotal + tax

  return {
    ...invoice,
    subtotal,
    tax,
    total,
  }
}

/**
 * Update notes
 */
export function updateNotes(invoice: Invoice, notes: string): Invoice {
  return {
    ...invoice,
    notes,
    updatedAt: new Date(),
  }
}

/**
 * Save invoice to localStorage
 */
export function saveInvoice(invoice: Invoice): void {
  localStorage.setItem(`invoice-${invoice.id}`, JSON.stringify(invoice))
}

/**
 * Load invoice from localStorage
 */
export function loadInvoice(id: string): Invoice | null {
  try {
    const data = localStorage.getItem(`invoice-${id}`)
    if (!data) return null

    const invoice = JSON.parse(data) as Invoice
    // Convert date strings back to Date objects
    invoice.date = new Date(invoice.date)
    invoice.dueDate = new Date(invoice.dueDate)
    invoice.createdAt = new Date(invoice.createdAt)
    invoice.updatedAt = new Date(invoice.updatedAt)

    return invoice
  } catch {
    return null
  }
}

/**
 * Get all invoices
 */
export function getAllInvoices(): Invoice[] {
  const invoices: Invoice[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('invoice-')) {
      const id = key.replace('invoice-', '')
      const invoice = loadInvoice(id)
      if (invoice) invoices.push(invoice)
    }
  }

  return invoices.sort((a: Invoice, b: Invoice) => b.date.getTime() - a.date.getTime())
}

/**
 * Delete invoice
 */
export function deleteInvoice(id: string): void {
  localStorage.removeItem(`invoice-${id}`)
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
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Export invoice as text
 */
export function exportAsText(invoice: Invoice): string {
  let text = `INVOICE\n`
  text += `Invoice #: ${invoice.invoiceNumber}\n`
  text += `Date: ${formatDate(invoice.date)}\n`
  text += `Due Date: ${formatDate(invoice.dueDate)}\n\n`

  text += `FROM:\n${invoice.from.name}\n${invoice.from.email}\n${invoice.from.address}\n\n`
  text += `TO:\n${invoice.to.name}\n${invoice.to.email}\n${invoice.to.address}\n\n`

  text += `ITEMS:\n`
  text += `${'Description'.padEnd(40)} ${'Qty'.padEnd(8)} ${'Rate'.padEnd(12)} ${'Amount'.padEnd(12)}\n`
  text += '='.repeat(76) + '\n'

  invoice.items.forEach((item: InvoiceItem) => {
    text += `${item.description.padEnd(40)} `
    text += `${item.quantity.toString().padEnd(8)} `
    text += `${formatCurrency(item.rate).padEnd(12)} `
    text += `${formatCurrency(item.amount).padEnd(12)}\n`
  })

  text += '\n'
  text += `Subtotal: ${formatCurrency(invoice.subtotal)}\n`
  text += `Tax: ${formatCurrency(invoice.tax)}\n`
  text += `Total: ${formatCurrency(invoice.total)}\n\n`

  if (invoice.notes) {
    text += `Notes:\n${invoice.notes}\n`
  }

  return text
}

/**
 * Download invoice as text file
 */
export function downloadInvoice(invoice: Invoice): void {
  const text = exportAsText(invoice)
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${invoice.invoiceNumber}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
