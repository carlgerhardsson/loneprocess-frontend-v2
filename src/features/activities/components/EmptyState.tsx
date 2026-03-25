/**
 * Empty State Component - READ-ONLY VERSION
 * Display message when no activities are available
 */

import { FileQuestion } from 'lucide-react'
import { ReactNode } from 'react'

interface EmptyStateProps {
  children?: ReactNode
}

export function EmptyState({ children }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <FileQuestion className="w-8 h-8 text-gray-400" />
      </div>
      {children || (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Inga aktiviteter</h3>
          <p className="text-gray-600">Det finns inga aktiviteter att visa just nu.</p>
        </div>
      )}
    </div>
  )
}
