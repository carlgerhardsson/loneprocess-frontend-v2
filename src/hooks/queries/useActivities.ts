import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../../lib/api/services/activities';
import { queryKeys } from '../../lib/query/queryClient';
import type { Activity, ActivityFilters } from '../../types/activity';

/**
 * Fetch all activities with optional filters
 */
export function useActivities(filters?: ActivityFilters) {
  return useQuery({
    queryKey: queryKeys.activities.list(filters),
    queryFn: () => getActivities(filters),
  });
}

/**
 * Fetch a single activity by ID
 */
export function useActivity(id: string) {
  return useQuery({
    queryKey: queryKeys.activities.detail(id),
    queryFn: () => getActivity(id),
    enabled: !!id,
  });
}

/**
 * Create a new activity
 */
export function useCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>) =>
      createActivity(data),
    onSuccess: () => {
      // Invalidate all activity lists to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.activities.lists() });
    },
  });
}

/**
 * Update an existing activity
 */
export function useUpdateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Activity>;
    }) => updateActivity(id, data),
    onSuccess: (_, variables) => {
      // Invalidate the specific activity and all lists
      queryClient.invalidateQueries({
        queryKey: queryKeys.activities.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.activities.lists() });
    },
  });
}

/**
 * Delete an activity
 */
export function useDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteActivity(id),
    onSuccess: (_, id) => {
      // Remove from cache and invalidate lists
      queryClient.removeQueries({ queryKey: queryKeys.activities.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.activities.lists() });
    },
  });
}

/**
 * Update activity with optimistic updates
 * Shows the change immediately while the server request is in flight
 */
export function useOptimisticUpdateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Activity>;
    }) => updateActivity(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.activities.detail(id),
      });

      // Snapshot the previous value
      const previousActivity = queryClient.getQueryData<Activity>(
        queryKeys.activities.detail(id),
      );

      // Optimistically update
      if (previousActivity) {
        queryClient.setQueryData<Activity>(queryKeys.activities.detail(id), {
          ...previousActivity,
          ...data,
          updatedAt: new Date().toISOString(),
        });
      }

      return { previousActivity };
    },
    onError: (_err, { id }, context) => {
      // Rollback on error
      if (context?.previousActivity) {
        queryClient.setQueryData(
          queryKeys.activities.detail(id),
          context.previousActivity,
        );
      }
    },
    onSettled: (_, __, { id }) => {
      // Refetch after mutation
      queryClient.invalidateQueries({
        queryKey: queryKeys.activities.detail(id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.activities.lists() });
    },
  });
}
