import { QueryClient } from '@tanstack/react-query'

/**
 * TanStack Query Client Configuration
 *
 * Provides centralized query caching, automatic refetching,
 * and error handling for all API requests.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: how long data is considered fresh (5 minutes)
      staleTime: 1000 * 60 * 5,

      // Cache time: how long inactive data stays in cache (10 minutes)
      gcTime: 1000 * 60 * 10,

      // Retry failed queries 3 times with exponential backoff
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch on window focus for fresh data
      refetchOnWindowFocus: true,

      // Refetch on reconnect
      refetchOnReconnect: true,

      // Don't refetch on mount if data is fresh
      refetchOnMount: false,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
      retryDelay: 1000,
    },
  },
})
