import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useAuthStore } from './authStore'

// Mocka auth API-modulen
vi.mock('../lib/api/auth', () => ({
  verifyApiKey: vi.fn(),
}))

import { verifyApiKey } from '../lib/api/auth'

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  // ─── Grundläggande state ────────────────────────────────────────────────────

  it('initialiseras med tomt state', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.session).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.error).toBeNull()
  })

  it('sätter user korrekt via setUser', () => {
    const user = {
      id: '1',
      name: 'Test',
      email: 'test@test.com',
      role: 'user' as const,
      permissions: [] as const,
      createdAt: '2024-01-01',
      lastLogin: '2024-01-01',
    }
    useAuthStore.getState().setUser(user)
    expect(useAuthStore.getState().user).toEqual(user)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
  })

  it('loggar ut korrekt', () => {
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
      isAuthenticated: true,
    })
    useAuthStore.getState().logout()
    expect(useAuthStore.getState().user).toBeNull()
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })

  // ─── Behörigheter ───────────────────────────────────────────────────────────

  it('kontrollerar behörigheter korrekt', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        name: 'Test',
        email: 'test@test.com',
        role: 'user',
        permissions: ['activities:read', 'periods:read'],
        createdAt: '2024-01-01',
        lastLogin: '2024-01-01',
      },
      isAuthenticated: true,
    })
    expect(useAuthStore.getState().checkPermission('activities:read')).toBe(true)
    expect(useAuthStore.getState().checkPermission('activities:delete')).toBe(false)
  })

  it('kontrollerar roller korrekt', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        name: 'Test',
        email: 'test@test.com',
        role: 'admin',
        permissions: [],
        createdAt: '2024-01-01',
        lastLogin: '2024-01-01',
      },
      isAuthenticated: true,
    })
    expect(useAuthStore.getState().hasRole('admin')).toBe(true)
    expect(useAuthStore.getState().hasRole('user')).toBe(false)
  })

  // ─── Session ────────────────────────────────────────────────────────────────

  it('detekterar utgången session', () => {
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
        expiresAt: new Date(Date.now() - 1000).toISOString(),
        refreshToken: '',
      },
      isAuthenticated: true,
    })
    expect(useAuthStore.getState().checkSession()).toBe(false)
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })

  it('validerar giltig session', () => {
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
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
        refreshToken: '',
      },
      isAuthenticated: true,
    })
    expect(useAuthStore.getState().checkSession()).toBe(true)
  })

  // ─── loginWithApiKey ────────────────────────────────────────────────────────

  it('loggar in automatiskt när API-nyckel är giltig', async () => {
    vi.stubEnv('VITE_LONEPROCESS_API_KEY', 'test-api-key-123')
    vi.mocked(verifyApiKey).mockResolvedValue(undefined)

    await useAuthStore.getState().loginWithApiKey()

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(true)
    expect(state.error).toBeNull()
    expect(state.isLoading).toBe(false)
    expect(state.user).not.toBeNull()
    expect(state.session?.token).toBe('test-api-key-123')
  })

  it('sätter felmeddelande när API-nyckel saknas', async () => {
    vi.stubEnv('VITE_LONEPROCESS_API_KEY', '')

    await useAuthStore.getState().loginWithApiKey()

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(false)
    expect(state.error).not.toBeNull()
    expect(state.isLoading).toBe(false)
  })

  it('sätter felmeddelande när API är onåbart', async () => {
    vi.stubEnv('VITE_LONEPROCESS_API_KEY', 'test-api-key-123')
    vi.mocked(verifyApiKey).mockRejectedValue(new Error('Network error'))

    await useAuthStore.getState().loginWithApiKey()

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(false)
    expect(state.error).not.toBeNull()
    expect(state.isLoading).toBe(false)
  })

  it('gör inget om redan inloggad', async () => {
    useAuthStore.setState({ isAuthenticated: true })

    await useAuthStore.getState().loginWithApiKey()

    // verifyApiKey ska inte ha anropats
    expect(vi.mocked(verifyApiKey)).not.toHaveBeenCalled()
  })

  it('sätter isLoading true under inloggning', async () => {
    vi.stubEnv('VITE_LONEPROCESS_API_KEY', 'test-api-key-123')

    // Håll verifyApiKey hängande för att fånga loading state
    let resolveVerify!: () => void
    vi.mocked(verifyApiKey).mockImplementation(
      () =>
        new Promise(resolve => {
          resolveVerify = resolve
        })
    )

    const loginPromise = useAuthStore.getState().loginWithApiKey()
    expect(useAuthStore.getState().isLoading).toBe(true)

    resolveVerify()
    await loginPromise
    expect(useAuthStore.getState().isLoading).toBe(false)
  })
})
