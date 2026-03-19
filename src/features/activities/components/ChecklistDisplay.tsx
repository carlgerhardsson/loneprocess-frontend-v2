import { ChecklistItem } from '@/types'
import { Check, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChecklistDisplayProps {
  items: ChecklistItem[]
  onToggle?: (itemId: string) => void
  readonly?: boolean
}

/**
 * Checklist Display
 *
 * Shows checklist items with completion status.
 * Optional toggle functionality for interactive mode.
 */
export function ChecklistDisplay({ items, onToggle, readonly = true }: ChecklistDisplayProps) {
  const completedCount = items.filter(item => item.isCompleted).length
  const totalCount = items.length
  const progressPercentage = Math.round((completedCount / totalCount) * 100)

  const handleToggle = (itemId: string) => {
    if (!readonly && onToggle) {
      onToggle(itemId)
    }
  }

  return (
    <div>
      {/* Progress Summary */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {completedCount} av {totalCount} slutförda
          </span>
          <span className="text-sm font-medium text-gray-700">{progressPercentage}%</span>
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

      {/* Checklist Items */}
      <div className="space-y-2">
        {items.map(item => (
          <div
            key={item.id}
            className={cn(
              'flex items-start gap-3 p-3 rounded-lg border transition-colors',
              item.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200',
              !readonly && 'cursor-pointer hover:bg-gray-50'
            )}
            onClick={() => handleToggle(item.id)}
            role={readonly ? undefined : 'button'}
            tabIndex={readonly ? undefined : 0}
          >
            {/* Checkbox */}
            <div className="flex-shrink-0 mt-0.5">
              {item.isCompleted ? (
                <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              ) : (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  'text-sm',
                  item.isCompleted ? 'text-gray-600 line-through' : 'text-gray-900'
                )}
              >
                {item.text}
              </p>
              {item.isCompleted && item.completedAt && (
                <p className="text-xs text-gray-500 mt-1">
                  Slutförd {new Date(item.completedAt).toLocaleDateString('sv-SE')}
                  {item.completedBy && ` av ${item.completedBy}`}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
