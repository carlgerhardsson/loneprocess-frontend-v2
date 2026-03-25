import { Activity } from '@/types'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: Activity['status']
  size?: 'sm' | 'md'
}

/**
 * Status Badge
 * UPDATED: Now supports all backend status values
 */
export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  }

  const statusConfig: Record<Activity['status'], { label: string; className: string }> = {
    active: {
      label: 'Aktiv',
      className: 'bg-green-100 text-green-700',
    },
    draft: {
      label: 'Utkast',
      className: 'bg-gray-100 text-gray-600',
    },
    pending: {
      label: 'Väntande',
      className: 'bg-yellow-100 text-yellow-700',
    },
    in_progress: {
      label: 'Pågående',
      className: 'bg-blue-100 text-blue-700',
    },
    completed: {
      label: 'Klar',
      className: 'bg-emerald-100 text-emerald-700',
    },
    blocked: {
      label: 'Blockerad',
      className: 'bg-red-100 text-red-700',
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
