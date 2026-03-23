/**
 * Activities Page
 *
 * Main page for viewing and managing activities.
 * Fetches activities from the backend API and displays them.
 */

import { useActivities } from '@/hooks/queries/useActivities'
import { ActivityList } from '@/features/activities/components/ActivityList'
import { SearchBar } from '@/features/activities/components/SearchBar'
import { Spinner } from '@/components/loading/Spinner'
import { useState } from 'react'

export function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: activities, isLoading, error } = useActivities()

  // Filter activities based on search query
  const filteredActivities = activities?.filter(activity =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Aktiviteter</h1>
        <p className="mt-2 text-gray-600">Hantera och följ upp löneprocessens aktiviteter</p>
      </div>

      {/* Search */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Sök aktiviteter..."
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">
            <strong>Fel:</strong> Kunde inte hämta aktiviteter. Kontrollera att backend är igång.
          </p>
          <p className="text-sm text-red-600 mt-2">
            {error instanceof Error ? error.message : 'Okänt fel'}
          </p>
        </div>
      )}

      {/* Activities List */}
      {!isLoading && !error && (
        <div className="bg-white rounded-lg shadow-md">
          {filteredActivities.length > 0 ? (
            <ActivityList activities={filteredActivities} />
          ) : (
            <div className="p-8 text-center text-gray-600">
              {searchQuery ? (
                <>
                  <p className="text-lg">Inga aktiviteter hittades</p>
                  <p className="mt-2 text-sm">Prova en annan sökning</p>
                </>
              ) : (
                <>
                  <p className="text-lg">Inga aktiviteter än</p>
                  <p className="mt-2 text-sm">Aktiviteter från backend kommer visas här</p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      {!isLoading && !error && activities && activities.length > 0 && (
        <div className="text-sm text-gray-600">
          Visar {filteredActivities.length} av {activities.length} aktiviteter
        </div>
      )}
    </div>
  )
}
