import { Check, History, RotateCcw, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { getAllTools } from '@/lib/tools'

const valueProps = [
  {
    icon: History,
    title: 'Pick up where you left off',
    description: 'Your recent tools and saved configurations are always ready. No need to start from scratch.',
  },
  {
    icon: RotateCcw,
    title: 'Run the same task again',
    description: "Saved work means you don't have to redo the setup each time.",
  },
  {
    icon: ShieldCheck,
    title: 'Secure by design',
    description: 'Client-side first. Your data stays private unless you choose to save it.',
  },
]

export function WhyChoose() {
  const tools = getAllTools()
  
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="relative p-8 sm:p-12 md:p-16 lg:p-20 rounded-3xl overflow-hidden border-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black border-primary/30 shadow-2xl dark:shadow-white/5">
          {/* Decorative elements */}
          <div className="hidden lg:block absolute top-1/2 right-8 w-2 h-16 bg-primary/20 rounded-full" />
          <div className="hidden lg:block absolute top-8 left-1/2 w-16 h-2 bg-primary/20 rounded-full" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white">
                  WHY USE A WORKSPACE?
                </h3>
                <div className="w-16 sm:w-20 h-1 bg-primary" />
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  Toolset remembers your context so you can focus on getting work done.
                  Saved configurations, recent tools, and optional AI assistance—all in one place you return to.
                </p>
              </div>
              
              {/* Value props */}
              <div className="space-y-3 md:space-y-4">
                {valueProps.map((prop) => (
                  <div key={prop.title} className="flex items-start space-x-3 md:space-x-4">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-sm md:text-base text-gray-900 dark:text-white">
                        {prop.title}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                        {prop.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right: Stats */}
            <div className="text-center">
              <div className="text-6xl sm:text-7xl md:text-8xl font-black mb-3 md:mb-4 text-primary">
                {tools.length}+
              </div>
              <div className="text-lg sm:text-xl font-bold mb-1 md:mb-2 text-gray-900 dark:text-white">
                TOOLS & GROWING
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Designed for repeat use
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
