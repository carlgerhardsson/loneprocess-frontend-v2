/**
 * useFasProgress Hook
 * Calculates completion statistics for each Fas
 */

import { useMemo } from 'react'
import { getActivitiesByFas } from '@/data/activities'
import { useActivityProgress } from '@/hooks/useActivityProgress'
import type { FasType } from '@/types/activityDef'

interface FasProgressStats {
  total: number
  completed: number
  percentage: number
}

export function useFasProgress(fas: FasType): FasProgressStats {
  const { progress } = useActivityProgress()
  const activities = useMemo(() => getActivitiesByFas(fas), [fas])

  const stats = useMemo(() => {
    let completed = 0
    const total = activities.length

    activities.forEach(activity => {
      const activityProgress = progress[activity.id]
      if (!activityProgress) return

      // Count as completed if ALL required delsteg are checked
      const requiredDelsteg = activity.delsteg.filter(d => d.required)
      const allRequiredComplete = requiredDelsteg.every((delsteg, index) => {
        return activityProgress.delstegCompleted[index] === true
      })

      if (allRequiredComplete && requiredDelsteg.length > 0) {
        completed++
      }
    })

    return {
      total,
      completed,
      percentage: total > 0 ? (completed / total) * 100 : 0
    }
  }, [activities, progress])

  return stats
}
