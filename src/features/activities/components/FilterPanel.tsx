/**
 * Filter Panel Component - READ-ONLY VERSION
 * Provides filtering options for activities
 */

import { X } from 'lucide-react'
import type { ActivityFilters, ActivityStatus } from '@/types'

interface FilterPanelProps {
  filters: ActivityFilters
  onFilterChange: (filters: ActivityFilters) => void
  onClearFilters: () => void
}

export function FilterPanel({ filters, onFilterChange, onClearFilters }: FilterPanelProps) {
  const statusOptions: { value: ActivityStatus; label: string }[] = [
    { value: 'active', label: 'Aktiv' },
    { value: 'draft', label: 'Utkast' },
    { value: 'pending', label: 'Väntande' },
    { value: 'in_progress', label: 'Pågående' },
    { value: 'completed', label: 'Klar' },
    { value: 'blocked', label: 'Blockerad' },
  ]

  const priorityOptions: { value: number; label: string }[] = [
    { value: 0, label: 'Ingen prioritet' },
    { value: 1, label: 'Låg' },
    { value: 2, label: 'Medel' },
    { value: 3, label: 'Hög' },
    { value: 4, label: 'Brådskande' },
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
