/**
 * Delete Activity Mutation Hook with Optimistic Updates
 * 
 * Provides optimistic UI updates when deleting activities.
 * Removes from cache immediately and rolls back on error.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteActivity } from '@/lib/api'
import { activitiesKeys } from '@/hooks/queries/useActivities'
import type { Activity } from '@/types'

interface UseDeleteActivityOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useDeleteActivity(options?: UseDeleteActivityOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteActivity(id),

    // Optimistic update: Remove from cache immediately
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: activitiesKeys.lists() })

      // Snapshot previous value
      const previousActivities = queryClient.getQueryData<Activity[]>(activitiesKeys.lists())

      // Optimistically remove from cache
      queryClient.setQueryData<Activity[]>(activitiesKeys.lists(), (old = []) =>
        old.filter(activity => activity.id !== String(id))
      )

      // Remove detail cache
      queryClient.removeQueries({ queryKey: activitiesKeys.detail(id) })

      return { previousActivities }
    },

    // Rollback on error
    onError: (error, _id, context) => {
      if (context?.previousActivities) {
        queryClient.setQueryData(activitiesKeys.lists(), context.previousActivities)
      }
      options?.onError?.(error as Error)
    },

    // Refetch to ensure sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: activitiesKeys.lists() })
    },

    // Call success callback
    onSuccess: () => {
      options?.onSuccess?.()
    },
  })
}
