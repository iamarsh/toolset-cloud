'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { generateSignatureHTML, type SignatureData } from './logic'

export default function EmailSignatureGeneratorTool() {
  const [data, setData] = useState<SignatureData>({
    name: 'John Doe',
    title: 'Software Engineer',
    company: 'Tech Company',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    website: 'https://example.com',
  })

  const html = generateSignatureHTML(data)

  const copyHTML = () => {
    navigator.clipboard.writeText(html)
    toast.success('HTML copied to clipboard')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Signature Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Company</Label>
            <Input value={data.company} onChange={(e) => setData({ ...data, company: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Website</Label>
            <Input value={data.website} onChange={(e) => setData({ ...data, website: e.target.value })} />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Preview</h2>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">HTML Code</h2>
          <Button onClick={copyHTML} size="sm"><Copy className="h-4 w-4 mr-2" />Copy</Button>
        </div>
        <pre className="p-4 bg-muted rounded text-xs overflow-x-auto">{html}</pre>
      </Card>
    </div>
  )
}
