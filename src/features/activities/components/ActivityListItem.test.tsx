import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ActivityListItem } from './ActivityListItem'
import type { Activity } from '@/types'

const mockActivity: Activity = {
  id: '1',
  processNr: '20.1',
  process: 'Test Process',
  fas: 'Planering',
  roll: 'Löneadministratör',
  priority: 3,
  status: 'active',
  behov: 'Test need',
  outInput: null,
  skaIngaILoneperiod: false,
  effektenVardet: null,
  extraInfo: null,
  acceptans: null,
  featureLosning: null,
  senastUtford: null,
  createdAt: '2024-01-01T10:00:00Z',
  updatedAt: '2024-01-01T10:00:00Z',
}

describe('ActivityListItem', () => {
  it('renders activity information', () => {
    render(<ActivityListItem activity={mockActivity} isSelected={false} onClick={vi.fn()} />)

    expect(screen.getByText('Test Process')).toBeInTheDocument()
    expect(screen.getByText('20.1')).toBeInTheDocument()
  })

  it('shows selected state', () => {
    const { container } = render(
      <ActivityListItem activity={mockActivity} isSelected={true} onClick={vi.fn()} />
    )

    expect(container.firstChild).toHaveClass('ring-2')
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<ActivityListItem activity={mockActivity} isSelected={false} onClick={onClick} />)

    fireEvent.click(screen.getByText('Test Process'))
    expect(onClick).toHaveBeenCalledWith(mockActivity)
  })

  it('displays status badge', () => {
    render(<ActivityListItem activity={mockActivity} isSelected={false} onClick={vi.fn()} />)

    expect(screen.getByText('Aktiv')).toBeInTheDocument()
  })
})
