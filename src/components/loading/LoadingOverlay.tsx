import { Spinner } from './Spinner'
import { cn } from '@/lib/utils'

interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
  message?: string
  className?: string
}

/**
 * Loading Overlay
 *
 * Displays a semi-transparent overlay with a spinner
 * over content while loading.
 */
export function LoadingOverlay({ isLoading, children, message, className }: LoadingOverlayProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg z-10">
          <div className="text-center">
            <Spinner size="lg" />
            {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
