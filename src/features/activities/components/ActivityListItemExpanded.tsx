/**
 * ActivityListItemExpanded - Expanderbar aktivitetsrad
 * Klicka för att expandera och visa delsteg, kommentarer, referenser och live API-data.
 */

import { useState } from 'react'
import type { ActivityDefinition } from '@/types/activityDef'
import { useActivityProgress } from '@/hooks/useActivityProgress'
import { DelstegChecklist } from './DelstegChecklist'
import { ActivityComments } from './ActivityComments'
import { ActivityReferences } from './ActivityReferences'
import { ApiDataDisplay } from './ApiDataDisplay'

interface ActivityListItemExpandedProps {
  activity: ActivityDefinition
  colorScheme: {
    bg: string
    border: string
    text: string
    accent: string
  }
  /** Aktiv löneperiod-ID för API-aktiviteter som behöver period-kontext */
  loneperiodId?: number | null
}

export function ActivityListItemExpanded({
  activity,
  colorScheme,
  loneperiodId,
}: ActivityListItemExpandedProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { progress, getCompletionPercentage } = useActivityProgress()
  const percentage = getCompletionPercentage(activity.id)
  const isComplete = percentage === 100

  const activityProgress = progress[activity.id]
  const completedDelsteg = activityProgress
    ? activityProgress.delstegCompleted.filter(Boolean).length
    : 0

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all overflow-hidden">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
      >
        <div className="flex items-center gap-4">
          {/* Expand/Collapse Icon */}
          <div className="flex-shrink-0 text-gray-400">
            <svg
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Checkbox Indicator */}
          <div
            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ${
              isComplete ? `${colorScheme.accent} border-transparent` : 'border-gray-300'
            }`}
          >
            {isComplete && (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>

          {/* Activity Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-sm font-bold text-gray-500">
                {activity.processNr}
              </span>
              {activity.hasApiIntegration && (
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                  API
                </span>
              )}
            </div>
            <h3 className="text-base font-semibold text-gray-900">{activity.process}</h3>
            {activity.defaultAssignee && (
              <p className="text-sm text-gray-500 mt-1">{activity.defaultAssignee}</p>
            )}
          </div>

          {/* Progress */}
          <div className="flex-shrink-0 text-right">
            <div className={`text-lg font-bold ${isComplete ? colorScheme.text : 'text-gray-600'}`}>
              {percentage}%
            </div>
            <div className="text-xs text-gray-500">
              {completedDelsteg} / {activity.delsteg.length}
            </div>
          </div>
        </div>

        {/* Mini Progress Bar */}
        <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${colorScheme.accent} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t-2 border-gray-200 bg-gray-50">
          <div className="p-6 space-y-6">
            {/* Live Data från System — bara för API-aktiviteter */}
            {activity.hasApiIntegration && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Live Data från System
                </h3>
                <ApiDataDisplay activityId={activity.id} loneperiodId={loneperiodId} />
              </div>
            )}

            {/* Delsteg Checklist */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Delsteg</h3>
              <DelstegChecklist
                activityId={activity.id}
                delsteg={activity.delsteg}
                colorScheme={{ accent: colorScheme.accent }}
              />
            </div>

            {/* References */}
            {activity.references.length > 0 && (
              <div>
                <ActivityReferences references={activity.references} />
              </div>
            )}

            {/* Comments */}
            <div>
              <ActivityComments activityId={activity.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
