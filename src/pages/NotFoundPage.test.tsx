import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NotFoundPage } from './NotFoundPage'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('NotFoundPage', () => {
  it('renders 404 heading', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/Sidan hittades inte/i)).toBeInTheDocument()
    expect(screen.getByText(/Sidan du letar efter verkar inte existera/i)).toBeInTheDocument()
  })

  it('renders home button', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )

    expect(screen.getByRole('button', { name: /Gå till startsidan/i })).toBeInTheDocument()
  })

  it('navigates to activities when home button clicked', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )

    const homeButton = screen.getByRole('button', { name: /Gå till startsidan/i })
    fireEvent.click(homeButton)

    expect(mockNavigate).toHaveBeenCalledWith('/activities')
  })
})
