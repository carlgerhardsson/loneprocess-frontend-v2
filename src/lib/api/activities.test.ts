import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchActivities, fetchActivity, createActivity, updateActivity, deleteActivity } from './activities'
import { apiClient } from './client'
import type { Activity } from '@/types'

vi.mock('./client')

const mockActivity: Activity = {
  id: 1,
  title: 'Test Activity',
  description: 'Test description',
  status: 'pending',
  type: 'recurring',
  priority: 'medium',
  assigned_to: 'user1',
  due_date: '2026-04-01',
  created_at: '2026-03-01T10:00:00Z',
  updated_at: '2026-03-01T10:00:00Z',
}

describe('Activities API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchActivities', () => {
    it('should fetch activities', async () => {
      const mockResponse = { data: [mockActivity] }
      vi.mocked(apiClient.get).mockResolvedValue(mockResponse)

      const result = await fetchActivities()

      expect(apiClient.get).toHaveBeenCalledWith('/activities', { params: undefined })
      expect(result).toEqual([mockActivity])
    })

    it('should fetch activities with filters', async () => {
      const mockResponse = { data: [mockActivity] }
      vi.mocked(apiClient.get).mockResolvedValue(mockResponse)

      const filters = { status: 'pending', limit: 10 }
      await fetchActivities(filters)

      expect(apiClient.get).toHaveBeenCalledWith('/activities', { params: filters })
    })
  })

  describe('fetchActivity', () => {
    it('should fetch single activity', async () => {
      const mockResponse = { data: mockActivity }
      vi.mocked(apiClient.get).mockResolvedValue(mockResponse)

      const result = await fetchActivity(1)

      expect(apiClient.get).toHaveBeenCalledWith('/activities/1')
      expect(result).toEqual(mockActivity)
    })
  })

  describe('createActivity', () => {
    it('should create activity', async () => {
      const newActivity = { title: 'New Activity', description: 'New desc' }
      const mockResponse = { data: mockActivity }
      vi.mocked(apiClient.post).mockResolvedValue(mockResponse)

      const result = await createActivity(newActivity)

      expect(apiClient.post).toHaveBeenCalledWith('/activities', newActivity)
      expect(result).toEqual(mockActivity)
    })
  })

  describe('updateActivity', () => {
    it('should update activity', async () => {
      const updates = { title: 'Updated Title' }
      const mockResponse = { data: { ...mockActivity, ...updates } }
      vi.mocked(apiClient.put).mockResolvedValue(mockResponse)

      const result = await updateActivity(1, updates)

      expect(apiClient.put).toHaveBeenCalledWith('/activities/1', updates)
      expect(result.title).toBe('Updated Title')
    })
  })

  describe('deleteActivity', () => {
    it('should delete activity', async () => {
      vi.mocked(apiClient.delete).mockResolvedValue({ data: null })

      await deleteActivity(1)

      expect(apiClient.delete).toHaveBeenCalledWith('/activities/1')
    })
  })
})
