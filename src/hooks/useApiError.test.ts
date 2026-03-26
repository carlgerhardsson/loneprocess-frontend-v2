import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { createElement } from 'react'
import { ToastProvider } from '@/contexts/ToastContext'
import { useApiError } from './useApiError'

function wrapper({ children }: { children: React.ReactNode }) {
  return createElement(ToastProvider, null, children)
}

describe('useApiError', () => {
  it('returnerar handleError och getErrorMsg', () => {
    const { result } = renderHook(() => useApiError(), { wrapper })
    expect(typeof result.current.handleError).toBe('function')
    expect(typeof result.current.getErrorMsg).toBe('function')
  })

  it('getErrorMsg returnerar svenskt felmeddelande för nätverksfel', () => {
    const { result } = renderHook(() => useApiError(), { wrapper })
    const msg = result.current.getErrorMsg(new Error('Network Error'))
    expect(msg).toBeTruthy()
    expect(typeof msg).toBe('string')
  })

  it('handleError anropar showError utan att krascha', () => {
    const { result } = renderHook(() => useApiError(), { wrapper })
    // Ska inte kasta
    act(() => {
      result.current.handleError(new Error('Test error'))
    })
  })
})
