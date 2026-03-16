/**
 * Activities Store
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

      // Type filter
      if (filters.type && filters.type.length > 0) {
        if (!filters.type.includes(activity.type)) return false
      }

      // Priority filter
      if (filters.priority && filters.priority.length > 0) {
        if (!filters.priority.includes(activity.priority)) return false
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesTitle = activity.title.toLowerCase().includes(searchLower)
        const matchesDescription = activity.description.toLowerCase().includes(searchLower)
        if (!matchesTitle && !matchesDescription) return false
      }

      return true
    })
  },
}))
