import { describe, it, expect } from 'vitest'
import { queryClient, CACHE_CONFIG, queryKeys } from './queryClient'

describe('queryClient', () => {
  it('skapas korrekt', () => {
    expect(queryClient).toBeDefined()
  })

  it('har rätt default staleTime (5 min)', () => {
    const defaults = queryClient.getDefaultOptions().queries
    expect(defaults?.staleTime).toBe(1000 * 60 * 5)
  })

  it('har rätt gcTime (15 min)', () => {
    const defaults = queryClient.getDefaultOptions().queries
    expect(defaults?.gcTime).toBe(1000 * 60 * 15)
  })

  it('har retry: 1', () => {
    const defaults = queryClient.getDefaultOptions().queries
    expect(defaults?.retry).toBe(1)
  })

  it('har refetchOnWindowFocus: true', () => {
    const defaults = queryClient.getDefaultOptions().queries
    expect(defaults?.refetchOnWindowFocus).toBe(true)
  })
})

describe('CACHE_CONFIG', () => {
  it('körningsstatus har kortare staleTime än activities', () => {
    expect(CACHE_CONFIG.korningsstatus.staleTime).toBeLessThan(CACHE_CONFIG.activities.staleTime)
  })

  it('körningsstatus har refetchInterval', () => {
    expect(CACHE_CONFIG.korningsstatus.refetchInterval).toBeDefined()
    expect(CACHE_CONFIG.korningsstatus.refetchInterval).toBe(1000 * 30)
  })

  it('fellistor har kortare staleTime än activities', () => {
    expect(CACHE_CONFIG.fellistor.staleTime).toBeLessThan(CACHE_CONFIG.activities.staleTime)
  })
})

describe('queryKeys', () => {
  it('activities keys är unika', () => {
    const list1 = queryKeys.activities.list({ status: 'active' })
    const list2 = queryKeys.activities.list({ status: 'inactive' })
    expect(list1).not.toEqual(list2)
  })

  it('la korningsstatus key innehåller period-id', () => {
    expect(queryKeys.la.korningsstatus(42)).toContain(42)
  })

  it('la fellistor key innehåller period-id', () => {
    expect(queryKeys.la.fellistor(42)).toContain(42)
  })

  it('la fellistaSummary key är unik från fellistor', () => {
    const list = queryKeys.la.fellistor(42)
    const summary = queryKeys.la.fellistaSummary(42)
    expect(list).not.toEqual(summary)
  })
})
