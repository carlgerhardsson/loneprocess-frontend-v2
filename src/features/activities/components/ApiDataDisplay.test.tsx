import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { ApiDataDisplay } from './ApiDataDisplay'

// Mocka alla hooks
vi.mock('@/hooks/queries/useEmployees', () => ({
  useEmployees: vi.fn().mockReturnValue({ data: [], isLoading: false, isError: false, refetch: vi.fn() }),
}))
vi.mock('@/hooks/queries/useKorningsStatus', () => ({
  useKorningsStatus: vi.fn().mockReturnValue({ data: null, isLoading: false, isError: false, refetch: vi.fn() }),
}))
vi.mock('@/hooks/queries/useFellistor', () => ({
  useFellistor: vi.fn().mockReturnValue({ data: [], isLoading: false, isError: false, refetch: vi.fn() }),
}))

import { useEmployees } from '@/hooks/queries/useEmployees'
import { useKorningsStatus } from '@/hooks/queries/useKorningsStatus'
import { useFellistor } from '@/hooks/queries/useFellistor'

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children)
}

describe('ApiDataDisplay', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Återställ default return values efter clearAllMocks
    vi.mocked(useEmployees).mockReturnValue({ data: [], isLoading: false, isError: false, refetch: vi.fn() } as ReturnType<typeof useEmployees>)
    vi.mocked(useKorningsStatus).mockReturnValue({ data: null, isLoading: false, isError: false, refetch: vi.fn() } as ReturnType<typeof useKorningsStatus>)
    vi.mocked(useFellistor).mockReturnValue({ data: [], isLoading: false, isError: false, refetch: vi.fn() } as ReturnType<typeof useFellistor>)
  })

  it('visar EmployeeTable för aktivitet 1.2', () => {
    render(<ApiDataDisplay activityId="1.2" />, { wrapper: createWrapper() })
    expect(vi.mocked(useEmployees)).toHaveBeenCalledWith({ status: 'new' })
  })

  it('visar EmployeeTable för aktivitet 1.3', () => {
    render(<ApiDataDisplay activityId="1.3" />, { wrapper: createWrapper() })
    expect(vi.mocked(useEmployees)).toHaveBeenCalledWith({ status: 'terminated' })
  })

  it('visar EmployeeTable för aktivitet 1.5 (alla anställda)', () => {
    render(<ApiDataDisplay activityId="1.5" />, { wrapper: createWrapper() })
    // Aktivitet 1.5 anropar useEmployees utan filter
    expect(vi.mocked(useEmployees)).toHaveBeenCalledWith(undefined)
  })

  it('visar KorningsStatus för aktivitet 2.1', () => {
    render(<ApiDataDisplay activityId="2.1" loneperiodId={42} />, { wrapper: createWrapper() })
    expect(vi.mocked(useKorningsStatus)).toHaveBeenCalledWith(42)
  })

  it('visar FellistorData för aktivitet 2.2', () => {
    render(<ApiDataDisplay activityId="2.2" loneperiodId={42} />, { wrapper: createWrapper() })
    expect(vi.mocked(useFellistor)).toHaveBeenCalledWith(42)
  })

  it('visar varning när loneperiodId saknas för 2.1', () => {
    render(<ApiDataDisplay activityId="2.1" />, { wrapper: createWrapper() })
    expect(screen.getByText(/Ingen aktiv löneperiod/i)).toBeInTheDocument()
  })

  it('visar loading skeleton', () => {
    vi.mocked(useEmployees).mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: vi.fn(),
    } as ReturnType<typeof useEmployees>)
    render(<ApiDataDisplay activityId="1.2" />, { wrapper: createWrapper() })
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
  })

  it('visar error state med retry-knapp', () => {
    vi.mocked(useEmployees).mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: vi.fn(),
    } as ReturnType<typeof useEmployees>)
    render(<ApiDataDisplay activityId="1.2" />, { wrapper: createWrapper() })
    expect(screen.getByText(/Kunde inte hämta data/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Försök igen/i })).toBeInTheDocument()
  })
})
