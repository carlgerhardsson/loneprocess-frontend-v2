import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CommentForm } from './CommentForm'

describe('CommentForm', () => {
  it('renders textarea with placeholder', () => {
    render(<CommentForm onSubmit={vi.fn()} />)
    expect(screen.getByPlaceholderText('Skriv en kommentar...')).toBeInTheDocument()
  })

  it('renders custom placeholder', () => {
    render(<CommentForm onSubmit={vi.fn()} placeholder="Custom placeholder" />)
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
  })

  it('shows character counter when typing', () => {
    render(<CommentForm onSubmit={vi.fn()} />)

    const textarea = screen.getByPlaceholderText('Skriv en kommentar...')
    fireEvent.change(textarea, { target: { value: 'Test' } })

    expect(screen.getByText('4 tecken')).toBeInTheDocument()
  })

  it('submit button is disabled when text is empty', () => {
    render(<CommentForm onSubmit={vi.fn()} />)

    const submitButton = screen.getByRole('button', { name: /skicka/i })
    expect(submitButton).toBeDisabled()
  })

  it('submit button is enabled when text is entered', () => {
    render(<CommentForm onSubmit={vi.fn()} />)

    const textarea = screen.getByPlaceholderText('Skriv en kommentar...')
    fireEvent.change(textarea, { target: { value: 'Test comment' } })

    const submitButton = screen.getByRole('button', { name: /skicka/i })
    expect(submitButton).not.toBeDisabled()
  })

  it('calls onSubmit with trimmed text', () => {
    const onSubmit = vi.fn()
    render(<CommentForm onSubmit={onSubmit} />)

    const textarea = screen.getByPlaceholderText('Skriv en kommentar...')
    fireEvent.change(textarea, { target: { value: '  Test comment  ' } })

    const form = screen.getByRole('button', { name: /skicka/i }).closest('form')!
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledWith('Test comment')
  })

  it('clears textarea after submission', () => {
    const onSubmit = vi.fn()
    render(<CommentForm onSubmit={onSubmit} />)

    const textarea = screen.getByPlaceholderText('Skriv en kommentar...') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Test comment' } })

    const form = screen.getByRole('button', { name: /skicka/i }).closest('form')!
    fireEvent.submit(form)

    expect(textarea.value).toBe('')
  })

  it('does not submit when text is only whitespace', () => {
    const onSubmit = vi.fn()
    render(<CommentForm onSubmit={onSubmit} />)

    const textarea = screen.getByPlaceholderText('Skriv en kommentar...')
    fireEvent.change(textarea, { target: { value: '   ' } })

    const form = screen.getByRole('button', { name: /skicka/i }).closest('form')!
    fireEvent.submit(form)

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('disables form when isSubmitting is true', () => {
    render(<CommentForm onSubmit={vi.fn()} isSubmitting={true} />)

    const textarea = screen.getByPlaceholderText('Skriv en kommentar...')
    const submitButton = screen.getByRole('button', { name: /skickar/i })

    expect(textarea).toBeDisabled()
    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent('Skickar...')
  })
})
