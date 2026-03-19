import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ActiveFilters } from './ActiveFilters'
import type { ActivityFilters } from '@/types'

describe('ActiveFilters', () => {
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

  it('renders type filters', () => {
    const filters: ActivityFilters = {
      type: ['salary', 'tax'],
    }

    render(<ActiveFilters filters={filters} onRemoveFilter={vi.fn()} onClearAll={vi.fn()} />)

    expect(screen.getByText('Lön')).toBeInTheDocument()
    expect(screen.getByText('Skatt')).toBeInTheDocument()
  })

  it('renders priority filters', () => {
    const filters: ActivityFilters = {
      priority: ['high', 'urgent'],
    }

    render(<ActiveFilters filters={filters} onRemoveFilter={vi.fn()} onClearAll={vi.fn()} />)

    expect(screen.getByText('Hög prioritet')).toBeInTheDocument()
    expect(screen.getByText('Brådskande')).toBeInTheDocument()
  })

  it('renders assignee filters', () => {
    const filters: ActivityFilters = {
      assignedTo: ['John Doe'],
    }

    render(<ActiveFilters filters={filters} onRemoveFilter={vi.fn()} onClearAll={vi.fn()} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
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
      type: ['salary'],
    }

    render(<ActiveFilters filters={filters} onRemoveFilter={vi.fn()} onClearAll={onClearAll} />)

    const clearButton = screen.getByText('Rensa alla filter')
    fireEvent.click(clearButton)

    expect(onClearAll).toHaveBeenCalled()
  })

  it('applies correct colors to different filter types', () => {
    const filters: ActivityFilters = {
      status: ['pending'],
      type: ['salary'],
      priority: ['high'],
      assignedTo: ['John Doe'],
    }

    const { container } = render(
      <ActiveFilters filters={filters} onRemoveFilter={vi.fn()} onClearAll={vi.fn()} />
    )

    expect(container.querySelector('.bg-blue-100')).toBeInTheDocument() // Status
    expect(container.querySelector('.bg-green-100')).toBeInTheDocument() // Type
    expect(container.querySelector('.bg-orange-100')).toBeInTheDocument() // Priority
    expect(container.querySelector('.bg-purple-100')).toBeInTheDocument() // Assignee
  })
})
