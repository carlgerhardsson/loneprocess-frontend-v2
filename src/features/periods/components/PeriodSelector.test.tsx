import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PeriodSelector } from './PeriodSelector'
import { usePeriods } from '@/hooks/queries/usePeriods'
import type { ReactNode } from 'react'
import type { UseQueryResult } from '@tanstack/react-query'
import type { Period } from '@/types'

// Mock the usePeriods hook
vi.mock('@/hooks/queries/usePeriods', () => ({
  usePeriods: vi.fn(),
}))

const mockPeriods: Period[] = [
  {
    id: '1',
    name: 'Januari 2024',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    type: 'monthly',
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    activityCount: 10,
    completedActivityCount: 5,
  },
  {
    id: '2',
    name: 'Februari 2024',
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    type: 'monthly',
    status: 'completed',
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
    activityCount: 8,
    completedActivityCount: 8,
  },
]

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('PeriodSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state', () => {
    vi.mocked(usePeriods).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as UseQueryResult<Period[], Error>)

    render(<PeriodSelector />, { wrapper: createWrapper() })
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('renders empty state when no periods', () => {
    vi.mocked(usePeriods).mockReturnValue({
      data: [],
      isLoading: false,
    } as unknown as UseQueryResult<Period[], Error>)

    render(<PeriodSelector />, { wrapper: createWrapper() })
    expect(screen.getByText('Inga perioder tillgängliga')).toBeInTheDocument()
  })

  it('renders current period', () => {
    vi.mocked(usePeriods).mockReturnValue({
      data: mockPeriods,
      isLoading: false,
    } as unknown as UseQueryResult<Period[], Error>)

    render(<PeriodSelector currentPeriodId="1" />, { wrapper: createWrapper() })
    expect(screen.getByText('Januari 2024')).toBeInTheDocument()
  })

  it('opens dropdown when clicked', () => {
    vi.mocked(usePeriods).mockReturnValue({
      data: mockPeriods,
      isLoading: false,
    } as unknown as UseQueryResult<Period[], Error>)

    render(<PeriodSelector />, { wrapper: createWrapper() })

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(screen.getByText('Februari 2024')).toBeInTheDocument()
  })

  it('calls onPeriodChange when period selected', () => {
    vi.mocked(usePeriods).mockReturnValue({
      data: mockPeriods,
      isLoading: false,
    } as unknown as UseQueryResult<Period[], Error>)

    const onPeriodChange = vi.fn()
    render(<PeriodSelector onPeriodChange={onPeriodChange} />, { wrapper: createWrapper() })

    // Open dropdown
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Select second period
    const option = screen.getByText('Februari 2024')
    fireEvent.click(option)

    expect(onPeriodChange).toHaveBeenCalledWith(mockPeriods[1])
  })

  it('supports keyboard navigation', () => {
    vi.mocked(usePeriods).mockReturnValue({
      data: mockPeriods,
      isLoading: false,
    } as unknown as UseQueryResult<Period[], Error>)

    const onPeriodChange = vi.fn()
    render(<PeriodSelector onPeriodChange={onPeriodChange} />, { wrapper: createWrapper() })

    // Open dropdown
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Select with Enter key
    const option = screen.getByText('Februari 2024').closest('[role="option"]')!
    fireEvent.keyDown(option, { key: 'Enter' })

    expect(onPeriodChange).toHaveBeenCalledWith(mockPeriods[1])
  })

  it('displays period metadata in dropdown', () => {
    vi.mocked(usePeriods).mockReturnValue({
      data: mockPeriods,
      isLoading: false,
    } as unknown as UseQueryResult<Period[], Error>)

    render(<PeriodSelector />, { wrapper: createWrapper() })

    // Open dropdown
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Check for activity counts
    expect(screen.getByText('5/10')).toBeInTheDocument()
    expect(screen.getByText('8/8')).toBeInTheDocument()
  })
})
