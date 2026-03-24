import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmptyState } from './EmptyState'

describe('EmptyState - READ-ONLY VERSION', () => {
  it('renders default empty state', () => {
    render(<EmptyState />)

    expect(screen.getByText('Inga aktiviteter')).toBeInTheDocument()
    expect(screen.getByText('Det finns inga aktiviteter att visa just nu.')).toBeInTheDocument()
  })

  it('renders custom children', () => {
    render(
      <EmptyState>
        <p>Custom empty message</p>
      </EmptyState>
    )

    expect(screen.getByText('Custom empty message')).toBeInTheDocument()
  })

  it('displays file icon', () => {
    const { container } = render(<EmptyState />)
    
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })
})
