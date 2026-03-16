/**
 * Activities API Service
 * CRUD operations for activities
 */

import { apiClient } from '../client'
import { API_ENDPOINTS } from '../endpoints'
import { handleAPIError } from '../errors'
import type { Activity } from '../../../types'

export const activitiesService = {
  /**
   * Get all activities
   */
  async list(): Promise<Activity[]> {
    try {
      const response = await apiClient.get<Activity[]>(API_ENDPOINTS.activities.list)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  /**
   * Get activity by ID
   */
  async get(id: string): Promise<Activity> {
    try {
      const response = await apiClient.get<Activity>(API_ENDPOINTS.activities.get(id))
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  /**
   * Create new activity
   */
  async create(data: Partial<Activity>): Promise<Activity> {
    try {
      const response = await apiClient.post<Activity>(API_ENDPOINTS.activities.create, data)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  /**
   * Update activity
   */
  async update(id: string, data: Partial<Activity>): Promise<Activity> {
    try {
      const response = await apiClient.put<Activity>(API_ENDPOINTS.activities.update(id), data)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  /**
   * Delete activity
   */
  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.activities.delete(id))
    } catch (error) {
      throw handleAPIError(error)
    }
  },
}
