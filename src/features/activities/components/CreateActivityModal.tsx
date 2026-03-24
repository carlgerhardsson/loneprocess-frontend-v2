/**
 * Create Activity Modal
 * Modal for creating new activities with optimistic updates
 */

import { Modal } from '@/components/ui'
import { ActivityForm } from './ActivityForm'
import { useCreateActivity } from '@/hooks/mutations'
import type { ActivityFormData } from '../schemas/activitySchema'

interface CreateActivityModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function CreateActivityModal({ isOpen, onClose, onSuccess }: CreateActivityModalProps) {
  const createMutation = useCreateActivity({
    onSuccess: () => {
      onSuccess?.()
      onClose()
    },
    onError: (error) => {
      console.error('Failed to create activity:', error)
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
    createMutation.mutate(apiData)
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
