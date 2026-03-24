import { Activity } from '@/types'
import { cn } from '@/lib/utils'
import { AlertCircle, ArrowUp, ArrowDown, Minus } from 'lucide-react'

interface PriorityIndicatorProps {
  priority: Activity['priority']
  showLabel?: boolean
  size?: 'sm' | 'md'
}

/**
 * Priority Indicator
 * UPDATED: Now uses number (0-4) instead of string
 */
export function PriorityIndicator({
  priority,
  showLabel = false,
  size = 'md',
}: PriorityIndicatorProps) {
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'

  const priorityConfig: Record<number, { label: string; icon: typeof Minus; className: string }> =
    {
      0: {
        label: 'Ingen',
        icon: Minus,
        className: 'text-gray-400',
      },
      1: {
        label: 'Låg',
        icon: ArrowDown,
        className: 'text-green-600',
      },
      2: {
        label: 'Medel',
        icon: Minus,
        className: 'text-yellow-600',
      },
      3: {
        label: 'Hög',
        icon: ArrowUp,
        className: 'text-orange-600',
      },
      4: {
        label: 'Brådskande',
        icon: AlertCircle,
        className: 'text-red-600',
      },
    }

  // Safe fallback - default to medium priority
  const config = priorityConfig[priority] ?? priorityConfig[2]
  const Icon = config.icon

  return (
    <div className="flex items-center gap-1.5">
      <Icon className={cn(iconSize, config.className)} aria-hidden="true" />
      {showLabel && <span className={cn('text-sm font-medium', config.className)}>{config.label}</span>}
    </div>
  )
}
