import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { ApiDataDisplay } from './ApiDataDisplay'
import type { UseQueryResult } from '@tanstack/react-query'
import type { LAEmployee, KorningsStatus, LACalculationError } from '@/types/la'

function mockQuery<T>(partial: Partial<UseQueryResult<T>>): UseQueryResult<T> {
  return {
    data: undefined,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isPending: false,
    isFetching: false,
    refetch: vi.fn(),
    error: null,
    status: 'pending',
    fetchStatus: 'idle',
    ...partial,
  } as unknown as UseQueryResult<T>
}

vi.mock('@/hooks/queries/useEmployees', () => ({
  useEmployees: vi.fn(),
}))
vi.mock('@/hooks/queries/useKorningsStatus', () => ({
  useKorningsStatus: vi.fn(),
}))
vi.mock('@/hooks/queries/useFellistor', () => ({
  useFellistor: vi.fn(),
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
    vi.mocked(useEmployees).mockReturnValue(
      mockQuery<LAEmployee[]>({ data: [], isSuccess: true, status: 'success' })
    )
    vi.mocked(useKorningsStatus).mockReturnValue(
      mockQuery<KorningsStatus>({ data: undefined })
    )
    vi.mocked(useFellistor).mockReturnValue(
      mockQuery<LACalculationError[]>({ data: [], isSuccess: true, status: 'success' })
    )
  })

  it('visar EmployeeTable för aktivitet 1.2', () => {
    render(<ApiDataDisplay activityId="1.2" />, { wrapper: createWrapper() })
    expect(vi.mocked(useEmployees)).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'new' })
    )
  })

  it('visar EmployeeTable för aktivitet 1.3', () => {
    render(<ApiDataDisplay activityId="1.3" />, { wrapper: createWrapper() })
    expect(vi.mocked(useEmployees)).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'terminated' })
    )
  })

  it('visar EmployeeTable för aktivitet 1.5 (alla anställda)', () => {
    render(<ApiDataDisplay activityId="1.5" />, { wrapper: createWrapper() })
    expect(vi.mocked(useEmployees)).toHaveBeenCalledWith(undefined)
  })

  it('skickar org_kod när bemanningsområde är satt för 1.2', () => {
    render(
      <ApiDataDisplay activityId="1.2" orgKod="ORG1" />,
      { wrapper: createWrapper() }
    )
    expect(vi.mocked(useEmployees)).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'new', org_kod: 'ORG1' })
    )
  })

  it('skickar org_kod när bemanningsområde är satt för 1.5', () => {
    render(
      <ApiDataDisplay activityId="1.5" orgKod="ORG2" />,
      { wrapper: createWrapper() }
    )
    expect(vi.mocked(useEmployees)).toHaveBeenCalledWith(
      expect.objectContaining({ org_kod: 'ORG2' })
    )
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
    vi.mocked(useEmployees).mockReturnValue(
      mockQuery<LAEmployee[]>({ isLoading: true, isPending: true, status: 'pending' })
    )
    render(<ApiDataDisplay activityId="1.2" />, { wrapper: createWrapper() })
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
  })

  it('visar error state med retry-knapp', () => {
    vi.mocked(useEmployees).mockReturnValue(
      mockQuery<LAEmployee[]>({ isError: true, status: 'error', error: new Error('API error') })
    )
    render(<ApiDataDisplay activityId="1.2" />, { wrapper: createWrapper() })
    expect(screen.getByText(/Kunde inte hämta data/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Försök igen/i })).toBeInTheDocument()
  })
})
