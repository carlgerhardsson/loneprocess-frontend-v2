/**
 * Periods API Service
 * Operations for löneperiods
 */

import { apiClient } from '../client'
import { API_ENDPOINTS } from '../endpoints'
import { handleAPIError } from '../errors'
import type { Period } from '../../../types'

export const periodsService = {
  /**
   * Get all periods
   */
  async list(): Promise<Period[]> {
    try {
      const response = await apiClient.get<Period[]>(API_ENDPOINTS.periods.list)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  /**
   * Get period by ID
   */
  async get(id: string): Promise<Period> {
    try {
      const response = await apiClient.get<Period>(API_ENDPOINTS.periods.get(id))
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  /**
   * Create new period
   */
  async create(data: Partial<Period>): Promise<Period> {
    try {
      const response = await apiClient.post<Period>(API_ENDPOINTS.periods.create, data)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  /**
   * Update period
   */
  async update(id: string, data: Partial<Period>): Promise<Period> {
    try {
      const response = await apiClient.put<Period>(API_ENDPOINTS.periods.update(id), data)
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  /**
   * Delete period
   */
  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.periods.delete(id))
    } catch (error) {
      throw handleAPIError(error)
    }
  },

  /**
   * Get period progress
   */
  async getProgress(id: string): Promise<{ completed: number; total: number }> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.periods.progress(id))
      return response.data
    } catch (error) {
      throw handleAPIError(error)
    }
  },
}
