import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ActiveFilters } from './ActiveFilters'
import type { ActivityFilters } from '@/types'

describe('ActiveFilters - READ-ONLY VERSION', () => {
  it('renders nothing when no filters active', () => {
    const { container } = render(
      <ActiveFilters filters={{}} onRemoveFilter={vi.fn()} onClearAll={vi.fn()} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders status filters', () => {
    const filters: ActivityFilters = {
      status: ['pending', 'in_progress'],
    }

    render(<ActiveFilters filters={filters} onRemoveFilter={vi.fn()} onClearAll={vi.fn()} />)

    expect(screen.getByText('Väntande')).toBeInTheDocument()
    expect(screen.getByText('Pågående')).toBeInTheDocument()
  })

  it('renders priority filters', () => {
    const filters: ActivityFilters = {
      priority: [3, 4],
    }

    render(<ActiveFilters filters={filters} onRemoveFilter={vi.fn()} onClearAll={vi.fn()} />)

    expect(screen.getByText('Hög prioritet')).toBeInTheDocument()
    expect(screen.getByText('Brådskande')).toBeInTheDocument()
  })

  it('calls onRemoveFilter when filter removed', () => {
    const onRemoveFilter = vi.fn()
    const filters: ActivityFilters = {
      status: ['pending'],
    }

    render(<ActiveFilters filters={filters} onRemoveFilter={onRemoveFilter} onClearAll={vi.fn()} />)

    const removeButton = screen.getByLabelText('Ta bort filter: Väntande')
    fireEvent.click(removeButton)

    expect(onRemoveFilter).toHaveBeenCalledWith('status', 'pending')
  })

  it('calls onClearAll when clear all clicked', () => {
    const onClearAll = vi.fn()
    const filters: ActivityFilters = {
      status: ['pending'],
      priority: [3],
    }

    render(<ActiveFilters filters={filters} onRemoveFilter={vi.fn()} onClearAll={onClearAll} />)

    const clearButton = screen.getByText('Rensa alla filter')
    fireEvent.click(clearButton)

    expect(onClearAll).toHaveBeenCalled()
  })

  it('applies correct colors to different filter types', () => {
    const filters: ActivityFilters = {
      status: ['pending'],
      priority: [3],
    }

    const { container } = render(
      <ActiveFilters filters={filters} onRemoveFilter={vi.fn()} onClearAll={vi.fn()} />
    )

    expect(container.querySelector('.bg-blue-100')).toBeInTheDocument() // Status
    expect(container.querySelector('.bg-orange-100')).toBeInTheDocument() // Priority
  })
})
