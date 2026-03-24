/**
 * Activities API Service
 * Handles all activity-related API calls
 * 
 * Backend schema (from Swagger /docs):
 * {
 *   "process_nr": "string",
 *   "process": "string",
 *   "out_input": "string",
 *   "ska_inga_i_loneperiod": false,
 *   "fas": "string",
 *   "roll": "string",
 *   "behov": "string",
 *   "effekten_vardet": "string",
 *   "extra_info": "string",
 *   "acceptans": "string",
 *   "feature_losning": "string",
 *   "priority": 1,  // integer >= 1
 *   "status": "active" // active|draft|pending|in_progress|completed|blocked
 * }
 */

import { apiClient } from './client'
import type { Activity, ActivityAPI, CreateActivityData, UpdateActivityData } from '@/types'
import { activityFromAPI } from '@/types'

/**
 * Map frontend data to backend schema
 * This is a best-effort mapping from our UI fields to backend's expected schema
 */
function mapToBackendFormat(data: CreateActivityData | UpdateActivityData): any {
  // Map priority to integer (1-4, must be >= 1)
  let priority: number = 2 // Default to medium
  if ('priority' in data && data.priority) {
    const priorityMap: Record<string, number> = {
      low: 1,
      medium: 2,
      high: 3,
      urgent: 4,
    }
    priority = priorityMap[data.priority] || 2
  }

  // Map status (already in correct format: pending, in_progress, completed, etc.)
  const status = ('status' in data && data.status) ? data.status : 'pending'

  // Build backend payload with required schema
  const backendData: any = {
    // Map our title to backend's process field
    process: ('title' in data && data.title) ? data.title : 'Ny aktivitet',
    
    // Map our description to behov (need/requirement)
    behov: ('description' in data && data.description) ? data.description : '',
    
    // Map type to fas (phase)
    fas: ('type' in data && data.type) ? data.type : 'other',
    
    // Map assignedTo to roll (role)
    roll: ('assigned_to' in data && data.assigned_to) ? data.assigned_to : 'Okänd',
    
    // Required fields with defaults
    process_nr: '', // Empty for now
    out_input: '', // Empty for now
    ska_inga_i_loneperiod: false,
    effekten_vardet: '',
    extra_info: '',
    acceptans: '',
    feature_losning: '',
    
    // Status and priority
    status: status,
    priority: priority,
  }

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
