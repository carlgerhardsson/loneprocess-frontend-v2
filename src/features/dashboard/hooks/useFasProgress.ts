/**
 * useFasProgress Hook
 * Calculate completion statistics for a set of activities
 */

import { useMemo } from 'react'
import type { ActivityDefinition } from '@/types/activityDef'
import { useActivityProgress } from '@/hooks/useActivityProgress'

export function useFasProgress(activities: ActivityDefinition[]) {
  const { progress, getCompletionPercentage } = useActivityProgress()

  const stats = useMemo(() => {
    let totalDelsteg = 0
    let completedDelsteg = 0
    let fullyCompletedActivities = 0

    activities.forEach(activity => {
      const activityProgress = progress[activity.id]
      const delstegCount = activity.delsteg.length

      totalDelsteg += delstegCount

      if (activityProgress) {
        const completed = activityProgress.delstegCompleted.filter(Boolean).length
        completedDelsteg += completed

        if (completed === delstegCount) {
          fullyCompletedActivities++
        }
      }
    })

    const overallPercentage =
      totalDelsteg > 0 ? Math.round((completedDelsteg / totalDelsteg) * 100) : 0

    return {
      completedCount: fullyCompletedActivities,
      totalCount: activities.length,
      totalDelsteg,
      completedDelsteg,
      overallPercentage,
    }
  }, [activities, progress])

  return {
    ...stats,
    getCompletionPercentage,
  }
}
