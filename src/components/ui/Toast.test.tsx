import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toast } from './Toast'

describe('Toast', () => {
  it('renders toast message', () => {
    const onClose = vi.fn()
    render(<Toast message="Test message" onClose={onClose} />)

    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('renders success toast', () => {
    const onClose = vi.fn()
    render(<Toast message="Success" type="success" onClose={onClose} />)

    expect(screen.getByRole('alert')).toHaveClass('bg-green-50')
  })

  it('renders error toast', () => {
    const onClose = vi.fn()
    render(<Toast message="Error" type="error" onClose={onClose} />)

    expect(screen.getByRole('alert')).toHaveClass('bg-red-50')
  })

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Toast message="Test" onClose={onClose} />)

    await user.click(screen.getByLabelText('Stäng'))
    expect(onClose).toHaveBeenCalled()
  })

  it('auto-closes after duration', async () => {
    const onClose = vi.fn()
    render(<Toast message="Test" onClose={onClose} duration={100} />)

    await waitFor(() => expect(onClose).toHaveBeenCalled(), { timeout: 200 })
  })
})
