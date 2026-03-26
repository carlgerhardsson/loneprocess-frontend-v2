import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

/**
 * Login Page - Auto-login
 *
 * Inloggning sker automatiskt via API-nyckeln i VITE_LONEPROCESS_API_KEY.
 * Användaren behöver inte skriva in något.
 *
 * Flöde:
 *  1. Kolla om redan inloggad → redirect direkt
 *  2. Anropa loginWithApiKey()
 *  3. Visa spinner under verifiering
 *  4. Redirect till /dashboard vid success
 *  5. Visa felmeddelande om API-nyckel saknas eller API är nere
 */
export function LoginPage() {
  const navigate = useNavigate()
  const { loginWithApiKey, isAuthenticated, isLoading, error } = useAuthStore()

  // Redirect direkt om redan inloggad
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Starta auto-login vid mount
  useEffect(() => {
    if (!isAuthenticated && !isLoading && !error) {
      loginWithApiKey()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Felläge — visa tydligt meddelande
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-xl font-bold text-center text-gray-900 mb-2">Anslutningsfel</h1>
            <p className="text-center text-red-600 text-sm mb-6">{error}</p>

            <button
              onClick={() => loginWithApiKey()}
              className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 font-medium"
            >
              Försök igen
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Laddningsläge — spinner med statustext
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
          <svg
            className="animate-spin w-12 h-12 text-primary-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Löneportalen</h1>
        <p className="text-gray-500 text-sm">Ansluter till systemet...</p>
      </div>
    </div>
  )
}
