import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingOverlay } from './LoadingOverlay'

describe('LoadingOverlay', () => {
  it('renders children', () => {
    render(
      <LoadingOverlay isLoading={false}>
        <div>Test Content</div>
      </LoadingOverlay>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('shows overlay when isLoading is true', () => {
    render(
      <LoadingOverlay isLoading={true}>
        <div>Test Content</div>
      </LoadingOverlay>
    )
    expect(screen.getByLabelText('Loading')).toBeInTheDocument()
  })

  it('hides overlay when isLoading is false', () => {
    render(
      <LoadingOverlay isLoading={false}>
        <div>Test Content</div>
      </LoadingOverlay>
    )
    expect(screen.queryByLabelText('Loading')).not.toBeInTheDocument()
  })

  it('displays message when provided', () => {
    render(
      <LoadingOverlay isLoading={true} message="Loading data...">
        <div>Test Content</div>
      </LoadingOverlay>
    )
    expect(screen.getByText('Loading data...')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <LoadingOverlay isLoading={false} className="custom-wrapper">
        <div>Test Content</div>
      </LoadingOverlay>
    )
    expect(container.querySelector('.custom-wrapper')).toBeInTheDocument()
  })
})
