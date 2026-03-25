import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ActivityReferences } from './ActivityReferences'
import type { Reference } from '@/types/activityDef'

const mockReferences: Reference[] = [
  {
    type: 'POL',
    label: 'POL-001',
    url: 'https://example.com/pol-001',
  },
  {
    type: 'POL',
    label: 'POL-002',
    url: 'https://example.com/pol-002',
  },
  {
    type: 'External',
    label: 'Skatteverket',
    url: 'https://skatteverket.se',
  },
]

describe('ActivityReferences', () => {
  it('renders all references', () => {
    render(<ActivityReferences references={mockReferences} />)

    expect(screen.getByText('POL-001')).toBeInTheDocument()
    expect(screen.getByText('POL-002')).toBeInTheDocument()
    expect(screen.getByText('Skatteverket')).toBeInTheDocument()
  })

  it('renders links with correct href', () => {
    render(<ActivityReferences references={mockReferences} />)

    const link1 = screen.getByText('POL-001').closest('a')
    expect(link1).toHaveAttribute('href', 'https://example.com/pol-001')

    const link2 = screen.getByText('POL-002').closest('a')
    expect(link2).toHaveAttribute('href', 'https://example.com/pol-002')

    const link3 = screen.getByText('Skatteverket').closest('a')
    expect(link3).toHaveAttribute('href', 'https://skatteverket.se')
  })

  it('opens links in new tab', () => {
    render(<ActivityReferences references={mockReferences} />)

    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('shows external link icon', () => {
    const { container } = render(<ActivityReferences references={mockReferences} />)

    // Check for external link SVG icons
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('renders nothing when no references', () => {
    const { container } = render(<ActivityReferences references={[]} />)

    expect(container.firstChild).toBeNull()
  })

  it('shows section heading', () => {
    render(<ActivityReferences references={mockReferences} />)

    expect(screen.getByText('Referenser')).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    const { container } = render(<ActivityReferences references={mockReferences} />)

    const links = container.querySelectorAll('a')
    links.forEach((link) => {
      expect(link.className).toContain('text-blue-600')
      expect(link.className).toContain('hover:text-blue-800')
    })
  })
})
