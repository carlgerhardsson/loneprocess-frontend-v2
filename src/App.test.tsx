import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders with PageLayout', () => {
    render(<App />)

    // Header should be present
    expect(screen.getByRole('heading', { name: /🚀 Löneportalen v2.0/ })).toBeInTheDocument()

    // Main content should be present
    expect(screen.getByText(/Welcome to Löneportalen v2.0/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Modern React \+ TypeScript migration in progress/i)
    ).toBeInTheDocument()

    // Footer should be present
    expect(screen.getByText(/API Status:/i)).toBeInTheDocument()
  })

  it('increments counter on button click', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /Counter: 0/i })
    fireEvent.click(button)
    expect(screen.getByText(/Counter: 1/i)).toBeInTheDocument()
  })
})
