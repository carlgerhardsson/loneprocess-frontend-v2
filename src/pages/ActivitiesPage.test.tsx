import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ActivitiesPage } from './ActivitiesPage'
import * as useActivitiesHook from '@/hooks/queries/useActivities'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('ActivitiesPage', () => {
  it('renders page heading', () => {
    vi.spyOn(useActivitiesHook, 'useActivities').mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as never)

    render(<ActivitiesPage />, { wrapper })

    expect(screen.getByRole('heading', { name: /Aktiviteter/i })).toBeInTheDocument()
  })

  it('shows loading spinner', () => {
    vi.spyOn(useActivitiesHook, 'useActivities').mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as never)

    render(<ActivitiesPage />, { wrapper })

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('shows empty state when no activities', () => {
    vi.spyOn(useActivitiesHook, 'useActivities').mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as never)

    render(<ActivitiesPage />, { wrapper })

    expect(screen.getByText(/Inga aktiviteter ännu/i)).toBeInTheDocument()
  })
})
