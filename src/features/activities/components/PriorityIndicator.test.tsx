import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { PriorityIndicator } from './PriorityIndicator'

describe('PriorityIndicator', () => {
  it('renders high priority', () => {
    const { container } = render(<PriorityIndicator priority={3} />)
    expect(container.querySelector('.text-orange-600')).toBeTruthy()
  })

  it('renders medium priority', () => {
    const { container } = render(<PriorityIndicator priority={2} />)
    expect(container.querySelector('.text-yellow-600')).toBeTruthy()
  })

  it('renders low priority', () => {
    const { container } = render(<PriorityIndicator priority={1} />)
    expect(container.querySelector('.text-green-600')).toBeTruthy()
  })

  it('renders urgent priority', () => {
    const { container } = render(<PriorityIndicator priority={4} />)
    expect(container.querySelector('.text-red-600')).toBeTruthy()
  })

  it('shows label when requested', () => {
    const { container } = render(<PriorityIndicator priority={3} showLabel />)
    expect(container.textContent).toContain('Hög')
  })

  it('applies size variants', () => {
    const { container, rerender } = render(<PriorityIndicator priority={3} size="sm" />)
    expect(container.querySelector('.w-4')).toBeTruthy()

    rerender(<PriorityIndicator priority={3} size="md" />)
    expect(container.querySelector('.w-5')).toBeTruthy()
  })
})
