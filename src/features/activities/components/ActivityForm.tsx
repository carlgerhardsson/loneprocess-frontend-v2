import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { activitySchema, type ActivityFormData } from '../schemas/activitySchema'
import type { Activity } from '@/types'
import { FAS_OPTIONS, ROLL_OPTIONS, PRIORITY_LEVELS } from '@/types'
import { Save, X } from 'lucide-react'

interface ActivityFormProps {
  initialData?: Activity
  onSubmit: (data: ActivityFormData) => void | Promise<void>
  onCancel?: () => void
  isLoading?: boolean
}

/**
 * Activity Form - Löneprocess
 * 
 * UPDATED: Now matches actual backend API schema
 * Backend uses Swedish löneprocess-specific fields
 */
export function ActivityForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: ActivityFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: initialData
      ? {
          process_nr: initialData.processNr || '',
          process: initialData.process,
          fas: initialData.fas,
          roll: initialData.roll,
          behov: initialData.behov,
          effekten_vardet: initialData.effektenVardet || '',
          extra_info: initialData.extraInfo || '',
          acceptans: initialData.acceptans || '',
          feature_losning: initialData.featureLosning || '',
          out_input: initialData.outInput || '',
          ska_inga_i_loneperiod: initialData.skaIngaILoneperiod || false,
          status: initialData.status,
          priority: initialData.priority,
        }
      : {
          process_nr: '',
          fas: FAS_OPTIONS[0],
          roll: ROLL_OPTIONS[0],
          status: 'pending',
          priority: PRIORITY_LEVELS.MEDIUM,
          ska_inga_i_loneperiod: false,
        },
  })

  const statusOptions = [
    { value: 'active', label: 'Aktiv' },
    { value: 'draft', label: 'Utkast' },
    { value: 'pending', label: 'Väntande' },
    { value: 'in_progress', label: 'Pågående' },
    { value: 'completed', label: 'Klar' },
    { value: 'blocked', label: 'Blockerad' },
  ] as const

  const priorityOptions = [
    { value: PRIORITY_LEVELS.NONE, label: 'Ingen' },
    { value: PRIORITY_LEVELS.LOW, label: 'Låg' },
    { value: PRIORITY_LEVELS.MEDIUM, label: 'Medel' },
    { value: PRIORITY_LEVELS.HIGH, label: 'Hög' },
    { value: PRIORITY_LEVELS.URGENT, label: 'Brådskande' },
  ] as const

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Process Number & Process Name */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="process_nr" className="block text-sm font-medium text-gray-700 mb-1">
            Processnr
          </label>
          <input
            {...register('process_nr')}
            id="process_nr"
            type="text"
            placeholder="t.ex. P001"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isLoading}
          />
          {errors.process_nr && (
            <p className="mt-1 text-sm text-red-600">{errors.process_nr.message}</p>
          )}
        </div>

        <div className="md:col-span-3">
          <label htmlFor="process" className="block text-sm font-medium text-gray-700 mb-1">
            Process *
          </label>
          <input
            {...register('process')}
            id="process"
            type="text"
            placeholder="t.ex. Löneberäkning månadslön"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isLoading}
          />
          {errors.process && <p className="mt-1 text-sm text-red-600">{errors.process.message}</p>}
        </div>
      </div>

      {/* Fas & Roll */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fas" className="block text-sm font-medium text-gray-700 mb-1">
            Fas *
          </label>
          <select
            {...register('fas')}
            id="fas"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isLoading}
          >
            {FAS_OPTIONS.map(fas => (
              <option key={fas} value={fas}>
                {fas}
              </option>
            ))}
          </select>
          {errors.fas && <p className="mt-1 text-sm text-red-600">{errors.fas.message}</p>}
        </div>

        <div>
          <label htmlFor="roll" className="block text-sm font-medium text-gray-700 mb-1">
            Roll *
          </label>
          <select
            {...register('roll')}
            id="roll"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isLoading}
          >
            {ROLL_OPTIONS.map(roll => (
              <option key={roll} value={roll}>
                {roll}
              </option>
            ))}
          </select>
          {errors.roll && <p className="mt-1 text-sm text-red-600">{errors.roll.message}</p>}
        </div>
      </div>

      {/* Behov (Main description) */}
      <div>
        <label htmlFor="behov" className="block text-sm font-medium text-gray-700 mb-1">
          Behov *
        </label>
        <textarea
          {...register('behov')}
          id="behov"
          rows={4}
          placeholder="Beskriv behovet för denna aktivitet..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          disabled={isLoading}
        />
        {errors.behov && <p className="mt-1 text-sm text-red-600">{errors.behov.message}</p>}
      </div>

      {/* Status, Priority & Löneperiod */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            {...register('status')}
            id="status"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isLoading}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Prioritet
          </label>
          <select
            {...register('priority', { valueAsNumber: true })}
            id="priority"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isLoading}
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

        <div className="flex items-center pt-7">
          <input
            {...register('ska_inga_i_loneperiod')}
            id="ska_inga_i_loneperiod"
            type="checkbox"
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            disabled={isLoading}
          />
          <label htmlFor="ska_inga_i_loneperiod" className="ml-2 text-sm text-gray-700">
            Ska ingå i löneperiod
          </label>
        </div>
      </div>

      {/* Optional fields - Collapsible section */}
      <details className="border border-gray-200 rounded-lg p-4">
        <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
          Ytterligare information (valfritt)
        </summary>
        
        <div className="mt-4 space-y-4">
          {/* Output/Input */}
          <div>
            <label htmlFor="out_input" className="block text-sm font-medium text-gray-700 mb-1">
              Output/Input
            </label>
            <input
              {...register('out_input')}
              id="out_input"
              type="text"
              placeholder="t.ex. Löneunderlag, Skattedeklaration"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={isLoading}
            />
          </div>

          {/* Effekten/Värdet */}
          <div>
            <label htmlFor="effekten_vardet" className="block text-sm font-medium text-gray-700 mb-1">
              Effekten/Värdet
            </label>
            <textarea
              {...register('effekten_vardet')}
              id="effekten_vardet"
              rows={2}
              placeholder="Beskriv värdet eller effekten..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              disabled={isLoading}
            />
          </div>

          {/* Acceptans */}
          <div>
            <label htmlFor="acceptans" className="block text-sm font-medium text-gray-700 mb-1">
              Acceptans
            </label>
            <textarea
              {...register('acceptans')}
              id="acceptans"
              rows={2}
              placeholder="Acceptanskriterier..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              disabled={isLoading}
            />
          </div>

          {/* Feature/Lösning */}
          <div>
            <label htmlFor="feature_losning" className="block text-sm font-medium text-gray-700 mb-1">
              Feature/Lösning
            </label>
            <textarea
              {...register('feature_losning')}
              id="feature_losning"
              rows={2}
              placeholder="Beskriv feature eller lösning..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              disabled={isLoading}
            />
          </div>

          {/* Extra Info */}
          <div>
            <label htmlFor="extra_info" className="block text-sm font-medium text-gray-700 mb-1">
              Extra information
            </label>
            <textarea
              {...register('extra_info')}
              id="extra_info"
              rows={3}
              placeholder="Övrig information..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              disabled={isLoading}
            />
          </div>
        </div>
      </details>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4" />
            Avbryt
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          {isLoading ? 'Sparar...' : initialData ? 'Uppdatera' : 'Skapa'}
        </button>
      </div>
    </form>
  )
}
