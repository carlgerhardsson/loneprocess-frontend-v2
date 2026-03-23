import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders router provider with layout', () => {
    render(<App />)

    // Should render login page (not authenticated)
    expect(screen.getByText(/Logga in för att fortsätta/i)).toBeInTheDocument()
  })

  it('provides QueryClient context', () => {
    render(<App />)
    // App should render without errors (QueryClient is provided)
    expect(screen.getByRole('button', { name: /Logga in/i })).toBeInTheDocument()
  })
})
