/**
 * Authentication Store
 * Hanterar autentisering via API-nyckel (X-API-Key header)
 *
 * OBS: API:et ägs av externt team och kan inte påverkas.
 * Autentisering sker automatiskt via env-variabeln VITE_LONEPROCESS_API_KEY.
 * Användaren behöver inte skriva in något lösenord.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthSession, AuthState, Permission } from '../types'
import { validateEnv } from '../lib/env'
import { verifyApiKey } from '../lib/api/auth'

interface AuthActions {
  loginWithApiKey: () => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setSession: (session: AuthSession | null) => void
  setError: (error: string | null) => void
  checkPermission: (permission: string) => boolean
  hasRole: (role: string) => boolean
  checkSession: () => boolean
}

type AuthStore = AuthState & AuthActions

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

      /**
       * Loggar in automatiskt via API-nyckel från VITE_LONEPROCESS_API_KEY.
       * Verifierar nyckeln mot backend innan inloggning sätts.
       */
      loginWithApiKey: async () => {
        // Om redan inloggad, gör ingenting
        if (get().isAuthenticated) return

        set({ isLoading: true, error: null })

        // Kontrollera att env-variabeln finns
        const { valid, missing } = validateEnv()
        if (!valid) {
          set({
            isLoading: false,
            error: `Konfigurationsfel: Miljövariabel saknas (${missing.join(', ')}). Kontakta administratören.`,
          })
          return
        }

        const apiKey = import.meta.env.VITE_LONEPROCESS_API_KEY as string

        try {
          // Verifiera att API-nyckeln är giltig
          await verifyApiKey(apiKey)

          // API-nyckel verifierad — sätt inloggad
          const systemUser: User = {
            id: 'api-key-user',
            email: 'system@loneportalen.se',
            name: 'Löneportalen',
            role: 'viewer',
            permissions: ['activities:read', 'periods:read'],
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          }

          // API-nycklar har ingen expiry — sätt långt framtida datum
          const session: AuthSession = {
            token: apiKey,
            expiresAt: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
            refreshToken: '',
          }

          set({
            user: systemUser,
            session,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch {
          set({
            isLoading: false,
            error:
              'Kunde inte ansluta till API:et. Kontrollera din nätverksanslutning eller kontakta administratören.',
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
       * Kontrollerar om sessionen är giltig.
       * API-nycklar löper inte ut men vi behåller metoden för kompatibilitet.
       */
      checkSession: () => {
        const { session, logout } = get()

        if (isSessionExpired(session)) {
          logout()
          return false
        }

        return true
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
