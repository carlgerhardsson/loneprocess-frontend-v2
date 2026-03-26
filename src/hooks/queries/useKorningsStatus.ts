/**
 * useKorningsStatus — React Query hook för körningsstatus
 *
 * Används av aktiviteterna:
 *   2.1 Starta och granska provlönekörning → visar status + progress
 *   3.1 Starta och bekräfta definitiv lönekörning → visar status + sammanfattning
 *
 * READ-ONLY: Inga mutationer.
 * Pollar var 30:e sekund för att hålla status uppdaterad under pågående körning.
 */

import { useQuery } from '@tanstack/react-query'
import { fetchKorningsStatus } from '@/lib/api/la'

export const korningsStatusKeys = {
  all: ['la-korningsstatus'] as const,
  detail: (loneperiodId: number) => [...korningsStatusKeys.all, loneperiodId] as const,
}

/**
 * Hämtar körningsstatus för en löneperiod.
 * Pollar var 30:e sekund medan en körning pågår.
 *
 * @param loneperiodId - ID för löneperioden
 */
export function useKorningsStatus(loneperiodId: number | null) {
  return useQuery({
    queryKey: korningsStatusKeys.detail(loneperiodId!),
    queryFn: () => fetchKorningsStatus(loneperiodId!),
    enabled: loneperiodId !== null,
    staleTime: 15 * 1000,         // Färsk i 15 sek
    gcTime: 5 * 60 * 1000,        // Cache i 5 min
    refetchInterval: 30 * 1000,   // Polla var 30:e sekund
    refetchOnWindowFocus: true,
    // retry styrs av QueryClient-konfigurationen (retry: false i tester)
  })
}
