'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { type OGTags, validateOGTags, generateMetaTags } from './logic'

export default function OpenGraphPreviewTool() {
  const [tags, setTags] = useState<OGTags>({
    title: 'Your Page Title',
    description: 'A brief description of your page content that will appear in social media shares.',
    image: 'https://via.placeholder.com/1200x630',
    url: 'https://example.com',
    siteName: 'Your Site Name',
    type: 'website',
  })

  const errors = validateOGTags(tags)
  const metaTags = generateMetaTags(tags)

  const updateTag = (field: keyof OGTags, value: string) => {
    setTags({ ...tags, [field]: value })
  }

  const copyMetaTags = () => {
    navigator.clipboard.writeText(metaTags)
    toast.success('Meta tags copied to clipboard')
  }

  const getFieldError = (field: keyof OGTags) => {
    return errors.find((e) => e.field === field)?.message
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Input Form */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Open Graph Tags</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={tags.title}
              onChange={(e) => updateTag('title', e.target.value)}
              placeholder="Your page title"
            />
            {getFieldError('title') && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {getFieldError('title')}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {tags.title.length}/60 characters (recommended)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={tags.description}
              onChange={(e) => updateTag('description', e.target.value)}
              placeholder="A brief description of your page"
              rows={3}
            />
            {getFieldError('description') && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {getFieldError('description')}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {tags.description.length}/160 characters (recommended)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">
              Image URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="image"
              value={tags.image}
              onChange={(e) => updateTag('image', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            {getFieldError('image') && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {getFieldError('image')}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Recommended: 1200x630px (Facebook) or 1200x600px (Twitter)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">
              URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="url"
              value={tags.url}
              onChange={(e) => updateTag('url', e.target.value)}
              placeholder="https://example.com"
            />
            {getFieldError('url') && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {getFieldError('url')}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name (Optional)</Label>
              <Input
                id="siteName"
                value={tags.siteName || ''}
                onChange={(e) => updateTag('siteName', e.target.value)}
                placeholder="Your Site Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type (Optional)</Label>
              <Input
                id="type"
                value={tags.type || ''}
                onChange={(e) => updateTag('type', e.target.value)}
                placeholder="website"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Preview Tabs */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Preview</h2>

        <Tabs defaultValue="facebook" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="facebook">Facebook</TabsTrigger>
            <TabsTrigger value="twitter">Twitter</TabsTrigger>
            <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
          </TabsList>

          <TabsContent value="facebook" className="mt-4">
            <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
              <img
                src={tags.image}
                alt="Preview"
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/1200x630?text=Image+Preview'
                }}
              />
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase mb-1">
                  {tags.url.replace(/^https?:\/\//, '')}
                </div>
                <h3 className="font-semibold text-lg mb-1">{tags.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {tags.description}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="twitter" className="mt-4">
            <div className="border rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
              <img
                src={tags.image}
                alt="Preview"
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/1200x630?text=Image+Preview'
                }}
              />
              <div className="p-4">
                <h3 className="font-semibold text-base mb-1">{tags.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                  {tags.description}
                </p>
                <div className="text-xs text-gray-500">
                  {tags.url.replace(/^https?:\/\//, '')}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="linkedin" className="mt-4">
            <div className="border rounded overflow-hidden bg-white dark:bg-gray-900">
              <img
                src={tags.image}
                alt="Preview"
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/1200x630?text=Image+Preview'
                }}
              />
              <div className="p-3 border-t">
                <h3 className="font-semibold text-sm mb-1">{tags.title}</h3>
                <div className="text-xs text-gray-500">
                  {tags.url.replace(/^https?:\/\//, '')}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Meta Tags Output */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Meta Tags</h2>
          <Button variant="outline" size="sm" onClick={copyMetaTags}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>

        <pre className="p-4 rounded-lg bg-muted font-mono text-xs overflow-x-auto">
          {metaTags}
        </pre>

        {errors.length > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
            <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
              Validation Issues:
            </p>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>{error.field}:</strong> {error.message}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  )
}
