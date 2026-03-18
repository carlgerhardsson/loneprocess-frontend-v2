import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ActivityList } from './ActivityList'
import { useActivities } from '@/hooks/queries/useActivities'
import type { ReactNode } from 'react'

// Mock the useActivities hook
vi.mock('@/hooks/queries/useActivities', () => ({
  useActivities: vi.fn(),
}))

const mockActivities = [
  {
    id: '1',
    periodId: 'period-1',
    title: 'Activity 1',
    type: 'salary' as const,
    status: 'pending' as const,
    priority: 'high' as const,
    description: '',
    assignedTo: null,
    dueDate: null,
    completedAt: null,
    checklistItems: [],
    comments: [],
    tags: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
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

describe('ActivityList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state', () => {
    vi.mocked(useActivities).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isPending: false,
      isLoadingError: false,
      isRefetchError: false,
      isSuccess: false,
      status: 'loading',
      fetchStatus: 'fetching',
      isFetching: true,
      isFetched: false,
      isRefetching: false,
      isPaused: false,
      isPlaceholderData: false,
      isStale: false,
      dataUpdatedAt: 0,
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
    })

    render(<ActivityList />, { wrapper: createWrapper() })
    // Skeleton loaders should be rendered
    expect(document.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0)
  })

  it('renders error state', () => {
    vi.mocked(useActivities).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Failed to fetch'),
      refetch: vi.fn(),
      isPending: false,
      isLoadingError: true,
      isRefetchError: false,
      isSuccess: false,
      status: 'error',
      fetchStatus: 'idle',
      isFetching: false,
      isFetched: true,
      isRefetching: false,
      isPaused: false,
      isPlaceholderData: false,
      isStale: false,
      dataUpdatedAt: 0,
      errorUpdatedAt: Date.now(),
      failureCount: 1,
      failureReason: new Error('Failed to fetch'),
      errorUpdateCount: 1,
    })

    render(<ActivityList />, { wrapper: createWrapper() })
    expect(screen.getByText('Något gick fel')).toBeInTheDocument()
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument()
  })

  it('renders empty state', () => {
    vi.mocked(useActivities).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isPending: false,
      isLoadingError: false,
      isRefetchError: false,
      isSuccess: true,
      status: 'success',
      fetchStatus: 'idle',
      isFetching: false,
      isFetched: true,
      isRefetching: false,
      isPaused: false,
      isPlaceholderData: false,
      isStale: false,
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
    })

    render(<ActivityList />, { wrapper: createWrapper() })
    expect(screen.getByText('Inga aktiviteter')).toBeInTheDocument()
  })

  it('renders activities list', () => {
    vi.mocked(useActivities).mockReturnValue({
      data: mockActivities,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isPending: false,
      isLoadingError: false,
      isRefetchError: false,
      isSuccess: true,
      status: 'success',
      fetchStatus: 'idle',
      isFetching: false,
      isFetched: true,
      isRefetching: false,
      isPaused: false,
      isPlaceholderData: false,
      isStale: false,
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
    })

    render(<ActivityList />, { wrapper: createWrapper() })
    expect(screen.getByText('Activity 1')).toBeInTheDocument()
  })
})
