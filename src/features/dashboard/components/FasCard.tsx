/**
 * FasCard Component
 * Shows a phase card with progress and activity list
 */

import { CircularProgress } from './CircularProgress'
import { useFasProgress } from '../hooks/useFasProgress'
import { getActivitiesByFas } from '@/data/activities'
import { useActivityProgress } from '@/hooks/useActivityProgress'
import type { FasType } from '@/types/activityDef'

interface FasCardProps {
  fas: FasType
  title: string
  subtitle: string
  colorScheme: 'blue' | 'orange' | 'green'
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    ring: 'text-blue-600',
    checkmark: 'text-blue-500',
    hover: 'hover:bg-blue-100'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    ring: 'text-orange-600',
    checkmark: 'text-orange-500',
    hover: 'hover:bg-orange-100'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    ring: 'text-green-600',
    checkmark: 'text-green-500',
    hover: 'hover:bg-green-100'
  }
}

export function FasCard({ fas, title, subtitle, colorScheme }: FasCardProps) {
  const { total, completed, percentage } = useFasProgress(fas)
  const { getCompletionPercentage } = useActivityProgress()
  const activities = getActivitiesByFas(fas)
  const colors = colorClasses[colorScheme]

  return (
    <div className={`rounded-xl border-2 ${colors.border} ${colors.bg} overflow-hidden shadow-sm`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <h2 className={`text-2xl font-bold ${colors.text} mb-1`}>
          {title}
        </h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      {/* Progress Section */}
      <div className="p-6 flex items-center justify-between border-b border-gray-200 bg-white">
        <div>
          <div className="text-3xl font-bold text-gray-900">
            {completed} <span className="text-gray-400">av</span> {total}
          </div>
          <div className="text-sm text-gray-600 mt-1">aktiviteter klara</div>
        </div>
        <div className={colors.ring}>
          <CircularProgress percentage={percentage} color="currentColor" />
        </div>
      </div>

      {/* Activities List */}
      <div className="p-4">
        <div className="space-y-2">
          {activities.map(activity => {
            const activityPct = getCompletionPercentage(activity.id)
            const isComplete = activityPct === 100

            return (
              <div
                key={activity.id}
                className={`p-3 rounded-lg bg-white border border-gray-200 transition-colors ${
                  isComplete ? 'opacity-60' : ''
                } ${colors.hover}`}
              >
                <div className="flex items-start gap-3">
                  {/* Checkmark or Process Number */}
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {isComplete ? (
                      <svg
                        className={`w-5 h-5 ${colors.checkmark}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span className="text-xs font-mono font-semibold text-gray-500">
                        {activity.processNr}
                      </span>
                    )}
                  </div>

                  {/* Activity Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-gray-900 leading-tight">
                        {activity.process}
                      </h3>
                      {activity.hasApiIntegration && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          API
                        </span>
                      )}
                    </div>
                    
                    {/* Progress bar */}
                    {activityPct > 0 && activityPct < 100 && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all ${colors.bg}`}
                            style={{ width: `${activityPct}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {activityPct}% klart
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
