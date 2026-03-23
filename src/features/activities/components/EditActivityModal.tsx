/**
 * Edit Activity Modal
 * Modal for editing existing activities
 */

import { Modal } from '@/components/ui'
import { ActivityForm } from './ActivityForm'
import { useUpdateActivity } from '@/hooks/queries/useActivities'
import type { Activity, UpdateActivityData } from '@/types'

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

  const handleSubmit = async (data: UpdateActivityData) => {
    try {
      await updateMutation.mutateAsync({ id: Number(activity.id), data })
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
