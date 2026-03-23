import type { Activity } from '@/types'
import { StatusBadge } from './StatusBadge'
import { PriorityIndicator } from './PriorityIndicator'
import { ChecklistDisplay } from './ChecklistDisplay'
import { Calendar, User, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface ActivityDetailsProps {
  activity: Activity
}

/**
 * Activity Details
 *
 * Detailed view of a single activity with all its information.
 */
export function ActivityDetails({ activity }: ActivityDetailsProps) {
  const activityTypeLabels: Record<Activity['type'], string> = {
    salary: 'Lönehantering',
    tax: 'Skatt',
    reporting: 'Rapportering',
    audit: 'Granskning',
    recurring: 'Återkommande',
    other: 'Övrigt',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">{activity.title}</h2>
          <div className="flex items-center gap-2">
            <StatusBadge status={activity.status} />
            <PriorityIndicator priority={activity.priority} />
          </div>
        </div>
        <p className="text-gray-600">{activity.description}</p>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Type */}
        <div>
          <dt className="text-sm font-medium text-gray-500 mb-1">Typ</dt>
          <dd className="text-gray-900">{activityTypeLabels[activity.type]}</dd>
        </div>

        {/* Due Date */}
        <div>
          <dt className="text-sm font-medium text-gray-500 mb-1">Förfallodatum</dt>
          <dd className="flex items-center gap-2 text-gray-900">
            <Calendar className="w-4 h-4" />
            {activity.dueDate ? formatDate(activity.dueDate) : 'Inget datum satt'}
          </dd>
        </div>

        {/* Assigned To */}
        <div>
          <dt className="text-sm font-medium text-gray-500 mb-1">Tilldelad till</dt>
          <dd className="flex items-center gap-2 text-gray-900">
            <User className="w-4 h-4" />
            {activity.assignedTo || 'Ej tilldelad'}
          </dd>
        </div>

        {/* Created At */}
        <div>
          <dt className="text-sm font-medium text-gray-500 mb-1">Skapad</dt>
          <dd className="flex items-center gap-2 text-gray-900">
            <Clock className="w-4 h-4" />
            {formatDate(activity.createdAt)}
          </dd>
        </div>

        {/* Completed At */}
        {activity.completedAt && (
          <div className="col-span-2">
            <dt className="text-sm font-medium text-gray-500 mb-1">Slutförd</dt>
            <dd className="flex items-center gap-2 text-gray-900">
              <Clock className="w-4 h-4" />
              {formatDate(activity.completedAt)}
            </dd>
          </div>
        )}
      </div>

      {/* Tags */}
      {activity.tags && activity.tags.length > 0 && (
        <div>
          <dt className="text-sm font-medium text-gray-500 mb-2">Taggar</dt>
          <dd className="flex flex-wrap gap-2">
            {activity.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </dd>
        </div>
      )}

      {/* Checklist */}
      {activity.checklistItems && activity.checklistItems.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Checklista</h3>
          <ChecklistDisplay items={activity.checklistItems} />
        </div>
      )}
    </div>
  )
}
