import { Navigate } from 'react-router-dom'

/**
 * Home Page
 *
 * Root route - redirects to activities.
 */
export function HomePage() {
  return <Navigate to="/activities" replace />
}
