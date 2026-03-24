/**
 * Activities API Service - READ-ONLY VERSION
 * Only GET operations - no Create/Update/Delete
 */

import { apiClient } from './client'
import type { Activity, ActivityAPI } from '@/types'
import { activityFromAPI } from '@/types'

/**
 * Fetch all activities with optional filtering
 * Auto-refreshes every 30 seconds via React Query configuration
 */
export async function fetchActivities(params?: {
  skip?: number
  limit?: number
  process?: string
  role?: string
  status?: string
}): Promise<Activity[]> {
  const response = await apiClient.get<ActivityAPI[]>('/activities', { params })
  return response.data.map(activityFromAPI)
}

/**
 * Fetch a single activity by ID
 */
export async function fetchActivity(id: number): Promise<Activity> {
  const response = await apiClient.get<ActivityAPI>(`/activities/${id}`)
  return activityFromAPI(response.data)
}
