/**
 * Activity Progress Context
 * Shared state for all activity progress across the app
 */

import { createContext, useState, useCallback, ReactNode } from 'react'
import type { ActivityProgress, LoneportalProgress } from '@/types/activityDef'

const STORAGE_KEY = 'loneportal-progress'

export interface ActivityProgressContextValue {
  progress: Record<string, ActivityProgress>
  toggleDelsteg: (activityId: string, delstegIndex: number, totalDelsteg: number) => void
  updateComment: (activityId: string, comment: string) => void
  updateAssignee: (activityId: string, assignee: string) => void
  getProgress: (activityId: string) => ActivityProgress | undefined
  resetProgress: () => void
  getCompletionPercentage: (activityId: string) => number
}

// eslint-disable-next-line react-refresh/only-export-components
export const ActivityProgressContext = createContext<ActivityProgressContextValue | null>(null)

function getStoredProgress(): LoneportalProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to parse localStorage progress:', error)
  }
  
  return {
    currentPeriod: new Date().toISOString().slice(0, 7),
    activities: {}
  }
}

function saveProgress(data: LoneportalProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save progress to localStorage:', error)
  }
}

export function ActivityProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Record<string, ActivityProgress>>(() => {
    return getStoredProgress().activities
  })

  const toggleDelsteg = useCallback((activityId: string, delstegIndex: number, totalDelsteg: number) => {
    setProgress(prev => {
      const activity = prev[activityId] || {
        activityId,
        delstegCompleted: Array(totalDelsteg).fill(false),
        lastUpdated: new Date().toISOString()
      }
      
      const updated = [...activity.delstegCompleted]
      while (updated.length < totalDelsteg) {
        updated.push(false)
      }
      updated[delstegIndex] = !updated[delstegIndex]
      
      const newProgress = {
        ...prev,
        [activityId]: {
          ...activity,
          delstegCompleted: updated,
          lastUpdated: new Date().toISOString()
        }
      }
      
      saveProgress({
        currentPeriod: new Date().toISOString().slice(0, 7),
        activities: newProgress
      })
      
      return newProgress
    })
  }, [])

  const updateComment = useCallback((activityId: string, comment: string) => {
    setProgress(prev => {
      const activity = prev[activityId] || {
        activityId,
        delstegCompleted: [],
        lastUpdated: new Date().toISOString()
      }
      
      const newProgress = {
        ...prev,
        [activityId]: {
          ...activity,
          comment,
          lastUpdated: new Date().toISOString()
        }
      }
      
      saveProgress({
        currentPeriod: new Date().toISOString().slice(0, 7),
        activities: newProgress
      })
      
      return newProgress
    })
  }, [])

  const updateAssignee = useCallback((activityId: string, assignee: string) => {
    setProgress(prev => {
      const activity = prev[activityId] || {
        activityId,
        delstegCompleted: [],
        lastUpdated: new Date().toISOString()
      }
      
      const newProgress = {
        ...prev,
        [activityId]: {
          ...activity,
          assignedTo: assignee,
          lastUpdated: new Date().toISOString()
        }
      }
      
      saveProgress({
        currentPeriod: new Date().toISOString().slice(0, 7),
        activities: newProgress
      })
      
      return newProgress
    })
  }, [])

  const getProgress = useCallback((activityId: string): ActivityProgress | undefined => {
    return progress[activityId]
  }, [progress])

  const resetProgress = useCallback(() => {
    const emptyProgress: LoneportalProgress = {
      currentPeriod: new Date().toISOString().slice(0, 7),
      activities: {}
    }
    saveProgress(emptyProgress)
    setProgress({})
  }, [])

  const getCompletionPercentage = useCallback((activityId: string): number => {
    const activity = progress[activityId]
    if (!activity || activity.delstegCompleted.length === 0) {
      return 0
    }
    const completed = activity.delstegCompleted.filter(Boolean).length
    return Math.round((completed / activity.delstegCompleted.length) * 100)
  }, [progress])

  return (
    <ActivityProgressContext.Provider
      value={{
        progress,
        toggleDelsteg,
        updateComment,
        updateAssignee,
        getProgress,
        resetProgress,
        getCompletionPercentage
      }}
    >
      {children}
    </ActivityProgressContext.Provider>
  )
}
