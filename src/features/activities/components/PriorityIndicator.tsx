import { Activity } from '@/types'
import { AlertCircle, ArrowUp, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PriorityIndicatorProps {
  priority: Activity['priority']
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Priority Indicator
 *
 * Visual indicator for activity priority level.
 */
export function PriorityIndicator({
  priority,
  showLabel = false,
  size = 'md',
}: PriorityIndicatorProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const priorityConfig: Record<
    Activity['priority'],
    { label: string; icon: typeof AlertCircle; className: string }
  > = {
    high: {
      label: 'Hög prioritet',
      icon: AlertCircle,
      className: 'text-red-600',
    },
    medium: {
      label: 'Medium prioritet',
      icon: ArrowUp,
      className: 'text-yellow-600',
    },
    low: {
      label: 'Låg prioritet',
      icon: Minus,
      className: 'text-gray-400',
    },
  }

  const config = priorityConfig[priority]
  const Icon = config.icon

  if (showLabel) {
    return (
      <div className="flex items-center gap-1.5">
        <Icon className={cn(sizeClasses[size], config.className)} />
        <span className="text-sm font-medium text-gray-700">{config.label}</span>
      </div>
    )
  }

  return (
    <Icon
      className={cn(sizeClasses[size], config.className)}
      aria-label={config.label}
      title={config.label}
    />
  )
}
