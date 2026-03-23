import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from './authStore'

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, session: null, isAuthenticated: false, error: null })
  })

  it('initializes with empty state', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.session).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('sets user correctly', () => {
    const user = {
      id: '1',
      name: 'Test',
      email: 'test@test.com',
      role: 'user' as const,
      permissions: [],
      createdAt: '2024-01-01',
      lastLogin: '2024-01-01',
    }

    useAuthStore.getState().setUser(user)

    const state = useAuthStore.getState()
    expect(state.user).toEqual(user)
    expect(state.isAuthenticated).toBe(true)
  })

  it('checks permissions correctly', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        name: 'Test',
        email: 'test@test.com',
        role: 'user',
        permissions: ['activities:read', 'activities:write'],
        createdAt: '2024-01-01',
        lastLogin: '2024-01-01',
      },
      isAuthenticated: true,
    })

    expect(useAuthStore.getState().checkPermission('activities:read')).toBe(true)
    expect(useAuthStore.getState().checkPermission('activities:delete')).toBe(false)
  })

  it('checks roles correctly', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        name: 'Test',
        email: 'test@test.com',
        role: 'admin',
        permissions: [],
        createdAt: '2024-01-01',
        lastLogin: '2024-01-01',
      },
      isAuthenticated: true,
    })

    expect(useAuthStore.getState().hasRole('admin')).toBe(true)
    expect(useAuthStore.getState().hasRole('user')).toBe(false)
  })

  it('logs out correctly', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        name: 'Test',
        email: 'test@test.com',
        role: 'user',
        permissions: [],
        createdAt: '2024-01-01',
        lastLogin: '2024-01-01',
      },
      isAuthenticated: true,
    })

    useAuthStore.getState().logout()

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('checks session expiry', () => {
    // Set expired session
    useAuthStore.setState({
      user: {
        id: '1',
        name: 'Test',
        email: 'test@test.com',
        role: 'user',
        permissions: [],
        createdAt: '2024-01-01',
        lastLogin: '2024-01-01',
      },
      session: {
        token: 'test-token',
        expiresAt: new Date(Date.now() - 1000).toISOString(), // Expired 1 second ago
        refreshToken: 'refresh-token',
      },
      isAuthenticated: true,
    })

    const isValid = useAuthStore.getState().checkSession()

    expect(isValid).toBe(false)
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })

  it('validates non-expired session', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        name: 'Test',
        email: 'test@test.com',
        role: 'user',
        permissions: [],
        createdAt: '2024-01-01',
        lastLogin: '2024-01-01',
      },
      session: {
        token: 'test-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(), // Expires in 1 hour
        refreshToken: 'refresh-token',
      },
      isAuthenticated: true,
    })

    const isValid = useAuthStore.getState().checkSession()

    expect(isValid).toBe(true)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
  })

  it('refreshes token successfully', async () => {
    useAuthStore.setState({
      user: {
        id: '1',
        name: 'Test',
        email: 'test@test.com',
        role: 'user',
        permissions: [],
        createdAt: '2024-01-01',
        lastLogin: '2024-01-01',
      },
      session: {
        token: 'old-token',
        expiresAt: new Date(Date.now() + 100).toISOString(),
        refreshToken: 'refresh-token',
      },
      isAuthenticated: true,
    })

    const success = await useAuthStore.getState().refreshToken()

    expect(success).toBe(true)
    expect(useAuthStore.getState().session?.token).toContain('mock-token-refreshed')
  })
})
