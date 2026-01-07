'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Calendar } from 'lucide-react'
import { toast } from 'sonner'
import {
  type CronFields,
  buildCronExpression,
  parseCronExpression,
  describeCronExpression,
  calculateNextRuns,
  cronPresets,
} from './logic'

export default function CronExpressionGeneratorTool() {
  const [fields, setFields] = useState<CronFields>({
    minute: '0',
    hour: '0',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*',
  })
  const [expression, setExpression] = useState('')
  const [description, setDescription] = useState('')
  const [nextRuns, setNextRuns] = useState<Date[]>([])

  useEffect(() => {
    const expr = buildCronExpression(fields)
    setExpression(expr)
    setDescription(describeCronExpression(expr))
    setNextRuns(calculateNextRuns(expr, 5))
  }, [fields])

  const updateField = (field: keyof CronFields, value: string) => {
    setFields({ ...fields, [field]: value })
  }

  const loadPreset = (presetExpression: string) => {
    const parsed = parseCronExpression(presetExpression)
    if (parsed) {
      setFields(parsed)
    }
  }

  const copyExpression = () => {
    navigator.clipboard.writeText(expression)
    toast.success('Cron expression copied')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Visual Builder */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Visual Schedule Builder</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label>Minute</Label>
            <Input
              value={fields.minute}
              onChange={(e) => updateField('minute', e.target.value)}
              placeholder="0-59 or *"
            />
            <p className="text-xs text-muted-foreground">0-59, *, */5</p>
          </div>

          <div className="space-y-2">
            <Label>Hour</Label>
            <Input
              value={fields.hour}
              onChange={(e) => updateField('hour', e.target.value)}
              placeholder="0-23 or *"
            />
            <p className="text-xs text-muted-foreground">0-23, *, */2</p>
          </div>

          <div className="space-y-2">
            <Label>Day of Month</Label>
            <Input
              value={fields.dayOfMonth}
              onChange={(e) => updateField('dayOfMonth', e.target.value)}
              placeholder="1-31 or *"
            />
            <p className="text-xs text-muted-foreground">1-31, *</p>
          </div>

          <div className="space-y-2">
            <Label>Month</Label>
            <Input
              value={fields.month}
              onChange={(e) => updateField('month', e.target.value)}
              placeholder="1-12 or *"
            />
            <p className="text-xs text-muted-foreground">1-12, *</p>
          </div>

          <div className="space-y-2">
            <Label>Day of Week</Label>
            <Input
              value={fields.dayOfWeek}
              onChange={(e) => updateField('dayOfWeek', e.target.value)}
              placeholder="0-6 or *"
            />
            <p className="text-xs text-muted-foreground">0-6, *, 1-5</p>
          </div>
        </div>
      </Card>

      {/* Generated Expression */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Cron Expression</Label>
            <div className="flex gap-2">
              <Input value={expression} readOnly className="font-mono" />
              <Button variant="outline" onClick={copyExpression}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Description</Label>
            <p className="text-sm p-3 rounded-lg bg-muted">{description}</p>
          </div>
        </div>
      </Card>

      {/* Next Run Times */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Next 5 Run Times
        </h2>

        <div className="space-y-2">
          {nextRuns.length > 0 ? (
            nextRuns.map((date, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border bg-card/50 text-sm"
              >
                {date.toLocaleString()}
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Unable to calculate next runs
            </p>
          )}
        </div>
      </Card>

      {/* Common Patterns */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Common Patterns</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cronPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadPreset(preset.expression)}
              className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors text-left"
            >
              <div className="font-medium mb-1">{preset.name}</div>
              <div className="text-xs text-muted-foreground mb-2">{preset.description}</div>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                {preset.expression}
              </code>
            </button>
          ))}
        </div>
      </Card>

      {/* Help */}
      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <strong>Cron Syntax:</strong> Use <code>*</code> for any value, numbers for specific values,
          <code>*/n</code> for every nth value, and <code>-</code> for ranges (e.g., 1-5 for Mon-Fri).
        </p>
      </Card>
    </div>
  )
}
