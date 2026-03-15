import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  it('renders with default title', () => {
    render(<Header />)
    expect(screen.getByText(/Löneportalen v2.0/i)).toBeInTheDocument()
  })

  it('renders with custom title', () => {
    render(<Header title="Custom Title" />)
    expect(screen.getByText(/Custom Title/i)).toBeInTheDocument()
  })

  it('shows current phase', () => {
    render(<Header />)
    expect(screen.getByText(/Fas 2: Core Components/i)).toBeInTheDocument()
  })
})
