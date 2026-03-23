import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ActivityListItem } from './ActivityListItem'
import { Activity } from '@/types'

const mockActivity: Activity = {
  id: '1',
  periodId: 'period-1',
  title: 'Test Activity',
  type: 'salary',
  status: 'pending',
  priority: 'high',
  description: 'Test description',
  assignedTo: 'John Doe',
  dueDate: '2024-12-31',
  completedAt: null,
  checklistItems: [
    { id: '1', text: 'Item 1', isCompleted: true, completedAt: null, completedBy: null },
    { id: '2', text: 'Item 2', isCompleted: false, completedAt: null, completedBy: null },
  ],
  comments: [
    {
      id: '1',
      authorId: 'user-1',
      authorName: 'Test User',
      text: 'Test comment',
      createdAt: '2024-01-01',
      updatedAt: null,
    },
  ],
  tags: [],
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

describe('ActivityListItem', () => {
  it('renders activity title', () => {
    render(<ActivityListItem activity={mockActivity} />)
    expect(screen.getByText('Test Activity')).toBeInTheDocument()
  })

  it('renders activity description', () => {
    render(<ActivityListItem activity={mockActivity} />)
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('renders due date', () => {
    render(<ActivityListItem activity={mockActivity} />)
    expect(screen.getByText('2024-12-31')).toBeInTheDocument()
  })

  it('renders assigned user', () => {
    render(<ActivityListItem activity={mockActivity} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders checklist progress', () => {
    render(<ActivityListItem activity={mockActivity} />)
    expect(screen.getByText('1/2')).toBeInTheDocument()
  })

  it('renders comment count', () => {
    render(<ActivityListItem activity={mockActivity} />)
    expect(screen.getByText('1 kommentarer')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<ActivityListItem activity={mockActivity} onClick={onClick} />)

    const item = screen.getByRole('button')
    fireEvent.click(item)

    expect(onClick).toHaveBeenCalledWith(mockActivity)
  })

  it('calls onClick when Enter key is pressed', () => {
    const onClick = vi.fn()
    render(<ActivityListItem activity={mockActivity} onClick={onClick} />)

    const item = screen.getByRole('button')
    fireEvent.keyDown(item, { key: 'Enter' })

    expect(onClick).toHaveBeenCalledWith(mockActivity)
  })

  it('applies selected styles when isSelected is true', () => {
    const { container } = render(<ActivityListItem activity={mockActivity} isSelected={true} />)
    // Component uses border-blue-500, not border-primary-500
    const element = container.querySelector('.border-blue-500')
    expect(element).not.toBeNull()
  })
})
