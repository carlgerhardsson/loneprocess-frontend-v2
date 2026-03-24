import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ActivityList } from './ActivityList'
import type { Activity } from '@/types'

const mockActivities: Activity[] = [
  {
    id: '1',
    processNr: '20.1',
    process: 'Planering Löneprocess',
    fas: 'Planering',
    roll: 'Löneadministratör',
    priority: 3,
    status: 'active',
    behov: 'Planera löneprocessen',
    outInput: null,
    skaIngaILoneperiod: false,
    effektenVardet: null,
    extraInfo: null,
    acceptans: null,
    featureLosning: null,
    senastUtford: null,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '2',
    processNr: '20.2',
    process: 'Kontroll Aktiv',
    fas: 'Kontroll',
    roll: 'Löneadministratör',
    priority: 2,
    status: 'pending',
    behov: 'Kontrollera aktiviteter',
    outInput: null,
    skaIngaILoneperiod: false,
    effektenVardet: null,
    extraInfo: null,
    acceptans: null,
    featureLosning: null,
    senastUtford: null,
    createdAt: '2024-01-02T10:00:00Z',
    updatedAt: '2024-01-02T10:00:00Z',
  },
]

describe('ActivityList', () => {
  it('renders list of activities', () => {
    render(<ActivityList activities={mockActivities} selectedActivityId={undefined} onClick={vi.fn()} />)

    expect(screen.getByText('Planering Löneprocess')).toBeInTheDocument()
    expect(screen.getByText('Kontroll Aktiv')).toBeInTheDocument()
  })

  it('highlights selected activity', () => {
    const { container } = render(
      <ActivityList activities={mockActivities} selectedActivityId="1" onClick={vi.fn()} />
    )

    const selectedItem = container.querySelector('[data-selected="true"]')
    expect(selectedItem).toBeInTheDocument()
  })

  it('calls onClick when activity clicked', () => {
    const onClick = vi.fn()
    render(<ActivityList activities={mockActivities} selectedActivityId={undefined} onClick={onClick} />)

    fireEvent.click(screen.getByText('Planering Löneprocess'))
    expect(onClick).toHaveBeenCalledWith(mockActivities[0])
  })

  it('shows empty state when no activities', () => {
    render(<ActivityList activities={[]} selectedActivityId={undefined} onClick={vi.fn()} />)

    expect(screen.getByText(/inga aktiviteter/i)).toBeInTheDocument()
  })
})
