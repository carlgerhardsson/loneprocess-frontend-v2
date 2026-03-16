/**
 * Period & Time Management Types
 */

export interface Period {
  id: string
  name: string
  startDate: string
  endDate: string
  type: PeriodType
  status: PeriodStatus
  createdAt: string
  updatedAt: string
  activityCount: number
  completedActivityCount: number
}

export type PeriodType = 'monthly' | 'quarterly' | 'yearly' | 'custom'

export type PeriodStatus = 'active' | 'completed' | 'archived'

export interface PeriodsState {
  periods: Period[]
  currentPeriod: Period | null
  isLoading: boolean
  error: string | null
}
