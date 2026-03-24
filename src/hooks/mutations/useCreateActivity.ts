/**
 * Create Activity Mutation Hook with Optimistic Updates
 * 
 * Provides optimistic UI updates when creating activities.
 * Updates cache immediately and rolls back on error.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createActivity } from '@/lib/api'
import { activitiesKeys } from '@/hooks/queries/useActivities'
import type { Activity, CreateActivityData } from '@/types'

interface UseCreateActivityOptions {
  onSuccess?: (data: Activity) => void
  onError?: (error: Error) => void
}

export function useCreateActivity(options?: UseCreateActivityOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateActivityData) => createActivity(data),

    // Optimistic update: Add to cache immediately
    onMutate: async (newActivity) => {
      // Cancel outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: activitiesKeys.lists() })

      // Snapshot previous value for rollback
      const previousActivities = queryClient.getQueryData<Activity[]>(activitiesKeys.lists())

      // Optimistically update cache with temporary activity
      queryClient.setQueryData<Activity[]>(activitiesKeys.lists(), (old = []) => [
        {
          ...newActivity,
          id: `temp-${Date.now()}`, // Temporary ID
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          checklistItems: newActivity.checklistItems || [],
          comments: [],
          tags: newActivity.tags || [],
        } as Activity,
        ...old,
      ])

      // Return context for rollback
      return { previousActivities }
    },

    // Rollback on error
    onError: (error, _variables, context) => {
      if (context?.previousActivities) {
        queryClient.setQueryData(activitiesKeys.lists(), context.previousActivities)
      }
      options?.onError?.(error as Error)
    },

    // Refetch to ensure sync with backend
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: activitiesKeys.lists() })
    },

    // Call success callback
    onSuccess: (data) => {
      options?.onSuccess?.(data)
    },
  })
}
