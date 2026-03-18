import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {
  it('renders pending status', () => {
    render(<StatusBadge status="pending" />)
    expect(screen.getByText('Väntar')).toBeInTheDocument()
  })

  it('renders in_progress status', () => {
    render(<StatusBadge status="in_progress" />)
    expect(screen.getByText('Pågående')).toBeInTheDocument()
  })

  it('renders completed status', () => {
    render(<StatusBadge status="completed" />)
    expect(screen.getByText('Klar')).toBeInTheDocument()
  })

  it('renders blocked status', () => {
    render(<StatusBadge status="blocked" />)
    expect(screen.getByText('Blockerad')).toBeInTheDocument()
  })

  it('applies small size class', () => {
    const { container } = render(<StatusBadge status="pending" size="sm" />)
    expect(container.querySelector('.text-xs')).toBeInTheDocument()
  })

  it('applies medium size class by default', () => {
    const { container } = render(<StatusBadge status="pending" />)
    expect(container.querySelector('.text-sm')).toBeInTheDocument()
  })
})
