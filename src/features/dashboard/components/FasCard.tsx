/**
 * FasCard - Phase Card Component
 * Displays a phase with its activities and progress
 * UPDATED: Now uses expandable ActivityListItemExpanded
 */

import type { FasType, ActivityDefinition } from '@/types/activityDef'
import { CircularProgress } from './CircularProgress'
import { useFasProgress } from '../hooks/useFasProgress'
import { ActivityListItemExpanded } from '@/features/activities/components/ActivityListItemExpanded'

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

  // Convert colorScheme to format expected by ActivityListItemExpanded
  // Use VERY dark colors (800) for checkboxes so white checkmark is visible
  const expandedColorScheme = {
    bg: colorScheme.bg,
    border: colorScheme.border,
    text: colorScheme.text,
    accent: colorScheme.border.replace('border-', 'bg-').replace('-200', '-800') // e.g. border-blue-200 -> bg-blue-800
  }

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

      {/* Activity List - Now Expandable! */}
      <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
        {activities.map((activity) => (
          <ActivityListItemExpanded
            key={activity.id}
            activity={activity}
            colorScheme={expandedColorScheme}
          />
        ))}
      </div>
    </div>
  )
}
