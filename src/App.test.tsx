import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders router provider with layout', () => {
    render(<App />)

    // Header should be present
    expect(screen.getByText(/Löneportalen/i)).toBeInTheDocument()
  })

  it('provides QueryClient context', () => {
    render(<App />)
    // App should render without errors (QueryClient is provided)
    expect(screen.getByText(/Löneportalen/i)).toBeInTheDocument()
  })
})
