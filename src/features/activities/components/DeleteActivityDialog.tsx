/**
 * Delete Activity Dialog
 * Confirmation dialog for deleting activities with optimistic updates
 */

import { Modal } from '@/components/ui'
import { AlertTriangle } from 'lucide-react'
import { useDeleteActivity } from '@/hooks/mutations'
import type { Activity } from '@/types'

interface DeleteActivityDialogProps {
  isOpen: boolean
  onClose: () => void
  activity: Activity
  onSuccess?: () => void
}

export function DeleteActivityDialog({
  isOpen,
  onClose,
  activity,
  onSuccess,
}: DeleteActivityDialogProps) {
  const deleteMutation = useDeleteActivity({
    onSuccess: () => {
      onSuccess?.()
      onClose()
    },
    onError: (error) => {
      console.error('Failed to delete activity:', error)
    },
  })

  const handleDelete = () => {
    // Optimistic update happens automatically in mutation hook
    deleteMutation.mutate(Number(activity.id))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ta bort aktivitet" size="sm">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              Är du säker på att du vill ta bort aktiviteten{' '}
              <span className="font-semibold">{activity.title}</span>?
            </p>
            <p className="text-sm text-gray-500 mt-2">Denna åtgärd kan inte ångras.</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Avbryt
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleteMutation.isPending ? 'Tar bort...' : 'Ta bort'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
