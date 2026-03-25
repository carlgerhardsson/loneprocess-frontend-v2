import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ActivityComments } from './ActivityComments'
import { ActivityProgressProvider } from '@/contexts/ActivityProgressContext'

function renderWithProvider(ui: React.ReactElement) {
  return render(<ActivityProgressProvider>{ui}</ActivityProgressProvider>)
}

describe('ActivityComments', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders textarea', () => {
    renderWithProvider(<ActivityComments activityId="1.1" />)

    expect(screen.getByPlaceholderText(/Lägg till anteckningar/i)).toBeInTheDocument()
  })

  it('displays existing comment', () => {
    // Set existing comment in localStorage
    localStorage.setItem(
      'loneportal-progress',
      JSON.stringify({
        currentPeriod: '2025-03',
        activities: {
          '1.1': {
            activityId: '1.1',
            delstegCompleted: [],
            comment: 'Existing comment text',
            lastUpdated: new Date().toISOString(),
          },
        },
      })
    )

    renderWithProvider(<ActivityComments activityId="1.1" />)

    const textarea = screen.getByPlaceholderText(/Lägg till anteckningar/i) as HTMLTextAreaElement
    expect(textarea.value).toBe('Existing comment text')
  })

  it('saves comment on blur', async () => {
    renderWithProvider(<ActivityComments activityId="1.1" />)

    const textarea = screen.getByPlaceholderText(/Lägg till anteckningar/i)

    // Type comment
    await userEvent.type(textarea, 'Test comment')

    // Blur (click away)
    fireEvent.blur(textarea)

    await waitFor(() => {
      const stored = localStorage.getItem('loneportal-progress')
      expect(stored).toBeTruthy()
      const parsed = JSON.parse(stored!)
      expect(parsed.activities['1.1'].comment).toBe('Test comment')
    })
  })

  it('saves comment on Cmd+Enter (Mac)', async () => {
    renderWithProvider(<ActivityComments activityId="1.1" />)

    const textarea = screen.getByPlaceholderText(/Lägg till anteckningar/i)

    // Type comment
    await userEvent.type(textarea, 'Test comment')

    // Press Cmd+Enter
    fireEvent.keyDown(textarea, {
      key: 'Enter',
      code: 'Enter',
      metaKey: true,
    })

    await waitFor(() => {
      const stored = localStorage.getItem('loneportal-progress')
      expect(stored).toBeTruthy()
      const parsed = JSON.parse(stored!)
      expect(parsed.activities['1.1'].comment).toBe('Test comment')
    })
  })

  it('saves comment on Ctrl+Enter (Windows)', async () => {
    renderWithProvider(<ActivityComments activityId="1.1" />)

    const textarea = screen.getByPlaceholderText(/Lägg till anteckningar/i)

    // Type comment
    await userEvent.type(textarea, 'Test comment')

    // Press Ctrl+Enter
    fireEvent.keyDown(textarea, {
      key: 'Enter',
      code: 'Enter',
      ctrlKey: true,
    })

    await waitFor(() => {
      const stored = localStorage.getItem('loneportal-progress')
      expect(stored).toBeTruthy()
      const parsed = JSON.parse(stored!)
      expect(parsed.activities['1.1'].comment).toBe('Test comment')
    })
  })

  it('updates comment when typing', async () => {
    renderWithProvider(<ActivityComments activityId="1.1" />)

    const textarea = screen.getByPlaceholderText(/Lägg till anteckningar/i) as HTMLTextAreaElement

    await userEvent.type(textarea, 'New text')

    expect(textarea.value).toBe('New text')
  })

  it('shows helper text', () => {
    renderWithProvider(<ActivityComments activityId="1.1" />)

    expect(screen.getByText(/Cmd\/Ctrl \+ Enter för att spara/i)).toBeInTheDocument()
  })
})
