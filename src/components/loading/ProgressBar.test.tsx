import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProgressBar, IndeterminateProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  it('renders with correct percentage', () => {
    const { container } = render(<ProgressBar value={50} />)
    const progressBar = container.querySelector('[role="progressbar"]')
    expect(progressBar).toHaveAttribute('aria-valuenow', '50')
    expect(progressBar).toHaveStyle({ width: '50%' })
  })

  it('clamps value to 0-100 range', () => {
    const { container, rerender } = render(<ProgressBar value={150} />)
    let progressBar = container.querySelector('[role="progressbar"]')
    expect(progressBar).toHaveAttribute('aria-valuenow', '100')

    rerender(<ProgressBar value={-10} />)
    progressBar = container.querySelector('[role="progressbar"]')
    expect(progressBar).toHaveAttribute('aria-valuenow', '0')
  })

  it('shows label when showLabel is true', () => {
    render(<ProgressBar value={75} showLabel />)
    expect(screen.getByText('75%')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    const { container, rerender } = render(<ProgressBar value={50} size="sm" />)
    expect(container.querySelector('.h-1')).toBeInTheDocument()

    rerender(<ProgressBar value={50} size="md" />)
    expect(container.querySelector('.h-2')).toBeInTheDocument()

    rerender(<ProgressBar value={50} size="lg" />)
    expect(container.querySelector('.h-3')).toBeInTheDocument()
  })

  it('applies variant color classes', () => {
    const { container, rerender } = render(<ProgressBar value={50} variant="success" />)
    expect(container.querySelector('.bg-green-600')).toBeInTheDocument()

    rerender(<ProgressBar value={50} variant="warning" />)
    expect(container.querySelector('.bg-yellow-600')).toBeInTheDocument()

    rerender(<ProgressBar value={50} variant="error" />)
    expect(container.querySelector('.bg-red-600')).toBeInTheDocument()
  })
})

describe('IndeterminateProgressBar', () => {
  it('renders indeterminate progress bar', () => {
    const { container } = render(<IndeterminateProgressBar />)
    expect(container.querySelector('.animate-\\[progress_1\\.5s_ease-in-out_infinite\\]')).toBeInTheDocument()
  })

  it('applies size classes', () => {
    const { container } = render(<IndeterminateProgressBar size="lg" />)
    expect(container.querySelector('.h-3')).toBeInTheDocument()
  })
})
