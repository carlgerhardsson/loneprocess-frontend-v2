import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ActivitiesPage } from './ActivitiesPage'

describe('ActivitiesPage', () => {
  it('renders page heading', () => {
    render(
      <MemoryRouter>
        <ActivitiesPage />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /Aktiviteter/i })).toBeInTheDocument()
  })

  it('renders page description', () => {
    render(
      <MemoryRouter>
        <ActivitiesPage />
      </MemoryRouter>
    )

    expect(
      screen.getByText(/Hantera och följ upp löneprocessens aktiviteter/i)
    ).toBeInTheDocument()
  })

  it('shows placeholder content', () => {
    render(
      <MemoryRouter>
        <ActivitiesPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/Aktivitetslista kommer här/i)).toBeInTheDocument()
  })
})
