import { describe, it, expect, beforeEach } from 'vitest'
import { useActivitiesStore } from './activitiesStore'
import type { Activity } from '../types'

const mockActivity: Activity = {
  id: '1',
  processNr: '20.1',
  process: 'Test Process',
  fas: 'Planering',
  roll: 'Löneadministratör',
  priority: 3,
  status: 'active',
  behov: 'Test need',
  outInput: null,
  skaIngaILoneperiod: false,
  effektenVardet: null,
  extraInfo: null,
  acceptans: null,
  featureLosning: null,
  senastUtford: null,
  createdAt: '2024-01-01T10:00:00Z',
  updatedAt: '2024-01-01T10:00:00Z',
}

describe('activitiesStore - READ-ONLY VERSION', () => {
  beforeEach(() => {
    useActivitiesStore.setState({
      activities: [],
      selectedActivity: null,
      filters: {},
      isLoading: false,
      error: null,
    })
  })

  it('sets activities', () => {
    useActivitiesStore.getState().setActivities([mockActivity])
    expect(useActivitiesStore.getState().activities).toHaveLength(1)
  })

  it('adds activity', () => {
    useActivitiesStore.getState().addActivity(mockActivity)
    expect(useActivitiesStore.getState().activities).toHaveLength(1)
  })

  it('updates activity', () => {
    useActivitiesStore.getState().setActivities([mockActivity])
    useActivitiesStore.getState().updateActivity('1', { process: 'Updated Process' })

    const activity = useActivitiesStore.getState().activities[0]
    expect(activity.process).toBe('Updated Process')
  })

  it('deletes activity', () => {
    useActivitiesStore.getState().setActivities([mockActivity])
    useActivitiesStore.getState().deleteActivity('1')
    expect(useActivitiesStore.getState().activities).toHaveLength(0)
  })

  it('selects activity', () => {
    useActivitiesStore.getState().selectActivity(mockActivity)
    expect(useActivitiesStore.getState().selectedActivity).toEqual(mockActivity)
  })

  it('filters by status', () => {
    useActivitiesStore.getState().setActivities([mockActivity])
    useActivitiesStore.getState().setFilters({ status: ['active'] })

    const filtered = useActivitiesStore.getState().getFilteredActivities()
    expect(filtered).toHaveLength(1)
  })

  it('filters by search', () => {
    useActivitiesStore.getState().setActivities([mockActivity])
    useActivitiesStore.getState().setFilters({ search: 'test' })

    const filtered = useActivitiesStore.getState().getFilteredActivities()
    expect(filtered).toHaveLength(1)
  })

  it('clears filters', () => {
    useActivitiesStore.getState().setFilters({ status: ['active'] })
    useActivitiesStore.getState().clearFilters()
    expect(useActivitiesStore.getState().filters).toEqual({})
  })
})
