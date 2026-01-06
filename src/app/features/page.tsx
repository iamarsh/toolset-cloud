import type { Metadata } from 'next'
import {
  FeaturesHero,
  CoreValuesSection,
  ExampleWorkflows,
  WhatGetsSaved,
  AccessLevelsSection,
  AudienceSection,
  SecurityPrivacy,
  ClosingCTA
} from '@/components/features'

export const metadata: Metadata = {
  title: 'Features',
  description: 'Your workspace for repeatable tasks. Pick up where you left off with saved work, recent tools, and optional AI assistance.',
}

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <CoreValuesSection />
      <ExampleWorkflows />
      <WhatGetsSaved />
      <AccessLevelsSection />
      <AudienceSection />
      <SecurityPrivacy />
      <ClosingCTA />
    </>
  )
}
