import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ActivityReferences } from './ActivityReferences'
import type { Reference } from '@/types/activityDef'

const mockReferences: Reference[] = [
  {
    type: 'POL',
    title: 'Processguide Lön 1',
    url: 'https://example.com/pol-001',
  },
  {
    type: 'POL',
    title: 'Kontrollrutiner',
    url: 'https://example.com/pol-002',
  },
  {
    type: 'External',
    title: 'Skatteverket - AGI',
    url: 'https://skatteverket.se',
  },
]

describe('ActivityReferences', () => {
  it('renders all references', () => {
    render(<ActivityReferences references={mockReferences} />)

    expect(screen.getByText('Processguide Lön 1')).toBeInTheDocument()
    expect(screen.getByText('Kontrollrutiner')).toBeInTheDocument()
    expect(screen.getByText('Skatteverket - AGI')).toBeInTheDocument()
  })

  it('renders links with correct href', () => {
    render(<ActivityReferences references={mockReferences} />)

    const link1 = screen.getByText('Processguide Lön 1').closest('a')
    expect(link1).toHaveAttribute('href', 'https://example.com/pol-001')

    const link2 = screen.getByText('Kontrollrutiner').closest('a')
    expect(link2).toHaveAttribute('href', 'https://example.com/pol-002')

    const link3 = screen.getByText('Skatteverket - AGI').closest('a')
    expect(link3).toHaveAttribute('href', 'https://skatteverket.se')
  })

  it('opens links in new tab', () => {
    render(<ActivityReferences references={mockReferences} />)

    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('shows icons for each reference type', () => {
    const { container } = render(<ActivityReferences references={mockReferences} />)

    // Check for SVG icons (should be multiple per reference: type icon + arrow)
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('shows message when no references', () => {
    render(<ActivityReferences references={[]} />)

    expect(screen.getByText('Inga referenser tillgängliga')).toBeInTheDocument()
  })

  it('shows section heading', () => {
    render(<ActivityReferences references={mockReferences} />)

    expect(screen.getByText('Referenser & Dokumentation')).toBeInTheDocument()
  })

  it('shows type labels for each reference', () => {
    render(<ActivityReferences references={mockReferences} />)

    // Should show "POL" labels (2 POL references)
    const polLabels = screen.getAllByText('POL')
    expect(polLabels).toHaveLength(2)

    // Should show "Extern" label (1 External reference)
    expect(screen.getByText('Extern')).toBeInTheDocument()
  })

  it('applies correct styling to links', () => {
    const { container } = render(<ActivityReferences references={mockReferences} />)

    const links = container.querySelectorAll('a')
    links.forEach(link => {
      // Links should have group class for hover effects
      expect(link.className).toContain('group')
      expect(link.className).toContain('hover:bg-gray-100')
    })
  })

  it('shows all three reference types correctly', () => {
    const allTypes: Reference[] = [
      { type: 'POL', title: 'POL Doc', url: 'https://pol.example.com' },
      { type: 'External', title: 'External Site', url: 'https://external.com' },
      { type: 'Internal', title: 'Internal Link', url: 'https://internal.com' },
    ]

    render(<ActivityReferences references={allTypes} />)

    expect(screen.getByText('POL')).toBeInTheDocument()
    expect(screen.getByText('Extern')).toBeInTheDocument()
    expect(screen.getByText('Intern')).toBeInTheDocument()
  })
})
