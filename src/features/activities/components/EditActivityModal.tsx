/**
 * Edit Activity Modal
 * Modal for editing existing activities with optimistic updates
 */

import { Modal } from '@/components/ui'
import { ActivityForm } from './ActivityForm'
import { useUpdateActivity } from '@/hooks/mutations'
import type { Activity } from '@/types'
import type { ActivityFormData } from '../schemas/activitySchema'

interface EditActivityModalProps {
  isOpen: boolean
  onClose: () => void
  activity: Activity
  onSuccess?: () => void
}

export function EditActivityModal({
  isOpen,
  onClose,
  activity,
  onSuccess,
}: EditActivityModalProps) {
  const updateMutation = useUpdateActivity({
    onSuccess: () => {
      onSuccess?.()
      onClose()
    },
    onError: (error) => {
      console.error('Failed to update activity:', error)
    },
  })

  const handleSubmit = async (data: ActivityFormData) => {
    // Convert form data to API format
    const apiData = {
      title: data.title,
      description: data.description,
      type: data.type,
      status: data.status,
      priority: data.priority,
      assignedTo: data.assignedTo || undefined,
      dueDate: data.dueDate || undefined,
      tags: data.tags || [],
    }
    
    // Optimistic update happens automatically in mutation hook
    updateMutation.mutate({ id: Number(activity.id), data: apiData })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Redigera aktivitet" size="lg">
      <ActivityForm
        initialData={activity}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isLoading={updateMutation.isPending}
      />
    </Modal>
  )
}
