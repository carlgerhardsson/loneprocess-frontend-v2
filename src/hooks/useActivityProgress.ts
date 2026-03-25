/**
 * useActivityProgress
 * 
 * Hanterar användarens progress för aktiviteter och delsteg.
 * Allt sparas i localStorage så användaren kan fortsätta där de var.
 */

import { useState, useEffect, useCallback } from 'react'

interface DelstegProgress {
  [delstegId: string]: boolean // true = checked, false = unchecked
}

interface ActivityProgress {
  [activityId: string]: {
    delsteg: DelstegProgress
    comment?: string
    lastUpdated: string
  }
}

const STORAGE_KEY = 'loneprocess-activity-progress'

/**
 * Load progress from localStorage
 */
function loadProgress(): ActivityProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch (error) {
    console.error('Failed to load activity progress:', error)
    return {}
  }
}

/**
 * Save progress to localStorage
 */
function saveProgress(progress: ActivityProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error('Failed to save activity progress:', error)
  }
}

export function useActivityProgress() {
  const [progress, setProgress] = useState<ActivityProgress>(loadProgress)

  // Save to localStorage whenever progress changes
  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  /**
   * Toggle a delsteg checkbox
   */
  const toggleDelsteg = useCallback((activityId: string, delstegId: string) => {
    setProgress(prev => {
      const activityProgress = prev[activityId] || { delsteg: {}, lastUpdated: new Date().toISOString() }
      const currentValue = activityProgress.delsteg[delstegId] || false

      return {
        ...prev,
        [activityId]: {
          ...activityProgress,
          delsteg: {
            ...activityProgress.delsteg,
            [delstegId]: !currentValue
          },
          lastUpdated: new Date().toISOString()
        }
      }
    })
  }, [])

  /**
   * Set comment for an activity
   */
  const setComment = useCallback((activityId: string, comment: string) => {
    setProgress(prev => {
      const activityProgress = prev[activityId] || { delsteg: {}, lastUpdated: new Date().toISOString() }

      return {
        ...prev,
        [activityId]: {
          ...activityProgress,
          comment,
          lastUpdated: new Date().toISOString()
        }
      }
    })
  }, [])

  /**
   * Get progress for a specific activity
   */
  const getActivityProgress = useCallback((activityId: string) => {
    return progress[activityId] || { delsteg: {}, lastUpdated: new Date().toISOString() }
  }, [progress])

  /**
   * Calculate completion percentage for an activity
   */
  const getActivityCompletion = useCallback((activityId: string, totalDelsteg: number): number => {
    const activityProgress = progress[activityId]
    if (!activityProgress || totalDelsteg === 0) return 0

    const completedCount = Object.values(activityProgress.delsteg).filter(Boolean).length
    return Math.round((completedCount / totalDelsteg) * 100)
  }, [progress])

  /**
   * Get total completion for a phase (Lön 1, Kontroll, Lön Klar)
   */
  const getPhaseCompletion = useCallback((activityIds: string[], totalDelstegCount: number): number => {
    if (totalDelstegCount === 0) return 0

    let completedDelsteg = 0
    activityIds.forEach(activityId => {
      const activityProgress = progress[activityId]
      if (activityProgress) {
        completedDelsteg += Object.values(activityProgress.delsteg).filter(Boolean).length
      }
    })

    return Math.round((completedDelsteg / totalDelstegCount) * 100)
  }, [progress])

  /**
   * Reset all progress (for new period)
   */
  const resetProgress = useCallback(() => {
    setProgress({})
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  /**
   * Reset progress for a specific activity
   */
  const resetActivity = useCallback((activityId: string) => {
    setProgress(prev => {
      const newProgress = { ...prev }
      delete newProgress[activityId]
      return newProgress
    })
  }, [])

  return {
    progress,
    toggleDelsteg,
    setComment,
    getActivityProgress,
    getActivityCompletion,
    getPhaseCompletion,
    resetProgress,
    resetActivity
  }
}
