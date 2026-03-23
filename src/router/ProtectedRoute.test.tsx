import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuthStore } from '@/stores/authStore'

const TestComponent = () => <div>Protected Content</div>
const LoginComponent = () => <div>Login Page</div>

describe('ProtectedRoute', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false })
  })

  it('redirects to login when not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <TestComponent />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Login Page')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('renders children when authenticated', () => {
    useAuthStore.setState({
      user: { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' },
      isAuthenticated: true,
    })

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <TestComponent />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument()
  })
})
