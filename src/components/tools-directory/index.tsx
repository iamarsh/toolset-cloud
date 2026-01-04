'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, SlidersHorizontal, Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ToolCard } from '@/components/home/tool-card'
import { getAllTools, categories, getDisplayCategories } from '@/lib/tools'
import { ToolTitle } from '@/components/typography'
import { Icon } from '@/lib/icons'
import type { CategoryId } from '@/lib/tools/types'

type SortOption = 'name' | 'popular' | 'trending' | 'new'

// Helper to check if a tool uses AI
const isAIPowered = (tool: { tier: string; category: string }) => {
  return tool.tier === 'AUTH' || tool.tier === 'PAID' || tool.category === 'ai'
}

export function ToolsDirectory() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all')
  const [showAIOnly, setShowAIOnly] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('popular')

  const allTools = getAllTools()
  const displayCategories = getDisplayCategories() // Excludes 'ai' category

  const filteredTools = useMemo(() => {
    let result = [...allTools]

    // Search filter
    if (search) {
      const lowerSearch = search.toLowerCase()
      result = result.filter(
        (tool) =>
          tool.name.toLowerCase().includes(lowerSearch) ||
          tool.description.toLowerCase().includes(lowerSearch)
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((tool) => tool.category === selectedCategory)
    }

    // AI filter
    if (showAIOnly) {
      result = result.filter((tool) => isAIPowered(tool))
    }

    // Sort
    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'popular':
        result.sort((a, b) => {
          const aPopular = a.tags.includes('popular') ? 1 : 0
          const bPopular = b.tags.includes('popular') ? 1 : 0
          return bPopular - aPopular
        })
        break
      case 'trending':
        result.sort((a, b) => {
          const aTrending = a.tags.includes('trending') ? 1 : 0
          const bTrending = b.tags.includes('trending') ? 1 : 0
          return bTrending - aTrending
        })
        break
      case 'new':
        result.sort((a, b) => {
          const aNew = a.tags.includes('new') ? 1 : 0
          const bNew = b.tags.includes('new') ? 1 : 0
          return bNew - aNew
        })
        break
    }

    return result
  }, [allTools, search, selectedCategory, showAIOnly, sortBy])

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('all')
    setShowAIOnly(false)
    setSortBy('popular')
  }

  const hasActiveFilters = search || selectedCategory !== 'all' || showAIOnly

  return (
    <div className="py-14 md:py-20">
      <Container>
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-10 text-center">
          <ToolTitle title="Toolset.cloud tools" accent=".cloud" className="mb-4" />
          <div className="w-16 h-1 bg-primary mx-auto mb-6" aria-hidden="true" />
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Practical tools for everyday tasks. Most work instantly—some use AI for more.
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="tool-search"
                type="search"
                placeholder="Search for tools..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 pl-12 rounded-full text-base"
              />
            </div>
          </div>
        </header>

        {/* Unified Filter Section */}
        <div className="max-w-5xl mx-auto mb-8 space-y-4">
          {/* Row 1: AI Toggle */}
          <div className="flex justify-center gap-2">
            <FilterChip
              label="All tools"
              active={!showAIOnly}
              onClick={() => setShowAIOnly(false)}
            />
            <FilterChip
              label="AI-powered"
              icon={<Sparkles className="h-3.5 w-3.5" />}
              active={showAIOnly}
              onClick={() => setShowAIOnly(true)}
            />
          </div>

          {/* Row 2: Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 justify-center flex-wrap scrollbar-hide">
            <CategoryPill
              label="All"
              icon="Wrench"
              active={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
            />
            {displayCategories.map((cat) => (
              <CategoryPill
                key={cat.id}
                label={cat.name}
                icon={cat.icon}
                active={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
              />
            ))}
          </div>

          {/* Row 3: Sort + Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="popular">Popular</option>
                <option value="trending">Trending</option>
                <option value="new">Newest</option>
                <option value="name">A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active filters indicator */}
        {hasActiveFilters && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Filters:</span>
            {search && (
              <Badge variant="secondary" className="gap-1">
                "{search}"
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="secondary">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </Badge>
            )}
            {showAIOnly && (
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" />
                AI
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear
            </Button>
          </div>
        )}

        {/* Tools grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Filter className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No tools found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button variant="secondary" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </Container>
    </div>
  )
}

function FilterChip({
  label,
  icon,
  active,
  onClick,
}: {
  label: string
  icon?: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
        active
          ? 'bg-primary text-primary-foreground border-primary shadow-sm'
          : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function CategoryPill({
  label,
  icon,
  active,
  onClick,
}: {
  label: string
  icon: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
        active
          ? 'bg-primary text-primary-foreground border-primary shadow-sm'
          : 'bg-card text-foreground border-border hover:border-primary/30'
      }`}
    >
      <Icon name={icon} className="h-3.5 w-3.5" />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  )
}
