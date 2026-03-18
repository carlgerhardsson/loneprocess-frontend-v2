import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from './ErrorBoundary'
import { ErrorFallback } from './ErrorFallback'
import type { ReactNode } from 'react'

interface QueryErrorBoundaryProps {
  children: ReactNode
}

/**
 * Query Error Boundary
 *
 * Specialized error boundary for TanStack Query errors.
 * Provides reset functionality that clears the query cache.
 */
export function QueryErrorBoundary({ children }: QueryErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onError={error => {
            // Log query errors
            if (import.meta.env.DEV) {
              console.error('Query error:', error)
            }
          }}
          fallback={
            <ErrorFallback
              error={null}
              resetError={reset}
              title="Det gick inte att hämta data"
              message="Ett fel uppstod när data skulle hämtas. Försök igen."
            />
          }
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
