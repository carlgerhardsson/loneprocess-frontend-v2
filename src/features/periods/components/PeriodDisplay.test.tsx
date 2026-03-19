import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PeriodDisplay } from './PeriodDisplay'
import type { Period } from '@/types'

const mockPeriod: Period = {
  id: '1',
  name: 'Januari 2024',
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  type: 'monthly',
  status: 'active',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  activityCount: 10,
  completedActivityCount: 5,
}

describe('PeriodDisplay', () => {
  it('renders period name', () => {
    render(<PeriodDisplay period={mockPeriod} />)
    expect(screen.getByText('Januari 2024')).toBeInTheDocument()
  })

  it('renders period type', () => {
    render(<PeriodDisplay period={mockPeriod} />)
    expect(screen.getByText('Månatlig')).toBeInTheDocument()
  })

  it('renders period status', () => {
    render(<PeriodDisplay period={mockPeriod} />)
    expect(screen.getByText('Aktiv')).toBeInTheDocument()
  })

  it('renders date range', () => {
    render(<PeriodDisplay period={mockPeriod} />)
    expect(screen.getByText(/2024-01-01.*2024-01-31/)).toBeInTheDocument()
  })

  it('renders activity counts', () => {
    render(<PeriodDisplay period={mockPeriod} />)
    expect(screen.getByText('10')).toBeInTheDocument() // Total activities
    expect(screen.getByText('5')).toBeInTheDocument() // Completed activities
  })

  it('renders progress bar with correct percentage', () => {
    render(<PeriodDisplay period={mockPeriod} />)
    expect(screen.getByText('50%')).toBeInTheDocument()

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '50')
  })

  it('hides progress bar when showProgress is false', () => {
    render(<PeriodDisplay period={mockPeriod} showProgress={false} />)
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  it('handles zero activities correctly', () => {
    const emptyPeriod: Period = {
      ...mockPeriod,
      activityCount: 0,
      completedActivityCount: 0,
    }

    render(<PeriodDisplay period={emptyPeriod} />)
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  it('renders completed status correctly', () => {
    const completedPeriod: Period = {
      ...mockPeriod,
      status: 'completed',
    }

    render(<PeriodDisplay period={completedPeriod} />)
    expect(screen.getByText('Avslutad')).toBeInTheDocument()
  })

  it('renders archived status correctly', () => {
    const archivedPeriod: Period = {
      ...mockPeriod,
      status: 'archived',
    }

    render(<PeriodDisplay period={archivedPeriod} />)
    expect(screen.getByText('Arkiverad')).toBeInTheDocument()
  })
})
