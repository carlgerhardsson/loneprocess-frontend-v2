import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DelstegChecklist } from './DelstegChecklist'
import { ActivityProgressProvider } from '@/contexts/ActivityProgressContext'
import type { Delsteg } from '@/types/activityDef'

const mockDelsteg: Delsteg[] = [
  { id: '1', text: 'Kontrollera systemstatus', required: true },
  { id: '2', text: 'Granska loggfiler', required: false },
  { id: '3', text: 'Bekräfta backup', required: true },
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
        colorScheme={{ accent: 'bg-blue-800' }}
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
        colorScheme={{ accent: 'bg-blue-800' }}
      />
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
    
    // Check aria-labels indicate unchecked state
    expect(buttons[0]).toHaveAttribute('aria-label', 'Markera som klar: Kontrollera systemstatus')
  })

  it('toggles checkbox when clicked', () => {
    renderWithProvider(
      <DelstegChecklist
        activityId="1.1"
        delsteg={mockDelsteg}
        colorScheme={{ accent: 'bg-blue-800' }}
      />
    )

    const buttons = screen.getAllByRole('button')
    const firstButton = buttons[0]

    // Check initial state
    expect(firstButton).toHaveAttribute('aria-label', 'Markera som klar: Kontrollera systemstatus')

    // Click to check
    fireEvent.click(firstButton)
    
    // Should update aria-label
    expect(firstButton).toHaveAttribute('aria-label', 'Avmarkera: Kontrollera systemstatus')

    // Click again to uncheck
    fireEvent.click(firstButton)
    expect(firstButton).toHaveAttribute('aria-label', 'Markera som klar: Kontrollera systemstatus')
  })

  it('shows required badge for required delsteg', () => {
    renderWithProvider(
      <DelstegChecklist
        activityId="1.1"
        delsteg={mockDelsteg}
        colorScheme={{ accent: 'bg-blue-800' }}
      />
    )

    // Should show "Obligatorisk" badge for required items
    const badges = screen.getAllByText('Obligatorisk')
    expect(badges).toHaveLength(2) // Two required items
  })

  it('hides required badge when item is checked', () => {
    renderWithProvider(
      <DelstegChecklist
        activityId="1.1"
        delsteg={mockDelsteg}
        colorScheme={{ accent: 'bg-blue-800' }}
      />
    )

    const buttons = screen.getAllByRole('button')
    const badges = screen.getAllByText('Obligatorisk')
    expect(badges).toHaveLength(2)

    // Check first required item
    fireEvent.click(buttons[0])

    // Should only show 1 badge now
    expect(screen.getAllByText('Obligatorisk')).toHaveLength(1)
  })

  it('applies correct accent color class', () => {
    const { container } = renderWithProvider(
      <DelstegChecklist
        activityId="1.1"
        delsteg={mockDelsteg}
        colorScheme={{ accent: 'bg-orange-800' }}
      />
    )

    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])

    // Check if the accent color class is applied to checked checkbox
    const checkedCheckbox = container.querySelector('.bg-orange-800')
    expect(checkedCheckbox).toBeInTheDocument()
  })

  it('persists state to localStorage', () => {
    renderWithProvider(
      <DelstegChecklist
        activityId="1.1"
        delsteg={mockDelsteg}
        colorScheme={{ accent: 'bg-blue-800' }}
      />
    )

    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])

    // Check localStorage
    const stored = localStorage.getItem('loneportal-progress')
    expect(stored).toBeTruthy()
    const parsed = JSON.parse(stored!)
    expect(parsed.activities['1.1'].delstegCompleted[0]).toBe(true)
  })

  it('applies line-through styling to checked items', () => {
    renderWithProvider(
      <DelstegChecklist
        activityId="1.1"
        delsteg={mockDelsteg}
        colorScheme={{ accent: 'bg-blue-800' }}
      />
    )

    const buttons = screen.getAllByRole('button')
    const firstText = screen.getByText('Kontrollera systemstatus')

    // Initially no line-through
    expect(firstText.className).not.toContain('line-through')

    // Click to check
    fireEvent.click(buttons[0])

    // Should have line-through
    expect(firstText.className).toContain('line-through')
  })
})
