import { Activity } from '@/types'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: Activity['status']
  size?: 'sm' | 'md'
}

/**
 * Status Badge
 *
 * Visual indicator for activity status.
 */
export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  }

  const statusConfig: Record<Activity['status'], { label: string; className: string }> = {
    pending: {
      label: 'Väntar',
      className: 'bg-gray-100 text-gray-700',
    },
    in_progress: {
      label: 'Pågående',
      className: 'bg-blue-100 text-blue-700',
    },
    completed: {
      label: 'Klar',
      className: 'bg-green-100 text-green-700',
    },
    blocked: {
      label: 'Blockerad',
      className: 'bg-red-100 text-red-700',
    },
    cancelled: {
      label: 'Avbruten',
      className: 'bg-gray-100 text-gray-500',
    },
  }

  // Safe fallback if status value doesn't match our config
  const config = statusConfig[status] || statusConfig.pending

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        sizeClasses[size],
        config.className
      )}
    >
      {config.label}
    </span>
  )
}
