import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FormField } from './FormField'

describe('FormField', () => {
  it('renders label', () => {
    render(
      <FormField label="Test Label">
        <input type="text" />
      </FormField>
    )
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <FormField label="Test Label">
        <input type="text" data-testid="test-input" />
      </FormField>
    )
    expect(screen.getByTestId('test-input')).toBeInTheDocument()
  })

  it('shows required indicator when required', () => {
    render(
      <FormField label="Test Label" required>
        <input type="text" />
      </FormField>
    )
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('does not show required indicator when not required', () => {
    render(
      <FormField label="Test Label">
        <input type="text" />
      </FormField>
    )
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  it('shows error message when provided', () => {
    render(
      <FormField label="Test Label" error="This is an error">
        <input type="text" />
      </FormField>
    )
    expect(screen.getByText('This is an error')).toBeInTheDocument()
  })

  it('does not show error when not provided', () => {
    const { container } = render(
      <FormField label="Test Label">
        <input type="text" />
      </FormField>
    )
    expect(container.querySelector('.text-red-600')).not.toBeInTheDocument()
  })
})
