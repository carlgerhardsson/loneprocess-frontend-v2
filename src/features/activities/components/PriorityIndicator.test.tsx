import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PriorityIndicator } from './PriorityIndicator'

describe('PriorityIndicator', () => {
  it('renders high priority icon', () => {
    render(<PriorityIndicator priority="high" />)
    const icon = screen.getByLabelText('Hög prioritet')
    expect(icon).toBeInTheDocument()
  })

  it('renders medium priority icon', () => {
    render(<PriorityIndicator priority="medium" />)
    const icon = screen.getByLabelText('Medium prioritet')
    expect(icon).toBeInTheDocument()
  })

  it('renders low priority icon', () => {
    render(<PriorityIndicator priority="low" />)
    const icon = screen.getByLabelText('Låg prioritet')
    expect(icon).toBeInTheDocument()
  })

  it('renders urgent priority icon', () => {
    render(<PriorityIndicator priority="urgent" />)
    const icon = screen.getByLabelText('Brådskande')
    expect(icon).toBeInTheDocument()
  })

  it('renders with label when showLabel is true', () => {
    render(<PriorityIndicator priority="high" showLabel />)
    expect(screen.getByText('Hög prioritet')).toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    const { container, rerender } = render(<PriorityIndicator priority="high" size="sm" />)
    expect(container.querySelector('.w-4.h-4')).toBeInTheDocument()

    rerender(<PriorityIndicator priority="high" size="lg" />)
    expect(container.querySelector('.w-6.h-6')).toBeInTheDocument()
  })
})
