/**
 * Activities Query Hooks
 * React Query hooks for activity data fetching and mutations
 * NOW WITH AUTO-REFRESH: Polls backend every 30 seconds
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchActivities,
  fetchActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} from '@/lib/api'
import { useActivitiesStore } from '@/stores'
import type { CreateActivityData, UpdateActivityData } from '@/types'

/**
 * Query keys for activities
 */
export const activitiesKeys = {
  all: ['activities'] as const,
  lists: () => [...activitiesKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...activitiesKeys.lists(), filters || {}] as const,
  details: () => [...activitiesKeys.all, 'detail'] as const,
  detail: (id: number) => [...activitiesKeys.details(), id] as const,
}

/**
 * Hook to fetch all activities with optional filtering
 * AUTO-REFRESHES: Polls backend every 30 seconds to stay in sync
 */
export function useActivities(filters?: {
  skip?: number
  limit?: number
  process?: string
  role?: string
  status?: string
}) {
  const setActivities = useActivitiesStore(state => state.setActivities)

  return useQuery({
    queryKey: activitiesKeys.list(filters),
    queryFn: async () => {
      console.log('[useActivities] Fetching from backend...', new Date().toLocaleTimeString())
      const activities = await fetchActivities(filters)
      // Sync with Zustand store
      setActivities(activities)
      console.log(`[useActivities] Fetched ${activities.length} activities`)
      return activities
    },
    // AUTO-REFRESH CONFIGURATION
    refetchInterval: 30000, // Poll every 30 seconds
    refetchOnWindowFocus: true, // Refresh when user returns to tab
    staleTime: 20000, // Data considered fresh for 20 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  })
}

/**
 * Hook to fetch a single activity by ID
 */
export function useActivity(id: number | null) {
  return useQuery({
    queryKey: activitiesKeys.detail(id!),
    queryFn: () => fetchActivity(id!),
    enabled: id !== null,
    // Refresh single activity less frequently
    refetchInterval: 60000, // Poll every 60 seconds
    refetchOnWindowFocus: true,
    staleTime: 30000,
  })
}

/**
 * Hook to create a new activity
 */
export function useCreateActivity() {
  const queryClient = useQueryClient()
  const addActivity = useActivitiesStore(state => state.addActivity)

  return useMutation({
    mutationFn: (data: CreateActivityData) => createActivity(data),
    onSuccess: data => {
      // Update Zustand store
      addActivity(data)
      // Invalidate and refetch immediately
      queryClient.invalidateQueries({ queryKey: activitiesKeys.lists() })
    },
  })
}

/**
 * Hook to update an existing activity
 */
export function useUpdateActivity() {
  const queryClient = useQueryClient()
  const updateActivityStore = useActivitiesStore(state => state.updateActivity)

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateActivityData }) =>
      updateActivity(id, data),
    onSuccess: data => {
      updateActivityStore(data.id, data)
      queryClient.invalidateQueries({ queryKey: activitiesKeys.lists() })
      queryClient.invalidateQueries({ queryKey: activitiesKeys.detail(Number(data.id)) })
    },
  })
}

/**
 * Hook to delete an activity
 */
export function useDeleteActivity() {
  const queryClient = useQueryClient()
  const deleteActivityStore = useActivitiesStore(state => state.deleteActivity)

  return useMutation({
    mutationFn: (id: number) => deleteActivity(id),
    onSuccess: (_data, id) => {
      deleteActivityStore(String(id))
      queryClient.invalidateQueries({ queryKey: activitiesKeys.lists() })
      queryClient.removeQueries({ queryKey: activitiesKeys.detail(id) })
    },
  })
}
