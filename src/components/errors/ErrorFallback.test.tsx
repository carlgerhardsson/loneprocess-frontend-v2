import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorFallback } from './ErrorFallback'

describe('ErrorFallback', () => {
  it('renders with default props', () => {
    render(<ErrorFallback error={null} />)

    expect(screen.getByText('Något gick fel')).toBeInTheDocument()
    expect(screen.getByText('Ett oväntat fel uppstod.')).toBeInTheDocument()
  })

  it('renders custom title and message', () => {
    render(
      <ErrorFallback
        error={null}
        title="Custom title"
        message="Custom message"
      />
    )

    expect(screen.getByText('Custom title')).toBeInTheDocument()
    expect(screen.getByText('Custom message')).toBeInTheDocument()
  })

  it('calls resetError when retry button is clicked', () => {
    const resetError = vi.fn()
    render(<ErrorFallback error={null} resetError={resetError} />)

    const retryButton = screen.getByText('Försök igen')
    fireEvent.click(retryButton)

    expect(resetError).toHaveBeenCalledTimes(1)
  })

  it('renders home button', () => {
    render(<ErrorFallback error={null} />)

    expect(screen.getByText('Till startsidan')).toBeInTheDocument()
  })

  it('does not render retry button when resetError is not provided', () => {
    render(<ErrorFallback error={null} />)

    expect(screen.queryByText('Försök igen')).not.toBeInTheDocument()
  })
})
