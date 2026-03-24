import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CreateActivityModal } from './CreateActivityModal'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('CreateActivityModal', () => {
  it('renders when open', () => {
    render(<CreateActivityModal isOpen={true} onClose={vi.fn()} />, { wrapper })

    expect(screen.getByText('Skapa ny aktivitet')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<CreateActivityModal isOpen={false} onClose={vi.fn()} />, { wrapper })

    expect(screen.queryByText('Skapa ny aktivitet')).not.toBeInTheDocument()
  })
})
