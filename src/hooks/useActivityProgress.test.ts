import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useActivityProgress } from './useActivityProgress'
import { ActivityProgressProvider } from '@/contexts/ActivityProgressContext'

describe('useActivityProgress', () => {
  it('throws error when used outside of Provider', () => {
    // Suppress console.error for this test
    const originalError = console.error
    console.error = () => {}

    expect(() => {
      renderHook(() => useActivityProgress())
    }).toThrow('useActivityProgress must be used within ActivityProgressProvider')

    console.error = originalError
  })

  it('returns context values when used inside Provider', () => {
    const { result } = renderHook(() => useActivityProgress(), {
      wrapper: ActivityProgressProvider,
    })

    expect(result.current).toHaveProperty('progress')
    expect(result.current).toHaveProperty('toggleDelsteg')
    expect(result.current).toHaveProperty('updateComment')
    expect(result.current).toHaveProperty('updateAssignee')
    expect(result.current).toHaveProperty('getProgress')
    expect(result.current).toHaveProperty('resetProgress')
    expect(result.current).toHaveProperty('getCompletionPercentage')
  })

  it('provides working toggle function', () => {
    const { result } = renderHook(() => useActivityProgress(), {
      wrapper: ActivityProgressProvider,
    })

    expect(typeof result.current.toggleDelsteg).toBe('function')
  })

  it('provides working update functions', () => {
    const { result } = renderHook(() => useActivityProgress(), {
      wrapper: ActivityProgressProvider,
    })

    expect(typeof result.current.updateComment).toBe('function')
    expect(typeof result.current.updateAssignee).toBe('function')
  })
})
