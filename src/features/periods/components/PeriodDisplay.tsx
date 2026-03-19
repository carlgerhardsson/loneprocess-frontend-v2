import { Period } from '@/types'
import { Calendar, CheckCircle2, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PeriodDisplayProps {
  period: Period
  showProgress?: boolean
  className?: string
}

/**
 * Period Display
 *
 * Shows period information with metadata and progress.
 */
export function PeriodDisplay({ period, showProgress = true, className }: PeriodDisplayProps) {
  const progressPercentage =
    period.activityCount > 0
      ? Math.round((period.completedActivityCount / period.activityCount) * 100)
      : 0

  const statusConfig: Record<Period['status'], { label: string; className: string }> = {
    active: {
      label: 'Aktiv',
      className: 'bg-green-100 text-green-700',
    },
    completed: {
      label: 'Avslutad',
      className: 'bg-blue-100 text-blue-700',
    },
    archived: {
      label: 'Arkiverad',
      className: 'bg-gray-100 text-gray-700',
    },
  }

  const typeConfig: Record<Period['type'], string> = {
    monthly: 'Månatlig',
    quarterly: 'Kvartalsvis',
    yearly: 'Årlig',
    custom: 'Anpassad',
  }

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 p-4', className)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{period.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500">{typeConfig[period.type]}</span>
            <span
              className={cn(
                'text-xs px-2 py-0.5 rounded-full font-medium',
                statusConfig[period.status].className
              )}
            >
              {statusConfig[period.status].label}
            </span>
          </div>
        </div>
      </div>

      {/* Date Range */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <Calendar className="w-4 h-4" />
        <span>
          {new Date(period.startDate).toLocaleDateString('sv-SE')} -{' '}
          {new Date(period.endDate).toLocaleDateString('sv-SE')}
        </span>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-gray-500" />
          <div>
            <div className="text-sm font-medium text-gray-900">{period.activityCount}</div>
            <div className="text-xs text-gray-500">Aktiviteter</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <div>
            <div className="text-sm font-medium text-gray-900">{period.completedActivityCount}</div>
            <div className="text-xs text-gray-500">Avslutade</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && period.activityCount > 0 && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-700">Framsteg</span>
            <span className="text-xs font-medium text-gray-700">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}
    </div>
  )
}
