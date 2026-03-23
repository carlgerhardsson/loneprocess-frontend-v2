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
import { ErrorFallback } from '@/components/errors/ErrorFallback'
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
      <ErrorFallback
        error={error as Error}
        resetErrorBoundary={() => refetch()}
        message="Kunde inte hämta aktiviteter"
      />
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
