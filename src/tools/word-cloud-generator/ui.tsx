'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Cloud, Download } from 'lucide-react'
import { toast } from 'sonner'
import { analyzeText, generatePosition, type WordFrequency } from './logic'

const COLOR_SCHEMES = {
  default: ['#667eea', '#764ba2', '#f093fb', '#4facfe'],
  warm: ['#fa709a', '#fee140', '#ff6b6b', '#feca57'],
  cool: ['#0abde3', '#48dbfb', '#00d2d3', '#1dd1a1'],
  monochrome: ['#2d3436', '#636e72', '#b2bec3', '#dfe6e9'],
}

export default function WordCloudGeneratorTool() {
  const [text, setText] = useState('word cloud generator text analysis visualization frequency words display create beautiful interactive')
  const [maxWords, setMaxWords] = useState<number>(50)
  const [removeStopWords, setRemoveStopWords] = useState(true)
  const [colorScheme, setColorScheme] = useState<keyof typeof COLOR_SCHEMES>('default')
  const [words, setWords] = useState<WordFrequency[]>([])
  const canvasRef = useRef<HTMLDivElement>(null)

  const generate = () => {
    const analyzed = analyzeText(text, maxWords, removeStopWords)
    setWords(analyzed)
    toast.success(`Generated cloud with ${analyzed.length} words`)
  }

  const downloadPNG = () => {
    if (!canvasRef.current) return

    // This is simplified - actual implementation would use html2canvas or similar
    toast.info('PNG export would require additional library (html2canvas)')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Text Input</Label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here..."
              className="mt-2"
              rows={6}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Maximum Words</Label>
              <span className="text-sm font-medium">{maxWords}</span>
            </div>
            <Slider
              value={[maxWords]}
              onValueChange={(val) => setMaxWords(val[0])}
              min={10}
              max={200}
              step={10}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="stopwords"
              checked={removeStopWords}
              onCheckedChange={(checked) => setRemoveStopWords(checked as boolean)}
            />
            <Label htmlFor="stopwords" className="font-normal cursor-pointer">
              Remove stop words (the, and, of, etc.)
            </Label>
          </div>

          <div className="space-y-2">
            <Label>Color Scheme</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.keys(COLOR_SCHEMES).map((scheme) => (
                <button
                  key={scheme}
                  onClick={() => setColorScheme(scheme as keyof typeof COLOR_SCHEMES)}
                  className={`p-3 rounded-lg border-2 ${
                    colorScheme === scheme ? 'border-primary' : 'border-transparent'
                  } hover:border-primary/50 transition-colors`}
                >
                  <div className="flex gap-1 h-6">
                    {COLOR_SCHEMES[scheme as keyof typeof COLOR_SCHEMES].map((color, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="text-xs mt-2 capitalize">{scheme}</div>
                </button>
              ))}
            </div>
          </div>

          <Button onClick={generate} className="w-full" size="lg">
            <Cloud className="h-4 w-4 mr-2" />
            Generate Word Cloud
          </Button>
        </div>
      </Card>

      {words.length > 0 && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Word Cloud</h2>
            <Button onClick={downloadPNG} size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export PNG
            </Button>
          </div>

          <div
            ref={canvasRef}
            className="relative w-full h-96 bg-muted/30 rounded-lg border overflow-hidden"
          >
            {words.map((word, index) => {
              const pos = generatePosition(index, words.length)
              const color = COLOR_SCHEMES[colorScheme][index % COLOR_SCHEMES[colorScheme].length]

              return (
                <div
                  key={index}
                  className="absolute font-bold whitespace-nowrap"
                  style={{
                    fontSize: `${word.size}px`,
                    color,
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`,
                  }}
                >
                  {word.word}
                </div>
              )
            })}
          </div>

          <div className="mt-4 p-3 bg-muted/50 rounded text-sm">
            <strong>Word Frequencies:</strong>
            <div className="mt-2 flex flex-wrap gap-2">
              {words.slice(0, 10).map((word) => (
                <span key={word.word} className="text-xs">
                  {word.word} ({word.count})
                </span>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
