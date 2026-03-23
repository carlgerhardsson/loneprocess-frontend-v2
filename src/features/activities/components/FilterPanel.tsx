/**
 * Filter Panel Component
 * Provides filtering options for activities
 */

import { X } from 'lucide-react'
import type { ActivityFilters, ActivityStatus, ActivityType, ActivityPriority } from '@/types'

interface FilterPanelProps {
  filters: ActivityFilters
  onFilterChange: (filters: ActivityFilters) => void
  onClearFilters: () => void
}

export function FilterPanel({ filters, onFilterChange, onClearFilters }: FilterPanelProps) {
  const statusOptions: { value: ActivityStatus; label: string }[] = [
    { value: 'pending', label: 'Väntande' },
    { value: 'in_progress', label: 'Pågående' },
    { value: 'completed', label: 'Klar' },
    { value: 'blocked', label: 'Blockerad' },
    { value: 'cancelled', label: 'Avbruten' },
  ]

  const typeOptions: { value: ActivityType; label: string }[] = [
    { value: 'salary', label: 'Lönehantering' },
    { value: 'tax', label: 'Skatt' },
    { value: 'reporting', label: 'Rapportering' },
    { value: 'review', label: 'Granskning' },
    { value: 'recurring', label: 'Återkommande' },
    { value: 'other', label: 'Övrigt' },
  ]

  const priorityOptions: { value: ActivityPriority; label: string }[] = [
    { value: 'low', label: 'Låg' },
    { value: 'medium', label: 'Medel' },
    { value: 'high', label: 'Hög' },
    { value: 'urgent', label: 'Brådskande' },
  ]

  const toggleFilter = <T,>(filterKey: keyof ActivityFilters, value: T) => {
    const currentValues = (filters[filterKey] as T[]) || []
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]

    onFilterChange({
      ...filters,
      [filterKey]: newValues.length > 0 ? newValues : undefined,
    })
  }

  const hasActiveFilters =
    (filters.status && filters.status.length > 0) ||
    (filters.type && filters.type.length > 0) ||
    (filters.priority && filters.priority.length > 0)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Filter</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Rensa
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Status Filter */}
        <div>
          <label className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-2 block">
            Status
          </label>
          <div className="space-y-2">
            {statusOptions.map(option => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.status?.includes(option.value) || false}
                  onChange={() => toggleFilter('status', option.value)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <label className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-2 block">
            Typ
          </label>
          <div className="space-y-2">
            {typeOptions.map(option => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.type?.includes(option.value) || false}
                  onChange={() => toggleFilter('type', option.value)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-2 block">
            Prioritet
          </label>
          <div className="space-y-2">
            {priorityOptions.map(option => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.priority?.includes(option.value) || false}
                  onChange={() => toggleFilter('priority', option.value)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
