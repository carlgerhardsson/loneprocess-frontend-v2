/**
 * useFellistor — React Query hooks för fellistor
 *
 * Används av aktiviteten:
 *   2.2 Granska felsignaler arbetsgivardeklaration (AGI)
 *
 * READ-ONLY: Inga mutationer.
 */

import { useQuery } from '@tanstack/react-query'
import { fetchFellistor, fetchFellistaSummary } from '@/lib/api/la'
import type { FellistorFilters } from '@/types/la'

export const fellistorKeys = {
  all: ['la-fellistor'] as const,
  list: (loneperiodId: number, filters?: FellistorFilters) =>
    [...fellistorKeys.all, loneperiodId, filters ?? {}] as const,
  summary: (loneperiodId: number) =>
    [...fellistorKeys.all, loneperiodId, 'summary'] as const,
}

/**
 * Hämtar fellista för en löneperiod med valfri filtrering.
 *
 * @param loneperiodId - ID för löneperioden
 * @param filters.severity - 'error' | 'warning' | 'info' | undefined
 * @param filters.visa_endast_obehandlade - Visa bara obehandlade fel
 */
export function useFellistor(loneperiodId: number | null, filters?: FellistorFilters) {
  return useQuery({
    queryKey: fellistorKeys.list(loneperiodId!, filters),
    queryFn: () => fetchFellistor(loneperiodId!, filters),
    enabled: loneperiodId !== null,
    staleTime: 2 * 60 * 1000,   // Färsk i 2 min
    gcTime: 10 * 60 * 1000,     // Cache i 10 min
    refetchOnWindowFocus: true,
    retry: 2,
  })
}

/**
 * Hämtar sammanfattning av fellistor (antal fel/varningar/info).
 *
 * @param loneperiodId - ID för löneperioden
 */
export function useFellistaSummary(loneperiodId: number | null) {
  return useQuery({
    queryKey: fellistorKeys.summary(loneperiodId!),
    queryFn: () => fetchFellistaSummary(loneperiodId!),
    enabled: loneperiodId !== null,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
  })
}
