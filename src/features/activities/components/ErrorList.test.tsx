import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorList } from './ErrorList'
import type { LACalculationError } from '@/types/la'

const mockErrors: LACalculationError[] = [
  {
    id: 'err-1',
    loneperiod_id: 42,
    personal_number: '8901011234',
    name: 'Anna Svensson',
    error_code: 'AGI_001',
    error_type: 'AGI',
    description: 'Saknad uppgift för AGI',
    severity: 'error',
    behandlad: false,
    behandlad_av: null,
    behandlad_datum: null,
    created_at: '2025-03-01',
  },
  {
    id: 'err-2',
    loneperiod_id: 42,
    personal_number: '9102022345',
    name: 'Erik Nilsson',
    error_code: 'AGI_002',
    error_type: 'AGI',
    description: 'Felaktig löneuppgift',
    severity: 'warning',
    behandlad: true,
    behandlad_av: 'Handläggare',
    behandlad_datum: '2025-03-02',
    created_at: '2025-03-01',
  },
]

describe('ErrorList', () => {
  it('visar fel i tabell', () => {
    render(<ErrorList errors={mockErrors} />)
    expect(screen.getByText('Anna Svensson')).toBeInTheDocument()
    expect(screen.getByText('AGI_001')).toBeInTheDocument()
    expect(screen.getByText('Saknad uppgift för AGI')).toBeInTheDocument()
  })

  it('visar summering med antal fel och varningar', () => {
    render(<ErrorList errors={mockErrors} />)
    expect(screen.getByText('1 fel')).toBeInTheDocument()
    expect(screen.getByText('1 varningar')).toBeInTheDocument()
  })

  it('visar behandlad-status korrekt', () => {
    render(<ErrorList errors={mockErrors} />)
    expect(screen.getByText('Behandlad')).toBeInTheDocument()
    expect(screen.getByText('Obehandlad')).toBeInTheDocument()
  })

  it('visar tomt state när inga fel', () => {
    render(<ErrorList errors={[]} />)
    expect(screen.getByText(/Inga fel hittades/i)).toBeInTheDocument()
  })

  it('visar severity badges', () => {
    render(<ErrorList errors={mockErrors} />)
    expect(screen.getByText('Fel')).toBeInTheDocument()
    expect(screen.getByText('Varning')).toBeInTheDocument()
  })
})
