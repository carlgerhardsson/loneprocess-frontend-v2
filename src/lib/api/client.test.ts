import { describe, it, expect, beforeEach, vi } from 'vitest'
import { apiClient } from './client'
import { useAuthStore } from '@/stores/authStore'

// Mock env module
vi.mock('@/config', () => ({
  env: {
    apiBaseUrl: 'http://localhost:8000/api/v1',
    apiKey: 'test-api-key',
  },
}))

describe('apiClient', () => {
  beforeEach(() => {
    useAuthStore.getState().logout()
  })

  it('should be configured with base URL', () => {
    expect(apiClient.defaults.baseURL).toBe('http://localhost:8000/api/v1')
  })

  it('should have X-API-Key header', () => {
    expect(apiClient.defaults.headers['X-API-Key']).toBe('test-api-key')
  })

  it('should have timeout configured', () => {
    expect(apiClient.defaults.timeout).toBe(30000)
  })

  it('should have Content-Type header', () => {
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json')
  })
})
