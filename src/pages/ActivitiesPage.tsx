/**
 * Activities Page
 *
 * Main page for viewing and managing activities.
 * Now with full CRUD operations connected to backend API.
 */

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useActivities } from '@/hooks/queries/useActivities'
import { useToast } from '@/hooks/useToast'
import { Toast } from '@/components/ui'
import { ActivityList } from '@/features/activities/components/ActivityList'
import { CreateActivityModal } from '@/features/activities/components/CreateActivityModal'
import { EditActivityModal } from '@/features/activities/components/EditActivityModal'
import { DeleteActivityDialog } from '@/features/activities/components/DeleteActivityDialog'
import { Spinner } from '@/components/loading/Spinner'
import type { Activity } from '@/types'

export function ActivitiesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const [deletingActivity, setDeletingActivity] = useState<Activity | null>(null)

  const { data: activities, isLoading, isError, error, refetch } = useActivities()
  const { toast, showToast, hideToast } = useToast()

  const handleCreateSuccess = () => {
    showToast('Aktivitet skapad!', 'success')
    refetch()
  }

  const handleEditSuccess = () => {
    showToast('Aktivitet uppdaterad!', 'success')
    setEditingActivity(null)
    refetch()
  }

  const handleDeleteSuccess = () => {
    showToast('Aktivitet borttagen!', 'success')
    setDeletingActivity(null)
    refetch()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Något gick fel</h3>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          {error instanceof Error ? error.message : 'Kunde inte hämta aktiviteter.'}
        </p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Försök igen
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Aktiviteter</h1>
            <p className="mt-2 text-gray-600">
              Hantera och följ upp löneprocessens aktiviteter
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Skapa aktivitet
          </button>
        </div>

        {activities && activities.length > 0 ? (
          <ActivityList
            activities={activities}
            onEdit={activity => setEditingActivity(activity)}
            onDelete={activity => setDeletingActivity(activity)}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">Inga aktiviteter ännu</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Skapa första aktiviteten
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateActivityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      {editingActivity && (
        <EditActivityModal
          isOpen={true}
          onClose={() => setEditingActivity(null)}
          activity={editingActivity}
          onSuccess={handleEditSuccess}
        />
      )}

      {deletingActivity && (
        <DeleteActivityDialog
          isOpen={true}
          onClose={() => setDeletingActivity(null)}
          activity={deletingActivity}
          onSuccess={handleDeleteSuccess}
        />
      )}

      {/* Toast */}
      {toast.isVisible && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </>
  )
}
