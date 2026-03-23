import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from './useAuth'
import { useAuthStore } from '@/stores/authStore'

describe('useAuth', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false, error: null })
  })

  it('provides auth state', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('provides login action', () => {
    const { result } = renderHook(() => useAuth())

    expect(typeof result.current.login).toBe('function')
  })

  it('provides logout action', () => {
    const { result } = renderHook(() => useAuth())

    expect(typeof result.current.logout).toBe('function')
  })

  it('logout clears user state', () => {
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

    const { result } = renderHook(() => useAuth())

    act(() => {
      result.current.logout()
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('provides permission checking', () => {
    const { result } = renderHook(() => useAuth())

    expect(typeof result.current.checkPermission).toBe('function')
    expect(typeof result.current.hasRole).toBe('function')
  })

  it('provides session management', () => {
    const { result } = renderHook(() => useAuth())

    expect(typeof result.current.checkSession).toBe('function')
    expect(typeof result.current.refreshToken).toBe('function')
  })
})
