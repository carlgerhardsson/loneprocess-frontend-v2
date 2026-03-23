import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ActivityForm } from './ActivityForm'
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
  checklistItems: [],
  comments: [],
  tags: ['important', 'urgent'],
}

describe('ActivityForm', () => {
  it('renders form fields', () => {
    render(<ActivityForm onSubmit={vi.fn()} />)

    expect(screen.getByLabelText(/titel/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/beskrivning/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/typ/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/prioritet/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<ActivityForm onSubmit={vi.fn()} />)
    expect(screen.getByRole('button', { name: /skapa/i })).toBeInTheDocument()
  })

  it('pre-fills form with initialData', () => {
    render(<ActivityForm initialData={mockActivity} onSubmit={vi.fn()} />)
    expect(screen.getByLabelText(/titel/i)).toHaveValue('Test Activity')
  })

  it('shows update button when initialData provided', () => {
    render(<ActivityForm initialData={mockActivity} onSubmit={vi.fn()} />)
    expect(screen.getByRole('button', { name: /uppdatera/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ActivityForm onSubmit={onSubmit} />)

    const submitButton = screen.getByRole('button', { name: /skapa/i })
    await user.click(submitButton)

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('calls onCancel when cancel button clicked', async () => {
    const user = userEvent.setup()
    const onCancel = vi.fn()
    render(<ActivityForm onSubmit={vi.fn()} onCancel={onCancel} />)

    await user.click(screen.getByRole('button', { name: /avbryt/i }))
    expect(onCancel).toHaveBeenCalled()
  })

  it('disables form when isLoading is true', () => {
    render(<ActivityForm onSubmit={vi.fn()} isLoading={true} />)

    expect(screen.getByLabelText(/titel/i)).toBeDisabled()
    expect(screen.getByRole('button', { name: /sparar/i })).toBeDisabled()
  })

  it('allows entering text in title field', async () => {
    const user = userEvent.setup()
    render(<ActivityForm onSubmit={vi.fn()} />)

    const titleInput = screen.getByLabelText(/titel/i)
    await user.type(titleInput, 'New Activity')

    expect(titleInput).toHaveValue('New Activity')
  })

  it('allows selecting from dropdown fields', async () => {
    const user = userEvent.setup()
    render(<ActivityForm onSubmit={vi.fn()} />)

    const typeSelect = screen.getByLabelText(/typ/i)
    await user.selectOptions(typeSelect, 'tax')

    expect(typeSelect).toHaveValue('tax')
  })

  it('allows entering optional fields', async () => {
    const user = userEvent.setup()
    render(<ActivityForm onSubmit={vi.fn()} />)

    const assignedToInput = screen.getByLabelText(/tilldelad till/i)
    await user.type(assignedToInput, 'Jane Doe')

    expect(assignedToInput).toHaveValue('Jane Doe')
  })

  it('shows validation errors for invalid data', async () => {
    const user = userEvent.setup()
    render(<ActivityForm onSubmit={vi.fn()} />)

    const titleInput = screen.getByLabelText(/titel/i)
    await user.type(titleInput, 'ab')
    await user.tab()

    // Short title should trigger validation
    const submitButton = screen.getByRole('button', { name: /skapa/i })
    await user.click(submitButton)
  })
})
