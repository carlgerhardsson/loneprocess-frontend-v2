import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { activitySchema, type ActivityFormData } from '../schemas/activitySchema'
import type { Activity, ActivityType, ActivityStatus, ActivityPriority } from '@/types'
import { Save, X } from 'lucide-react'

interface ActivityFormProps {
  activity?: Activity
  onSubmit: (data: ActivityFormData) => void | Promise<void>
  onCancel?: () => void
  isSubmitting?: boolean
}

/**
 * Activity Form
 *
 * Form for creating or editing activities with validation.
 */
export function ActivityForm({
  activity,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ActivityFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: activity
      ? {
          title: activity.title,
          description: activity.description,
          type: activity.type,
          status: activity.status,
          priority: activity.priority,
          assignedTo: activity.assignedTo || '',
          dueDate: activity.dueDate || '',
          tags: activity.tags,
        }
      : {
          type: 'salary',
          status: 'pending',
          priority: 'medium',
        },
  })

  const typeOptions: { value: ActivityType; label: string }[] = [
    { value: 'salary', label: 'Lön' },
    { value: 'tax', label: 'Skatt' },
    { value: 'reporting', label: 'Rapportering' },
    { value: 'audit', label: 'Granskning' },
    { value: 'other', label: 'Övrigt' },
  ]

  const statusOptions: { value: ActivityStatus; label: string }[] = [
    { value: 'pending', label: 'Väntande' },
    { value: 'in_progress', label: 'Pågående' },
    { value: 'completed', label: 'Avslutad' },
    { value: 'blocked', label: 'Blockerad' },
    { value: 'cancelled', label: 'Avbruten' },
  ]

  const priorityOptions: { value: ActivityPriority; label: string }[] = [
    { value: 'low', label: 'Låg' },
    { value: 'medium', label: 'Medel' },
    { value: 'high', label: 'Hög' },
    { value: 'urgent', label: 'Brådskande' },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Titel *
        </label>
        <input
          {...register('title')}
          id="title"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          disabled={isSubmitting}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Beskrivning *
        </label>
        <textarea
          {...register('description')}
          id="description"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Type, Status, Priority */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Typ *
          </label>
          <select
            {...register('type')}
            id="type"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isSubmitting}
          >
            {typeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            {...register('status')}
            id="status"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isSubmitting}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Prioritet *
          </label>
          <select
            {...register('priority')}
            id="priority"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isSubmitting}
          >
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
          )}
        </div>
      </div>

      {/* Assigned To & Due Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Assigned To */}
        <div>
          <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">
            Tilldelad till
          </label>
          <input
            {...register('assignedTo')}
            id="assignedTo"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isSubmitting}
          />
          {errors.assignedTo && (
            <p className="mt-1 text-sm text-red-600">{errors.assignedTo.message}</p>
          )}
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Förfallodatum
          </label>
          <input
            {...register('dueDate')}
            id="dueDate"
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isSubmitting}
          />
          {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4" />
            Avbryt
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? 'Sparar...' : activity ? 'Uppdatera' : 'Skapa'}
        </button>
      </div>
    </form>
  )
}
