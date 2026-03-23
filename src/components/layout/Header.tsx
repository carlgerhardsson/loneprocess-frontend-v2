import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { LogOut, User } from 'lucide-react'

/**
 * Header Component
 *
 * Application header with navigation and user menu.
 */
export function Header() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg" />
            <span className="text-xl font-bold text-gray-900">Löneportalen</span>
          </Link>

          {isAuthenticated && (
            <div className="flex items-center gap-6">
              <nav className="flex items-center gap-4">
                <Link
                  to="/activities"
                  className="text-gray-700 hover:text-primary-600 font-medium"
                >
                  Aktiviteter
                </Link>
              </nav>

              <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logga ut"
                >
                  <LogOut className="w-4 h-4" />
                  Logga ut
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
