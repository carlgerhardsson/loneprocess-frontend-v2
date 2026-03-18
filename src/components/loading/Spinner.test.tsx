import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders with default size', () => {
    render(<Spinner />)
    const spinner = screen.getByLabelText('Loading')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('w-6', 'h-6') // md size
  })

  it('renders with small size', () => {
    render(<Spinner size="sm" />)
    const spinner = screen.getByLabelText('Loading')
    expect(spinner).toHaveClass('w-4', 'h-4')
  })

  it('renders with large size', () => {
    render(<Spinner size="lg" />)
    const spinner = screen.getByLabelText('Loading')
    expect(spinner).toHaveClass('w-8', 'h-8')
  })

  it('applies custom className', () => {
    render(<Spinner className="custom-class" />)
    const spinner = screen.getByLabelText('Loading')
    expect(spinner).toHaveClass('custom-class')
  })

  it('has animate-spin class', () => {
    render(<Spinner />)
    const spinner = screen.getByLabelText('Loading')
    expect(spinner).toHaveClass('animate-spin')
  })
})
