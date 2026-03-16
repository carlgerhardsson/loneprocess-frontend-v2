import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query client configuration
 * 
 * Caching strategy:
 * - staleTime: 5min - data considered fresh for 5 minutes
 * - gcTime: 10min - unused data kept in cache for 10 minutes
 * - retry: 1 - retry failed queries once before giving up
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0, // Don't retry mutations
    },
  },
});

/**
 * Query keys factory for type-safe and organized cache keys
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
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.periods.lists(), filters] as const,
    detail: (id: string) => [...queryKeys.periods.all, 'detail', id] as const,
    progress: (id: string) => [...queryKeys.periods.detail(id), 'progress'] as const,
  },
} as const;
