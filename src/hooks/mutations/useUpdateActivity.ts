/**
 * Update Activity Mutation Hook with Optimistic Updates
 * 
 * Provides optimistic UI updates when updating activities.
 * Updates cache immediately and rolls back on error.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateActivity } from '@/lib/api'
import { activitiesKeys } from '@/hooks/queries/useActivities'
import type { Activity, UpdateActivityData } from '@/types'

interface UseUpdateActivityOptions {
  onSuccess?: (data: Activity) => void
  onError?: (error: Error) => void
}

export function useUpdateActivity(options?: UseUpdateActivityOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateActivityData }) =>
      updateActivity(id, data),

    // Optimistic update: Update cache immediately
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: activitiesKeys.lists() })
      await queryClient.cancelQueries({ queryKey: activitiesKeys.detail(id) })

      // Snapshot previous values
      const previousActivities = queryClient.getQueryData<Activity[]>(activitiesKeys.lists())
      const previousActivity = queryClient.getQueryData<Activity>(activitiesKeys.detail(id))

      // Optimistically update list cache
      queryClient.setQueryData<Activity[]>(activitiesKeys.lists(), (old = []) =>
        old.map(activity =>
          activity.id === String(id)
            ? { ...activity, ...data, updatedAt: new Date().toISOString() }
            : activity
        )
      )

      // Optimistically update detail cache
      if (previousActivity) {
        queryClient.setQueryData<Activity>(activitiesKeys.detail(id), {
          ...previousActivity,
          ...data,
          updatedAt: new Date().toISOString(),
        })
      }

      return { previousActivities, previousActivity }
    },

    // Rollback on error
    onError: (error, { id }, context) => {
      if (context?.previousActivities) {
        queryClient.setQueryData(activitiesKeys.lists(), context.previousActivities)
      }
      if (context?.previousActivity) {
        queryClient.setQueryData(activitiesKeys.detail(id), context.previousActivity)
      }
      options?.onError?.(error as Error)
    },

    // Refetch to ensure sync
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: activitiesKeys.lists() })
      queryClient.invalidateQueries({ queryKey: activitiesKeys.detail(id) })
    },

    // Call success callback
    onSuccess: (data) => {
      options?.onSuccess?.(data)
    },
  })
}
