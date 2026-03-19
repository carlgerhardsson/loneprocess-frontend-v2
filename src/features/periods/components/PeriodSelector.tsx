import { usePeriods } from '@/hooks/queries/usePeriods'
import { Period } from '@/types'
import { ChevronDown, Calendar } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface PeriodSelectorProps {
  currentPeriodId?: string
  onPeriodChange?: (period: Period) => void
}

/**
 * Period Selector
 *
 * Dropdown for selecting a period.
 * Shows current period with metadata and allows switching between periods.
 */
export function PeriodSelector({ currentPeriodId, onPeriodChange }: PeriodSelectorProps) {
  const { data: periods, isLoading } = usePeriods()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentPeriod = periods?.find(p => p.id === currentPeriodId) || periods?.[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (period: Period) => {
    onPeriodChange?.(period)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent, period: Period) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSelect(period)
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded-lg w-64"></div>
      </div>
    )
  }

  if (!periods || periods.length === 0) {
    return (
      <div className="text-sm text-gray-500 flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        <span>Inga perioder tillgängliga</span>
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Current Period Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg',
          'border border-gray-300 bg-white hover:bg-gray-50',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
          isOpen && 'ring-2 ring-primary-500'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="font-medium text-gray-900">{currentPeriod?.name}</span>
        <ChevronDown
          className={cn('w-4 h-4 text-gray-500 transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          role="listbox"
        >
          <div className="py-1 max-h-96 overflow-y-auto">
            {periods.map(period => (
              <div
                key={period.id}
                role="option"
                tabIndex={0}
                aria-selected={period.id === currentPeriod?.id}
                onClick={() => handleSelect(period)}
                onKeyDown={e => handleKeyDown(e, period)}
                className={cn(
                  'px-4 py-3 cursor-pointer transition-colors',
                  'hover:bg-primary-50 focus:bg-primary-50 focus:outline-none',
                  period.id === currentPeriod?.id && 'bg-primary-100'
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{period.name}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(period.startDate).toLocaleDateString('sv-SE')} -{' '}
                      {new Date(period.endDate).toLocaleDateString('sv-SE')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {period.completedActivityCount}/{period.activityCount}
                    </div>
                    <div className="text-xs text-gray-500">aktiviteter</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
