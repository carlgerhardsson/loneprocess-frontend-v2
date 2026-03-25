import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DelstegChecklist } from './DelstegChecklist'
import { ActivityProgressProvider } from '@/contexts/ActivityProgressContext'

const mockDelsteg = [
  'Kontrollera systemstatus',
  'Granska loggfiler',
  'Bekräfta backup',
]

function renderWithProvider(ui: React.ReactElement) {
  return render(<ActivityProgressProvider>{ui}</ActivityProgressProvider>)
}

describe('DelstegChecklist', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders all delsteg as checkboxes', () => {
    renderWithProvider(
      <DelstegChecklist
        activityId="1.1"
        delsteg={mockDelsteg}
        accentColor="bg-blue-800"
      />
    )

    expect(screen.getByText('Kontrollera systemstatus')).toBeInTheDocument()
    expect(screen.getByText('Granska loggfiler')).toBeInTheDocument()
    expect(screen.getByText('Bekräfta backup')).toBeInTheDocument()
  })

  it('shows all checkboxes as unchecked initially', () => {
    renderWithProvider(
      <DelstegChecklist
        activityId="1.1"
        delsteg={mockDelsteg}
        accentColor="bg-blue-800"
      />
    )

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3)
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked()
    })
  })

  it('toggles checkbox when clicked', () => {
    renderWithProvider(
      <DelstegChecklist
        activityId="1.1"
        delsteg={mockDelsteg}
        accentColor="bg-blue-800"
      />
    )

    const checkboxes = screen.getAllByRole('checkbox')
    const firstCheckbox = checkboxes[0]

    // Click to check
    fireEvent.click(firstCheckbox)
    expect(firstCheckbox).toBeChecked()

    // Click again to uncheck
    fireEvent.click(firstCheckbox)
    expect(firstCheckbox).not.toBeChecked()
  })

  it('shows completion percentage', () => {
    renderWithProvider(
      <DelstegChecklist
        activityId="1.1"
        delsteg={mockDelsteg}
        accentColor="bg-blue-800"
      />
    )

    // Should show 0% initially
    expect(screen.getByText(/0% klart/)).toBeInTheDocument()

    // Check first checkbox
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])

    // Should show 33% (1 of 3)
    expect(screen.getByText(/33% klart/)).toBeInTheDocument()
  })

  it('updates progress when multiple checkboxes are toggled', () => {
    renderWithProvider(
      <DelstegChecklist
        activityId="1.1"
        delsteg={mockDelsteg}
        accentColor="bg-blue-800"
      />
    )

    const checkboxes = screen.getAllByRole('checkbox')

    // Check first two
    fireEvent.click(checkboxes[0])
    fireEvent.click(checkboxes[1])

    // Should show 67% (2 of 3)
    expect(screen.getByText(/67% klart/)).toBeInTheDocument()

    // Check all three
    fireEvent.click(checkboxes[2])

    // Should show 100%
    expect(screen.getByText(/100% klart/)).toBeInTheDocument()
  })

  it('applies correct accent color class', () => {
    const { container } = renderWithProvider(
      <DelstegChecklist
        activityId="1.1"
        delsteg={mockDelsteg}
        accentColor="bg-orange-800"
      />
    )

    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])

    // Check if the accent color class is applied
    const checkedCheckbox = container.querySelector('.bg-orange-800')
    expect(checkedCheckbox).toBeInTheDocument()
  })

  it('persists state to localStorage', () => {
    renderWithProvider(
      <DelstegChecklist
        activityId="1.1"
        delsteg={mockDelsteg}
        accentColor="bg-blue-800"
      />
    )

    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])

    // Check localStorage
    const stored = localStorage.getItem('loneportal-progress')
    expect(stored).toBeTruthy()
    const parsed = JSON.parse(stored!)
    expect(parsed.activities['1.1'].delstegCompleted[0]).toBe(true)
  })
})
