import { useNavigate } from 'react-router-dom'
import { Home, AlertCircle } from 'lucide-react'

/**
 * Not Found Page (404)
 *
 * Shown when user navigates to non-existent route.
 */
export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="w-20 h-20 text-gray-400 mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Sidan hittades inte</h2>
        <p className="text-gray-600 mb-8">Sidan du letar efter verkar inte existera.</p>

        <button
          onClick={() => navigate('/activities')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <Home className="w-5 h-5" />
          Gå till startsidan
        </button>
      </div>
    </div>
  )
}
