/**
 * API Client
 * Axios instance with authentication and API key
 */

import axios from 'axios'
import { env } from '@/config'
import { useAuthStore } from '@/stores/authStore'

/**
 * Axios instance configured for backend API
 *
 * Uses:
 * - X-API-Key header for backend authentication
 * - Bearer token for future user-level auth (currently mock)
 */
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': env.apiKey, // Backend requires API key
  },
})

/**
 * Request interceptor
 * Adds authentication token to requests (for future use)
 */
apiClient.interceptors.request.use(
  config => {
    const state = useAuthStore.getState()
    const token = state.session?.token

    // Add Bearer token if available (for future user-level auth)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => Promise.reject(error)
)

/**
 * Response interceptor
 * Handles errors and token refresh
 */
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    // If 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh the token
        const success = await useAuthStore.getState().refreshToken()

        if (success) {
          // Retry the original request with new token
          const token = useAuthStore.getState().session?.token
          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, logout
        useAuthStore.getState().logout()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
