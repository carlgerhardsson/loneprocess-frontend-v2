/**
 * API Index
 * Central export for all API functionality
 */

export { apiClient, default as client } from './client'
export { API_ENDPOINTS } from './endpoints'
export * from './errors'
export { activitiesService } from './services/activities'
export { periodsService } from './services/periods'
