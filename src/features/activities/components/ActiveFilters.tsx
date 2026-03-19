import { ActivityFilters } from '@/types'
import { X } from 'lucide-react'

interface ActiveFiltersProps {
  filters: ActivityFilters
  onRemoveFilter: (key: keyof ActivityFilters, value?: string) => void
  onClearAll: () => void
}

/**
 * Active Filters
 *
 * Display active filters as removable chips.
 */
export function ActiveFilters({ filters, onRemoveFilter, onClearAll }: ActiveFiltersProps) {
  const statusLabels: Record<string, string> = {
    pending: 'Väntande',
    in_progress: 'Pågående',
    completed: 'Avslutad',
    blocked: 'Blockerad',
    cancelled: 'Avbruten',
  }

  const typeLabels: Record<string, string> = {
    salary: 'Lön',
    tax: 'Skatt',
    reporting: 'Rapportering',
    audit: 'Granskning',
    other: 'Övrigt',
  }

  const priorityLabels: Record<string, string> = {
    low: 'Låg prioritet',
    medium: 'Medel prioritet',
    high: 'Hög prioritet',
    urgent: 'Brådskande',
  }

  const hasFilters =
    (filters.status && filters.status.length > 0) ||
    (filters.type && filters.type.length > 0) ||
    (filters.priority && filters.priority.length > 0) ||
    (filters.assignedTo && filters.assignedTo.length > 0)

  if (!hasFilters) {
    return null
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Status filters */}
      {filters.status?.map(status => (
        <div
          key={status}
          className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
        >
          <span>{statusLabels[status]}</span>
          <button
            onClick={() => onRemoveFilter('status', status)}
            className="hover:text-blue-900"
            aria-label={`Ta bort filter: ${statusLabels[status]}`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}

      {/* Type filters */}
      {filters.type?.map(type => (
        <div
          key={type}
          className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
        >
          <span>{typeLabels[type]}</span>
          <button
            onClick={() => onRemoveFilter('type', type)}
            className="hover:text-green-900"
            aria-label={`Ta bort filter: ${typeLabels[type]}`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}

      {/* Priority filters */}
      {filters.priority?.map(priority => (
        <div
          key={priority}
          className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
        >
          <span>{priorityLabels[priority]}</span>
          <button
            onClick={() => onRemoveFilter('priority', priority)}
            className="hover:text-orange-900"
            aria-label={`Ta bort filter: ${priorityLabels[priority]}`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}

      {/* Assignee filters */}
      {filters.assignedTo?.map(assignee => (
        <div
          key={assignee}
          className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
        >
          <span>{assignee}</span>
          <button
            onClick={() => onRemoveFilter('assignedTo', assignee)}
            className="hover:text-purple-900"
            aria-label={`Ta bort filter: ${assignee}`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}

      {/* Clear all button */}
      <button
        onClick={onClearAll}
        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 underline"
      >
        Rensa alla filter
      </button>
    </div>
  )
}
