/**
 * API Client
 * Axios instance med X-API-Key autentisering
 *
 * OBS: API:et ägs av externt team och kan inte påverkas.
 * Autentisering sker via VITE_LONEPROCESS_API_KEY (API-nyckel).
 */

import axios from 'axios'
import { env } from '@/lib/env'

const API_BASE_URL = env.apiUrl

/**
 * Axios instance med API-nyckel i varje anrop
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Request interceptor
 * Lägger till X-API-Key header på alla anrop
 */
apiClient.interceptors.request.use(
  config => {
    const apiKey = env.apiKey
    if (apiKey) {
      config.headers['X-API-Key'] = apiKey
    }
    return config
  },
  error => Promise.reject(error)
)

/**
 * Response interceptor
 * Hanterar 401 genom att logga ut användaren
 */
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // API-nyckeln är ogiltig eller har återkallats
      // Importera dynamiskt för att undvika cirkulera beroenden
      const { useAuthStore } = await import('@/stores/authStore')
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)
