/**
 * Activities API Service
 * Handles all activity-related API calls
 */

import { apiClient } from './client'
import type { Activity, ActivityAPI, CreateActivityData, UpdateActivityData } from '@/types'
import { activityFromAPI } from '@/types'

/**
 * Map frontend data to backend Swedish field names and formats
 * Backend uses Swedish field names: namn, beskrivning, ansvarig, etc.
 */
function mapToBackendFormat(data: CreateActivityData | UpdateActivityData): any {
  // Map priority string to integer
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

  // Map status to backend format (might need Swedish mapping)
  let status: string | undefined
  if ('status' in data && data.status) {
    const statusMap: Record<string, string> = {
      pending: 'ej_startad',
      in_progress: 'pagaende',
      completed: 'slutford',
      blocked: 'blockerad',
      cancelled: 'avbruten',
    }
    status = statusMap[data.status] || 'ej_startad'
  }

  // Map type to backend format
  let type: string | undefined
  if ('type' in data && data.type) {
    // Backend might use Swedish type names or different format
    // For now, keep as-is but prepared for mapping
    type = data.type
  }

  // Build backend payload with Swedish field names
  const backendData: any = {}

  if ('title' in data && data.title) backendData.namn = data.title
  if ('description' in data && data.description) backendData.beskrivning = data.description
  if ('assignedTo' in data && data.assigned_to) backendData.ansvarig = data.assigned_to
  
  // Set default values for required fields if not provided
  if (!backendData.ansvarig) backendData.ansvarig = 'Okänd' // Default assignee
  if (!backendData.beskrivning) backendData.beskrivning = '' // Default description

  // Add other fields
  if (type) backendData.typ = type
  if (status) backendData.status = status
  if (priority !== undefined) backendData.prioritet = priority

  // Add calculation frequency (required field in backend)
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
