import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ActivityForm } from './ActivityForm'
import type { Activity } from '@/types'

const mockActivity: Activity = {
  id: '1',
  title: 'Test Activity',
  description: 'Test description',
  type: 'salary',
  status: 'pending',
  priority: 'medium',
  assignedTo: 'John Doe',
  dueDate: '2024-12-31',
  completedAt: null,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  periodId: 'period-1',
  checklistItems: [],
  comments: [],
  tags: [],
}

describe('ActivityForm', () => {
  it('renders all form fields', () => {
    render(<ActivityForm onSubmit={vi.fn()} />)

    expect(screen.getByLabelText(/Titel/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Beskrivning/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Typ/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Status/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Prioritet/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Tilldelad till/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Förfallodatum/)).toBeInTheDocument()
  })

  it('shows create button when no activity provided', () => {
    render(<ActivityForm onSubmit={vi.fn()} />)
    expect(screen.getByRole('button', { name: /Skapa/ })).toBeInTheDocument()
  })

  it('shows update button when activity provided', () => {
    render(<ActivityForm activity={mockActivity} onSubmit={vi.fn()} />)
    expect(screen.getByRole('button', { name: /Uppdatera/ })).toBeInTheDocument()
  })

  it('pre-fills form with activity data', () => {
    render(<ActivityForm activity={mockActivity} onSubmit={vi.fn()} />)

    expect(screen.getByLabelText(/Titel/)).toHaveValue('Test Activity')
    expect(screen.getByLabelText(/Beskrivning/)).toHaveValue('Test description')
    expect(screen.getByLabelText(/Typ/)).toHaveValue('salary')
    expect(screen.getByLabelText(/Status/)).toHaveValue('pending')
    expect(screen.getByLabelText(/Prioritet/)).toHaveValue('medium')
  })

  it('shows validation error for empty title', async () => {
    render(<ActivityForm onSubmit={vi.fn()} />)

    const submitButton = screen.getByRole('button', { name: /Skapa/ })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Titel är obligatorisk')).toBeInTheDocument()
    })
  })

  it('shows validation error for short title', async () => {
    render(<ActivityForm onSubmit={vi.fn()} />)

    const titleInput = screen.getByLabelText(/Titel/)
    fireEvent.change(titleInput, { target: { value: 'Ab' } })

    const submitButton = screen.getByRole('button', { name: /Skapa/ })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Titel måste vara minst 3 tecken')).toBeInTheDocument()
    })
  })

  it('shows validation error for empty description', async () => {
    render(<ActivityForm onSubmit={vi.fn()} />)

    const titleInput = screen.getByLabelText(/Titel/)
    fireEvent.change(titleInput, { target: { value: 'Valid Title' } })

    const submitButton = screen.getByRole('button', { name: /Skapa/ })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Beskrivning är obligatorisk')).toBeInTheDocument()
    })
  })

  it('calls onSubmit with valid data', async () => {
    const onSubmit = vi.fn()
    render(<ActivityForm onSubmit={onSubmit} />)

    fireEvent.change(screen.getByLabelText(/Titel/), { target: { value: 'New Activity' } })
    fireEvent.change(screen.getByLabelText(/Beskrivning/), {
      target: { value: 'This is a valid description' },
    })

    const submitButton = screen.getByRole('button', { name: /Skapa/ })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled()
      const callArgs = onSubmit.mock.calls[0]
      expect(callArgs[0]).toMatchObject({
        title: 'New Activity',
        description: 'This is a valid description',
        type: 'salary',
        status: 'pending',
        priority: 'medium',
        assignedTo: '',
        dueDate: '',
      })
    })
  })

  it('shows cancel button when onCancel provided', () => {
    render(<ActivityForm onSubmit={vi.fn()} onCancel={vi.fn()} />)
    expect(screen.getByRole('button', { name: /Avbryt/ })).toBeInTheDocument()
  })

  it('calls onCancel when cancel button clicked', () => {
    const onCancel = vi.fn()
    render(<ActivityForm onSubmit={vi.fn()} onCancel={onCancel} />)

    const cancelButton = screen.getByRole('button', { name: /Avbryt/ })
    fireEvent.click(cancelButton)

    expect(onCancel).toHaveBeenCalled()
  })

  it('disables form when submitting', () => {
    render(<ActivityForm onSubmit={vi.fn()} isSubmitting={true} />)

    expect(screen.getByLabelText(/Titel/)).toBeDisabled()
    expect(screen.getByLabelText(/Beskrivning/)).toBeDisabled()
    expect(screen.getByRole('button', { name: /Sparar.../ })).toBeDisabled()
  })
})
