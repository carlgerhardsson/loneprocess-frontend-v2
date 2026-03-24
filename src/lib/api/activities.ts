/**
 * Activities API Service
 * Handles all activity-related API calls
 */

import { apiClient } from './client'
import type { Activity, ActivityAPI, CreateActivityData, UpdateActivityData } from '@/types'
import { activityFromAPI } from '@/types'

/**
 * Map frontend data to backend format
 * Backend API schema (from Swagger):
 * - Uses MIXED Swedish/English field names
 * - Status: English values (pending, in_progress, completed, blocked, active, draft)
 * - Priority: Integer 1-4
 */
function mapToBackendFormat(data: CreateActivityData | UpdateActivityData): any {
  // Map priority string to integer (1-4)
  let priority: number | undefined
  if ('priority' in data && data.priority) {
    const priorityMap: Record<string, number> = {
      low: 1,
      medium: 2,
      high: 3,
      urgent: 4,
    }
    priority = priorityMap[data.priority] || 2
  }

  // Status: Keep English values (backend wants: pending, in_progress, completed, blocked, active, draft)
  let status: string | undefined
  if ('status' in data && data.status) {
    // Frontend already uses correct English values, just pass through
    status = data.status
  }

  // Build backend payload
  const backendData: any = {}

  // Map title/description to Swedish field names (namn/beskrivning)
  if ('title' in data && data.title) backendData.namn = data.title
  if ('description' in data && data.description) backendData.beskrivning = data.description
  
  // Map assignedTo to Swedish (ansvarig)
  if ('assigned_to' in data && data.assigned_to) {
    backendData.ansvarig = data.assigned_to
  } else {
    backendData.ansvarig = 'Okänd' // Default assignee
  }

  // Set default description if empty
  if (!backendData.beskrivning) backendData.beskrivning = ''

  // Add type (keep as-is)
  if ('type' in data && data.type) backendData.typ = data.type
  
  // Add status (English)
  if (status) backendData.status = status
  
  // Add priority (integer)
  if (priority !== undefined) backendData.prioritet = priority

  // Add required field: berakning_frekvens (calculation frequency)
  backendData.berakning_frekvens = 'manatlig' // Default to monthly

  return backendData
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
  // Transform to backend format
  const backendData = mapToBackendFormat(data)
  
  console.log('Sending to backend:', backendData) // Debug log
  
  const response = await apiClient.post<ActivityAPI>('/activities', backendData)
  return activityFromAPI(response.data)
}

/**
 * Update an existing activity
 */
export async function updateActivity(id: number, data: UpdateActivityData): Promise<Activity> {
  // Transform to backend format
  const backendData = mapToBackendFormat(data)
  
  const response = await apiClient.put<ActivityAPI>(`/activities/${id}`, backendData)
  return activityFromAPI(response.data)
}

/**
 * Delete an activity
 */
export async function deleteActivity(id: number): Promise<void> {
  await apiClient.delete(`/activities/${id}`)
}
