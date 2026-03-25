import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ActivityListItemExpanded } from './ActivityListItemExpanded'
import { ActivityProgressProvider } from '@/contexts/ActivityProgressContext'
import type { ActivityDefinition } from '@/types/activityDef'

const mockActivity: ActivityDefinition = {
  id: '1.1',
  processNr: '1.1',
  process: 'Kontrollera driftsbilden',
  fas: 'Lön 1',
  category: 'Före Löneberäkning',
  hasApiIntegration: false,
  delsteg: [
    { id: '1', text: 'Kontrollera systemstatus', required: true },
    { id: '2', text: 'Granska loggfiler', required: false },
    { id: '3', text: 'Bekräfta backup', required: true },
  ],
  references: [
    {
      type: 'POL',
      title: 'Processguide Lön 1',
      url: 'https://example.com/pol-001',
    },
  ],
}

const mockActivityWithApi: ActivityDefinition = {
  ...mockActivity,
  id: '1.2',
  processNr: '1.2',
  process: 'Hantera nyanställningar',
  hasApiIntegration: true,
  apiEndpoint: '/api/v1/la/employees?status=new',
}

const mockColorScheme = {
  bg: 'bg-blue-50',
  border: 'border-blue-200',
  text: 'text-blue-700',
  accent: 'bg-blue-800',
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
      <ActivityListItemExpanded activity={mockActivity} colorScheme={mockColorScheme} />
    )

    expect(screen.getByText('1.1')).toBeInTheDocument()
    expect(screen.getByText('Kontrollera driftsbilden')).toBeInTheDocument()
  })

  it('starts collapsed', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} colorScheme={mockColorScheme} />
    )

    // Delsteg should not be visible initially
    expect(screen.queryByText('Kontrollera systemstatus')).not.toBeInTheDocument()
  })

  it('expands when clicked', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} colorScheme={mockColorScheme} />
    )

    const header = screen.getByText('Kontrollera driftsbilden').closest('button')
    expect(header).toBeInTheDocument()

    fireEvent.click(header!)

    // Delsteg heading should now be visible
    expect(screen.getByText('Delsteg')).toBeInTheDocument()
    // Delsteg items should be visible
    expect(screen.getByText('Kontrollera systemstatus')).toBeInTheDocument()
    expect(screen.getByText('Granska loggfiler')).toBeInTheDocument()
    expect(screen.getByText('Bekräfta backup')).toBeInTheDocument()
  })

  it('collapses when clicked again', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} colorScheme={mockColorScheme} />
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
    const { container } = renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} colorScheme={mockColorScheme} />
    )

    // Progress bar should be visible (mini progress bar at bottom of header)
    const progressBars = container.querySelectorAll('.bg-gray-200')
    expect(progressBars.length).toBeGreaterThan(0)
  })

  it('shows API badge when hasApiIntegration is true', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivityWithApi} colorScheme={mockColorScheme} />
    )

    expect(screen.getByText('API')).toBeInTheDocument()
  })

  it('does not show API badge when hasApiIntegration is false', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} colorScheme={mockColorScheme} />
    )

    expect(screen.queryByText('API')).not.toBeInTheDocument()
  })

  it('shows chevron icon', () => {
    const { container } = renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} colorScheme={mockColorScheme} />
    )

    // Check for chevron SVG
    const chevron = container.querySelector('svg')
    expect(chevron).toBeInTheDocument()
  })

  it('rotates chevron when expanded', () => {
    const { container } = renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} colorScheme={mockColorScheme} />
    )

    const header = screen.getByText('Kontrollera driftsbilden').closest('button')
    const chevron = container.querySelector('svg')

    // Initially not rotated
    expect(chevron?.classList.contains('rotate-90')).toBe(false)

    // Expand
    fireEvent.click(header!)

    // Should be rotated 90 degrees
    expect(chevron?.classList.contains('rotate-90')).toBe(true)
  })

  it('shows references when expanded', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} colorScheme={mockColorScheme} />
    )

    const header = screen.getByText('Kontrollera driftsbilden').closest('button')
    fireEvent.click(header!)

    // References should be visible
    expect(screen.getByText('Processguide Lön 1')).toBeInTheDocument()
  })

  it('shows comment field when expanded', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} colorScheme={mockColorScheme} />
    )

    const header = screen.getByText('Kontrollera driftsbilden').closest('button')
    fireEvent.click(header!)

    // Comment textarea should be visible
    expect(screen.getByPlaceholderText(/kommentarer, anteckningar/i)).toBeInTheDocument()
  })

  it('shows completion percentage', () => {
    renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} colorScheme={mockColorScheme} />
    )

    // Should show 0% initially
    expect(screen.getByText('0%')).toBeInTheDocument()
    expect(screen.getByText('0 / 3')).toBeInTheDocument()
  })

  it('shows default assignee if provided', () => {
    const activityWithAssignee = {
      ...mockActivity,
      defaultAssignee: 'Test User',
    }

    renderWithProvider(
      <ActivityListItemExpanded activity={activityWithAssignee} colorScheme={mockColorScheme} />
    )

    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('shows completed checkmark when all delsteg are done', () => {
    // Set progress to 100%
    localStorage.setItem(
      'loneportal-progress',
      JSON.stringify({
        currentPeriod: '2025-03',
        activities: {
          '1.1': {
            activityId: '1.1',
            delstegCompleted: [true, true, true],
            lastUpdated: new Date().toISOString(),
          },
        },
      })
    )

    const { container } = renderWithProvider(
      <ActivityListItemExpanded activity={mockActivity} colorScheme={mockColorScheme} />
    )

    // Should show 100%
    expect(screen.getByText('100%')).toBeInTheDocument()

    // Should show checkmark in header
    const checkmark = container.querySelector('.w-4.h-4.text-white')
    expect(checkmark).toBeInTheDocument()
  })
})
