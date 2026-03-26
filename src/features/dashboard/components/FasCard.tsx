/**
 * FasCard — Phase Card Component
 * Propagerar loneperiodId och orgKod till ActivityListItemExpanded
 */

import type { ActivityDefinition } from '@/types/activityDef'
import { CircularProgress } from './CircularProgress'
import { useFasProgress } from '../hooks/useFasProgress'
import { ActivityListItemExpanded } from '@/features/activities/components/ActivityListItemExpanded'

interface FasCardProps {
  activities: ActivityDefinition[]
  title: string
  subtitle: string
  colorScheme: {
    bg: string
    border: string
    text: string
    progressColor: string
  }
  loneperiodId?: number | null
  /** Bemanningsområde — skickas till employee-endpoints */
  orgKod?: string | null
}

export function FasCard({
  activities,
  title,
  subtitle,
  colorScheme,
  loneperiodId,
  orgKod,
}: FasCardProps) {
  const { completedCount, totalCount, overallPercentage } = useFasProgress(activities)

  const getFasAccentColor = (border: string) => {
    if (border.includes('blue')) return 'bg-blue-900'
    if (border.includes('orange')) return 'bg-orange-900'
    if (border.includes('green')) return 'bg-green-900'
    return 'bg-gray-900'
  }

  const expandedColorScheme = {
    bg: colorScheme.bg,
    border: colorScheme.border,
    text: colorScheme.text,
    accent: getFasAccentColor(colorScheme.border),
  }

  return (
    <div
      className={`${colorScheme.bg} ${colorScheme.border} border-2 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className={`text-base font-bold ${colorScheme.text} mb-1`}>{title}</h2>
            <p className="text-gray-600 text-sm">{subtitle}</p>
          </div>
          <CircularProgress
            percentage={overallPercentage}
            size={80}
            color={colorScheme.progressColor}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className={`text-sm font-semibold ${colorScheme.text}`}>
            {completedCount} av {totalCount} klara
          </div>
          <div className="text-gray-500 text-xs">({activities.length} aktiviteter)</div>
        </div>
      </div>

      {/* Activity List */}
      <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
        {activities.map(activity => (
          <ActivityListItemExpanded
            key={activity.id}
            activity={activity}
            colorScheme={expandedColorScheme}
            loneperiodId={loneperiodId}
            orgKod={orgKod}
          />
        ))}
      </div>
    </div>
  )
}
