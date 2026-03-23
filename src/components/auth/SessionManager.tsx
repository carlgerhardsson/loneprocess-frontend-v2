import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks'

/**
 * Session Manager Component
 *
 * Monitors authentication session and handles:
 * - Token expiry checking
 * - Auto-logout on expiry
 * - Token refresh before expiry
 */
export function SessionManager() {
  const navigate = useNavigate()
  const { isAuthenticated, checkSession, refreshToken, logout } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) return

    // Check session validity immediately
    if (!checkSession()) {
      navigate('/login', { replace: true })
      return
    }

    // Check session every 5 minutes
    const sessionCheckInterval = setInterval(
      () => {
        if (!checkSession()) {
          navigate('/login', { replace: true })
        }
      },
      5 * 60 * 1000
    ) // 5 minutes

    // Refresh token 5 minutes before expiry
    const refreshInterval = setInterval(
      async () => {
        const success = await refreshToken()
        if (!success) {
          logout()
          navigate('/login', { replace: true })
        }
      },
      55 * 60 * 1000
    ) // 55 minutes (assuming 1hr token)

    return () => {
      clearInterval(sessionCheckInterval)
      clearInterval(refreshInterval)
    }
  }, [isAuthenticated, checkSession, refreshToken, logout, navigate])

  return null
}
