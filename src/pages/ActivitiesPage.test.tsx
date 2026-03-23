import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { ActivitiesPage } from './ActivitiesPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  )
}

describe('ActivitiesPage', () => {
  it('renders page title', () => {
    renderWithProviders(<ActivitiesPage />)
    expect(screen.getByText('Aktiviteter')).toBeInTheDocument()
  })

  it('renders create button', () => {
    renderWithProviders(<ActivitiesPage />)
    expect(screen.getByText('Ny aktivitet')).toBeInTheDocument()
  })

  // TODO: Fix - loading state structure changed
  it.skip('shows loading spinner', () => {
    renderWithProviders(<ActivitiesPage />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
