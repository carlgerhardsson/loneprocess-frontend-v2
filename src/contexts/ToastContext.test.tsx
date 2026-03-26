import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToastProvider, useToastContext } from './ToastContext'
import { createElement } from 'react'

function TestComponent() {
  const { showToast, showError, showSuccess } = useToastContext()
  return (
    <div>
      <button onClick={() => showToast('Info-meddelande', 'info')}>Info</button>
      <button onClick={() => showError('Felmeddelande')}>Error</button>
      <button onClick={() => showSuccess('Lyckat!')}>Success</button>
    </div>
  )
}

function renderWithProvider() {
  return render(
    createElement(ToastProvider, null, createElement(TestComponent))
  )
}

describe('ToastContext', () => {
  it('visar toast när showToast anropas', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByRole('button', { name: 'Info' }))
    expect(screen.getByText('Info-meddelande')).toBeInTheDocument()
  })

  it('visar error toast', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByRole('button', { name: 'Error' }))
    expect(screen.getByText('Felmeddelande')).toBeInTheDocument()
  })

  it('visar success toast', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByRole('button', { name: 'Success' }))
    expect(screen.getByText('Lyckat!')).toBeInTheDocument()
  })

  it('kastar fel om useToastContext används utanför provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() =>
      render(createElement(TestComponent))
    ).toThrow()
    spy.mockRestore()
  })
})
