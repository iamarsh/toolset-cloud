'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'
import { RefreshCw, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { generateNames, type NameType, type Gender } from './logic'

export default function RandomNameGeneratorTool() {
  const [nameType, setNameType] = useState<NameType>('person')
  const [gender, setGender] = useState<Gender>('any')
  const [count, setCount] = useState<number>(5)
  const [names, setNames] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const generate = () => {
    const generated = generateNames(count, nameType, gender)
    setNames(generated)
  }

  const copyName = (name: string, index: number) => {
    navigator.clipboard.writeText(name)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
    toast.success('Name copied to clipboard')
  }

  const copyAll = () => {
    const text = names.join('\n')
    navigator.clipboard.writeText(text)
    toast.success('All names copied to clipboard')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Controls */}
      <Card className="p-6">
        <div className="space-y-6">
          {/* Name Type */}
          <div className="space-y-3">
            <Label>Name Type</Label>
            <RadioGroup value={nameType} onValueChange={(v) => setNameType(v as NameType)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="person" id="person" />
                <Label htmlFor="person" className="font-normal cursor-pointer">
                  Person Names
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business" id="business" />
                <Label htmlFor="business" className="font-normal cursor-pointer">
                  Business Names
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="username" id="username" />
                <Label htmlFor="username" className="font-normal cursor-pointer">
                  Usernames
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Gender (only for person names) */}
          {nameType === 'person' && (
            <div className="space-y-3">
              <Label>Gender</Label>
              <RadioGroup value={gender} onValueChange={(v) => setGender(v as Gender)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="any" />
                  <Label htmlFor="any" className="font-normal cursor-pointer">
                    Any
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="font-normal cursor-pointer">
                    Male
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="font-normal cursor-pointer">
                    Female
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Count */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Number of Names</Label>
              <span className="text-sm font-medium">{count}</span>
            </div>
            <Slider
              value={[count]}
              onValueChange={(val) => setCount(val[0])}
              min={1}
              max={50}
              step={1}
            />
          </div>

          {/* Generate Button */}
          <Button onClick={generate} className="w-full" size="lg">
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate Names
          </Button>
        </div>
      </Card>

      {/* Results */}
      {names.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Generated Names ({names.length})</h2>
            <Button variant="outline" size="sm" onClick={copyAll}>
              <Copy className="h-4 w-4 mr-2" />
              Copy All
            </Button>
          </div>

          <div className="space-y-2">
            {names.map((name, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors group"
              >
                <span className="font-medium">{name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyName(name, index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedIndex === index ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <strong>Tip:</strong> Click the copy icon next to any name to copy it individually,
          or use &quot;Copy All&quot; to copy all generated names at once.
        </p>
      </Card>
    </div>
  )
}
