/**
 * useEmployees — React Query hook för LA-anställda
 *
 * Används av aktiviteterna:
 *   1.2 Hantera nyanställningar  → status: 'new'
 *   1.3 Registrera slutlöner     → status: 'terminated'
 *   1.5 Uppdatera tillägg/avdrag → status: undefined (alla)
 *   1.6 Rapportera lönehändelser → status: undefined (alla)
 *
 * READ-ONLY: Inga mutationer.
 */

import { useQuery } from '@tanstack/react-query'
import { fetchEmployees } from '@/lib/api/la'
import type { EmployeeFilters } from '@/types/la'

export const employeesKeys = {
  all: ['la-employees'] as const,
  list: (filters?: EmployeeFilters) => [...employeesKeys.all, filters ?? {}] as const,
}

/**
 * Hämtar anställda med valfri filtrering.
 *
 * @param filters.status - 'new' | 'terminated' | 'active' | undefined
 * @param filters.org_kod - Organisationskod (valfritt)
 * @param filters.limit  - Max antal rader (default 100)
 */
export function useEmployees(filters?: EmployeeFilters) {
  return useQuery({
    queryKey: employeesKeys.list(filters),
    queryFn: () => fetchEmployees(filters),
    staleTime: 5 * 60 * 1000,   // Färsk i 5 min
    gcTime: 10 * 60 * 1000,     // Cache i 10 min
    refetchOnWindowFocus: true,
    // retry styrs av QueryClient-konfigurationen (retry: false i tester)
  })
}
