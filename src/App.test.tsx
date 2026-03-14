import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders headline', () => {
    render(<App />)
    expect(screen.getByText(/Löneportalen v2.0/i)).toBeInTheDocument()
  })

  it('increments counter on button click', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /Test Counter: 0/i })
    fireEvent.click(button)
    expect(screen.getByText(/Test Counter: 1/i)).toBeInTheDocument()
  })
})