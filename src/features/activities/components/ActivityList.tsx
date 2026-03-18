import { useActivities } from '@/hooks/queries/useActivities'
import { Activity } from '@/types'
import { ActivityListItem } from './ActivityListItem'
import { EmptyState } from './EmptyState'
import { SkeletonList } from '@/components/loading'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ActivityListProps {
  onActivityClick?: (activity: Activity) => void
  onCreateActivity?: () => void
  selectedActivityId?: string
}

/**
 * Activity List
 *
 * Main list view for activities with loading, error, and empty states.
 * Integrates with TanStack Query for data fetching.
 */
export function ActivityList({
  onActivityClick,
  onCreateActivity,
  selectedActivityId,
}: ActivityListProps) {
  const { data: activities, isLoading, isError, error, refetch } = useActivities()

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-3">
        <SkeletonList items={5} />
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Något gick fel</h3>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          {error instanceof Error ? error.message : 'Kunde inte hämta aktiviteter.'}
        </p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Försök igen
        </button>
      </div>
    )
  }

  // Empty state
  if (!activities || activities.length === 0) {
    return <EmptyState onCreateActivity={onCreateActivity} />
  }

  // Success state
  return (
    <div className="space-y-3">
      {activities.map(activity => (
        <ActivityListItem
          key={activity.id}
          activity={activity}
          onClick={onActivityClick}
          isSelected={activity.id === selectedActivityId}
        />
      ))}
    </div>
  )
}
