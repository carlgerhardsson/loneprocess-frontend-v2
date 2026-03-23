/**
 * Periods Query Hooks
 * React Query hooks for period data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchPeriods,
  fetchPeriod,
  createPeriod,
  updatePeriod,
  fetchPeriodProgress,
} from '@/lib/api'
import { usePeriodsStore } from '@/stores'
import type { Period } from '@/types'

/**
 * Query keys for periods
 */
export const periodsKeys = {
  all: ['periods'] as const,
  lists: () => [...periodsKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...periodsKeys.lists(), filters || {}] as const,
  details: () => [...periodsKeys.all, 'detail'] as const,
  detail: (id: number) => [...periodsKeys.details(), id] as const,
  progress: (id: number) => [...periodsKeys.detail(id), 'progress'] as const,
}

/**
 * Hook to fetch all periods with optional filtering
 */
export function usePeriods(filters?: {
  skip?: number
  limit?: number
  status?: string
  year?: number
}) {
  const setPeriods = usePeriodsStore(state => state.setPeriods)

  return useQuery({
    queryKey: periodsKeys.list(filters),
    queryFn: async () => {
      const periods = await fetchPeriods(filters)
      // Sync with Zustand store (convert to string IDs)
      const storePeriods = periods.map(p => ({ ...p, id: String(p.id) }))
      setPeriods(storePeriods as never[])
      return periods
    },
  })
}

/**
 * Hook to fetch a single period by ID
 */
export function usePeriod(id: number | null) {
  return useQuery({
    queryKey: periodsKeys.detail(id!),
    queryFn: () => fetchPeriod(id!),
    enabled: id !== null,
  })
}

/**
 * Hook to fetch period progress
 */
export function usePeriodProgress(id: number | null) {
  return useQuery({
    queryKey: periodsKeys.progress(id!),
    queryFn: () => fetchPeriodProgress(id!),
    enabled: id !== null,
  })
}

/**
 * Hook to create a new period
 */
export function useCreatePeriod() {
  const queryClient = useQueryClient()
  const addPeriod = usePeriodsStore(state => state.addPeriod)

  return useMutation({
    mutationFn: createPeriod,
    onSuccess: data => {
      // Update Zustand store (convert to string ID)
      addPeriod({ ...data, id: String(data.id) } as never)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: periodsKeys.lists() })
    },
  })
}

/**
 * Hook to update an existing period
 */
export function useUpdatePeriod() {
  const queryClient = useQueryClient()
  const updatePeriodStore = usePeriodsStore(state => state.updatePeriod)

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Period> }) =>
      updatePeriod(id, data),
    onSuccess: data => {
      updatePeriodStore(String(data.id), { ...data, id: String(data.id) } as never)
      queryClient.invalidateQueries({ queryKey: periodsKeys.lists() })
      queryClient.invalidateQueries({ queryKey: periodsKeys.detail(Number(data.id)) })
    },
  })
}
