import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { periodsService } from '@/lib/api/services/periods'
import { usePeriodsStore } from '@/stores'
import type { Period } from '@/types'

/**
 * Query keys for periods
 */
export const periodsKeys = {
  all: ['periods'] as const,
  lists: () => [...periodsKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...periodsKeys.lists(), filters] as const,
  details: () => [...periodsKeys.all, 'detail'] as const,
  detail: (id: string) => [...periodsKeys.details(), id] as const,
  progress: (id: string) => [...periodsKeys.detail(id), 'progress'] as const,
}

/**
 * Hook to fetch all periods
 */
export function usePeriods() {
  const setPeriods = usePeriodsStore(state => state.setPeriods)

  return useQuery({
    queryKey: periodsKeys.list(),
    queryFn: async () => {
      const periods = await periodsService.list()
      // Sync with Zustand store
      setPeriods(periods)
      return periods
    },
  })
}

/**
 * Hook to fetch a single period by ID
 */
export function usePeriod(id: string) {
  return useQuery({
    queryKey: periodsKeys.detail(id),
    queryFn: () => periodsService.get(id),
    enabled: !!id,
  })
}

/**
 * Hook to fetch period progress
 */
export function usePeriodProgress(id: string) {
  return useQuery({
    queryKey: periodsKeys.progress(id),
    queryFn: () => periodsService.getProgress(id),
    enabled: !!id,
    // Refetch progress more frequently
    refetchInterval: 1000 * 30, // 30 seconds
  })
}

/**
 * Hook to create a new period
 */
export function useCreatePeriod() {
  const queryClient = useQueryClient()
  const addPeriod = usePeriodsStore(state => state.addPeriod)

  return useMutation({
    mutationFn: periodsService.create,
    onMutate: async newPeriod => {
      await queryClient.cancelQueries({ queryKey: periodsKeys.lists() })

      const previousPeriods = queryClient.getQueryData(periodsKeys.lists())

      // Optimistically update
      queryClient.setQueryData(periodsKeys.lists(), (old: Period[] = []) => [
        ...old,
        {
          ...newPeriod,
          id: `temp-${Date.now()}`,
          createdAt: new Date().toISOString(),
        },
      ])

      return { previousPeriods }
    },
    onSuccess: data => {
      addPeriod(data)
      queryClient.invalidateQueries({ queryKey: periodsKeys.lists() })
    },
    onError: (_error, _newPeriod, context) => {
      if (context?.previousPeriods) {
        queryClient.setQueryData(periodsKeys.lists(), context.previousPeriods)
      }
    },
  })
}

/**
 * Hook to update an existing period
 */
export function useUpdatePeriod() {
  const queryClient = useQueryClient()
  const updatePeriod = usePeriodsStore(state => state.updatePeriod)

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Period> }) =>
      periodsService.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: periodsKeys.detail(id) })

      const previousPeriod = queryClient.getQueryData(periodsKeys.detail(id))

      // Optimistically update
      queryClient.setQueryData(periodsKeys.detail(id), (old: Period | undefined) =>
        old ? { ...old, ...data } : old
      )

      return { previousPeriod }
    },
    onSuccess: data => {
      updatePeriod(data.id, data)
      queryClient.invalidateQueries({ queryKey: periodsKeys.lists() })
      queryClient.invalidateQueries({ queryKey: periodsKeys.detail(data.id) })
    },
    onError: (_error, { id }, context) => {
      if (context?.previousPeriod) {
        queryClient.setQueryData(periodsKeys.detail(id), context.previousPeriod)
      }
    },
  })
}

/**
 * Hook to delete a period
 */
export function useDeletePeriod() {
  const queryClient = useQueryClient()
  const deletePeriod = usePeriodsStore(state => state.deletePeriod)

  return useMutation({
    mutationFn: periodsService.delete,
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: periodsKeys.lists() })

      const previousPeriods = queryClient.getQueryData(periodsKeys.lists())

      // Optimistically remove
      queryClient.setQueryData(periodsKeys.lists(), (old: Period[] = []) =>
        old.filter(period => period.id !== id)
      )

      return { previousPeriods }
    },
    onSuccess: (_data, id) => {
      deletePeriod(id)
      queryClient.invalidateQueries({ queryKey: periodsKeys.lists() })
      queryClient.removeQueries({ queryKey: periodsKeys.detail(id) })
    },
    onError: (_error, _id, context) => {
      if (context?.previousPeriods) {
        queryClient.setQueryData(periodsKeys.lists(), context.previousPeriods)
      }
    },
  })
}
