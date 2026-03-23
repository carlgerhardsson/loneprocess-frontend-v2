import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ActivityList } from './ActivityList'
import type { Activity } from '@/types'

const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Test Activity 1',
    description: 'Test description 1',
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
  },
  {
    id: '2',
    title: 'Test Activity 2',
    description: 'Test description 2',
    type: 'tax',
    status: 'pending',
    priority: 'medium',
    assignedTo: 'Jane Smith',
    dueDate: '2024-11-30',
    completedAt: null,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    periodId: 'period-1',
    checklistItems: [],
    comments: [],
    tags: [],
  },
]

describe('ActivityList', () => {
  it('renders all activities', () => {
    render(<ActivityList activities={mockActivities} />)

    expect(screen.getByText('Test Activity 1')).toBeInTheDocument()
    expect(screen.getByText('Test Activity 2')).toBeInTheDocument()
  })

  it('calls onEdit when edit button clicked', async () => {
    const onEdit = vi.fn()
    const { container } = render(<ActivityList activities={mockActivities} onEdit={onEdit} />)

    const editButtons = container.querySelectorAll('[aria-label="Redigera"]')
    expect(editButtons).toHaveLength(2)
  })

  it('calls onDelete when delete button clicked', async () => {
    const onDelete = vi.fn()
    const { container } = render(<ActivityList activities={mockActivities} onDelete={onDelete} />)

    const deleteButtons = container.querySelectorAll('[aria-label="Ta bort"]')
    expect(deleteButtons).toHaveLength(2)
  })

  it('renders empty list when no activities', () => {
    const { container } = render(<ActivityList activities={[]} />)
    expect(container.querySelector('.space-y-3')).toBeInTheDocument()
    expect(container.querySelectorAll('.space-y-3 > div')).toHaveLength(0)
  })
})
