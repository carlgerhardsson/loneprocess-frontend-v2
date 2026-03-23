import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SessionManager } from './SessionManager'
import { useAuthStore } from '@/stores/authStore'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('SessionManager', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false })
    mockNavigate.mockClear()
    vi.clearAllTimers()
  })

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <SessionManager />
      </MemoryRouter>
    )
  })

  it('does nothing when not authenticated', () => {
    render(
      <MemoryRouter>
        <SessionManager />
      </MemoryRouter>
    )

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('redirects to login if session is expired', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        name: 'Test',
        email: 'test@test.com',
        role: 'user',
        permissions: [],
        createdAt: '2024-01-01',
        lastLogin: '2024-01-01',
      },
      session: {
        token: 'test-token',
        expiresAt: new Date(Date.now() - 1000).toISOString(), // Expired
        refreshToken: 'refresh-token',
      },
      isAuthenticated: true,
    })

    render(
      <MemoryRouter>
        <SessionManager />
      </MemoryRouter>
    )

    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true })
  })
})
