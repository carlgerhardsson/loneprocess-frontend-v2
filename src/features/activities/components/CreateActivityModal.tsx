/**
 * Create Activity Modal
 * Modal for creating new activities
 */

import { Modal } from '@/components/ui'
import { ActivityForm } from './ActivityForm'
import { useCreateActivity } from '@/hooks/queries/useActivities'
import type { ActivityFormData } from '../schemas/activitySchema'

interface CreateActivityModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function CreateActivityModal({ isOpen, onClose, onSuccess }: CreateActivityModalProps) {
  const createMutation = useCreateActivity()

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
      await createMutation.mutateAsync(apiData)
      onSuccess?.()
      onClose()
    } catch (error) {
      console.error('Failed to create activity:', error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Skapa ny aktivitet" size="lg">
      <ActivityForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        isLoading={createMutation.isPending}
      />
    </Modal>
  )
}
