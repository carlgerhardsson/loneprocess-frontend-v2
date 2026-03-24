/**
 * Periods API Service
 * Handles all period-related API calls
 */

import { apiClient } from './client'
import type { Period } from '@/types'

interface CreatePeriodData {
  name: string
  start_date: string
  end_date: string
  status?: string
}

interface UpdatePeriodData {
  name?: string
  start_date?: string
  end_date?: string
  status?: string
}

interface PeriodProgress {
  total_activities: number
  completed_activities: number
  completion_percentage: number
  activities_by_status: Record<string, number>
}

/**
 * Fetch all periods with optional filtering
 */
export async function fetchPeriods(params?: {
  skip?: number
  limit?: number
  status?: string
  year?: number
}): Promise<Period[]> {
  const response = await apiClient.get<Period[]>('/loneperiods', { params })
  return response.data
}

/**
 * Fetch a single period by ID
 */
export async function fetchPeriod(id: number): Promise<Period> {
  const response = await apiClient.get<Period>(`/loneperiods/${id}`)
  return response.data
}

/**
 * Create a new period
 */
export async function createPeriod(data: CreatePeriodData): Promise<Period> {
  const response = await apiClient.post<Period>('/loneperiods', data)
  return response.data
}

/**
 * Update an existing period
 */
export async function updatePeriod(id: number, data: UpdatePeriodData): Promise<Period> {
  const response = await apiClient.put<Period>(`/loneperiods/${id}`, data)
  return response.data
}

/**
 * Fetch period progress/statistics
 */
export async function fetchPeriodProgress(id: number): Promise<PeriodProgress> {
  const response = await apiClient.get<PeriodProgress>(`/loneperiods/${id}/progress`)
  return response.data
}

/**
 * Add activities to a period
 */
export async function addActivitiesToPeriod(
  periodId: number,
  activityIds: number[]
): Promise<{ message: string; added_count: number }> {
  const response = await apiClient.post(`/loneperiods/${periodId}/activities`, {
    activity_ids: activityIds,
  })
  return response.data
}
