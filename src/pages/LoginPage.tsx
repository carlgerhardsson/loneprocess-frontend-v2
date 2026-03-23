import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { LogIn } from 'lucide-react'

/**
 * Login Page
 *
 * Simple login form for authentication.
 * In production, this would validate against backend.
 */
export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore(state => state.login)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Användarnamn och lösenord krävs')
      return
    }

    // Mock login - in production, call API
    login({
      id: '1',
      name: username,
      email: `${username}@example.com`,
      role: 'user',
    })

    navigate('/activities')
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-center mb-8">
            <LogIn className="w-12 h-12 text-primary-600" />
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">Löneportalen</h1>
          <p className="text-center text-gray-600 mb-8">Logga in för att fortsätta</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Användarnamn
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Ange användarnamn"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Lösenord
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Ange lösenord"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <LogIn className="w-5 h-5" />
              Logga in
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Demo: Ange vilket användarnamn och lösenord som helst</p>
          </div>
        </div>
      </div>
    </div>
  )
}
