import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { ActivitiesPage } from '@/pages/ActivitiesPage'
import { ActivityDetailPage } from '@/pages/ActivityDetailPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PageLayout } from '@/components/layout/PageLayout'

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
        element: <Navigate to="/activities" replace />,
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
