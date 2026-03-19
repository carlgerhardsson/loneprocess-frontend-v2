import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('renders with placeholder', () => {
    render(<SearchBar value="" onChange={vi.fn()} />)
    expect(screen.getByPlaceholderText('Sök aktiviteter...')).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    render(<SearchBar value="" onChange={vi.fn()} placeholder="Custom search" />)
    expect(screen.getByPlaceholderText('Custom search')).toBeInTheDocument()
  })

  it('displays current value', () => {
    render(<SearchBar value="test search" onChange={vi.fn()} />)
    const input = screen.getByPlaceholderText('Sök aktiviteter...') as HTMLInputElement
    expect(input.value).toBe('test search')
  })

  it('calls onChange after debounce delay', async () => {
    const onChange = vi.fn()
    render(<SearchBar value="" onChange={onChange} debounceMs={100} />)

    const input = screen.getByPlaceholderText('Sök aktiviteter...')
    fireEvent.change(input, { target: { value: 'test' } })

    // Should not call immediately
    expect(onChange).not.toHaveBeenCalled()

    // Should call after debounce
    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalledWith('test')
      },
      { timeout: 200 }
    )
  })

  it('shows clear button when text is entered', () => {
    render(<SearchBar value="test" onChange={vi.fn()} />)
    expect(screen.getByLabelText('Rensa sökning')).toBeInTheDocument()
  })

  it('hides clear button when text is empty', () => {
    render(<SearchBar value="" onChange={vi.fn()} />)
    expect(screen.queryByLabelText('Rensa sökning')).not.toBeInTheDocument()
  })

  it('clears search when clear button clicked', async () => {
    const onChange = vi.fn()
    render(<SearchBar value="test" onChange={onChange} />)

    const clearButton = screen.getByLabelText('Rensa sökning')
    fireEvent.click(clearButton)

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('')
    })
  })

  it('syncs with external value changes', () => {
    const { rerender } = render(<SearchBar value="initial" onChange={vi.fn()} />)

    const input = screen.getByPlaceholderText('Sök aktiviteter...') as HTMLInputElement
    expect(input.value).toBe('initial')

    rerender(<SearchBar value="updated" onChange={vi.fn()} />)
    expect(input.value).toBe('updated')
  })
})
