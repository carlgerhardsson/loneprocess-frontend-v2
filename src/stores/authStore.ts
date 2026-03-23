/**
 * Authentication Store
 * Manages user authentication state with persistence and token management
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthSession, LoginCredentials, AuthState, Permission } from '../types'

interface AuthActions {
  login: (user: User) => void
  loginWithCredentials: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setSession: (session: AuthSession | null) => void
  setError: (error: string | null) => void
  checkPermission: (permission: string) => boolean
  hasRole: (role: string) => boolean
  checkSession: () => boolean
  refreshToken: () => Promise<boolean>
}

type AuthStore = AuthState & AuthActions

/**
 * Check if a session is expired
 */
function isSessionExpired(session: AuthSession | null): boolean {
  if (!session) return true
  return new Date(session.expiresAt) <= new Date()
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: (user: User) => {
        // Direct login with user object (for mock/demo)
        const mockSession: AuthSession = {
          token: 'mock-token-' + Date.now(),
          expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour
          refreshToken: 'mock-refresh-token-' + Date.now(),
        }

        set({
          user,
          session: mockSession,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
      },

      loginWithCredentials: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null })
        try {
          // TODO: Replace with real API call in Milestone 4.3
          // Simulated login for now
          await new Promise(resolve => setTimeout(resolve, 500))

          const mockUser: User = {
            id: '1',
            email: credentials.email,
            name: 'Demo User',
            role: 'user',
            permissions: ['activities:read', 'activities:write', 'periods:read'],
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          }

          const mockSession: AuthSession = {
            token: 'mock-token-' + Date.now(),
            expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour
            refreshToken: 'mock-refresh-token-' + Date.now(),
          }

          set({
            user: mockUser,
            session: mockSession,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          })
        }
      },

      logout: () => {
        set({
          user: null,
          session: null,
          isAuthenticated: false,
          error: null,
        })
      },

      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user })
      },

      setSession: (session: AuthSession | null) => {
        set({ session })
      },

      setError: (error: string | null) => {
        set({ error })
      },

      checkPermission: (permission: string) => {
        const { user } = get()
        return user?.permissions.includes(permission as Permission) ?? false
      },

      hasRole: (role: string) => {
        const { user } = get()
        return user?.role === role
      },

      /**
       * Check if current session is valid
       * Returns false if session is expired
       */
      checkSession: () => {
        const { session, logout } = get()

        if (isSessionExpired(session)) {
          logout()
          return false
        }

        return true
      },

      /**
       * Refresh the authentication token
       * Returns true if successful
       */
      refreshToken: async () => {
        const { session, logout } = get()

        if (!session) {
          return false
        }

        try {
          // TODO: Replace with real API call in Milestone 4.3
          await new Promise(resolve => setTimeout(resolve, 300))

          const newSession: AuthSession = {
            token: 'mock-token-refreshed-' + Date.now(),
            expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour
            refreshToken: session.refreshToken,
          }

          set({ session: newSession })
          return true
        } catch (error) {
          logout()
          return false
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
