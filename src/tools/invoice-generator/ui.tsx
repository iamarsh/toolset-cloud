'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Download, FileText, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  createInvoice,
  updateFrom,
  updateTo,
  addItem,
  deleteItem,
  updateTax,
  updateNotes,
  saveInvoice,
  getAllInvoices,
  deleteInvoice as removeInvoice,
  downloadInvoice,
  formatCurrency,
  formatDate,
  type Invoice,
  type InvoiceItem,
} from './logic'

export default function InvoiceGeneratorUI() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null)
  const [taxPercentage, setTaxPercentage] = useState(0)
  const [newItem, setNewItem] = useState({ description: '', quantity: 1, rate: 0 })

  useEffect(() => {
    const loaded = getAllInvoices()
    setInvoices(loaded)
  }, [])

  const handleCreateInvoice = () => {
    const invoice = createInvoice()
    saveInvoice(invoice)
    setInvoices([invoice, ...invoices])
    setActiveInvoice(invoice)
    setTaxPercentage(0)
  }

  const handleUpdateFrom = (field: string, value: string) => {
    if (!activeInvoice) return
    const updated = updateFrom(activeInvoice, { ...activeInvoice.from, [field]: value })
    saveInvoice(updated)
    setActiveInvoice(updated)
    setInvoices(invoices.map((inv: Invoice) => (inv.id === updated.id ? updated : inv)))
  }

  const handleUpdateTo = (field: string, value: string) => {
    if (!activeInvoice) return
    const updated = updateTo(activeInvoice, { ...activeInvoice.to, [field]: value })
    saveInvoice(updated)
    setActiveInvoice(updated)
    setInvoices(invoices.map((inv: Invoice) => (inv.id === updated.id ? updated : inv)))
  }

  const handleAddItem = () => {
    if (!activeInvoice || !newItem.description.trim() || newItem.quantity <= 0 || newItem.rate <= 0) return
    const updated = addItem(activeInvoice, newItem.description, newItem.quantity, newItem.rate)
    saveInvoice(updated)
    setActiveInvoice(updated)
    setInvoices(invoices.map((inv: Invoice) => (inv.id === updated.id ? updated : inv)))
    setNewItem({ description: '', quantity: 1, rate: 0 })
  }

  const handleDeleteItem = (itemId: string) => {
    if (!activeInvoice) return
    const updated = deleteItem(activeInvoice, itemId)
    saveInvoice(updated)
    setActiveInvoice(updated)
    setInvoices(invoices.map((inv: Invoice) => (inv.id === updated.id ? updated : inv)))
  }

  const handleUpdateTax = (percentage: number) => {
    if (!activeInvoice) return
    setTaxPercentage(percentage)
    const updated = updateTax(activeInvoice, percentage)
    saveInvoice(updated)
    setActiveInvoice(updated)
    setInvoices(invoices.map((inv: Invoice) => (inv.id === updated.id ? updated : inv)))
  }

  const handleUpdateNotes = (notes: string) => {
    if (!activeInvoice) return
    const updated = updateNotes(activeInvoice, notes)
    saveInvoice(updated)
    setActiveInvoice(updated)
    setInvoices(invoices.map((inv: Invoice) => (inv.id === updated.id ? updated : inv)))
  }

  const handleDeleteInvoice = (id: string) => {
    removeInvoice(id)
    const updated = invoices.filter((inv: Invoice) => inv.id !== id)
    setInvoices(updated)
    if (activeInvoice?.id === id) {
      setActiveInvoice(null)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Create Invoice */}
      <Card className="p-6">
        <Button onClick={handleCreateInvoice}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Invoice
        </Button>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Invoices Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3">Recent Invoices</h3>
            {invoices.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No invoices yet
              </p>
            ) : (
              <div className="space-y-2">
                {invoices.map((invoice: Invoice) => (
                  <button
                    key={invoice.id}
                    onClick={() => {
                      setActiveInvoice(invoice)
                      setTaxPercentage(invoice.subtotal > 0 ? (invoice.tax / invoice.subtotal) * 100 : 0)
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      activeInvoice?.id === invoice.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    <div className="text-sm font-medium">{invoice.invoiceNumber}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatCurrency(invoice.total)}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 mt-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteInvoice(invoice.id)
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Active Invoice */}
        <div className="lg:col-span-3 space-y-6">
          {activeInvoice ? (
            <>
              {/* Header */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">Invoice {activeInvoice.invoiceNumber}</h2>
                    <div className="text-sm text-muted-foreground mt-1">
                      Date: {formatDate(activeInvoice.date)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Due: {formatDate(activeInvoice.dueDate)}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => downloadInvoice(activeInvoice)}>
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </Card>

              {/* From/To */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 space-y-4">
                  <h3 className="font-semibold">From</h3>
                  <input
                    type="text"
                    value={activeInvoice.from.name}
                    onChange={(e) => handleUpdateFrom('name', e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="email"
                    value={activeInvoice.from.email}
                    onChange={(e) => handleUpdateFrom('email', e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <textarea
                    value={activeInvoice.from.address}
                    onChange={(e) => handleUpdateFrom('address', e.target.value)}
                    placeholder="Your address"
                    className="w-full h-20 px-3 py-2 rounded-md border border-input bg-background text-sm resize-none"
                  />
                </Card>

                <Card className="p-6 space-y-4">
                  <h3 className="font-semibold">Bill To</h3>
                  <input
                    type="text"
                    value={activeInvoice.to.name}
                    onChange={(e) => handleUpdateTo('name', e.target.value)}
                    placeholder="Client name"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="email"
                    value={activeInvoice.to.email}
                    onChange={(e) => handleUpdateTo('email', e.target.value)}
                    placeholder="client@email.com"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <textarea
                    value={activeInvoice.to.address}
                    onChange={(e) => handleUpdateTo('address', e.target.value)}
                    placeholder="Client address"
                    className="w-full h-20 px-3 py-2 rounded-md border border-input bg-background text-sm resize-none"
                  />
                </Card>
              </div>

              {/* Items */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Line Items
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Description"
                    className="md:col-span-2 px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseFloat(e.target.value) || 0 })}
                    placeholder="Qty"
                    min="0"
                    step="0.01"
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                  <input
                    type="number"
                    value={newItem.rate}
                    onChange={(e) => setNewItem({ ...newItem, rate: parseFloat(e.target.value) || 0 })}
                    placeholder="Rate"
                    min="0"
                    step="0.01"
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                </div>
                <Button onClick={handleAddItem}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left text-sm text-muted-foreground">
                        <th className="pb-2">Description</th>
                        <th className="pb-2 w-20">Qty</th>
                        <th className="pb-2 w-28">Rate</th>
                        <th className="pb-2 w-28">Amount</th>
                        <th className="pb-2 w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeInvoice.items.map((item: InvoiceItem) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-2 text-sm">{item.description}</td>
                          <td className="py-2 text-sm">{item.quantity}</td>
                          <td className="py-2 text-sm">{formatCurrency(item.rate)}</td>
                          <td className="py-2 text-sm font-medium">{formatCurrency(item.amount)}</td>
                          <td className="py-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span className="font-medium">{formatCurrency(activeInvoice.subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Tax:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={taxPercentage}
                          onChange={(e) => handleUpdateTax(parseFloat(e.target.value) || 0)}
                          placeholder="0"
                          min="0"
                          max="100"
                          step="0.1"
                          className="w-20 px-2 py-1 rounded-md border border-input bg-background text-sm text-right"
                        />
                        <span>%</span>
                        <span className="font-medium w-20 text-right">{formatCurrency(activeInvoice.tax)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>Total:</span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-5 h-5" />
                        {formatCurrency(activeInvoice.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Notes */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold">Notes</h3>
                <textarea
                  value={activeInvoice.notes}
                  onChange={(e) => handleUpdateNotes(e.target.value)}
                  placeholder="Payment terms, additional notes..."
                  className="w-full h-24 px-3 py-2 rounded-md border border-input bg-background text-sm resize-none"
                />
              </Card>
            </>
          ) : (
            <Card className="p-12 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Invoice Selected</h3>
              <p className="text-sm text-muted-foreground">
                Create a new invoice to get started.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
