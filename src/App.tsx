import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query/queryClient'
import { router } from './router'
import { ErrorBoundary } from './components/errors/ErrorBoundary'

/**
 * Root Application Component
 *
 * Provides React Query and Router context to the entire app.
 */
function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
