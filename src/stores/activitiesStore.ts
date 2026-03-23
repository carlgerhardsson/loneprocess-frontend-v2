import { create } from 'zustand'
import type { Activity, ActivityFilters, ActivitiesState } from '@/types'

interface ActivitiesActions {
  setActivities: (activities: Activity[]) => void
  addActivity: (activity: Activity) => void
  updateActivity: (id: string, updates: Partial<Activity>) => void
  deleteActivity: (id: string) => void
  setSelectedActivity: (activity: Activity | null) => void
  setFilters: (filters: ActivityFilters) => void
  clearFilters: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

const initialState: ActivitiesState = {
  activities: [],
  selectedActivity: null,
  filters: {},
  isLoading: false,
  error: null,
}

export const useActivitiesStore = create<ActivitiesState & ActivitiesActions>(set => ({
  ...initialState,

  setActivities: activities => set({ activities }),

  addActivity: activity =>
    set(state => ({
      activities: [...state.activities, activity],
    })),

  updateActivity: (id, updates) =>
    set(state => ({
      activities: state.activities.map(activity =>
        activity.id === id ? { ...activity, ...updates } : activity
      ),
      selectedActivity:
        state.selectedActivity?.id === id
          ? { ...state.selectedActivity, ...updates }
          : state.selectedActivity,
    })),

  deleteActivity: id =>
    set(state => ({
      activities: state.activities.filter(activity => activity.id !== id),
      selectedActivity: state.selectedActivity?.id === id ? null : state.selectedActivity,
    })),

  setSelectedActivity: activity => set({ selectedActivity: activity }),

  setFilters: filters => set({ filters }),

  clearFilters: () => set({ filters: {} }),

  setLoading: isLoading => set({ isLoading }),

  setError: error => set({ error }),
}))

export function getFilteredActivities(
  activities: Activity[],
  filters: ActivityFilters
): Activity[] {
  let filtered = [...activities]

  if (filters.status?.length) {
    filtered = filtered.filter(a => filters.status!.includes(a.status))
  }

  if (filters.type?.length) {
    filtered = filtered.filter(a => filters.type!.includes(a.type))
  }

  if (filters.priority?.length) {
    filtered = filtered.filter(a => filters.priority!.includes(a.priority))
  }

  if (filters.assignedTo?.length) {
    filtered = filtered.filter(a => a.assignedTo && filters.assignedTo!.includes(a.assignedTo))
  }

  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(
      a =>
        a.title.toLowerCase().includes(search) ||
        (a.description && a.description.toLowerCase().includes(search))
    )
  }

  if (filters.dateFrom) {
    filtered = filtered.filter(a => !a.dueDate || a.dueDate >= filters.dateFrom!)
  }

  if (filters.dateTo) {
    filtered = filtered.filter(a => !a.dueDate || a.dueDate <= filters.dateTo!)
  }

  return filtered
}
