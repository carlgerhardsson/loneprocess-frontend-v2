import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ExportButton } from './ExportButton'

describe('ExportButton', () => {
  it('renderas med standard-label', () => {
    render(<ExportButton />)
    expect(screen.getByRole('button', { name: /Exportera checklista som PDF/i })).toBeInTheDocument()
    expect(screen.getByText('Exportera checklista')).toBeInTheDocument()
  })

  it('renderas med anpassad label', () => {
    render(<ExportButton label="Skriv ut" />)
    expect(screen.getByText('Skriv ut')).toBeInTheDocument()
  })

  it('anropar window.print vid klick', async () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {})
    render(<ExportButton />)
    await userEvent.click(screen.getByRole('button', { name: /Exportera checklista som PDF/i }))
    expect(printSpy).toHaveBeenCalledTimes(1)
    printSpy.mockRestore()
  })

  it('har print:hidden klass för att döljas vid utskrift', () => {
    render(<ExportButton />)
    const btn = screen.getByRole('button', { name: /Exportera checklista som PDF/i })
    expect(btn.className).toContain('print:hidden')
  })
})
