import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks'

/**
 * Session Manager Component
 *
 * Övervakar autentiseringssessionen och hanterar:
 * - Kontroll av sessionsgiltighet
 * - Auto-logout vid ogiltig session
 *
 * OBS: API-nycklar löper inte ut, så ingen token-refresh behövs.
 * SessionManager kontrollerar bara att användaren fortfarande är inloggad.
 */
export function SessionManager() {
  const navigate = useNavigate()
  const { isAuthenticated, checkSession, logout } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) return

    // Kontrollera session direkt vid mount
    if (!checkSession()) {
      logout()
      navigate('/login', { replace: true })
      return
    }

    // Kontrollera session var 5:e minut
    const sessionCheckInterval = setInterval(
      () => {
        if (!checkSession()) {
          logout()
          navigate('/login', { replace: true })
        }
      },
      5 * 60 * 1000
    )

    return () => {
      clearInterval(sessionCheckInterval)
    }
  }, [isAuthenticated, checkSession, logout, navigate])

  return null
}
