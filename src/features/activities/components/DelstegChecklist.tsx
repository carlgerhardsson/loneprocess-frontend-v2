/**
 * DelstegChecklist - Interactive Checklist for Activity Sub-steps
 * Shows checkboxes for each delsteg that save to localStorage
 */

import { useActivityProgress } from '@/hooks/useActivityProgress'
import type { Delsteg } from '@/types/activityDef'

interface DelstegChecklistProps {
  activityId: string
  delsteg: Delsteg[]
  colorScheme?: {
    accent: string
  }
}

export function DelstegChecklist({ activityId, delsteg, colorScheme }: DelstegChecklistProps) {
  const { progress, toggleDelsteg } = useActivityProgress()
  const activityProgress = progress[activityId]
  
  const handleToggle = (index: number) => {
    toggleDelsteg(activityId, index, delsteg.length)
  }

  return (
    <div className="space-y-2">
      {delsteg.map((step, index) => {
        const isChecked = activityProgress?.delstegCompleted[index] || false
        
        return (
          <div
            key={step.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            {/* Checkbox */}
            <button
              onClick={() => handleToggle(index)}
              className="flex-shrink-0 mt-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
              aria-label={isChecked ? `Avmarkera: ${step.text}` : `Markera som klar: ${step.text}`}
            >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  isChecked
                    ? `${colorScheme?.accent || 'bg-blue-800'} border-transparent`
                    : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
              >
                {isChecked && (
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </button>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm transition-all ${
                  isChecked
                    ? 'text-gray-500 line-through'
                    : 'text-gray-900 group-hover:text-gray-700'
                }`}
              >
                {step.text}
              </p>
              {step.required && !isChecked && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-red-50 text-red-600 text-xs font-medium rounded">
                  Obligatorisk
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
