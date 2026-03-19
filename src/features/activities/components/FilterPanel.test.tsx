import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterPanel } from './FilterPanel'
import type { ActivityFilters } from '@/types'

const emptyFilters: ActivityFilters = {}

describe('FilterPanel', () => {
  it('renders filter button', () => {
    render(<FilterPanel filters={emptyFilters} onFiltersChange={vi.fn()} />)
    expect(screen.getByText('Filter')).toBeInTheDocument()
  })

  it('shows filter count badge when filters are active', () => {
    const filters: ActivityFilters = {
      status: ['pending', 'in_progress'],
      type: ['salary'],
    }

    render(<FilterPanel filters={filters} onFiltersChange={vi.fn()} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('opens filter panel when button clicked', () => {
    render(<FilterPanel filters={emptyFilters} onFiltersChange={vi.fn()} />)

    const button = screen.getByText('Filter')
    fireEvent.click(button)

    expect(screen.getByText('Filtrera aktiviteter')).toBeInTheDocument()
  })

  it('shows all status options', () => {
    render(<FilterPanel filters={emptyFilters} onFiltersChange={vi.fn()} />)

    const button = screen.getByText('Filter')
    fireEvent.click(button)

    expect(screen.getByText('Väntande')).toBeInTheDocument()
    expect(screen.getByText('Pågående')).toBeInTheDocument()
    expect(screen.getByText('Avslutad')).toBeInTheDocument()
    expect(screen.getByText('Blockerad')).toBeInTheDocument()
    expect(screen.getByText('Avbruten')).toBeInTheDocument()
  })

  it('shows all type options', () => {
    render(<FilterPanel filters={emptyFilters} onFiltersChange={vi.fn()} />)

    const button = screen.getByText('Filter')
    fireEvent.click(button)

    expect(screen.getByText('Lön')).toBeInTheDocument()
    expect(screen.getByText('Skatt')).toBeInTheDocument()
    expect(screen.getByText('Rapportering')).toBeInTheDocument()
    expect(screen.getByText('Granskning')).toBeInTheDocument()
    expect(screen.getByText('Övrigt')).toBeInTheDocument()
  })

  it('shows all priority options', () => {
    render(<FilterPanel filters={emptyFilters} onFiltersChange={vi.fn()} />)

    const button = screen.getByText('Filter')
    fireEvent.click(button)

    expect(screen.getByText('Låg')).toBeInTheDocument()
    expect(screen.getByText('Medel')).toBeInTheDocument()
    expect(screen.getByText('Hög')).toBeInTheDocument()
    expect(screen.getByText('Brådskande')).toBeInTheDocument()
  })

  it('calls onFiltersChange when status checked', () => {
    const onFiltersChange = vi.fn()
    render(<FilterPanel filters={emptyFilters} onFiltersChange={onFiltersChange} />)

    const button = screen.getByText('Filter')
    fireEvent.click(button)

    const checkbox = screen.getByLabelText('Väntande').querySelector('input')!
    fireEvent.click(checkbox)

    expect(onFiltersChange).toHaveBeenCalledWith({ status: ['pending'] })
  })

  it('removes status when unchecked', () => {
    const onFiltersChange = vi.fn()
    const filters: ActivityFilters = { status: ['pending', 'in_progress'] }

    render(<FilterPanel filters={filters} onFiltersChange={onFiltersChange} />)

    const button = screen.getByText('Filter')
    fireEvent.click(button)

    const checkbox = screen.getByLabelText('Väntande').querySelector('input')!
    fireEvent.click(checkbox)

    expect(onFiltersChange).toHaveBeenCalledWith({ status: ['in_progress'] })
  })

  it('shows assignee options when provided', () => {
    render(
      <FilterPanel
        filters={emptyFilters}
        onFiltersChange={vi.fn()}
        availableAssignees={['John Doe', 'Jane Smith']}
      />
    )

    const button = screen.getByText('Filter')
    fireEvent.click(button)

    expect(screen.getByText('Tilldelad till')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('clears all filters when clear button clicked', () => {
    const onFiltersChange = vi.fn()
    const filters: ActivityFilters = {
      status: ['pending'],
      type: ['salary'],
      search: 'test',
    }

    render(<FilterPanel filters={filters} onFiltersChange={onFiltersChange} />)

    const button = screen.getByText('Filter')
    fireEvent.click(button)

    const clearButton = screen.getByText('Rensa alla')
    fireEvent.click(clearButton)

    expect(onFiltersChange).toHaveBeenCalledWith({ search: 'test' })
  })
})
