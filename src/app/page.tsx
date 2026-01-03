import { Hero, ToolSection, PromoBanner, WhoWeServe } from '@/components/home'
import { categories, getToolsByCategory } from '@/lib/tools'

export default function HomePage() {
  // Get tools for the first few categories to display on home page
  const categoriesToShow = categories.slice(0, 4)

  return (
    <>
      <Hero />
      
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
      
      <PromoBanner />
      <WhoWeServe />
    </>
  )
}
