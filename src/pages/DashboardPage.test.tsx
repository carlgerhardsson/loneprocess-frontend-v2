import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import DashboardPage from './DashboardPage'

// Mocka komponenter som gör API-anrop eller kräver providers
vi.mock('@/features/dashboard/components/DashboardOverview', () => ({
  DashboardOverview: () => <div data-testid="dashboard-overview">Oversikt</div>,
}))
vi.mock('@/features/dashboard/components/LoneperioderTab', () => ({
  LoneperioderTab: () => <div data-testid="loneperioder-tab">Löneperioder</div>,
}))
vi.mock('@/features/dashboard/components/PrintView', () => ({
  PrintView: () => <div data-testid="print-view" />,
}))
vi.mock('@/features/dashboard/components/ExportButton', () => ({
  ExportButton: () => <button>Exportera checklista</button>,
}))
vi.mock('@/contexts/ActivityProgressContext', () => ({
  ActivityProgressProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

function createWrapper() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: qc }, children)
}

describe('DashboardPage', () => {
  it('visar tab-navigationen', () => {
    render(<DashboardPage />, { wrapper: createWrapper() })
    expect(screen.getByRole('tab', { name: 'Överblick' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Löneperioder' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Verktygslåda' })).toBeInTheDocument()
  })

  it('Överblick-fliken är aktiv som standard', () => {
    render(<DashboardPage />, { wrapper: createWrapper() })
    expect(screen.getByRole('tab', { name: 'Överblick' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByTestId('dashboard-overview')).toBeInTheDocument()
  })

  it('byter till Löneperioder-fliken när man klickar', async () => {
    render(<DashboardPage />, { wrapper: createWrapper() })
    await userEvent.click(screen.getByRole('tab', { name: 'Löneperioder' }))
    expect(screen.getByRole('tab', { name: 'Löneperioder' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    expect(screen.getByTestId('loneperioder-tab')).toBeInTheDocument()
  })

  it('visar Verktygslåda-placeholder', async () => {
    render(<DashboardPage />, { wrapper: createWrapper() })
    await userEvent.click(screen.getByRole('tab', { name: 'Verktygslåda' }))
    expect(screen.getByText(/kommande version/i)).toBeInTheDocument()
  })

  it('döljer andra flikar när man byter', async () => {
    render(<DashboardPage />, { wrapper: createWrapper() })
    await userEvent.click(screen.getByRole('tab', { name: 'Löneperioder' }))
    expect(screen.queryByTestId('dashboard-overview')).not.toBeInTheDocument()
  })

  it('visar ExportButton på Överblick-fliken', () => {
    render(<DashboardPage />, { wrapper: createWrapper() })
    expect(screen.getByText('Exportera checklista')).toBeInTheDocument()
  })

  it('renderar PrintView', () => {
    render(<DashboardPage />, { wrapper: createWrapper() })
    expect(screen.getByTestId('print-view')).toBeInTheDocument()
  })
})
