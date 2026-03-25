import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ActivityListItemExpanded } from './ActivityListItemExpanded'
import { ActivityProgressProvider } from '@/contexts/ActivityProgressContext'
import type { Activity } from '@/types/activityDef'

const mockActivity: Activity = {
  id: '1.1',
  processNr: '1.1',
  process: 'Kontrollera driftsbilden',
  fas: 'Lön 1',
  category: 'Före Löneberäkning',
  hasApiIntegration: false,
  delsteg: [
    'Kontrollera systemstatus',
    'Granska loggfiler',
    'Bekräfta backup',
  ],
  references: [
    {
      type: 'POL',
      label: 'POL-001',
      url: 'https://example.com/pol-001',
    },
  ],
}

const mockActivityWithApi: Activity = {
  ...mockActivity,
  id: '1.2',
  processNr: '1.2',
  process: 'Hantera nyanställningar',
  hasApiIntegration: true,
  apiEndpoint: '/api/v1/la/employees?status=new',
}

function renderWithProvider(ui: React.ReactElement) {
  return render(<ActivityProgressProvider>{ui}</ActivityProgressProvider>)
}

describe('ActivityListItemExpanded', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders activity title', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} accentColor="bg-blue-800" />
    )

    expect(screen.getByText('1.1')).toBeInTheDocument()
    expect(screen.getByText('Kontrollera driftsbilden')).toBeInTheDocument()
  })

  it('starts collapsed', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} accentColor="bg-blue-800" />
    )

    // Delsteg should not be visible initially
    expect(screen.queryByText('Kontrollera systemstatus')).not.toBeInTheDocument()
  })

  it('expands when clicked', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} accentColor="bg-blue-800" />
    )

    const header = screen.getByText('Kontrollera driftsbilden').closest('button')
    expect(header).toBeInTheDocument()

    fireEvent.click(header!)

    // Delsteg should now be visible
    expect(screen.getByText('Kontrollera systemstatus')).toBeInTheDocument()
    expect(screen.getByText('Granska loggfiler')).toBeInTheDocument()
    expect(screen.getByText('Bekräfta backup')).toBeInTheDocument()
  })

  it('collapses when clicked again', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} accentColor="bg-blue-800" />
    )

    const header = screen.getByText('Kontrollera driftsbilden').closest('button')

    // Expand
    fireEvent.click(header!)
    expect(screen.getByText('Kontrollera systemstatus')).toBeInTheDocument()

    // Collapse
    fireEvent.click(header!)
    expect(screen.queryByText('Kontrollera systemstatus')).not.toBeInTheDocument()
  })

  it('shows progress bar', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} accentColor="bg-blue-800" />
    )

    // Progress bar should be visible (even at 0%)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
  })

  it('shows API badge when hasApiIntegration is true', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivityWithApi} accentColor="bg-blue-800" />
    )

    expect(screen.getByText('API')).toBeInTheDocument()
  })

  it('does not show API badge when hasApiIntegration is false', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} accentColor="bg-blue-800" />
    )

    expect(screen.queryByText('API')).not.toBeInTheDocument()
  })

  it('shows chevron icon', () => {
    const { container } = renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} accentColor="bg-blue-800" />
    )

    // Check for chevron SVG
    const chevron = container.querySelector('svg')
    expect(chevron).toBeInTheDocument()
  })

  it('rotates chevron when expanded', () => {
    const { container } = renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} accentColor="bg-blue-800" />
    )

    const header = screen.getByText('Kontrollera driftsbilden').closest('button')
    const chevron = container.querySelector('svg')

    // Initially not rotated
    expect(chevron?.classList.contains('rotate-180')).toBe(false)

    // Expand
    fireEvent.click(header!)

    // Should be rotated
    expect(chevron?.classList.contains('rotate-180')).toBe(true)
  })

  it('shows references when expanded', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} accentColor="bg-blue-800" />
    )

    const header = screen.getByText('Kontrollera driftsbilden').closest('button')
    fireEvent.click(header!)

    // References should be visible
    expect(screen.getByText('POL-001')).toBeInTheDocument()
  })

  it('shows comment field when expanded', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} accentColor="bg-blue-800" />
    )

    const header = screen.getByText('Kontrollera driftsbilden').closest('button')
    fireEvent.click(header!)

    // Comment textarea should be visible
    expect(screen.getByPlaceholderText(/Lägg till anteckningar/i)).toBeInTheDocument()
  })
})
