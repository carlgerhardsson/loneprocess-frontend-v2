import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPeriods,
  getPeriod,
  createPeriod,
  updatePeriod,
  deletePeriod,
  getPeriodProgress,
} from '../../lib/api/services/periods';
import { queryKeys } from '../../lib/query/queryClient';
import type { Period } from '../../types/period';

interface PeriodFilters {
  year?: number;
  type?: Period['type'];
  status?: Period['status'];
}

/**
 * Fetch all periods with optional filters
 */
export function usePeriods(filters?: PeriodFilters) {
  return useQuery({
    queryKey: queryKeys.periods.list(filters),
    queryFn: () => getPeriods(filters),
  });
}

/**
 * Fetch a single period by ID
 */
export function usePeriod(id: string) {
  return useQuery({
    queryKey: queryKeys.periods.detail(id),
    queryFn: () => getPeriod(id),
    enabled: !!id,
  });
}

/**
 * Fetch period progress/completion status
 */
export function usePeriodProgress(id: string) {
  return useQuery({
    queryKey: queryKeys.periods.progress(id),
    queryFn: () => getPeriodProgress(id),
    enabled: !!id,
    // Refetch progress more frequently as it changes often
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Create a new period
 */
export function useCreatePeriod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Period, 'id' | 'createdAt' | 'updatedAt'>) =>
      createPeriod(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.periods.lists() });
    },
  });
}

/**
 * Update an existing period
 */
export function useUpdatePeriod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Period> }) =>
      updatePeriod(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.periods.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.periods.lists() });
      // Also invalidate progress as period update might affect it
      queryClient.invalidateQueries({
        queryKey: queryKeys.periods.progress(variables.id),
      });
    },
  });
}

/**
 * Delete a period
 */
export function useDeletePeriod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePeriod(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.periods.detail(id) });
      queryClient.removeQueries({ queryKey: queryKeys.periods.progress(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.periods.lists() });
    },
  });
}
