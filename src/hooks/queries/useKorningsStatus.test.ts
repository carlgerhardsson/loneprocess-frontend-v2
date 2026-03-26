import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { useKorningsStatus } from './useKorningsStatus'

vi.mock('@/lib/api/la', () => ({
  fetchKorningsStatus: vi.fn(),
}))

import { fetchKorningsStatus } from '@/lib/api/la'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children)
}

const mockStatus = {
  id: 1,
  loneperiod_id: 42,
  status: 'provlon_klar' as const,
  provlon_startad: '2025-03-01T08:00:00',
  provlon_klar: '2025-03-01T08:30:00',
  definitiv_startad: null,
  definitiv_klar: null,
  antal_anstallda: 150,
  antal_fel: 3,
  meddelande: null,
  updated_at: '2025-03-01T08:30:00',
}

describe('useKorningsStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returnerar data när fetch lyckas', async () => {
    vi.mocked(fetchKorningsStatus).mockResolvedValue(mockStatus)

    const { result } = renderHook(() => useKorningsStatus(42), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual(mockStatus)
    expect(vi.mocked(fetchKorningsStatus)).toHaveBeenCalledWith(42)
  })

  it('är disabled när loneperiodId är null', () => {
    const { result } = renderHook(() => useKorningsStatus(null), {
      wrapper: createWrapper(),
    })

    expect(result.current.fetchStatus).toBe('idle')
    expect(vi.mocked(fetchKorningsStatus)).not.toHaveBeenCalled()
  })

  it('sätter error state vid misslyckad fetch', async () => {
    vi.mocked(fetchKorningsStatus).mockRejectedValue(new Error('API error'))

    const { result } = renderHook(() => useKorningsStatus(42), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBeTruthy()
  })

  it('är i loading state initialt', () => {
    vi.mocked(fetchKorningsStatus).mockImplementation(() => new Promise(() => {}))

    const { result } = renderHook(() => useKorningsStatus(42), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
  })
})
