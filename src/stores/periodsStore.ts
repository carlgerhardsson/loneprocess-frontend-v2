/**
 * Periods Store
 * Manages periods, current period selection, and period switching
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Period, PeriodsState } from '../types'

interface PeriodsActions {
  setPeriods: (periods: Period[]) => void
  addPeriod: (period: Period) => void
  updatePeriod: (id: string, updates: Partial<Period>) => void
  deletePeriod: (id: string) => void
  setCurrentPeriod: (period: Period | null) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  getActivePeriods: () => Period[]
  getCompletedPeriods: () => Period[]
}

type PeriodsStore = PeriodsState & PeriodsActions

export const usePeriodsStore = create<PeriodsStore>()(  persist(
    (set, get) => ({
      // Initial state
      periods: [],
      currentPeriod: null,
      isLoading: false,
      error: null,

      // Actions
      setPeriods: (periods: Period[]) => {
        set({ periods })
      },

      addPeriod: (period: Period) => {
        set(state => ({
          periods: [...state.periods, period],
        }))
      },

      updatePeriod: (id: string, updates: Partial<Period>) => {
        set(state => ({
          periods: state.periods.map(period =>
            period.id === id ? { ...period, ...updates } : period
          ),
          currentPeriod:
            state.currentPeriod?.id === id
              ? { ...state.currentPeriod, ...updates }
              : state.currentPeriod,
        }))
      },

      deletePeriod: (id: string) => {
        set(state => ({
          periods: state.periods.filter(period => period.id !== id),
          currentPeriod: state.currentPeriod?.id === id ? null : state.currentPeriod,
        }))
      },

      setCurrentPeriod: (period: Period | null) => {
        set({ currentPeriod: period })
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading })
      },

      setError: (error: string | null) => {
        set({ error })
      },

      getActivePeriods: () => {
        const { periods } = get()
        return periods.filter(period => period.status === 'active')
      },

      getCompletedPeriods: () => {
        const { periods } = get()
        return periods.filter(period => period.status === 'completed')
      },
    }),
    {
      name: 'periods-storage',
      partialize: (state) => ({
        currentPeriod: state.currentPeriod,
      }),
    }
  )
)
