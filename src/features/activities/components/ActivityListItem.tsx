import { Activity } from '@/types'
import { StatusBadge } from './StatusBadge'
import { PriorityIndicator } from './PriorityIndicator'
import { Calendar, User, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActivityListItemProps {
  activity: Activity
  onClick?: (activity: Activity) => void
  isSelected?: boolean
}

/**
 * Activity List Item
 *
 * Single activity row in the list view.
 * Displays key activity information with status, priority, and metadata.
 */
export function ActivityListItem({ activity, onClick, isSelected }: ActivityListItemProps) {
  const handleClick = () => {
    onClick?.(activity)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const completedItems = activity.checklistItems?.filter(item => item.isCompleted).length || 0
  const totalItems = activity.checklistItems?.length || 0
  const hasChecklist = totalItems > 0

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'group relative p-4 border border-gray-200 rounded-lg',
        'hover:border-primary-300 hover:bg-primary-50/50 transition-all cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        isSelected && 'border-primary-500 bg-primary-50'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Priority Indicator */}
        <div className="flex-shrink-0 mt-1">
          <PriorityIndicator priority={activity.priority} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-700">
            {activity.title}
          </h3>

          {/* Description */}
          {activity.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{activity.description}</p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            {/* Due Date */}
            {activity.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(activity.dueDate).toLocaleDateString('sv-SE')}</span>
              </div>
            )}

            {/* Assigned To */}
            {activity.assignedTo && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{activity.assignedTo}</span>
              </div>
            )}

            {/* Checklist Progress */}
            {hasChecklist && (
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>
                  {completedItems}/{totalItems}
                </span>
              </div>
            )}

            {/* Comment Count */}
            {activity.comments && activity.comments.length > 0 && (
              <div className="flex items-center gap-1">
                <span>{activity.comments.length} kommentarer</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex-shrink-0">
          <StatusBadge status={activity.status} />
        </div>
      </div>
    </div>
  )
}
