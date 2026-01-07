'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { GitCompare, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { computeDiff, countChanges, type DiffResult } from './logic'

export default function DiffCheckerTool() {
  const [text1, setText1] = useState('Hello World\nThis is line 2\nOriginal text')
  const [text2, setText2] = useState('Hello World\nThis is line 2 modified\nNew text\nAdditional line')
  const [diff, setDiff] = useState<DiffResult[]>([])
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false)

  const handleCompare = () => {
    let processedText1 = text1
    let processedText2 = text2

    if (ignoreWhitespace) {
      processedText1 = text1.replace(/\s+/g, ' ').trim()
      processedText2 = text2.replace(/\s+/g, ' ').trim()
    }

    const result = computeDiff(processedText1, processedText2)
    setDiff(result)
    const changes = countChanges(result)
    toast.success(`Found ${changes.added} additions and ${changes.removed} deletions`)
  }

  const copyDiff = () => {
    const diffText = diff
      .map((d) => {
        const prefix = d.type === 'added' ? '+' : d.type === 'removed' ? '-' : ' '
        return `${prefix} ${d.content}`
      })
      .join('\n')
    navigator.clipboard.writeText(diffText)
    toast.success('Diff copied to clipboard')
  }

  const stats = countChanges(diff)

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <Label>Original Text</Label>
          <Textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter original text..."
            className="mt-2 font-mono text-sm"
            rows={12}
          />
        </Card>

        <Card className="p-6">
          <Label>Modified Text</Label>
          <Textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Enter modified text..."
            className="mt-2 font-mono text-sm"
            rows={12}
          />
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="whitespace"
              checked={ignoreWhitespace}
              onCheckedChange={(checked) => setIgnoreWhitespace(checked as boolean)}
            />
            <Label htmlFor="whitespace" className="font-normal cursor-pointer">
              Ignore whitespace
            </Label>
          </div>

          <Button onClick={handleCompare} size="lg">
            <GitCompare className="h-4 w-4 mr-2" />
            Compare
          </Button>
        </div>
      </Card>

      {diff.length > 0 && (
        <>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-4 text-sm">
                <span className="text-green-600 dark:text-green-400">
                  +{stats.added} additions
                </span>
                <span className="text-red-600 dark:text-red-400">
                  -{stats.removed} deletions
                </span>
                <span className="text-muted-foreground">
                  {stats.unchanged} unchanged
                </span>
              </div>
              <Button onClick={copyDiff} size="sm" variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy Diff
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <Tabs defaultValue="unified">
              <TabsList>
                <TabsTrigger value="unified">Unified View</TabsTrigger>
                <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
              </TabsList>

              <TabsContent value="unified" className="mt-4">
                <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm space-y-1">
                  {diff.map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        'px-2 py-1 rounded',
                        item.type === 'added' && 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200',
                        item.type === 'removed' && 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200',
                        item.type === 'unchanged' && 'text-muted-foreground'
                      )}
                    >
                      <span className="inline-block w-6 text-center">
                        {item.type === 'added' ? '+' : item.type === 'removed' ? '-' : ' '}
                      </span>
                      <span className="ml-2">{item.content || '(empty line)'}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="side-by-side" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm space-y-1">
                    {diff
                      .filter((d) => d.type !== 'added')
                      .map((item, index) => (
                        <div
                          key={index}
                          className={cn(
                            'px-2 py-1 rounded',
                            item.type === 'removed' && 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200'
                          )}
                        >
                          {item.content || '(empty line)'}
                        </div>
                      ))}
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm space-y-1">
                    {diff
                      .filter((d) => d.type !== 'removed')
                      .map((item, index) => (
                        <div
                          key={index}
                          className={cn(
                            'px-2 py-1 rounded',
                            item.type === 'added' && 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200'
                          )}
                        >
                          {item.content || '(empty line)'}
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </>
      )}
    </div>
  )
}
