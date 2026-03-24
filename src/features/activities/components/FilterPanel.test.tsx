import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterPanel } from './FilterPanel'
import type { ActivityFilters } from '@/types'

describe('FilterPanel - READ-ONLY VERSION', () => {
  it('renders filter sections', () => {
    const filters: ActivityFilters = {}
    render(<FilterPanel filters={filters} onFilterChange={vi.fn()} onClearFilters={vi.fn()} />)

    expect(screen.getByText('Filter')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Prioritet')).toBeInTheDocument()
  })

  it('shows checked status options', () => {
    const filters: ActivityFilters = {
      status: ['pending', 'in_progress'],
    }

    render(<FilterPanel filters={filters} onFilterChange={vi.fn()} onClearFilters={vi.fn()} />)

    const pendingCheckbox = screen.getByLabelText('Väntande')
    const inProgressCheckbox = screen.getByLabelText('Pågående')

    expect(pendingCheckbox).toBeChecked()
    expect(inProgressCheckbox).toBeChecked()
  })

  it('shows checked priority options', () => {
    const filters: ActivityFilters = {
      priority: [3],
    }

    render(<FilterPanel filters={filters} onFilterChange={vi.fn()} onClearFilters={vi.fn()} />)

    const highCheckbox = screen.getByLabelText('Hög')
    expect(highCheckbox).toBeChecked()
  })

  it('calls onFilterChange when option toggled', () => {
    const onFilterChange = vi.fn()
    const filters: ActivityFilters = {}

    render(
      <FilterPanel filters={filters} onFilterChange={onFilterChange} onClearFilters={vi.fn()} />
    )

    const pendingCheckbox = screen.getByLabelText('Väntande')
    fireEvent.click(pendingCheckbox)

    expect(onFilterChange).toHaveBeenCalled()
  })

  it('shows clear button when filters active', () => {
    const filters: ActivityFilters = {
      status: ['pending'],
    }

    render(<FilterPanel filters={filters} onFilterChange={vi.fn()} onClearFilters={vi.fn()} />)

    expect(screen.getByText('Rensa')).toBeInTheDocument()
  })

  it('calls onClearFilters when clear clicked', () => {
    const onClearFilters = vi.fn()
    const filters: ActivityFilters = {
      status: ['pending'],
    }

    render(
      <FilterPanel filters={filters} onFilterChange={vi.fn()} onClearFilters={onClearFilters} />
    )

    const clearButton = screen.getByText('Rensa')
    fireEvent.click(clearButton)

    expect(onClearFilters).toHaveBeenCalled()
  })
})
