import { describe, it, expect } from 'vitest'
import { env } from './env'

describe('env', () => {
  it('should have apiBaseUrl', () => {
    expect(env.apiBaseUrl).toBeDefined()
    expect(typeof env.apiBaseUrl).toBe('string')
  })

  it('should have apiKey', () => {
    expect(env.apiKey).toBeDefined()
    expect(typeof env.apiKey).toBe('string')
  })

  it('should have environment', () => {
    expect(env.environment).toBeDefined()
    expect(['development', 'staging', 'production']).toContain(env.environment)
  })

  it('should have isDevelopment', () => {
    expect(typeof env.isDevelopment).toBe('boolean')
  })

  it('should have isProduction', () => {
    expect(typeof env.isProduction).toBe('boolean')
  })
})
