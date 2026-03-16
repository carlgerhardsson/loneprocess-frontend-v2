import { describe, it, expect, beforeEach } from 'vitest'
import { usePeriodsStore } from './periodsStore'
import type { Period } from '../types'

const mockPeriod: Period = {
  id: '1',
  name: 'January 2026',
  startDate: '2026-01-01',
  endDate: '2026-01-31',
  type: 'monthly',
  status: 'active',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  activityCount: 0,
  completedActivityCount: 0,
}

describe('periodsStore', () => {
  beforeEach(() => {
    usePeriodsStore.setState({
      periods: [],
      currentPeriod: null,
      isLoading: false,
      error: null,
    })
  })

  it('initializes with correct default state', () => {
    const state = usePeriodsStore.getState()
    expect(state.periods).toEqual([])
    expect(state.currentPeriod).toBeNull()
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('adds period', () => {
    usePeriodsStore.getState().addPeriod(mockPeriod)
    expect(usePeriodsStore.getState().periods).toHaveLength(1)
    expect(usePeriodsStore.getState().periods[0]).toEqual(mockPeriod)
  })

  it('updates period', () => {
    usePeriodsStore.getState().addPeriod(mockPeriod)
    usePeriodsStore.getState().updatePeriod('1', { name: 'Updated Period' })

    const period = usePeriodsStore.getState().periods[0]
    expect(period.name).toBe('Updated Period')
  })

  it('deletes period', () => {
    usePeriodsStore.getState().addPeriod(mockPeriod)
    expect(usePeriodsStore.getState().periods).toHaveLength(1)

    usePeriodsStore.getState().deletePeriod('1')
    expect(usePeriodsStore.getState().periods).toHaveLength(0)
  })

  it('sets current period', () => {
    usePeriodsStore.getState().setCurrentPeriod(mockPeriod)
    expect(usePeriodsStore.getState().currentPeriod).toEqual(mockPeriod)
  })

  it('filters active periods', () => {
    const period1 = { ...mockPeriod, id: '1', status: 'active' as const }
    const period2 = { ...mockPeriod, id: '2', status: 'completed' as const }

    usePeriodsStore.getState().setPeriods([period1, period2])

    const active = usePeriodsStore.getState().getActivePeriods()
    expect(active).toHaveLength(1)
    expect(active[0].id).toBe('1')
  })

  it('filters completed periods', () => {
    const period1 = { ...mockPeriod, id: '1', status: 'active' as const }
    const period2 = { ...mockPeriod, id: '2', status: 'completed' as const }

    usePeriodsStore.getState().setPeriods([period1, period2])

    const completed = usePeriodsStore.getState().getCompletedPeriods()
    expect(completed).toHaveLength(1)
    expect(completed[0].id).toBe('2')
  })
})
