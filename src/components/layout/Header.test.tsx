import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from './Header'
import { useAuthStore } from '@/stores/authStore'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Header', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false })
    mockNavigate.mockClear()
  })

  it('renders app logo and name', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(screen.getByText('Löneportalen')).toBeInTheDocument()
  })

  it('does not show navigation when not authenticated', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
    expect(screen.queryByText('Logga ut')).not.toBeInTheDocument()
  })

  it('shows navigation and user info when authenticated', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        permissions: ['activities:read'],
        createdAt: '2024-01-01',
        lastLogin: '2024-01-01',
      },
      isAuthenticated: true,
    })

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('Logga ut')).toBeInTheDocument()
  })

  it('logs out and navigates to login when logout clicked', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        permissions: ['activities:read'],
        createdAt: '2024-01-01',
        lastLogin: '2024-01-01',
      },
      isAuthenticated: true,
    })

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const logoutButton = screen.getByText('Logga ut')
    fireEvent.click(logoutButton)

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(false)
    expect(state.user).toBeNull()
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })
})
