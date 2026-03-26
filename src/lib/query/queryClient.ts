import { QueryClient } from '@tanstack/react-query'

/**
 * TanStack Query client — Cache & Persistence-konfiguration
 *
 * Strategier per datatyp:
 *
 * 🔵 Aktiviteter & perioder (relativt stabila)
 *   staleTime: 5 min — anses färsk i 5 minuter
 *   gcTime: 15 min — behålls i cache i 15 minuter
 *
 * 🟠 Körningsstatus (förändras under pågående körning)
 *   staleTime: 15 sek — pollas var 30 sek via refetchInterval i hooken
 *
 * 🟢 Fellistor
 *   staleTime: 2 min — uppdateras när handläggare behandlar fel
 *
 * Globala inställningar:
 *   retry: 1 — ett nytt försök vid fel
 *   refetchOnWindowFocus: true — uppdatera när användaren återkommer till fönstret
 *   refetchOnReconnect: true — uppdatera vid återuppkoppling
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minuter (standard)
      gcTime: 1000 * 60 * 15, // 15 minuter i cache
      retry: 1,
      refetchOnWindowFocus: true, // Uppdatera när användaren återkommer
      refetchOnReconnect: true, // Uppdatera vid nätverksåteruppkoppling
    },
    mutations: {
      retry: 0,
    },
  },
})

/**
 * Cache-tider per datatyp
 * Används i respektive query hook för att överrides default.
 */
export const CACHE_CONFIG = {
  /** Aktiviteter — stabila, ändras sällan */
  activities: {
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
  },
  /** Löneperioder — stabila */
  periods: {
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
  },
  /** Anställda — stabila under löneperioden */
  employees: {
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  },
  /** Körningsstatus — förändras snabbt vid aktiv körning */
  korningsstatus: {
    staleTime: 1000 * 15, // 15 sekunder
    gcTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 30, // Polla var 30 sekunder
  },
  /** Fellistor — uppdateras när fel behandlas */
  fellistor: {
    staleTime: 1000 * 60 * 2, // 2 minuter
    gcTime: 1000 * 60 * 10,
  },
} as const

/**
 * Query keys factory — typ-säkra cache-nycklar
 */
export const queryKeys = {
  activities: {
    all: ['activities'] as const,
    lists: () => [...queryKeys.activities.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.activities.lists(), filters] as const,
    detail: (id: string) => [...queryKeys.activities.all, 'detail', id] as const,
  },
  periods: {
    all: ['periods'] as const,
    lists: () => [...queryKeys.periods.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.periods.lists(), filters] as const,
    detail: (id: string) => [...queryKeys.periods.all, 'detail', id] as const,
    progress: (id: string) => [...queryKeys.periods.detail(id), 'progress'] as const,
  },
  la: {
    employees: (filters?: Record<string, unknown>) => ['la-employees', filters ?? {}] as const,
    korningsstatus: (id: number) => ['la-korningsstatus', id] as const,
    fellistor: (id: number, filters?: Record<string, unknown>) =>
      ['la-fellistor', id, filters ?? {}] as const,
    fellistaSummary: (id: number) => ['la-fellistor', id, 'summary'] as const,
  },
} as const
