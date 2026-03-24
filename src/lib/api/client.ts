/**
 * API Client
 * Axios instance with authentication interceptors
 */

import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://loneprocess-api-922770673146.us-central1.run.app'
const API_KEY = import.meta.env.VITE_LONEPROCESS_API_KEY

/**
 * Axios instance with interceptors for authentication
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    // Add API key if available
    ...(API_KEY && { 'X-API-Key': API_KEY }),
  },
})

/**
 * Request interceptor
 * Adds authentication token to requests
 */
apiClient.interceptors.request.use(
  config => {
    const state = useAuthStore.getState()
    const token = state.session?.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => Promise.reject(error)
)

/**
 * Response interceptor
 * Handles token expiry and refresh
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
