import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorFallbackProps {
  error: Error | null
  resetError?: () => void
  title?: string
  message?: string
}

/**
 * Error Fallback UI
 *
 * Displays a user-friendly error message with options to:
 * - Try again (reset the error boundary)
 * - Go back to home page
 */
export function ErrorFallback({
  error,
  resetError,
  title = 'Något gick fel',
  message = 'Ett oväntat fel uppstod.',
}: ErrorFallbackProps) {
  const isDevelopment = import.meta.env.DEV

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h1>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">{message}</p>

        {/* Error details (development only) */}
        {isDevelopment && error && (
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">Felinformation (endast dev):</p>
            <p className="text-sm text-red-600 font-mono break-words">{error.message}</p>
            {error.stack && (
              <details className="mt-2">
                <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                  Stack trace
                </summary>
                <pre className="text-xs text-gray-700 mt-2 overflow-auto max-h-48">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          {resetError && (
            <button
              onClick={resetError}
              className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Försök igen
            </button>
          )}
          <button
            onClick={() => (window.location.href = '/')}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Home className="w-4 h-4" />
            Till startsidan
          </button>
        </div>
      </div>
    </div>
  )
}
