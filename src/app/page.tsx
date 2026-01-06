import { Hero, ToolSection, PromoBanner, WhoWeServe, WhyChoose, FeaturedWorkflows, TrustSection } from '@/components/home'
import { ClosingCTA } from '@/components/features'
import { categories, getToolsByCategory, getAllTools, getCategoriesWithTools } from '@/lib/tools'

export default function HomePage() {
  const tools = getAllTools()
  const activeCategories = getCategoriesWithTools(tools.map((tool) => tool.category))
  // Show up to 6 categories that actually have tools
  const categoriesToShow = activeCategories.slice(0, 6)

  return (
    <>
      <Hero />
      <WhyChoose />
      <WhoWeServe />
      <FeaturedWorkflows />
      <PromoBanner />

      {categoriesToShow.map((category) => {
        const categoryTools = getToolsByCategory(category.id)
        return (
          <ToolSection
            key={category.id}
            category={category}
            tools={categoryTools}
            maxTools={4}
          />
        )
      })}

      <TrustSection />
      <ClosingCTA />
    </>
  )
}
