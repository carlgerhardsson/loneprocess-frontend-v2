import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders version information', () => {
    render(<Footer />)
    expect(screen.getByText(/Version:/i)).toBeInTheDocument()
    expect(screen.getByText(/2.0.0/i)).toBeInTheDocument()
  })

  it('renders API status', () => {
    render(<Footer />)
    expect(screen.getByText(/API Status:/i)).toBeInTheDocument()
  })

  it('shows healthy status by default', () => {
    render(<Footer />)
    expect(screen.getByText(/API Online/i)).toBeInTheDocument()
  })
})
