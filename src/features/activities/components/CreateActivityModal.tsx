/**
 * Create Activity Modal
 * UPDATED: Now uses backend API schema
 */

import { Modal } from '@/components/ui'
import { ActivityForm } from './ActivityForm'
import { useCreateActivity } from '@/hooks/mutations'
import type { ActivityFormData } from '../schemas/activitySchema'
import type { CreateActivityData } from '@/types'

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
      console.error('[CreateActivityModal] Failed to create activity:', error)
    },
  })

  const handleSubmit = (formData: ActivityFormData) => {
    // Form data already matches backend CreateActivityData format
    const apiData: CreateActivityData = {
      process_nr: formData.process_nr || '',
      process: formData.process,
      out_input: formData.out_input || '',
      ska_inga_i_loneperiod: formData.ska_inga_i_loneperiod || false,
      fas: formData.fas,
      roll: formData.roll,
      behov: formData.behov,
      effekten_vardet: formData.effekten_vardet || '',
      extra_info: formData.extra_info || '',
      acceptans: formData.acceptans || '',
      feature_losning: formData.feature_losning || '',
      priority: formData.priority || 2,
      status: formData.status,
    }
    
    console.log('[CreateActivityModal] Submitting:', apiData)
    
    // No transformation needed - types match exactly!
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
