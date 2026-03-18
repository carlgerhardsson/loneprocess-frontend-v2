import { useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ErrorBoundary } from './components/errors'
import { PageLayout } from './components/layout'
import { Spinner, Skeleton, SkeletonCard, ProgressBar, LoadingOverlay } from './components/loading'
import { queryClient } from './lib/queryClient'

function App() {
  const [count, setCount] = useState(0)
  const [showDemo, setShowDemo] = useState(false)

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <PageLayout>
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Löneportalen v2.0</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Modern React + TypeScript migration in progress. This is the foundation for the
              production-ready digital checklista.
            </p>

            {/* Demo Counter */}
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto mb-8">
              <h3 className="text-xl font-semibold mb-4">Component Demo</h3>
              <button
                onClick={() => setCount(count + 1)}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Counter: {count}
              </button>
              <div className="mt-6 text-sm text-gray-500 space-y-1">
                <p>✅ Design System Tokens</p>
                <p>✅ Layout Components (Header, Footer)</p>
                <p>✅ State Management (Zustand)</p>
                <p>✅ API Client + TanStack Query</p>
                <p>✅ Error Boundaries</p>
                <p>✅ Loading States</p>
              </div>
            </div>

            {/* Loading States Demo */}
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setShowDemo(!showDemo)}
                className="bg-secondary-600 text-white px-6 py-3 rounded-lg hover:bg-secondary-700 transition-colors mb-6"
              >
                {showDemo ? 'Hide' : 'Show'} Loading States Demo
              </button>

              {showDemo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  {/* Spinner */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold mb-4">Spinner</h4>
                    <div className="flex gap-4 items-center">
                      <Spinner size="sm" />
                      <Spinner size="md" />
                      <Spinner size="lg" />
                    </div>
                  </div>

                  {/* Skeleton */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold mb-4">Skeleton Loader</h4>
                    <Skeleton variant="text" lines={3} />
                  </div>

                  {/* Progress Bar */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold mb-4">Progress Bar</h4>
                    <ProgressBar value={65} showLabel />
                    <div className="mt-4">
                      <ProgressBar value={100} variant="success" />
                    </div>
                  </div>

                  {/* Loading Overlay */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold mb-4">Loading Overlay</h4>
                    <LoadingOverlay isLoading={true} message="Loading...">
                      <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                        <p className="text-gray-400">Content here</p>
                      </div>
                    </LoadingOverlay>
                  </div>

                  {/* Skeleton Card */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 md:col-span-2">
                    <h4 className="font-semibold mb-4">Skeleton Card Pattern</h4>
                    <SkeletonCard />
                  </div>
                </div>
              )}
            </div>
          </div>
        </PageLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
