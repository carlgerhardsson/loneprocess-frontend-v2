import { useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PageLayout } from './components/layout'
import { queryClient } from './lib/queryClient'

function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
      <PageLayout>
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Löneportalen v2.0</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Modern React + TypeScript migration in progress. This is the foundation for the
            production-ready digital checklista.
          </p>

          {/* Demo Counter */}
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
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
              <p>⏳ Error Boundaries (Next)</p>
            </div>
          </div>
        </div>
      </PageLayout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
