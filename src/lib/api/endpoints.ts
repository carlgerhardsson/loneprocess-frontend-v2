/**
 * API Endpoints
 * Centralized endpoint definitions
 */

export const API_ENDPOINTS = {
  // Activities
  activities: {
    list: '/api/v1/activities',
    get: (id: string) => `/api/v1/activities/${id}`,
    create: '/api/v1/activities',
    update: (id: string) => `/api/v1/activities/${id}`,
    delete: (id: string) => `/api/v1/activities/${id}`,
  },

  // Löneperiods
  periods: {
    list: '/api/v1/loneperiods',
    get: (id: string) => `/api/v1/loneperiods/${id}`,
    create: '/api/v1/loneperiods',
    update: (id: string) => `/api/v1/loneperiods/${id}`,
    progress: (id: string) => `/api/v1/loneperiods/${id}/progress`,
    korningsstatus: (id: string) => `/api/v1/la/periods/${id}/korningsstatus`,
  },

  // LA Integration
  la: {
    // Employees
    syncEmployees: '/api/v1/la/sync/employees',
    employees: '/api/v1/la/employees',

    // Absences
    absences: '/api/v1/la/absences',

    // Vacation
    vacationBalances: '/api/v1/la/vacation-balances',

    // Fellistor (v3.0)
    fellistor: {
      get: (periodId: string) => `/api/v1/la/fellistor/${periodId}`,
      summary: (periodId: string) => `/api/v1/la/fellistor/${periodId}/summary`,
      update: (errorId: string) => `/api/v1/la/fellistor/${errorId}`,
    },
  },

  // Health check
  health: '/health',
} as const
