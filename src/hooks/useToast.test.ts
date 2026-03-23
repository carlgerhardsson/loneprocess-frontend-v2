import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToast } from './useToast'

describe('useToast', () => {
  it('initializes with hidden toast', () => {
    const { result } = renderHook(() => useToast())

    expect(result.current.toast.isVisible).toBe(false)
  })

  it('shows toast with message and type', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.showToast('Test message', 'success')
    })

    expect(result.current.toast.isVisible).toBe(true)
    expect(result.current.toast.message).toBe('Test message')
    expect(result.current.toast.type).toBe('success')
  })

  it('hides toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.showToast('Test', 'info')
    })

    expect(result.current.toast.isVisible).toBe(true)

    act(() => {
      result.current.hideToast()
    })

    expect(result.current.toast.isVisible).toBe(false)
  })

  it('defaults to info type', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.showToast('Test')
    })

    expect(result.current.toast.type).toBe('info')
  })
})
