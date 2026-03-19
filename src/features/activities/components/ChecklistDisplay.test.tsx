import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ChecklistDisplay } from './ChecklistDisplay'
import type { ChecklistItem } from '@/types'

const mockItems: ChecklistItem[] = [
  {
    id: '1',
    text: 'First item',
    isCompleted: true,
    completedAt: '2024-01-15',
    completedBy: 'Jane Smith',
  },
  { id: '2', text: 'Second item', isCompleted: false, completedAt: null, completedBy: null },
  { id: '3', text: 'Third item', isCompleted: false, completedAt: null, completedBy: null },
]

describe('ChecklistDisplay', () => {
  it('renders all checklist items', () => {
    render(<ChecklistDisplay items={mockItems} />)
    expect(screen.getByText('First item')).toBeInTheDocument()
    expect(screen.getByText('Second item')).toBeInTheDocument()
    expect(screen.getByText('Third item')).toBeInTheDocument()
  })

  it('displays correct progress count', () => {
    render(<ChecklistDisplay items={mockItems} />)
    expect(screen.getByText('1 av 3 slutförda')).toBeInTheDocument()
  })

  it('displays correct progress percentage', () => {
    render(<ChecklistDisplay items={mockItems} />)
    expect(screen.getByText('33%')).toBeInTheDocument()
  })

  it('shows completed date and user for completed items', () => {
    render(<ChecklistDisplay items={mockItems} />)
    expect(screen.getByText(/Slutförd.*2024-01-15/)).toBeInTheDocument()
    expect(screen.getByText(/av Jane Smith/)).toBeInTheDocument()
  })

  it('calls onToggle when item clicked in interactive mode', () => {
    const onToggle = vi.fn()
    render(<ChecklistDisplay items={mockItems} onToggle={onToggle} readonly={false} />)

    const secondItem = screen.getByText('Second item').closest('[role="button"]')!
    fireEvent.click(secondItem)

    expect(onToggle).toHaveBeenCalledWith('2')
  })

  it('does not call onToggle in readonly mode', () => {
    const onToggle = vi.fn()
    render(<ChecklistDisplay items={mockItems} onToggle={onToggle} readonly={true} />)

    const secondItem = screen.getByText('Second item').parentElement!
    fireEvent.click(secondItem)

    expect(onToggle).not.toHaveBeenCalled()
  })

  it('applies completed styles to completed items', () => {
    const { container } = render(<ChecklistDisplay items={mockItems} />)
    const firstItem = screen.getByText('First item')

    expect(firstItem).toHaveClass('line-through')
    expect(container.querySelector('.bg-green-50')).toBeInTheDocument()
  })

  it('shows 100% when all items completed', () => {
    const allCompleted: ChecklistItem[] = mockItems.map(item => ({
      ...item,
      isCompleted: true,
      completedAt: '2024-01-15',
      completedBy: 'User',
    }))

    render(<ChecklistDisplay items={allCompleted} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('3 av 3 slutförda')).toBeInTheDocument()
  })
})
