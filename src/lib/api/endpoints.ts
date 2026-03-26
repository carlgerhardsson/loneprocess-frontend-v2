/**
 * API Endpoints Configuration
 * Centralized endpoint definitions for type safety
 *
 * OBS: baseURL i apiClient är redan /api/v1
 * Paths här ska INTE inkludera /api/v1-prefix.
 */

export const API_ENDPOINTS = {
  activities: {
    list: '/activities',
    get: (id: string) => `/activities/${id}`,
    create: '/activities',
    update: (id: string) => `/activities/${id}`,
    delete: (id: string) => `/activities/${id}`,
  },
  periods: {
    list: '/loneperiods',
    get: (id: string) => `/loneperiods/${id}`,
    create: '/loneperiods',
    update: (id: string) => `/loneperiods/${id}`,
    delete: (id: string) => `/loneperiods/${id}`,
    progress: (id: string) => `/la/periods/${id}/korningsstatus`,
  },
  health: '/health',
} as const
