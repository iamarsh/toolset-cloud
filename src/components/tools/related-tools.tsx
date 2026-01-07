import { getToolsByCategory, type ToolDefinition } from '@/lib/tools'
import { ToolCard } from '@/components/home/tool-card'
import { Container } from '@/components/ui/container'

interface RelatedToolsProps {
  currentTool: ToolDefinition
  maxTools?: number
}

export function RelatedTools({ currentTool, maxTools = 4 }: RelatedToolsProps) {
  const categoryTools = getToolsByCategory(currentTool.category)
  const relatedTools = categoryTools
    .filter(tool => tool.id !== currentTool.id)
    .slice(0, maxTools)

  if (relatedTools.length === 0) return null

  return (
    <section className="border-t bg-muted/30">
      <Container className="py-16">
        <h2 className="text-2xl font-semibold mb-8">Related Tools</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </Container>
    </section>
  )
}
