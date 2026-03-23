import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { ActivitiesPage } from '@/pages/ActivitiesPage'
import { ActivityDetailPage } from '@/pages/ActivityDetailPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PageLayout } from '@/components/layout/PageLayout'
import { useAuthStore } from '@/stores/authStore'

/**
 * Root Redirect Component
 * Redirects to /login or /activities based on auth state
 */
function RootRedirect() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  return <Navigate to={isAuthenticated ? '/activities' : '/login'} replace />
}

/**
 * Application Router Configuration
 *
 * Uses React Router v6 with protected routes for authenticated pages.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <RootRedirect />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'activities',
        element: (
          <ProtectedRoute>
            <ActivitiesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'activities/:id',
        element: (
          <ProtectedRoute>
            <ActivityDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
