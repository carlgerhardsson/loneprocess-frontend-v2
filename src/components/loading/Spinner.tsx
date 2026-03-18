import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Loading Spinner
 *
 * Animated rotating spinner for loading states.
 * Uses lucide-react Loader2 icon with Tailwind animations.
 */
export function Spinner({ size = 'md', className }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <Loader2
      className={cn('animate-spin text-primary-600', sizeClasses[size], className)}
      aria-label="Loading"
    />
  )
}
