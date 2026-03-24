/**
 * Active Filters Component - READ-ONLY VERSION
 * Display active filters as removable chips
 */

import { ActivityFilters } from '@/types'
import { X } from 'lucide-react'

interface ActiveFiltersProps {
  filters: ActivityFilters
  onRemoveFilter: (key: keyof ActivityFilters, value?: string | number) => void
  onClearAll: () => void
}

export function ActiveFilters({ filters, onRemoveFilter, onClearAll }: ActiveFiltersProps) {
  const statusLabels: Record<string, string> = {
    active: 'Aktiv',
    draft: 'Utkast',
    pending: 'Väntande',
    in_progress: 'Pågående',
    completed: 'Avslutad',
    blocked: 'Blockerad',
  }

  const priorityLabels: Record<number, string> = {
    0: 'Ingen prioritet',
    1: 'Låg prioritet',
    2: 'Medel prioritet',
    3: 'Hög prioritet',
    4: 'Brådskande',
  }

  const hasFilters =
    (filters.status && filters.status.length > 0) ||
    (filters.priority && filters.priority.length > 0)

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
