import { describe, it, expect } from 'vitest'
import { apiClient } from './client'

describe('apiClient', () => {
  it('should have correct configuration', () => {
    expect(apiClient).toBeDefined()
    expect(apiClient.defaults).toBeDefined()
    expect(apiClient.defaults.baseURL).toBe('http://localhost:8000/api/v1')
    expect(apiClient.defaults.timeout).toBe(30000)
  })

  it('should have X-API-Key header', () => {
    expect(apiClient.defaults.headers['X-API-Key']).toBe('test-api-key')
  })

  it('should have Content-Type header', () => {
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json')
  })
})
