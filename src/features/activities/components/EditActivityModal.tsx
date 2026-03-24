/**
 * Edit Activity Modal
 * UPDATED: Now uses backend API schema
 */

import { Modal } from '@/components/ui'
import { ActivityForm } from './ActivityForm'
import { useUpdateActivity } from '@/hooks/mutations'
import type { Activity } from '@/types'
import type { ActivityFormData } from '../schemas/activitySchema'
import type { UpdateActivityData } from '@/types'

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
      console.error('[EditActivityModal] Failed to update activity:', error)
    },
  })

  const handleSubmit = (formData: ActivityFormData) => {
    // Form data already matches backend UpdateActivityData format
    const apiData: UpdateActivityData = {
      process_nr: formData.process_nr,
      process: formData.process,
      out_input: formData.out_input,
      ska_inga_i_loneperiod: formData.ska_inga_i_loneperiod,
      fas: formData.fas,
      roll: formData.roll,
      behov: formData.behov,
      effekten_vardet: formData.effekten_vardet,
      extra_info: formData.extra_info,
      acceptans: formData.acceptans,
      feature_losning: formData.feature_losning,
      priority: formData.priority,
      status: formData.status,
    }
    
    console.log('[EditActivityModal] Submitting:', apiData)
    
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
