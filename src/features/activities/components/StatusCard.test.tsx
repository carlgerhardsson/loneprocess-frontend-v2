import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusCard } from './StatusCard'
import type { KorningsStatus } from '@/types/la'

const mockStatus: KorningsStatus = {
  id: 1,
  loneperiod_id: 42,
  status: 'provlon_klar',
  provlon_startad: '2025-03-01T08:00:00',
  provlon_klar: '2025-03-01T08:30:00',
  definitiv_startad: null,
  definitiv_klar: null,
  antal_anstallda: 150,
  antal_fel: 3,
  meddelande: null,
  updated_at: '2025-03-01T08:30:00',
}

describe('StatusCard', () => {
  it('visar statusetikett', () => {
    render(<StatusCard status={mockStatus} />)
    expect(screen.getByText('Provlön klar')).toBeInTheDocument()
  })

  it('visar antal anställda', () => {
    render(<StatusCard status={mockStatus} />)
    expect(screen.getByText('150')).toBeInTheDocument()
  })

  it('visar antal fel i rött när fel finns', () => {
    render(<StatusCard status={mockStatus} />)
    const felValue = screen.getByText('3')
    expect(felValue).toHaveClass('text-red-600')
  })

  it('visar meddelande när det finns', () => {
    render(<StatusCard status={{ ...mockStatus, meddelande: 'Körning pausad' }} />)
    expect(screen.getByText('Körning pausad')).toBeInTheDocument()
  })

  it('visar inte meddelande-sektion när meddelande saknas', () => {
    render(<StatusCard status={mockStatus} />)
    expect(screen.queryByText('Körning pausad')).not.toBeInTheDocument()
  })

  it('visar fel-status korrekt', () => {
    render(<StatusCard status={{ ...mockStatus, status: 'fel' }} />)
    expect(screen.getByText('Fel uppstod')).toBeInTheDocument()
  })
})
