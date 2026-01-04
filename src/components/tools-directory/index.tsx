'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, SlidersHorizontal } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ToolCard } from '@/components/home/tool-card'
import { getAllTools, categories } from '@/lib/tools'
import type { CategoryId, ToolTier, ToolTag } from '@/lib/tools/types'

type SortOption = 'name' | 'popular' | 'trending' | 'new'

export function ToolsDirectory() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all')
  const [selectedTier, setSelectedTier] = useState<ToolTier | 'all'>('all')
  const [sortBy, setSortBy] = useState<SortOption>('popular')

  const allTools = getAllTools()

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

    // Tier filter
    if (selectedTier !== 'all') {
      result = result.filter((tool) => tool.tier === selectedTier)
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
  }, [allTools, search, selectedCategory, selectedTier, sortBy])

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('all')
    setSelectedTier('all')
    setSortBy('popular')
  }

  const hasActiveFilters = search || selectedCategory !== 'all' || selectedTier !== 'all'

  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold font-serif tracking-tight mb-2">All Tools</h1>
          <p className="text-muted-foreground">
            Browse and search through {allTools.length} live tools. Start free; account-only and Pro tools will be marked when they arrive.
          </p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as CategoryId | 'all')}
            className="h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Tier filter */}
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value as ToolTier | 'all')}
            className="h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Access</option>
            <option value="PUBLIC">Free to start</option>
            <option value="AUTH">Sign-in required</option>
            <option value="PAID">Pro</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
            <option value="new">Newest</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>

        {/* Active filters indicator */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {search && (
              <Badge variant="secondary" className="gap-1">
                Search: {search}
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="secondary">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </Badge>
            )}
            {selectedTier !== 'all' && (
              <Badge variant="secondary">
                {selectedTier === 'PUBLIC' ? 'Free' : selectedTier === 'AUTH' ? 'Account' : 'Pro'}
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
        </p>

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
