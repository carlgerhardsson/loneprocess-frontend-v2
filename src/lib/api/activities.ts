/**
 * Activities API Service
 * Handles all activity-related API calls
 */

import { apiClient } from './client'
import type { Activity, ActivityAPI, CreateActivityData, UpdateActivityData, activityFromAPI } from '@/types'
import { activityFromAPI as convertActivity } from '@/types'

/**
 * Fetch all activities with optional filtering
 */
export async function fetchActivities(params?: {
  skip?: number
  limit?: number
  process?: string
  role?: string
  status?: string
}): Promise<Activity[]> {
  const response = await apiClient.get<ActivityAPI[]>('/activities', { params })
  return response.data.map(convertActivity)
}

/**
 * Fetch a single activity by ID
 */
export async function fetchActivity(id: number): Promise<Activity> {
  const response = await apiClient.get<ActivityAPI>(`/activities/${id}`)
  return convertActivity(response.data)
}

/**
 * Create a new activity
 */
export async function createActivity(data: CreateActivityData): Promise<Activity> {
  const response = await apiClient.post<ActivityAPI>('/activities', data)
  return convertActivity(response.data)
}

/**
 * Update an existing activity
 */
export async function updateActivity(id: number, data: UpdateActivityData): Promise<Activity> {
  const response = await apiClient.put<ActivityAPI>(`/activities/${id}`, data)
  return convertActivity(response.data)
}

/**
 * Delete an activity
 */
export async function deleteActivity(id: number): Promise<void> {
  await apiClient.delete(`/activities/${id}`)
}
