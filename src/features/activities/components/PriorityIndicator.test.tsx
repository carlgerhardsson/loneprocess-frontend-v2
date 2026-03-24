import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { PriorityIndicator } from './PriorityIndicator'

describe('PriorityIndicator', () => {
  it('renders high priority', () => {
    render(<PriorityIndicator priority={3} />)
    expect(document.querySelector('.bg-red-100')).toBeInTheDocument()
  })

  it('renders medium priority', () => {
    render(<PriorityIndicator priority={2} />)
    expect(document.querySelector('.bg-yellow-100')).toBeInTheDocument()
  })

  it('renders low priority', () => {
    render(<PriorityIndicator priority={1} />)
    expect(document.querySelector('.bg-green-100')).toBeInTheDocument()
  })

  it('renders urgent priority', () => {
    render(<PriorityIndicator priority={4} />)
    expect(document.querySelector('.bg-purple-100')).toBeInTheDocument()
  })

  it('shows label when requested', () => {
    const { container } = render(<PriorityIndicator priority={3} showLabel />)
    expect(container.textContent).toContain('Hög')
  })

  it('applies size variants', () => {
    const { container, rerender } = render(<PriorityIndicator priority={3} size="sm" />)
    expect(container.querySelector('.w-2')).toBeInTheDocument()

    rerender(<PriorityIndicator priority={3} size="md" />)
    expect(container.querySelector('.w-3')).toBeInTheDocument()
  })
})
