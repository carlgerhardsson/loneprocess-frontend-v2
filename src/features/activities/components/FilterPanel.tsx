import { ActivityFilters, ActivityStatus, ActivityType, ActivityPriority } from '@/types'
import { Filter } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface FilterPanelProps {
  filters: ActivityFilters
  onFiltersChange: (filters: ActivityFilters) => void
  availableAssignees?: string[]
}

/**
 * Filter Panel
 *
 * Advanced filtering for activities with multiple criteria.
 */
export function FilterPanel({
  filters,
  onFiltersChange,
  availableAssignees = [],
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  const statusOptions: { value: ActivityStatus; label: string }[] = [
    { value: 'pending', label: 'Väntande' },
    { value: 'in_progress', label: 'Pågående' },
    { value: 'completed', label: 'Avslutad' },
    { value: 'blocked', label: 'Blockerad' },
    { value: 'cancelled', label: 'Avbruten' },
  ]

  const typeOptions: { value: ActivityType; label: string }[] = [
    { value: 'salary', label: 'Lön' },
    { value: 'tax', label: 'Skatt' },
    { value: 'reporting', label: 'Rapportering' },
    { value: 'audit', label: 'Granskning' },
    { value: 'other', label: 'Övrigt' },
  ]

  const priorityOptions: { value: ActivityPriority; label: string }[] = [
    { value: 'low', label: 'Låg' },
    { value: 'medium', label: 'Medel' },
    { value: 'high', label: 'Hög' },
    { value: 'urgent', label: 'Brådskande' },
  ]

  const handleStatusToggle = (status: ActivityStatus) => {
    const current = filters.status || []
    const updated = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status]
    onFiltersChange({ ...filters, status: updated.length > 0 ? updated : undefined })
  }

  const handleTypeToggle = (type: ActivityType) => {
    const current = filters.type || []
    const updated = current.includes(type) ? current.filter(t => t !== type) : [...current, type]
    onFiltersChange({ ...filters, type: updated.length > 0 ? updated : undefined })
  }

  const handlePriorityToggle = (priority: ActivityPriority) => {
    const current = filters.priority || []
    const updated = current.includes(priority)
      ? current.filter(p => p !== priority)
      : [...current, priority]
    onFiltersChange({ ...filters, priority: updated.length > 0 ? updated : undefined })
  }

  const handleAssigneeToggle = (assignee: string) => {
    const current = filters.assignedTo || []
    const updated = current.includes(assignee)
      ? current.filter(a => a !== assignee)
      : [...current, assignee]
    onFiltersChange({ ...filters, assignedTo: updated.length > 0 ? updated : undefined })
  }

  const handleClearAll = () => {
    onFiltersChange({
      search: filters.search, // Keep search
    })
  }

  const activeFilterCount =
    (filters.status?.length || 0) +
    (filters.type?.length || 0) +
    (filters.priority?.length || 0) +
    (filters.assignedTo?.length || 0)

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors',
          isOpen
            ? 'bg-primary-50 border-primary-500 text-primary-700'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        )}
      >
        <Filter className="w-4 h-4" />
        <span className="font-medium">Filter</span>
        {activeFilterCount > 0 && (
          <span className="ml-1 px-2 py-0.5 bg-primary-600 text-white text-xs rounded-full">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filtrera aktiviteter</h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Rensa alla
                </button>
              )}
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="space-y-2">
                {statusOptions.map(option => (
                  <label key={option.value} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.status?.includes(option.value) || false}
                      onChange={() => handleStatusToggle(option.value)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Typ</label>
              <div className="space-y-2">
                {typeOptions.map(option => (
                  <label key={option.value} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.type?.includes(option.value) || false}
                      onChange={() => handleTypeToggle(option.value)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Priority */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Prioritet</label>
              <div className="space-y-2">
                {priorityOptions.map(option => (
                  <label key={option.value} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.priority?.includes(option.value) || false}
                      onChange={() => handlePriorityToggle(option.value)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Assignee */}
            {availableAssignees.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tilldelad till
                </label>
                <div className="space-y-2">
                  {availableAssignees.map(assignee => (
                    <label key={assignee} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.assignedTo?.includes(assignee) || false}
                        onChange={() => handleAssigneeToggle(assignee)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{assignee}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
