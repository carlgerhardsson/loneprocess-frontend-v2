import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FilterPanel } from './FilterPanel'
import type { ActivityFilters } from '@/types'

describe('FilterPanel', () => {
  it('renders filter sections', () => {
    const filters: ActivityFilters = {}
    render(
      <FilterPanel filters={filters} onFilterChange={vi.fn()} onClearFilters={vi.fn()} />
    )

    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Typ')).toBeInTheDocument()
    expect(screen.getByText('Prioritet')).toBeInTheDocument()
  })

  it('renders clear button when filters are active', () => {
    const filters: ActivityFilters = { status: ['pending'] }
    render(
      <FilterPanel filters={filters} onFilterChange={vi.fn()} onClearFilters={vi.fn()} />
    )
    expect(screen.getByText('Rensa')).toBeInTheDocument()
  })

  it('does not render clear button when no filters are active', () => {
    const filters: ActivityFilters = {}
    render(
      <FilterPanel filters={filters} onFilterChange={vi.fn()} onClearFilters={vi.fn()} />
    )
    expect(screen.queryByText('Rensa')).not.toBeInTheDocument()
  })

  it('renders status filter options', () => {
    const filters: ActivityFilters = {}
    render(
      <FilterPanel filters={filters} onFilterChange={vi.fn()} onClearFilters={vi.fn()} />
    )

    expect(screen.getByText('Väntande')).toBeInTheDocument()
    expect(screen.getByText('Pågående')).toBeInTheDocument()
    expect(screen.getByText('Klar')).toBeInTheDocument()
  })

  it('renders type filter options', () => {
    const filters: ActivityFilters = {}
    render(
      <FilterPanel filters={filters} onFilterChange={vi.fn()} onClearFilters={vi.fn()} />
    )

    expect(screen.getByText('Lönehantering')).toBeInTheDocument()
    expect(screen.getByText('Skatt')).toBeInTheDocument()
  })

  it('renders priority filter options', () => {
    const filters: ActivityFilters = {}
    render(
      <FilterPanel filters={filters} onFilterChange={vi.fn()} onClearFilters={vi.fn()} />
    )

    expect(screen.getByText('Låg')).toBeInTheDocument()
    expect(screen.getByText('Medel')).toBeInTheDocument()
    expect(screen.getByText('Hög')).toBeInTheDocument()
  })

  it('checks status filter when selected', () => {
    const filters: ActivityFilters = { status: ['pending'] }
    render(
      <FilterPanel filters={filters} onFilterChange={vi.fn()} onClearFilters={vi.fn()} />
    )

    const checkbox = screen.getByRole('checkbox', { name: /väntande/i })
    expect(checkbox).toBeChecked()
  })

  it('renders all filter options', () => {
    const filters: ActivityFilters = {}
    render(
      <FilterPanel filters={filters} onFilterChange={vi.fn()} onClearFilters={vi.fn()} />
    )

    // Just verify the component renders
    expect(screen.getByText('Filter')).toBeInTheDocument()
  })

  it('handles multiple active filters', () => {
    const filters: ActivityFilters = {
      status: ['pending', 'in_progress'],
      type: ['salary'],
      priority: ['high'],
    }

    render(
      <FilterPanel filters={filters} onFilterChange={vi.fn()} onClearFilters={vi.fn()} />
    )

    expect(screen.getByText('Rensa')).toBeInTheDocument()
  })

  it('shows filter section titles', () => {
    const filters: ActivityFilters = {}
    render(
      <FilterPanel filters={filters} onFilterChange={vi.fn()} onClearFilters={vi.fn()} />
    )

    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Typ')).toBeInTheDocument()
    expect(screen.getByText('Prioritet')).toBeInTheDocument()
  })
})
