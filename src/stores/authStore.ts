/**
 * Authentication Store
 * Manages user authentication state with persistence
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthSession, LoginCredentials, AuthState, Permission } from '../types'

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setSession: (session: AuthSession | null) => void
  setError: (error: string | null) => void
  checkPermission: (permission: string) => boolean
  hasRole: (role: string) => boolean
}

type AuthStore = AuthState & AuthActions

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
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null })
        try {
          // TODO: Replace with real API call in Milestone 2.4
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
            token: 'mock-token',
            expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour
            refreshToken: 'mock-refresh-token',
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
