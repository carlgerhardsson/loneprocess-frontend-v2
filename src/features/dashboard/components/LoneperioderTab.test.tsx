import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { LoneperioderTab } from './LoneperioderTab'

vi.mock('@/hooks/queries', () => ({
  usePeriods: vi.fn(),
}))

import { usePeriods } from '@/hooks/queries'

const mockPeriods = [
  {
    id: '2025-01',
    name: 'Januari',
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    type: 'monthly' as const,
    status: 'completed' as const,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-31',
    activityCount: 20,
    completedActivityCount: 20,
  },
  {
    id: '2025-03',
    name: 'Mars',
    startDate: '2025-03-01',
    endDate: '2025-03-31',
    type: 'monthly' as const,
    status: 'active' as const,
    createdAt: '2025-03-01',
    updatedAt: '2025-03-01',
    activityCount: 20,
    completedActivityCount: 0,
  },
  {
    id: '2025-04',
    name: 'April',
    startDate: '2025-04-01',
    endDate: '2025-04-30',
    type: 'monthly' as const,
    status: 'archived' as const,
    createdAt: '2025-04-01',
    updatedAt: '2025-04-01',
    activityCount: 20,
    completedActivityCount: 0,
  },
]

function createWrapper() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: qc }, children)
}

describe('LoneperioderTab', () => {
  it('visar loading state', () => {
    vi.mocked(usePeriods).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as ReturnType<typeof usePeriods>)
    render(<LoneperioderTab />, { wrapper: createWrapper() })
    expect(screen.getByText(/Hämtar löneperioder/i)).toBeInTheDocument()
  })

  it('visar error state', () => {
    vi.mocked(usePeriods).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as ReturnType<typeof usePeriods>)
    render(<LoneperioderTab />, { wrapper: createWrapper() })
    expect(screen.getByText(/Kunde inte hämta/i)).toBeInTheDocument()
  })

  it('visar perioder grupperade per år', () => {
    vi.mocked(usePeriods).mockReturnValue({
      data: mockPeriods,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof usePeriods>)
    render(<LoneperioderTab />, { wrapper: createWrapper() })
    expect(screen.getByText('Löneperioder 2025')).toBeInTheDocument()
    expect(screen.getByText('Januari')).toBeInTheDocument()
    expect(screen.getByText('Mars')).toBeInTheDocument()
  })

  it('visar korrekta status-badges', () => {
    vi.mocked(usePeriods).mockReturnValue({
      data: mockPeriods,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof usePeriods>)
    render(<LoneperioderTab />, { wrapper: createWrapper() })
    expect(screen.getByText('Avslutad')).toBeInTheDocument()
    expect(screen.getByText('Aktiv')).toBeInTheDocument()
    expect(screen.getByText('Arkiverad')).toBeInTheDocument()
  })

  it('visar varningstext om read-only', () => {
    vi.mocked(usePeriods).mockReturnValue({
      data: mockPeriods,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof usePeriods>)
    render(<LoneperioderTab />, { wrapper: createWrapper() })
    expect(screen.getByText(/Kontakta lönechef/i)).toBeInTheDocument()
  })

  it('highlightar aktiv period', () => {
    vi.mocked(usePeriods).mockReturnValue({
      data: mockPeriods,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof usePeriods>)
    render(<LoneperioderTab />, { wrapper: createWrapper() })
    const activeRow = screen.getByTestId('period-row-2025-03')
    expect(activeRow.className).toContain('bg-blue-50')
  })
})
