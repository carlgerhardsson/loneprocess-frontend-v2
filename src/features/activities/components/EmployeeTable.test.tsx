import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmployeeTable } from './EmployeeTable'
import type { LAEmployee } from '@/types/la'

const mockEmployees: LAEmployee[] = [
  {
    id: 1,
    personal_number: '8901011234',
    name: 'Anna Svensson',
    department: 'IT',
    org_kod: 'ORG1',
    status: 'new',
    employment_date: '2025-04-01',
    termination_date: null,
    salary: 45000,
    salary_type: 'monthly',
    created_at: '2025-03-01',
    updated_at: '2025-03-01',
  },
  {
    id: 2,
    personal_number: '9102022345',
    name: 'Erik Nilsson',
    department: 'HR',
    org_kod: 'ORG1',
    status: 'new',
    employment_date: '2025-04-15',
    termination_date: null,
    salary: 38000,
    salary_type: 'monthly',
    created_at: '2025-03-01',
    updated_at: '2025-03-01',
  },
]

describe('EmployeeTable', () => {
  it('visar anställda i tabell', () => {
    render(<EmployeeTable employees={mockEmployees} variant="new" />)
    expect(screen.getByText('Anna Svensson')).toBeInTheDocument()
    expect(screen.getByText('Erik Nilsson')).toBeInTheDocument()
    expect(screen.getByText('8901011234')).toBeInTheDocument()
  })

  it('visar anställningsdatum för variant new', () => {
    render(<EmployeeTable employees={mockEmployees} variant="new" />)
    expect(screen.getByText('Anställningsdatum')).toBeInTheDocument()
    expect(screen.queryByText('Sista arbetsdag')).not.toBeInTheDocument()
  })

  it('visar sista arbetsdag för variant terminated', () => {
    render(<EmployeeTable employees={mockEmployees} variant="terminated" />)
    expect(screen.getByText('Sista arbetsdag')).toBeInTheDocument()
    expect(screen.queryByText('Anställningsdatum')).not.toBeInTheDocument()
  })

  it('visar lön för variant default', () => {
    render(<EmployeeTable employees={mockEmployees} variant="default" />)
    expect(screen.getByText('Lön')).toBeInTheDocument()
  })

  it('visar tomt state när inga anställda', () => {
    render(<EmployeeTable employees={[]} variant="new" />)
    expect(screen.getByText(/Inga poster hittades/i)).toBeInTheDocument()
  })

  it('visar antal poster', () => {
    render(<EmployeeTable employees={mockEmployees} variant="new" />)
    expect(screen.getByText('2 poster')).toBeInTheDocument()
  })
})
