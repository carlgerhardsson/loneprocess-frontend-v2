import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from './authStore'
import type { User } from '../types'

describe('authStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useAuthStore.setState({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  })

  it('initializes with correct default state', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.session).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('sets user correctly', () => {
    const mockUser: User = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
      permissions: ['activities:read'],
      createdAt: new Date().toISOString(),
      lastLogin: null,
    }

    useAuthStore.getState().setUser(mockUser)

    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockUser)
    expect(state.isAuthenticated).toBe(true)
  })

  it('checks permissions correctly', () => {
    const mockUser: User = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
      permissions: ['activities:read', 'activities:write'],
      createdAt: new Date().toISOString(),
      lastLogin: null,
    }

    useAuthStore.getState().setUser(mockUser)

    expect(useAuthStore.getState().checkPermission('activities:read')).toBe(true)
    expect(useAuthStore.getState().checkPermission('activities:write')).toBe(true)
    expect(useAuthStore.getState().checkPermission('activities:delete')).toBe(false)
  })

  it('checks roles correctly', () => {
    const mockUser: User = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'admin',
      permissions: [],
      createdAt: new Date().toISOString(),
      lastLogin: null,
    }

    useAuthStore.getState().setUser(mockUser)

    expect(useAuthStore.getState().hasRole('admin')).toBe(true)
    expect(useAuthStore.getState().hasRole('user')).toBe(false)
  })

  it('logs out correctly', () => {
    const mockUser: User = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
      permissions: [],
      createdAt: new Date().toISOString(),
      lastLogin: null,
    }

    useAuthStore.getState().setUser(mockUser)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)

    useAuthStore.getState().logout()

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.session).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('handles errors correctly', () => {
    useAuthStore.getState().setError('Test error')
    expect(useAuthStore.getState().error).toBe('Test error')

    useAuthStore.getState().setError(null)
    expect(useAuthStore.getState().error).toBeNull()
  })
})
