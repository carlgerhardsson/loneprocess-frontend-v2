import { useAuthStore } from '@/stores/authStore'
import { useCallback } from 'react'

/**
 * useAuth Hook
 *
 * Centraliserad hook för autentiseringsoperationer.
 * Autentisering sker via API-nyckel (loginWithApiKey).
 */
export function useAuth() {
  const store = useAuthStore()

  const login = useCallback(async () => {
    await store.loginWithApiKey()
  }, [store])

  const logout = useCallback(() => {
    store.logout()
  }, [store])

  const checkSession = useCallback(() => {
    return store.checkSession()
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

    // Permissions
    checkPermission: store.checkPermission,
    hasRole: store.hasRole,
  }
}
