/**
 * FasCard - Phase Card Component
 * Displays a phase with its activities and progress
 */

import type { FasType, ActivityDefinition } from '@/types/activityDef'
import { CircularProgress } from './CircularProgress'
import { useFasProgress } from '../hooks/useFasProgress'

interface FasCardProps {
  fas: FasType
  activities: ActivityDefinition[]
  title: string
  subtitle: string
  colorScheme: {
    bg: string
    border: string
    text: string
    progressColor: string
  }
}

export function FasCard({ fas, activities, title, subtitle, colorScheme }: FasCardProps) {
  const { completedCount, totalCount, overallPercentage } = useFasProgress(activities)

  return (
    <div className={`${colorScheme.bg} ${colorScheme.border} border-2 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className={`text-2xl font-bold ${colorScheme.text} mb-1`}>
              {title}
            </h2>
            <p className="text-gray-600 text-sm">
              {subtitle}
            </p>
          </div>
          <CircularProgress 
            percentage={overallPercentage} 
            size={100}
            color={colorScheme.progressColor}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`text-lg font-semibold ${colorScheme.text}`}>
            {completedCount} av {totalCount} klara
          </div>
          <div className="text-gray-500 text-sm">
            ({activities.length} aktiviteter)
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <ActivityItem 
            key={activity.id} 
            activity={activity}
            colorScheme={colorScheme}
          />
        ))}
      </div>
    </div>
  )
}

function ActivityItem({ 
  activity, 
  colorScheme 
}: { 
  activity: ActivityDefinition
  colorScheme: FasCardProps['colorScheme']
}) {
  const { getCompletionPercentage } = useFasProgress([activity])
  const percentage = getCompletionPercentage(activity.id)
  const isComplete = percentage === 100

  return (
    <div className="bg-white rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-center gap-3">
        {/* Checkbox indicator */}
        <div className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ${
          isComplete 
            ? `${colorScheme.border.replace('border-', 'bg-')} border-transparent` 
            : 'border-gray-300'
        }`}>
          {isComplete && (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        {/* Activity info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-gray-500">
              {activity.processNr}
            </span>
            {activity.hasApiIntegration && (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                API
              </span>
            )}
          </div>
          <div className="text-sm text-gray-900 font-medium truncate">
            {activity.process}
          </div>
          {activity.defaultAssignee && (
            <div className="text-xs text-gray-500 mt-1">
              {activity.defaultAssignee}
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="flex-shrink-0 w-24">
          <div className="flex items-center justify-end gap-1">
            <span className={`text-xs font-semibold ${isComplete ? colorScheme.text : 'text-gray-600'}`}>
              {percentage}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
            <div 
              className={`h-full ${colorScheme.border.replace('border-', 'bg-')} transition-all duration-300`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
