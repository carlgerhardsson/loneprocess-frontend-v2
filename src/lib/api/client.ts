/**
 * API Client
 * Axios-based HTTP client with retry logic and error handling
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_TIMEOUT = 30000 // 30 seconds
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add auth token if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage (auth store persistence)
    const authStorage = localStorage.getItem('auth-storage')
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage)
        if (state?.session?.token) {
          config.headers.Authorization = `Bearer ${state.session.token}`
        }
      } catch (error) {
        console.error('Failed to parse auth storage:', error)
      }
    }
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor - handle errors and retries
apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const config = error.config as InternalAxiosRequestConfig & { _retryCount?: number }

    // Don't retry if no config
    if (!config) {
      return Promise.reject(error)
    }

    // Initialize retry count
    config._retryCount = config._retryCount || 0

    // Check if we should retry
    const shouldRetry =
      config._retryCount < MAX_RETRIES &&
      error.response?.status &&
      (error.response.status >= 500 || // Server errors
        error.response.status === 429 || // Rate limit
        error.code === 'ECONNABORTED' || // Timeout
        error.code === 'ERR_NETWORK') // Network error

    if (shouldRetry) {
      config._retryCount += 1

      // Exponential backoff
      const delay = RETRY_DELAY * Math.pow(2, config._retryCount - 1)

      console.log(
        `Retrying request (${config._retryCount}/${MAX_RETRIES}) after ${delay}ms:`,
        config.url
      )

      await new Promise(resolve => setTimeout(resolve, delay))

      return apiClient(config)
    }

    // Log error for debugging
    console.error('API Error:', {
      url: config.url,
      method: config.method,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    })

    return Promise.reject(error)
  }
)

export { apiClient }
export default apiClient
