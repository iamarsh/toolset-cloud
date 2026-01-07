'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, FileSearch } from 'lucide-react'
import { toast } from 'sonner'
import { calculateSimilarity, getSimilarityLevel, highlightMatches, type SimilarityResult } from './logic'

export default function PlagiarismCheckerTool() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [result, setResult] = useState<SimilarityResult | null>(null)

  const handleCheck = () => {
    if (!text1.trim() || !text2.trim()) {
      toast.error('Please enter text in both fields')
      return
    }

    const similarity = calculateSimilarity(text1, text2)
    setResult(similarity)
    toast.success(`Analysis complete: ${similarity.similarity}% similarity`)
  }

  const level = result ? getSimilarityLevel(result.similarity) : null

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Card className="p-6 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800 dark:text-amber-200">
            <p className="font-medium mb-1">Important Note</p>
            <p>
              This tool compares text similarity between two documents. It does NOT search the web
              for plagiarism. For comprehensive plagiarism detection, use specialized services that
              check against online databases.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <Label>Text 1 (Original)</Label>
          <Textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter the first text..."
            className="mt-2 font-mono text-sm"
            rows={12}
          />
          <p className="text-xs text-muted-foreground mt-2">
            {text1.split(/\s+/).filter((w) => w.length > 0).length} words, {text1.length} characters
          </p>
        </Card>

        <Card className="p-6">
          <Label>Text 2 (Compare)</Label>
          <Textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Enter the second text..."
            className="mt-2 font-mono text-sm"
            rows={12}
          />
          <p className="text-xs text-muted-foreground mt-2">
            {text2.split(/\s+/).filter((w) => w.length > 0).length} words, {text2.length} characters
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <Button onClick={handleCheck} className="w-full" size="lg">
          <FileSearch className="h-5 w-5 mr-2" />
          Check Similarity
        </Button>
      </Card>

      {result && (
        <>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Similarity Analysis</h2>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Similarity Score</span>
                  <span className={`text-2xl font-bold ${level?.color}`}>
                    {result.similarity}%
                  </span>
                </div>
                <Progress value={result.similarity} className="h-3" />
                {level && (
                  <div className="mt-2 text-sm">
                    <span className={`font-medium ${level.color}`}>{level.level}</span>
                    <span className="text-muted-foreground"> - {level.description}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm text-muted-foreground">Text 1</div>
                  <div className="font-medium">
                    {result.totalWords.text1} words
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Text 2</div>
                  <div className="font-medium">
                    {result.totalWords.text2} words
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Matching Phrases</div>
                  <div className="font-medium">
                    {result.matchingPhrases.length}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {result.matchingPhrases.length > 0 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Matching Phrases</h2>
              <div className="space-y-2">
                {result.matchingPhrases.slice(0, 10).map((phrase, index) => (
                  <div
                    key={index}
                    className="p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded text-sm"
                  >
                    &quot;{phrase}&quot;
                  </div>
                ))}
                {result.matchingPhrases.length > 10 && (
                  <p className="text-xs text-muted-foreground">
                    +{result.matchingPhrases.length - 10} more matching phrases
                  </p>
                )}
              </div>
            </Card>
          )}

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Highlighted Matches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Text 1</Label>
                <div
                  className="p-4 bg-muted/30 rounded text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlightMatches(text1, result.matchingPhrases),
                  }}
                />
              </div>
              <div>
                <Label className="mb-2 block">Text 2</Label>
                <div
                  className="p-4 bg-muted/30 rounded text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlightMatches(text2, result.matchingPhrases),
                  }}
                />
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
