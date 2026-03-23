import { describe, it, expect } from 'vitest'
import * as activitiesApi from './activities'

// Note: axios is mocked globally in test/setup.ts
// We're just testing that our API functions exist and have correct signatures

describe('Activities API', () => {
  it('should export fetchActivities function', () => {
    expect(activitiesApi.fetchActivities).toBeDefined()
    expect(typeof activitiesApi.fetchActivities).toBe('function')
  })

  it('should export fetchActivity function', () => {
    expect(activitiesApi.fetchActivity).toBeDefined()
    expect(typeof activitiesApi.fetchActivity).toBe('function')
  })

  it('should export createActivity function', () => {
    expect(activitiesApi.createActivity).toBeDefined()
    expect(typeof activitiesApi.createActivity).toBe('function')
  })

  it('should export updateActivity function', () => {
    expect(activitiesApi.updateActivity).toBeDefined()
    expect(typeof activitiesApi.updateActivity).toBe('function')
  })

  it('should export deleteActivity function', () => {
    expect(activitiesApi.deleteActivity).toBeDefined()
    expect(typeof activitiesApi.deleteActivity).toBe('function')
  })
})
