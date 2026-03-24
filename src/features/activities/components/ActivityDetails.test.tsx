import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ActivityDetails } from './ActivityDetails'
import type { Activity } from '@/types'

const mockActivity: Activity = {
  id: '1',
  processNr: '20.2',
  process: 'Kontroll Aktiv',
  fas: 'Planering',
  roll: 'Löneadministratör',
  priority: 3,
  status: 'active',
  behov: 'Kontrollera att alla aktiviteter är korrekta',
  createdAt: '2024-01-01T10:00:00Z',
  updatedAt: '2024-01-15T14:30:00Z',
}

describe('ActivityDetails - READ-ONLY VERSION', () => {
  it('renders activity details', () => {
    render(<ActivityDetails activity={mockActivity} />)

    expect(screen.getByText('20.2')).toBeInTheDocument()
    expect(screen.getByText('Kontroll Aktiv')).toBeInTheDocument()
    expect(screen.getByText('Kontrollera att alla aktiviteter är korrekta')).toBeInTheDocument()
  })

  it('renders core fields', () => {
    render(<ActivityDetails activity={mockActivity} />)

    expect(screen.getByText('Fas')).toBeInTheDocument()
    expect(screen.getByText('Planering')).toBeInTheDocument()
    expect(screen.getByText('Roll')).toBeInTheDocument()
    expect(screen.getByText('Löneadministratör')).toBeInTheDocument()
  })

  it('renders status and priority', () => {
    render(<ActivityDetails activity={mockActivity} />)

    // Status badge should be present
    expect(screen.getByText('Aktiv')).toBeInTheDocument()
  })

  it('renders additional fields when present', () => {
    const activityWithExtras: Activity = {
      ...mockActivity,
      outInput: 'Test output',
      effektenVardet: 'Test value',
      acceptans: 'Test acceptance',
    }

    render(<ActivityDetails activity={activityWithExtras} />)

    expect(screen.getByText('Output/Input')).toBeInTheDocument()
    expect(screen.getByText('Test output')).toBeInTheDocument()
  })
})
