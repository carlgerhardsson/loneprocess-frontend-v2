import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { useEmployees } from './useEmployees'

vi.mock('@/lib/api/la', () => ({
  fetchEmployees: vi.fn(),
}))

import { fetchEmployees } from '@/lib/api/la'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children)
}

describe('useEmployees', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returnerar data när fetch lyckas', async () => {
    const mockData = [
      {
        id: 1,
        personal_number: '8901011234',
        name: 'Anna Svensson',
        department: 'IT',
        org_kod: 'ORG1',
        status: 'new',
        employment_date: '2025-04-01',
        termination_date: null,
        salary: 45000,
        salary_type: 'monthly',
        created_at: '2025-03-01',
        updated_at: '2025-03-01',
      },
    ]
    vi.mocked(fetchEmployees).mockResolvedValue(mockData)

    const { result } = renderHook(() => useEmployees({ status: 'new' }), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual(mockData)
    expect(vi.mocked(fetchEmployees)).toHaveBeenCalledWith({ status: 'new' })
  })

  it('är i loading state initialt', () => {
    vi.mocked(fetchEmployees).mockImplementation(() => new Promise(() => {}))

    const { result } = renderHook(() => useEmployees(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('sätter error state vid misslyckad fetch', async () => {
    vi.mocked(fetchEmployees).mockRejectedValue(new Error('API error'))

    const { result } = renderHook(() => useEmployees(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBeTruthy()
  })

  it('använder rätt query key för filtrering', async () => {
    vi.mocked(fetchEmployees).mockResolvedValue([])

    const { result } = renderHook(() => useEmployees({ status: 'terminated' }), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(vi.mocked(fetchEmployees)).toHaveBeenCalledWith({ status: 'terminated' })
  })
})
