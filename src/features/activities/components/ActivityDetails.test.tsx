import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ActivityDetails } from './ActivityDetails'
import type { Activity } from '@/types'

const mockActivity: Activity = {
  id: '1',
  title: 'Test Activity',
  description: 'Test description for activity',
  type: 'salary',
  status: 'in_progress',
  priority: 'high',
  assignedTo: 'John Doe',
  dueDate: '2024-12-31',
  completedAt: null,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  periodId: 'period-1',
  checklistItems: [
    {
      id: '1',
      text: 'Item 1',
      isCompleted: true,
      completedAt: '2024-01-15',
      completedBy: 'Jane Smith',
    },
    { id: '2', text: 'Item 2', isCompleted: false, completedAt: null, completedBy: null },
  ],
  comments: [],
  tags: ['important', 'urgent'],
}

describe('ActivityDetails', () => {
  it('renders activity title', () => {
    render(<ActivityDetails activity={mockActivity} />)
    expect(screen.getByText('Test Activity')).toBeInTheDocument()
  })

  it('renders activity description', () => {
    render(<ActivityDetails activity={mockActivity} />)
    expect(screen.getByText('Test description for activity')).toBeInTheDocument()
  })

  it('renders activity type', () => {
    render(<ActivityDetails activity={mockActivity} />)
    expect(screen.getByText('Lön')).toBeInTheDocument()
  })

  it('renders due date', () => {
    render(<ActivityDetails activity={mockActivity} />)
    expect(screen.getByText('Förfallodatum')).toBeInTheDocument()
    expect(screen.getByText(/31 december 2024/)).toBeInTheDocument()
  })

  it('renders assigned user', () => {
    render(<ActivityDetails activity={mockActivity} />)
    expect(screen.getByText('Tilldelad till')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders created date', () => {
    render(<ActivityDetails activity={mockActivity} />)
    expect(screen.getByText('Skapad')).toBeInTheDocument()
  })

  it('renders tags', () => {
    render(<ActivityDetails activity={mockActivity} />)
    expect(screen.getByText('important')).toBeInTheDocument()
    expect(screen.getByText('urgent')).toBeInTheDocument()
  })

  it('renders checklist when items exist', () => {
    render(<ActivityDetails activity={mockActivity} />)
    expect(screen.getByText('Checklista')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('renders completed date when activity is completed', () => {
    const completedActivity: Activity = {
      ...mockActivity,
      status: 'completed',
      completedAt: '2024-02-01T00:00:00Z',
    }

    render(<ActivityDetails activity={completedActivity} />)
    expect(screen.getByText('Avslutad')).toBeInTheDocument()
  })

  it('does not render checklist when no items', () => {
    const activityWithoutChecklist: Activity = {
      ...mockActivity,
      checklistItems: [],
    }

    render(<ActivityDetails activity={activityWithoutChecklist} />)
    expect(screen.queryByText('Checklista')).not.toBeInTheDocument()
  })
})
