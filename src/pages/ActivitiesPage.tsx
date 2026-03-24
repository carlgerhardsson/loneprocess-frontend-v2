/**
 * Activities Page - READ-ONLY VERSION
 * This app ONLY displays activities from backend API
 * NO Create/Update/Delete functionality
 */

import { useState } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import {
  ActivityList,
  ActivityDetails,
  SearchBar,
  FilterPanel,
  ActiveFilters,
  EmptyState,
} from '@/features/activities/components'
import { useActivities } from '@/hooks/queries'
import type { Activity, ActivityFilters } from '@/types'

export function ActivitiesPage() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [filters, setFilters] = useState<ActivityFilters>({
    status: [],
    fas: [],
    roll: [],
    priority: [],
    search: '',
  })

  // Fetch activities from backend (auto-refreshes every 30s)
  const { data: activities = [], isLoading, error, dataUpdatedAt, isFetching } = useActivities()

  // Format last updated time
  const lastUpdated = new Date(dataUpdatedAt).toLocaleTimeString('sv-SE')

  // Apply filters
  const filteredActivities = activities.filter(activity => {
    // Search filter - with null checks for backend data
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch =
        (activity.process?.toLowerCase() || '').includes(searchLower) ||
        (activity.behov?.toLowerCase() || '').includes(searchLower) ||
        (activity.fas?.toLowerCase() || '').includes(searchLower) ||
        (activity.roll?.toLowerCase() || '').includes(searchLower)
      if (!matchesSearch) return false
    }

    // Status filter
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(activity.status)) return false
    }

    // Fas filter
    if (filters.fas && filters.fas.length > 0) {
      if (!filters.fas.includes(activity.fas)) return false
    }

    // Roll filter
    if (filters.roll && filters.roll.length > 0) {
      if (!filters.roll.includes(activity.roll)) return false
    }

    // Priority filter
    if (filters.priority && filters.priority.length > 0) {
      if (!filters.priority.includes(activity.priority)) return false
    }

    return true
  })

  const handleClearFilters = () => {
    setFilters({
      status: [],
      fas: [],
      roll: [],
      priority: [],
      search: '',
    })
  }

  const handleRemoveFilter = (key: keyof ActivityFilters, value?: string | number) => {
    setFilters(prev => {
      if (key === 'search') {
        return { ...prev, search: '' }
      }

      const currentValues = prev[key] as (string | number)[] | undefined
      if (!currentValues) return prev

      return {
        ...prev,
        [key]: currentValues.filter(v => v !== value),
      }
    })
  }

  const hasActiveFilters =
    (filters.status?.length ?? 0) > 0 ||
    (filters.fas?.length ?? 0) > 0 ||
    (filters.roll?.length ?? 0) > 0 ||
    (filters.priority?.length ?? 0) > 0 ||
    (filters.search?.length ?? 0) > 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* READ-ONLY INFO BANNER */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-800">
              <AlertCircle className="w-5 h-5" />
              <div>
                <span className="font-semibold">Read-only vy:</span>
                <span className="ml-2">
                  Denna applikation visar endast aktiviteter från backend. Aktiviteter skapas
                  manuellt någon annanstans.
                </span>
              </div>
            </div>
            {/* Auto-refresh indicator */}
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
              <span>Uppdateras var 30s • Senast: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Löneprocess Aktiviteter</h1>
            <p className="mt-1 text-sm text-gray-500">
              {filteredActivities.length} av {activities.length} aktiviteter
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <SearchBar
              value={filters.search || ''}
              onChange={search => setFilters(prev => ({ ...prev, search }))}
              placeholder="Sök efter process, behov, fas eller roll..."
            />
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mt-4">
              <ActiveFilters
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearFilters}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Activities List */}
          <main className="lg:col-span-2">
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-2 text-gray-500">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Laddar aktiviteter från backend...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">Kunde inte hämta aktiviteter</p>
                    <p className="text-sm mt-1">
                      Kontrollera att backend API är igång och CORS är aktiverat.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!isLoading && !error && filteredActivities.length === 0 && (
              <EmptyState>
                {hasActiveFilters ? (
                  <>
                    <p className="text-gray-600 mb-4">Inga aktiviteter matchar dina filter</p>
                    <button
                      onClick={handleClearFilters}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Rensa filter
                    </button>
                  </>
                ) : (
                  <p className="text-gray-600">
                    Inga aktiviteter än. Aktiviteter kommer att visas här när de finns i backend.
                  </p>
                )}
              </EmptyState>
            )}

            {!isLoading && !error && filteredActivities.length > 0 && (
              <ActivityList
                activities={filteredActivities}
                selectedActivityId={selectedActivity?.id}
                onClick={setSelectedActivity}
              />
            )}
          </main>

          {/* Activity Details Sidebar */}
          <aside className="lg:col-span-1">
            {selectedActivity ? (
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                <ActivityDetails activity={selectedActivity} />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                <p className="text-sm text-gray-500 text-center">
                  Välj en aktivitet för att se detaljer
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
