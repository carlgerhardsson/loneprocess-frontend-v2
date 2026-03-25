/**
 * Activity List Item Component
 * UPDATED: Now displays löneprocess-specific fields
 */

import { Tag, User, Edit2, Trash2 } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import { PriorityIndicator } from './PriorityIndicator'
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
      data-selected={isSelected}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Process Number & Title */}
          <div className="flex items-center gap-2 mb-2">
            {activity.processNr && (
              <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                {activity.processNr}
              </span>
            )}
            <h3 className="text-lg font-semibold text-gray-900 truncate">{activity.process}</h3>
            <StatusBadge status={activity.status} size="sm" />
            <PriorityIndicator priority={activity.priority} size="sm" />
          </div>

          {/* Behov (Description) */}
          {activity.behov && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{activity.behov}</p>
          )}

          {/* Fas & Roll */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>{activity.fas}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{activity.roll}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
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
