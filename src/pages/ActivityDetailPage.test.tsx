import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ActivityDetailPage } from './ActivityDetailPage'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('ActivityDetailPage', () => {
  it('renders activity ID from URL params', () => {
    render(
      <MemoryRouter initialEntries={['/activities/123']}>
        <Routes>
          <Route path="/activities/:id" element={<ActivityDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /Aktivitet 123/i })).toBeInTheDocument()
  })

  it('renders back button', () => {
    render(
      <MemoryRouter initialEntries={['/activities/123']}>
        <Routes>
          <Route path="/activities/:id" element={<ActivityDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByRole('button', { name: /Tillbaka till aktiviteter/i })).toBeInTheDocument()
  })

  it('navigates back when back button clicked', () => {
    render(
      <MemoryRouter initialEntries={['/activities/123']}>
        <Routes>
          <Route path="/activities/:id" element={<ActivityDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    const backButton = screen.getByRole('button', { name: /Tillbaka till aktiviteter/i })
    fireEvent.click(backButton)

    expect(mockNavigate).toHaveBeenCalledWith('/activities')
  })

  it('shows placeholder content', () => {
    render(
      <MemoryRouter initialEntries={['/activities/123']}>
        <Routes>
          <Route path="/activities/:id" element={<ActivityDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(/Aktivitetsdetaljer kommer här/i)).toBeInTheDocument()
  })
})
