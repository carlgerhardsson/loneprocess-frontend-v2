/**
 * Activities Query Hooks
 * React Query hooks for activity data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchActivities, fetchActivity, createActivity, updateActivity, deleteActivity } from '@/lib/api'
import { useActivitiesStore } from '@/stores'
import type { Activity, CreateActivityData, UpdateActivityData } from '@/types'

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
      const activities = await fetchActivities(filters)
      // Sync with Zustand store (convert to string IDs for store)
      const storeActivities = activities.map(a => ({ ...a, id: String(a.id) }))
      setActivities(storeActivities as never[])
      return activities
    },
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
    onMutate: async newActivity => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: activitiesKeys.lists() })

      // Snapshot previous value
      const previousActivities = queryClient.getQueryData(activitiesKeys.lists())

      // Optimistically update
      const tempId = Date.now()
      queryClient.setQueryData(activitiesKeys.lists(), (old: Activity[] = []) => [
        ...old,
        { 
          ...newActivity, 
          id: tempId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as Activity,
      ])

      return { previousActivities }
    },
    onSuccess: data => {
      // Update Zustand store (convert to string ID)
      addActivity({ ...data, id: String(data.id) } as never)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: activitiesKeys.lists() })
    },
    onError: (_error, _newActivity, context) => {
      // Rollback on error
      if (context?.previousActivities) {
        queryClient.setQueryData(activitiesKeys.lists(), context.previousActivities)
      }
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
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: activitiesKeys.detail(id) })

      const previousActivity = queryClient.getQueryData(activitiesKeys.detail(id))

      // Optimistically update
      queryClient.setQueryData(activitiesKeys.detail(id), (old: Activity | undefined) =>
        old ? { ...old, ...data, updated_at: new Date().toISOString() } : old
      )

      return { previousActivity }
    },
    onSuccess: data => {
      updateActivityStore(String(data.id), { ...data, id: String(data.id) } as never)
      queryClient.invalidateQueries({ queryKey: activitiesKeys.lists() })
      queryClient.invalidateQueries({ queryKey: activitiesKeys.detail(data.id) })
    },
    onError: (_error, { id }, context) => {
      if (context?.previousActivity) {
        queryClient.setQueryData(activitiesKeys.detail(id), context.previousActivity)
      }
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
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: activitiesKeys.lists() })

      const previousActivities = queryClient.getQueryData(activitiesKeys.lists())

      // Optimistically remove
      queryClient.setQueryData(activitiesKeys.lists(), (old: Activity[] = []) =>
        old.filter(activity => activity.id !== id)
      )

      return { previousActivities }
    },
    onSuccess: (_data, id) => {
      deleteActivityStore(String(id))
      queryClient.invalidateQueries({ queryKey: activitiesKeys.lists() })
      queryClient.removeQueries({ queryKey: activitiesKeys.detail(id) })
    },
    onError: (_error, _id, context) => {
      if (context?.previousActivities) {
        queryClient.setQueryData(activitiesKeys.lists(), context.previousActivities)
      }
    },
  })
}
