import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ApiDataDisplay } from './ApiDataDisplay'

describe('ApiDataDisplay', () => {
  it('renders with activity ID and endpoint', () => {
    render(<ApiDataDisplay activityId="1.2" apiEndpoint="/api/v1/la/employees?status=new" />)

    expect(screen.getByText(/Live Data från System/i)).toBeInTheDocument()
    expect(screen.getByText(/Realtid/i)).toBeInTheDocument()
  })

  it('shows endpoint information', () => {
    render(<ApiDataDisplay activityId="1.2" apiEndpoint="/api/v1/la/employees?status=new" />)

    expect(screen.getByText(/\/api\/v1\/la\/employees\?status=new/i)).toBeInTheDocument()
  })

  it('shows activity ID', () => {
    render(<ApiDataDisplay activityId="1.2" apiEndpoint="/api/v1/la/employees?status=new" />)

    expect(screen.getByText(/Activity 1\.2/i)).toBeInTheDocument()
  })

  it('determines correct endpoint type for new employees', () => {
    render(<ApiDataDisplay activityId="1.2" apiEndpoint="/api/v1/la/employees?status=new" />)

    expect(screen.getByText(/Type: new-employees/i)).toBeInTheDocument()
  })

  it('determines correct endpoint type for terminated employees', () => {
    render(<ApiDataDisplay activityId="1.3" apiEndpoint="/api/v1/la/employees?status=terminated" />)

    expect(screen.getByText(/Type: terminated-employees/i)).toBeInTheDocument()
  })

  it('determines correct endpoint type for running status', () => {
    render(<ApiDataDisplay activityId="2.1" apiEndpoint="/api/v1/la/periods/123/korningsstatus" />)

    expect(screen.getByText(/Type: running-status/i)).toBeInTheDocument()
  })

  it('determines correct endpoint type for error list', () => {
    render(<ApiDataDisplay activityId="2.2" apiEndpoint="/api/v1/la/fellistor/123" />)

    expect(screen.getByText(/Type: error-list/i)).toBeInTheDocument()
  })
})
