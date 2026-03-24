/**
 * Activities API Service
 * Handles all activity-related API calls
 */

import { apiClient } from './client'
import type { Activity, ActivityAPI, CreateActivityData, UpdateActivityData } from '@/types'
import { activityFromAPI } from '@/types'

/**
 * Map frontend priority string to backend integer
 */
function mapPriorityToBackend(priority?: string): number | undefined {
  if (!priority) return undefined
  
  const priorityMap: Record<string, number> = {
    low: 1,
    medium: 2,
    high: 3,
    urgent: 4,
  }
  
  return priorityMap[priority] || 2 // Default to medium
}

/**
 * Map frontend status string to backend format
 */
function mapStatusToBackend(status?: string): string | undefined {
  if (!status) return undefined
  return status // Keep as-is for now, might need mapping later
}

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
 */
export async function createActivity(data: CreateActivityData): Promise<Activity> {
  // Transform frontend data to backend format
  const backendData = {
    ...data,
    priority: mapPriorityToBackend(data.priority),
    status: mapStatusToBackend(data.status),
  }
  
  const response = await apiClient.post<ActivityAPI>('/activities', backendData)
  return activityFromAPI(response.data)
}

/**
 * Update an existing activity
 */
export async function updateActivity(id: number, data: UpdateActivityData): Promise<Activity> {
  // Transform frontend data to backend format
  const backendData = {
    ...data,
    priority: data.priority ? mapPriorityToBackend(data.priority) : undefined,
    status: data.status ? mapStatusToBackend(data.status) : undefined,
  }
  
  const response = await apiClient.put<ActivityAPI>(`/activities/${id}`, backendData)
  return activityFromAPI(response.data)
}

/**
 * Delete an activity
 */
export async function deleteActivity(id: number): Promise<void> {
  await apiClient.delete(`/activities/${id}`)
}
