import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LoginPage } from './LoginPage'
import { useAuthStore } from '@/stores/authStore'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('LoginPage', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false, isLoading: false })
    mockNavigate.mockClear()
  })

  it('renders login form', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /Löneportalen/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Användarnamn/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Lösenord/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Logga in/i })).toBeInTheDocument()
  })

  it('shows error when submitting empty form', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )

    const submitButton = screen.getByRole('button', { name: /Logga in/i })
    fireEvent.click(submitButton)

    expect(screen.getByText(/Användarnamn och lösenord krävs/i)).toBeInTheDocument()
  })

  it('logs in user and navigates to activities', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )

    const usernameInput = screen.getByLabelText(/Användarnamn/i)
    const passwordInput = screen.getByLabelText(/Lösenord/i)
    const submitButton = screen.getByRole('button', { name: /Logga in/i })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    // Wait for async login to complete
    await waitFor(() => {
      const state = useAuthStore.getState()
      expect(state.isAuthenticated).toBe(true)
    })

    const state = useAuthStore.getState()
    expect(state.user?.email).toBe('testuser')
    expect(mockNavigate).toHaveBeenCalledWith('/activities')
  })

  it('shows demo instructions', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )

    expect(
      screen.getByText(/Demo: Ange vilket användarnamn och lösenord som helst/i)
    ).toBeInTheDocument()
  })
})
