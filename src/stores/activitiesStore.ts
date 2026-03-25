/**
 * Activities Store - READ-ONLY VERSION
 * Manages activities list, selection, and filters
 */

import { create } from 'zustand'
import type { Activity, ActivityFilters, ActivitiesState } from '../types'

interface ActivitiesActions {
  setActivities: (activities: Activity[]) => void
  addActivity: (activity: Activity) => void
  updateActivity: (id: string, updates: Partial<Activity>) => void
  deleteActivity: (id: string) => void
  selectActivity: (activity: Activity | null) => void
  setFilters: (filters: Partial<ActivityFilters>) => void
  clearFilters: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  getFilteredActivities: () => Activity[]
}

type ActivitiesStore = ActivitiesState & ActivitiesActions

export const useActivitiesStore = create<ActivitiesStore>((set, get) => ({
  // Initial state
  activities: [],
  selectedActivity: null,
  filters: {},
  isLoading: false,
  error: null,

  // Actions
  setActivities: (activities: Activity[]) => {
    set({ activities })
  },

  addActivity: (activity: Activity) => {
    set(state => ({
      activities: [...state.activities, activity],
    }))
  },

  updateActivity: (id: string, updates: Partial<Activity>) => {
    set(state => ({
      activities: state.activities.map(activity =>
        activity.id === id ? { ...activity, ...updates } : activity
      ),
      selectedActivity:
        state.selectedActivity?.id === id
          ? { ...state.selectedActivity, ...updates }
          : state.selectedActivity,
    }))
  },

  deleteActivity: (id: string) => {
    set(state => ({
      activities: state.activities.filter(activity => activity.id !== id),
      selectedActivity: state.selectedActivity?.id === id ? null : state.selectedActivity,
    }))
  },

  selectActivity: (activity: Activity | null) => {
    set({ selectedActivity: activity })
  },

  setFilters: (filters: Partial<ActivityFilters>) => {
    set(state => ({
      filters: { ...state.filters, ...filters },
    }))
  },

  clearFilters: () => {
    set({ filters: {} })
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading })
  },

  setError: (error: string | null) => {
    set({ error })
  },

  getFilteredActivities: () => {
    const { activities, filters } = get()

    return activities.filter(activity => {
      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(activity.status)) return false
      }

      // Priority filter
      if (filters.priority && filters.priority.length > 0) {
        if (!filters.priority.includes(activity.priority)) return false
      }

      // Fas filter
      if (filters.fas && filters.fas.length > 0) {
        if (!filters.fas.includes(activity.fas)) return false
      }

      // Roll filter
      if (filters.roll && filters.roll.length > 0) {
        if (!filters.roll.includes(activity.roll)) return false
      }

      // Search filter (using process and behov instead of title/description)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesProcess = (activity.process || '').toLowerCase().includes(searchLower)
        const matchesBehov = (activity.behov || '').toLowerCase().includes(searchLower)
        const matchesFas = (activity.fas || '').toLowerCase().includes(searchLower)
        const matchesRoll = (activity.roll || '').toLowerCase().includes(searchLower)
        if (!matchesProcess && !matchesBehov && !matchesFas && !matchesRoll) return false
      }

      return true
    })
  },
}))
