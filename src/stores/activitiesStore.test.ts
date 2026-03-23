import { describe, it, expect, beforeEach } from 'vitest'
import { useActivitiesStore, getFilteredActivities } from './activitiesStore'
import type { Activity } from '../types'

const mockActivity: Activity = {
  id: '1',
  title: 'Test Activity',
  description: 'Test Description',
  type: 'salary',
  status: 'pending',
  priority: 'high',
  assignedTo: null,
  dueDate: null,
  completedAt: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  periodId: 'period-1',
  checklistItems: [],
  comments: [],
  tags: [],
}

describe('activitiesStore', () => {
  beforeEach(() => {
    useActivitiesStore.setState({
      activities: [],
      selectedActivity: null,
      filters: {},
      isLoading: false,
      error: null,
    })
  })

  it('initializes with correct default state', () => {
    const state = useActivitiesStore.getState()
    expect(state.activities).toEqual([])
    expect(state.selectedActivity).toBeNull()
    expect(state.filters).toEqual({})
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('adds activity', () => {
    useActivitiesStore.getState().addActivity(mockActivity)
    expect(useActivitiesStore.getState().activities).toHaveLength(1)
    expect(useActivitiesStore.getState().activities[0]).toEqual(mockActivity)
  })

  it('updates activity', () => {
    useActivitiesStore.getState().addActivity(mockActivity)
    useActivitiesStore.getState().updateActivity('1', { title: 'Updated Title' })

    const activity = useActivitiesStore.getState().activities[0]
    expect(activity.title).toBe('Updated Title')
  })

  it('deletes activity', () => {
    useActivitiesStore.getState().addActivity(mockActivity)
    expect(useActivitiesStore.getState().activities).toHaveLength(1)

    useActivitiesStore.getState().deleteActivity('1')
    expect(useActivitiesStore.getState().activities).toHaveLength(0)
  })

  it('selects activity', () => {
    useActivitiesStore.getState().setSelectedActivity(mockActivity)
    expect(useActivitiesStore.getState().selectedActivity).toEqual(mockActivity)
  })

  it('filters activities by status', () => {
    const activity1 = { ...mockActivity, id: '1', status: 'pending' as const }
    const activity2 = { ...mockActivity, id: '2', status: 'completed' as const }

    useActivitiesStore.getState().setActivities([activity1, activity2])
    const state = useActivitiesStore.getState()

    const filtered = getFilteredActivities(state.activities, { status: ['pending'] })
    expect(filtered).toHaveLength(1)
    expect(filtered[0].id).toBe('1')
  })

  it('filters activities by search', () => {
    const activity1 = { ...mockActivity, id: '1', title: 'Salary processing' }
    const activity2 = { ...mockActivity, id: '2', title: 'Tax reporting' }

    useActivitiesStore.getState().setActivities([activity1, activity2])
    const state = useActivitiesStore.getState()

    const filtered = getFilteredActivities(state.activities, { search: 'salary' })
    expect(filtered).toHaveLength(1)
    expect(filtered[0].id).toBe('1')
  })

  it('clears filters', () => {
    useActivitiesStore.getState().setFilters({ status: ['pending'], search: 'test' })
    expect(useActivitiesStore.getState().filters).toEqual({ status: ['pending'], search: 'test' })

    useActivitiesStore.getState().clearFilters()
    expect(useActivitiesStore.getState().filters).toEqual({})
  })
})
