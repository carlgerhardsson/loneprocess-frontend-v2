/**
 * Create Activity Modal
 * Modal for creating new activities
 */

import { Modal } from '@/components/ui'
import { ActivityForm } from './ActivityForm'
import { useCreateActivity } from '@/hooks/queries/useActivities'
import type { CreateActivityData } from '@/types'

interface CreateActivityModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function CreateActivityModal({ isOpen, onClose, onSuccess }: CreateActivityModalProps) {
  const createMutation = useCreateActivity()

  const handleSubmit = async (data: CreateActivityData) => {
    try {
      await createMutation.mutateAsync(data)
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
