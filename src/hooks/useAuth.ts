import { useAuthStore } from '@/stores/authStore'
import { useCallback } from 'react'
import type { LoginCredentials } from '@/types'

/**
 * useAuth Hook
 *
 * Centralized hook for authentication operations.
 * Provides easy access to auth state and actions.
 */
export function useAuth() {
  const store = useAuthStore()

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      await store.loginWithCredentials(credentials)
    },
    [store]
  )

  const logout = useCallback(() => {
    store.logout()
  }, [store])

  const checkSession = useCallback(() => {
    return store.checkSession()
  }, [store])

  const refreshToken = useCallback(async () => {
    return await store.refreshToken()
  }, [store])

  return {
    // State
    user: store.user,
    session: store.session,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,

    // Actions
    login,
    logout,
    checkSession,
    refreshToken,

    // Permissions
    checkPermission: store.checkPermission,
    hasRole: store.hasRole,
  }
}
