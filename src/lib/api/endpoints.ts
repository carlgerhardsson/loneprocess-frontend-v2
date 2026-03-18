/**
 * API Endpoints Configuration
 * Centralized endpoint definitions for type safety
 */

export const API_ENDPOINTS = {
  activities: {
    list: '/api/v1/activities',
    get: (id: string) => `/api/v1/activities/${id}`,
    create: '/api/v1/activities',
    update: (id: string) => `/api/v1/activities/${id}`,
    delete: (id: string) => `/api/v1/activities/${id}`,
  },
  periods: {
    list: '/api/v1/loneperiods',
    get: (id: string) => `/api/v1/loneperiods/${id}`,
    create: '/api/v1/loneperiods',
    update: (id: string) => `/api/v1/loneperiods/${id}`,
    delete: (id: string) => `/api/v1/loneperiods/${id}`,
    progress: (id: string) => `/api/v1/la/periods/${id}/korningsstatus`,
  },
  health: '/health',
} as const
