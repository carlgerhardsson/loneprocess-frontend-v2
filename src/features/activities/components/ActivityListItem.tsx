/**
 * Activity List Item Component
 * Individual activity item in the list with action buttons
 */

import { Calendar, User, Edit2, Trash2 } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import { PriorityIndicator } from './PriorityIndicator'
import { formatDate } from '@/lib/utils'
import type { Activity } from '@/types'

interface ActivityListItemProps {
  activity: Activity
  onClick?: (activity: Activity) => void
  onEdit?: (activity: Activity) => void
  onDelete?: (activity: Activity) => void
  isSelected?: boolean
}

export function ActivityListItem({
  activity,
  onClick,
  onEdit,
  onDelete,
  isSelected = false,
}: ActivityListItemProps) {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit?.(activity)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete?.(activity)
  }

  return (
    <div
      className={`bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
      }`}
      onClick={() => onClick?.(activity)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {activity.title}
            </h3>
            <StatusBadge status={activity.status} size="sm" />
            <PriorityIndicator priority={activity.priority} size="sm" />
          </div>

          {activity.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{activity.description}</p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500">
            {activity.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(activity.dueDate)}</span>
              </div>
            )}
            {activity.assignedTo && (
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{activity.assignedTo}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={handleEdit}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label="Redigera"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Ta bort"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
