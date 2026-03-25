/**
 * useActivityProgress Hook
 * Hook to access the ActivityProgress context
 */

import { useContext } from 'react'
import { ActivityProgressContext } from '@/contexts/ActivityProgressContext'

export function useActivityProgress() {
  const context = useContext(ActivityProgressContext)
  if (!context) {
    throw new Error('useActivityProgress must be used within ActivityProgressProvider')
  }
  return context
}
