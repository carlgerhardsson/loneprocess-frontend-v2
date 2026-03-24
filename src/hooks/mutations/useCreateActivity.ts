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

      // Create temporary optimistic activity with proper Activity structure
      const tempActivity: Activity = {
        id: `temp-${Date.now()}`,
        title: newActivity.title,
        description: newActivity.description || '',
        type: newActivity.type || 'other',
        status: newActivity.status || 'pending',
        priority: newActivity.priority || 'medium',
        assignedTo: newActivity.assigned_to || null,
        dueDate: newActivity.due_date || null,
        completedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        periodId: newActivity.period_id ? String(newActivity.period_id) : '',
        checklistItems: [],
        comments: [],
        tags: [],
      }

      // Optimistically update cache
      queryClient.setQueryData<Activity[]>(activitiesKeys.lists(), (old = []) => [
        tempActivity,
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
