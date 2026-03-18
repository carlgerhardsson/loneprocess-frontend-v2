import { describe, it, expect } from 'vitest'
import { queryClient } from './queryClient'

describe('queryClient', () => {
  it('should be defined', () => {
    expect(queryClient).toBeDefined()
  })

  it('should have default options configured', () => {
    const defaultOptions = queryClient.getDefaultOptions()
    expect(defaultOptions.queries).toBeDefined()
  })

  it('should have configured staleTime', () => {
    const defaultOptions = queryClient.getDefaultOptions()
    expect(defaultOptions.queries?.staleTime).toBe(1000 * 60 * 5) // 5 minutes
  })
})
