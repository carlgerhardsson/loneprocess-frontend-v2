import { describe, it, expect, vi } from 'vitest'
import * as activitiesApi from './activities'
import type { Activity } from '@/types'

// Note: axios is mocked globally in test/setup.ts
// We're just testing that our API functions exist and have correct signatures

const mockActivity: Activity = {
  id: 1,
  title: 'Test Activity',
  description: 'Test description',
  status: 'pending',
  type: 'recurring',
  priority: 'medium',
  assigned_to: 'user1',
  due_date: '2026-04-01',
  created_at: '2026-03-01T10:00:00Z',
  updated_at: '2026-03-01T10:00:00Z',
}

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
