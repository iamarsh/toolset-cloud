'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card } from '@/components/ui/card'
import { Copy, Wand2 } from 'lucide-react'
import { toast } from 'sonner'
import { formatSQL, type KeywordCase, type IndentType } from './logic'

export default function SQLBeautifierTool() {
  const [input, setInput] = useState('SELECT * FROM users WHERE id = 1 AND status = "active" ORDER BY created_at DESC LIMIT 10')
  const [output, setOutput] = useState('')
  const [keywordCase, setKeywordCase] = useState<KeywordCase>('UPPER')
  const [indentType, setIndentType] = useState<IndentType>('2spaces')

  const handleFormat = () => {
    const formatted = formatSQL(input, { keywordCase, indentType })
    setOutput(formatted)
    toast.success('SQL formatted successfully')
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
    toast.success('Formatted SQL copied to clipboard')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>SQL Query</Label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your SQL query here..."
              className="font-mono mt-2"
              rows={8}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label>Keyword Case</Label>
              <RadioGroup value={keywordCase} onValueChange={(v) => setKeywordCase(v as KeywordCase)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="UPPER" id="upper" />
                  <Label htmlFor="upper" className="font-normal cursor-pointer">UPPERCASE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lower" id="lower" />
                  <Label htmlFor="lower" className="font-normal cursor-pointer">lowercase</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Capitalize" id="capitalize" />
                  <Label htmlFor="capitalize" className="font-normal cursor-pointer">Capitalize</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Indentation</Label>
              <RadioGroup value={indentType} onValueChange={(v) => setIndentType(v as IndentType)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2spaces" id="2spaces" />
                  <Label htmlFor="2spaces" className="font-normal cursor-pointer">2 Spaces</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4spaces" id="4spaces" />
                  <Label htmlFor="4spaces" className="font-normal cursor-pointer">4 Spaces</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tabs" id="tabs" />
                  <Label htmlFor="tabs" className="font-normal cursor-pointer">Tabs</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <Button onClick={handleFormat} className="w-full" size="lg">
            <Wand2 className="h-4 w-4 mr-2" />
            Format SQL
          </Button>
        </div>
      </Card>

      {output && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-3">
            <Label>Formatted SQL</Label>
            <Button onClick={copyOutput} size="sm" variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <pre className="p-4 bg-muted rounded font-mono text-sm overflow-x-auto">
            {output}
          </pre>
        </Card>
      )}
    </div>
  )
}
