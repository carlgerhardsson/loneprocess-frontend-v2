import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DeleteActivityDialog } from './DeleteActivityDialog'
import type { Activity } from '@/types'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const mockActivity: Activity = {
  id: '1',
  title: 'Test Activity',
  description: 'Test description',
  type: 'salary',
  status: 'in_progress',
  priority: 'high',
  assignedTo: 'John Doe',
  dueDate: '2024-12-31',
  completedAt: null,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  periodId: 'period-1',
  checklistItems: [],
  comments: [],
  tags: [],
}

describe('DeleteActivityDialog', () => {
  it('renders when open', () => {
    render(<DeleteActivityDialog isOpen={true} onClose={vi.fn()} activity={mockActivity} />, {
      wrapper,
    })

    expect(screen.getByText('Ta bort aktivitet')).toBeInTheDocument()
    expect(screen.getByText(/Test Activity/)).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<DeleteActivityDialog isOpen={false} onClose={vi.fn()} activity={mockActivity} />, {
      wrapper,
    })

    expect(screen.queryByText('Ta bort aktivitet')).not.toBeInTheDocument()
  })

  it('shows warning message', () => {
    render(<DeleteActivityDialog isOpen={true} onClose={vi.fn()} activity={mockActivity} />, {
      wrapper,
    })

    expect(screen.getByText(/Denna åtgärd kan inte ångras/)).toBeInTheDocument()
  })
})
