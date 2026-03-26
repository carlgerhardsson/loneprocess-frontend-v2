import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { useFellistor, useFellistaSummary } from './useFellistor'

vi.mock('@/lib/api/la', () => ({
  fetchFellistor: vi.fn(),
  fetchFellistaSummary: vi.fn(),
}))

import { fetchFellistor, fetchFellistaSummary } from '@/lib/api/la'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children)
}

const mockFel = [
  {
    id: 'err-1',
    loneperiod_id: 42,
    personal_number: '8901011234',
    name: 'Anna Svensson',
    error_code: 'AGI_001',
    error_type: 'AGI',
    description: 'Saknad uppgift för AGI',
    severity: 'error' as const,
    behandlad: false,
    behandlad_av: null,
    behandlad_datum: null,
    created_at: '2025-03-01',
  },
]

const mockSummary = {
  loneperiod_id: 42,
  total_errors: 3,
  total_warnings: 5,
  total_info: 1,
  obehandlade: 7,
  behandlade: 2,
}

describe('useFellistor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returnerar fellista när fetch lyckas', async () => {
    vi.mocked(fetchFellistor).mockResolvedValue(mockFel)

    const { result } = renderHook(() => useFellistor(42), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual(mockFel)
    expect(vi.mocked(fetchFellistor)).toHaveBeenCalledWith(42, undefined)
  })

  it('är disabled när loneperiodId är null', () => {
    const { result } = renderHook(() => useFellistor(null), {
      wrapper: createWrapper(),
    })

    expect(result.current.fetchStatus).toBe('idle')
    expect(vi.mocked(fetchFellistor)).not.toHaveBeenCalled()
  })

  it('filtrerar på severity korrekt', async () => {
    vi.mocked(fetchFellistor).mockResolvedValue(mockFel)

    const { result } = renderHook(
      () => useFellistor(42, { severity: 'error' }),
      { wrapper: createWrapper() }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(vi.mocked(fetchFellistor)).toHaveBeenCalledWith(42, { severity: 'error' })
  })

  it('sätter error state vid misslyckad fetch', async () => {
    vi.mocked(fetchFellistor).mockRejectedValue(new Error('API error'))

    const { result } = renderHook(() => useFellistor(42), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})

describe('useFellistaSummary', () => {
  it('returnerar sammanfattning när fetch lyckas', async () => {
    vi.mocked(fetchFellistaSummary).mockResolvedValue(mockSummary)

    const { result } = renderHook(() => useFellistaSummary(42), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual(mockSummary)
  })

  it('är disabled när loneperiodId är null', () => {
    const { result } = renderHook(() => useFellistaSummary(null), {
      wrapper: createWrapper(),
    })

    expect(result.current.fetchStatus).toBe('idle')
  })
})
