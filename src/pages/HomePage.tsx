import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

/**
 * Home Page - Root Redirect
 *
 * Redirects users to login or activities based on auth state.
 */
export function HomePage() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  useEffect(() => {
    navigate(isAuthenticated ? '/activities' : '/login', { replace: true })
  }, [isAuthenticated, navigate])

  return null
}
