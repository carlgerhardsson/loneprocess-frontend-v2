import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { activitiesService } from '@/lib/api/services/activities';
import { useActivitiesStore } from '@/stores';
import type { Activity, ActivityFilters } from '@/types';

/**
 * Query keys for activities
 */
export const activitiesKeys = {
  all: ['activities'] as const,
  lists: () => [...activitiesKeys.all, 'list'] as const,
  list: (filters: ActivityFilters) => [...activitiesKeys.lists(), filters] as const,
  details: () => [...activitiesKeys.all, 'detail'] as const,
  detail: (id: string) => [...activitiesKeys.details(), id] as const,
};

/**
 * Hook to fetch all activities with optional filtering
 */
export function useActivities(filters?: ActivityFilters) {
  const setActivities = useActivitiesStore((state) => state.setActivities);

  return useQuery({
    queryKey: activitiesKeys.list(filters || {}),
    queryFn: async () => {
      const activities = await activitiesService.list();
      // Sync with Zustand store
      setActivities(activities);
      return activities;
    },
  });
}

/**
 * Hook to fetch a single activity by ID
 */
export function useActivity(id: string) {
  return useQuery({
    queryKey: activitiesKeys.detail(id),
    queryFn: () => activitiesService.get(id),
    enabled: !!id,
  });
}

/**
 * Hook to create a new activity
 */
export function useCreateActivity() {
  const queryClient = useQueryClient();
  const addActivity = useActivitiesStore((state) => state.addActivity);

  return useMutation({
    mutationFn: activitiesService.create,
    onMutate: async (newActivity) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: activitiesKeys.lists() });

      // Snapshot previous value
      const previousActivities = queryClient.getQueryData(activitiesKeys.lists());

      // Optimistically update to the new value
      queryClient.setQueryData(activitiesKeys.lists(), (old: Activity[] = []) => [
        ...old,
        { ...newActivity, id: `temp-${Date.now()}`, createdAt: new Date().toISOString() },
      ]);

      return { previousActivities };
    },
    onSuccess: (data) => {
      // Update Zustand store
      addActivity(data);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: activitiesKeys.lists() });
    },
    onError: (_error, _newActivity, context) => {
      // Rollback on error
      if (context?.previousActivities) {
        queryClient.setQueryData(activitiesKeys.lists(), context.previousActivities);
      }
    },
  });
}

/**
 * Hook to update an existing activity
 */
export function useUpdateActivity() {
  const queryClient = useQueryClient();
  const updateActivity = useActivitiesStore((state) => state.updateActivity);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Activity> }) =>
      activitiesService.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: activitiesKeys.detail(id) });

      const previousActivity = queryClient.getQueryData(activitiesKeys.detail(id));

      // Optimistically update
      queryClient.setQueryData(activitiesKeys.detail(id), (old: Activity | undefined) =>
        old ? { ...old, ...data } : old
      );

      return { previousActivity };
    },
    onSuccess: (data) => {
      updateActivity(data.id, data);
      queryClient.invalidateQueries({ queryKey: activitiesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: activitiesKeys.detail(data.id) });
    },
    onError: (_error, { id }, context) => {
      if (context?.previousActivity) {
        queryClient.setQueryData(activitiesKeys.detail(id), context.previousActivity);
      }
    },
  });
}

/**
 * Hook to delete an activity
 */
export function useDeleteActivity() {
  const queryClient = useQueryClient();
  const deleteActivity = useActivitiesStore((state) => state.deleteActivity);

  return useMutation({
    mutationFn: activitiesService.delete,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: activitiesKeys.lists() });

      const previousActivities = queryClient.getQueryData(activitiesKeys.lists());

      // Optimistically remove
      queryClient.setQueryData(activitiesKeys.lists(), (old: Activity[] = []) =>
        old.filter((activity) => activity.id !== id)
      );

      return { previousActivities };
    },
    onSuccess: (_data, id) => {
      deleteActivity(id);
      queryClient.invalidateQueries({ queryKey: activitiesKeys.lists() });
      queryClient.removeQueries({ queryKey: activitiesKeys.detail(id) });
    },
    onError: (_error, _id, context) => {
      if (context?.previousActivities) {
        queryClient.setQueryData(activitiesKeys.lists(), context.previousActivities);
      }
    },
  });
}
