import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renders empty state message', () => {
    render(<EmptyState />)
    expect(screen.getByText('Inga aktiviteter')).toBeInTheDocument()
    expect(screen.getByText(/Det finns inga aktiviteter för denna period/)).toBeInTheDocument()
  })

  it('renders create button when onCreateActivity is provided', () => {
    const onCreateActivity = vi.fn()
    render(<EmptyState onCreateActivity={onCreateActivity} />)
    expect(screen.getByText('Skapa aktivitet')).toBeInTheDocument()
  })

  it('does not render create button when onCreateActivity is not provided', () => {
    render(<EmptyState />)
    expect(screen.queryByText('Skapa aktivitet')).not.toBeInTheDocument()
  })

  it('calls onCreateActivity when button is clicked', () => {
    const onCreateActivity = vi.fn()
    render(<EmptyState onCreateActivity={onCreateActivity} />)

    const button = screen.getByText('Skapa aktivitet')
    fireEvent.click(button)

    expect(onCreateActivity).toHaveBeenCalledTimes(1)
  })
})
