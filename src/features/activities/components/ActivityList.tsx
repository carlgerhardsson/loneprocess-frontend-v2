/**
 * Activity List
 *
 * Simple list view for activities.
 * Receives activities as props (data fetching handled by parent).
 */

import { Activity } from '@/types'
import { ActivityListItem } from './ActivityListItem'

interface ActivityListProps {
  activities: Activity[]
  onEdit?: (activity: Activity) => void
  onDelete?: (activity: Activity) => void
  onClick?: (activity: Activity) => void
  selectedActivityId?: string
}

export function ActivityList({
  activities,
  onEdit,
  onDelete,
  onClick,
  selectedActivityId,
}: ActivityListProps) {
  return (
    <div className="space-y-3">
      {activities.map(activity => (
        <ActivityListItem
          key={activity.id}
          activity={activity}
          onClick={onClick}
          onEdit={onEdit}
          onDelete={onDelete}
          isSelected={activity.id === selectedActivityId}
        />
      ))}
    </div>
  )
}
