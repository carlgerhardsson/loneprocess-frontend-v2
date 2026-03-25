import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { ActivityProgressProvider } from './ActivityProgressContext'
import { useActivityProgress } from '@/hooks/useActivityProgress'

// Test component that uses the hook
function TestComponent() {
  const {
    progress,
    toggleDelsteg,
    updateComment,
    updateAssignee,
    getProgress,
    resetProgress,
    getCompletionPercentage,
  } = useActivityProgress()

  return (
    <div>
      <div data-testid="progress-count">{Object.keys(progress).length}</div>
      <button onClick={() => toggleDelsteg('1.1', 0, 3)}>Toggle Delsteg</button>
      <button onClick={() => updateComment('1.1', 'Test comment')}>Update Comment</button>
      <button onClick={() => updateAssignee('1.1', 'Test User')}>Update Assignee</button>
      <button onClick={() => resetProgress()}>Reset</button>
      <div data-testid="activity-progress">
        {getProgress('1.1') ? JSON.stringify(getProgress('1.1')) : 'No progress'}
      </div>
      <div data-testid="completion">{getCompletionPercentage('1.1')}%</div>
    </div>
  )
}

describe('ActivityProgressContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('provides context values', () => {
    render(
      <ActivityProgressProvider>
        <TestComponent />
      </ActivityProgressProvider>
    )

    expect(screen.getByTestId('progress-count')).toHaveTextContent('0')
  })

  it('toggles delsteg and updates localStorage', async () => {
    const { getByText, getByTestId } = render(
      <ActivityProgressProvider>
        <TestComponent />
      </ActivityProgressProvider>
    )

    // Toggle first delsteg
    getByText('Toggle Delsteg').click()

    await waitFor(() => {
      expect(getByTestId('progress-count')).toHaveTextContent('1')
    })

    // Check localStorage
    const stored = localStorage.getItem('loneportal-progress')
    expect(stored).toBeTruthy()
    const parsed = JSON.parse(stored!)
    expect(parsed.activities['1.1'].delstegCompleted[0]).toBe(true)
  })

  it('updates comment', async () => {
    const { getByText, getByTestId } = render(
      <ActivityProgressProvider>
        <TestComponent />
      </ActivityProgressProvider>
    )

    getByText('Update Comment').click()

    await waitFor(() => {
      const progressText = getByTestId('activity-progress').textContent
      expect(progressText).toContain('Test comment')
    })
  })

  it('updates assignee', async () => {
    const { getByText, getByTestId } = render(
      <ActivityProgressProvider>
        <TestComponent />
      </ActivityProgressProvider>
    )

    getByText('Update Assignee').click()

    await waitFor(() => {
      const progressText = getByTestId('activity-progress').textContent
      expect(progressText).toContain('Test User')
    })
  })

  it('calculates completion percentage', async () => {
    const { getByText, getByTestId } = render(
      <ActivityProgressProvider>
        <TestComponent />
      </ActivityProgressProvider>
    )

    // Initially 0%
    expect(getByTestId('completion')).toHaveTextContent('0%')

    // Toggle first delsteg (33% of 3)
    getByText('Toggle Delsteg').click()

    await waitFor(() => {
      expect(getByTestId('completion')).toHaveTextContent('33%')
    })
  })

  it('resets all progress', async () => {
    const { getByText, getByTestId } = render(
      <ActivityProgressProvider>
        <TestComponent />
      </ActivityProgressProvider>
    )

    // Add some progress
    getByText('Toggle Delsteg').click()

    await waitFor(() => {
      expect(getByTestId('progress-count')).toHaveTextContent('1')
    })

    // Reset
    getByText('Reset').click()

    await waitFor(() => {
      expect(getByTestId('progress-count')).toHaveTextContent('0')
    })

    // Check localStorage is cleared
    const stored = localStorage.getItem('loneportal-progress')
    const parsed = JSON.parse(stored!)
    expect(Object.keys(parsed.activities).length).toBe(0)
  })

  it('persists progress across re-renders', () => {
    // Set initial progress in localStorage
    localStorage.setItem(
      'loneportal-progress',
      JSON.stringify({
        currentPeriod: '2025-03',
        activities: {
          '1.1': {
            activityId: '1.1',
            delstegCompleted: [true, false, true],
            comment: 'Existing comment',
            lastUpdated: new Date().toISOString(),
          },
        },
      })
    )

    const { getByTestId } = render(
      <ActivityProgressProvider>
        <TestComponent />
      </ActivityProgressProvider>
    )

    // Should load from localStorage
    expect(getByTestId('progress-count')).toHaveTextContent('1')
    expect(getByTestId('completion')).toHaveTextContent('67%') // 2 of 3
  })
})
