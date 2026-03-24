/**
 * Edit Activity Modal
 * Modal for editing existing activities
 */

import { Modal } from '@/components/ui'
import { ActivityForm } from './ActivityForm'
import { useUpdateActivity } from '@/hooks/queries/useActivities'
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
  const updateMutation = useUpdateActivity()

  const handleSubmit = async (data: ActivityFormData) => {
    try {
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
      await updateMutation.mutateAsync({ id: Number(activity.id), data: apiData })
      onSuccess?.()
      onClose()
    } catch (error) {
      console.error('Failed to update activity:', error)
    }
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
