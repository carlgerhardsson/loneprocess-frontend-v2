import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'
import { apiClient } from './client'

describe('apiClient', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('should be an axios instance', () => {
    expect(apiClient).toBeDefined()
    expect(typeof apiClient.get).toBe('function')
    expect(typeof apiClient.post).toBe('function')
  })

  it('should have correct base configuration', () => {
    expect(apiClient.defaults.baseURL).toBeTruthy()
    expect(apiClient.defaults.timeout).toBe(30000)
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json')
  })

  it('should attach auth token from localStorage', async () => {
    // Mock auth storage
    const mockAuth = {
      state: {
        session: {
          token: 'test-token-123',
        },
      },
    }
    localStorage.setItem('auth-storage', JSON.stringify(mockAuth))

    // Create a mock adapter to test the request
    const mockAdapter = vi.fn()
    apiClient.interceptors.request.use(config => {
      mockAdapter(config)
      // Prevent actual request
      return Promise.reject(new axios.Cancel('Test'))
    })

    try {
      await apiClient.get('/test')
    } catch (error) {
      // Expected to fail
    }

    expect(mockAdapter).toHaveBeenCalled()
    const config = mockAdapter.mock.calls[0][0]
    expect(config.headers.Authorization).toBe('Bearer test-token-123')
  })

  it('should not attach token if not in localStorage', async () => {
    const mockAdapter = vi.fn()
    apiClient.interceptors.request.use(config => {
      mockAdapter(config)
      return Promise.reject(new axios.Cancel('Test'))
    })

    try {
      await apiClient.get('/test')
    } catch (error) {
      // Expected to fail
    }

    const config = mockAdapter.mock.calls[0][0]
    expect(config.headers.Authorization).toBeUndefined()
  })
})
