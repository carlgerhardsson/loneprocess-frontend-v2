/**
 * Activities API Service
 * UPDATED: Now matches actual backend API schema
 */

import { apiClient } from './client'
import type { Activity, ActivityAPI, CreateActivityData, UpdateActivityData } from '@/types'
import { activityFromAPI } from '@/types'

/**
 * Fetch all activities with optional filtering
 */
export async function fetchActivities(params?: {
  skip?: number
  limit?: number
  process?: string
  roll?: string
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

/**
 * Create a new activity
 * Accepts backend format directly - no transformation needed
 */
export async function createActivity(data: CreateActivityData): Promise<Activity> {
  console.log('[API] Creating activity with data:', data)
  
  const response = await apiClient.post<ActivityAPI>('/activities', data)
  
  console.log('[API] Activity created:', response.data)
  
  return activityFromAPI(response.data)
}

/**
 * Update an existing activity
 * Accepts backend format directly - no transformation needed
 */
export async function updateActivity(id: number, data: UpdateActivityData): Promise<Activity> {
  console.log(`[API] Updating activity ${id} with data:`, data)
  
  const response = await apiClient.put<ActivityAPI>(`/activities/${id}`, data)
  
  console.log('[API] Activity updated:', response.data)
  
  return activityFromAPI(response.data)
}

/**
 * Delete an activity
 */
export async function deleteActivity(id: number): Promise<void> {
  console.log(`[API] Deleting activity ${id}`)
  
  await apiClient.delete(`/activities/${id}`)
  
  console.log(`[API] Activity ${id} deleted`)
}
