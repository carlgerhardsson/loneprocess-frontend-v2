import { Activity } from '@/types'
import { StatusBadge } from './StatusBadge'
import { PriorityIndicator } from './PriorityIndicator'
import { ChecklistDisplay } from './ChecklistDisplay'
import { Calendar, User, Clock, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActivityDetailsProps {
  activity: Activity
  className?: string
}

/**
 * Activity Details
 *
 * Comprehensive view of a single activity with all metadata and checklist.
 */
export function ActivityDetails({ activity, className }: ActivityDetailsProps) {
  const typeLabels: Record<Activity['type'], string> = {
    salary: 'Lön',
    tax: 'Skatt',
    reporting: 'Rapportering',
    audit: 'Granskning',
    other: 'Övrigt',
  }

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200', className)}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <PriorityIndicator priority={activity.priority} showLabel />
              <StatusBadge status={activity.status} />
              <span className="text-sm text-gray-500">{typeLabels[activity.type]}</span>
            </div>
          </div>
        </div>

        {activity.description && (
          <p className="text-gray-700 leading-relaxed">{activity.description}</p>
        )}
      </div>

      {/* Metadata */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Due Date */}
          {activity.dueDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-xs text-gray-500">Förfallodatum</div>
                <div className="text-sm font-medium text-gray-900">
                  {new Date(activity.dueDate).toLocaleDateString('sv-SE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Assigned To */}
          {activity.assignedTo && (
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-xs text-gray-500">Tilldelad till</div>
                <div className="text-sm font-medium text-gray-900">{activity.assignedTo}</div>
              </div>
            </div>
          )}

          {/* Created At */}
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-xs text-gray-500">Skapad</div>
              <div className="text-sm font-medium text-gray-900">
                {new Date(activity.createdAt).toLocaleDateString('sv-SE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>

          {/* Completed At */}
          {activity.completedAt && (
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-500" />
              <div>
                <div className="text-xs text-gray-500">Avslutad</div>
                <div className="text-sm font-medium text-gray-900">
                  {new Date(activity.completedAt).toLocaleDateString('sv-SE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        {activity.tags && activity.tags.length > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {activity.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Checklist */}
      {activity.checklistItems && activity.checklistItems.length > 0 && (
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Checklista</h3>
          <ChecklistDisplay items={activity.checklistItems} />
        </div>
      )}
    </div>
  )
}
