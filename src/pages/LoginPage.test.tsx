import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { LoginPage } from './LoginPage'
import { useAuthStore } from '@/stores/authStore'

// Mocka auth API
vi.mock('@/lib/api/auth', () => ({
  verifyApiKey: vi.fn(),
}))

import { verifyApiKey } from '@/lib/api/auth'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

function renderLoginPage() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  )
}

describe('LoginPage', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
    mockNavigate.mockClear()
    vi.clearAllMocks()
  })

  it('visar spinner och anslutningstext vid uppstart', () => {
    // Håll verifyApiKey hängande så vi ser loading state
    vi.mocked(verifyApiKey).mockImplementation(() => new Promise(() => {}))
    vi.stubEnv('VITE_LONEPROCESS_API_KEY', 'test-key')

    renderLoginPage()

    expect(screen.getByText(/Löneportalen/i)).toBeInTheDocument()
    expect(screen.getByText(/Ansluter till systemet/i)).toBeInTheDocument()
    // Ingen login-knapp eller formulärfält
    expect(screen.queryByRole('button', { name: /Logga in/i })).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/Användarnamn/i)).not.toBeInTheDocument()
  })

  it('redirectar till /dashboard när inloggning lyckas', async () => {
    vi.stubEnv('VITE_LONEPROCESS_API_KEY', 'test-key')
    vi.mocked(verifyApiKey).mockResolvedValue(undefined)

    renderLoginPage()

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true })
    })
  })

  it('visar felmeddelande om API är onåbart', async () => {
    vi.stubEnv('VITE_LONEPROCESS_API_KEY', 'test-key')
    vi.mocked(verifyApiKey).mockRejectedValue(new Error('Network error'))

    renderLoginPage()

    await waitFor(() => {
      expect(screen.getByText(/Anslutningsfel/i)).toBeInTheDocument()
    })
  })

  it('visar Försök igen-knapp vid fel', async () => {
    vi.stubEnv('VITE_LONEPROCESS_API_KEY', 'test-key')
    vi.mocked(verifyApiKey).mockRejectedValue(new Error('Network error'))

    renderLoginPage()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Försök igen/i })).toBeInTheDocument()
    })
  })

  it('försöker igen när man klickar Försök igen', async () => {
    vi.stubEnv('VITE_LONEPROCESS_API_KEY', 'test-key')
    vi.mocked(verifyApiKey)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce(undefined)

    renderLoginPage()

    // Vänta på felmeddelande
    const retryButton = await screen.findByRole('button', { name: /Försök igen/i })

    // Klicka försök igen
    await userEvent.click(retryButton)

    // Ska ha anropat verifyApiKey två gånger
    await waitFor(() => {
      expect(vi.mocked(verifyApiKey)).toHaveBeenCalledTimes(2)
    })
  })

  it('redirectar direkt om redan inloggad', () => {
    useAuthStore.setState({ isAuthenticated: true })

    renderLoginPage()

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true })
    // loginWithApiKey ska inte ha anropats
    expect(vi.mocked(verifyApiKey)).not.toHaveBeenCalled()
  })
})
