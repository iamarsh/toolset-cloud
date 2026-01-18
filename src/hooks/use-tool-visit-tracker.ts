'use client'

import { useEffect } from 'react'

/**
 * Hook to track tool page visits in localStorage
 * Automatically records when a tool page is viewed
 */
export function useToolVisitTracker(toolSlug: string) {
  useEffect(() => {
    if (!toolSlug || typeof window === 'undefined') return

    try {
      // Get existing history
      const stored = localStorage.getItem('toolVisitHistory')
      let history: Array<{ slug: string; visitedAt: number }> = []

      if (stored) {
        history = JSON.parse(stored)
      }

      // Remove existing entry for this tool (we'll add it fresh)
      history = history.filter((item) => item.slug !== toolSlug)

      // Add new visit at the beginning
      history.unshift({
        slug: toolSlug,
        visitedAt: Date.now(),
      })

      // Keep only last 50 visits
      history = history.slice(0, 50)

      // Save back to localStorage
      localStorage.setItem('toolVisitHistory', JSON.stringify(history))
    } catch (error) {
      console.error('Failed to track tool visit:', error)
    }
  }, [toolSlug])
}
