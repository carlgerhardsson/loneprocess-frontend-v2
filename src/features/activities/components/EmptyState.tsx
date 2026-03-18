import { FileText, Plus } from 'lucide-react'

interface EmptyStateProps {
  onCreateActivity?: () => void
}

/**
 * Empty State
 *
 * Displayed when there are no activities to show.
 */
export function EmptyState({ onCreateActivity }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <FileText className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Inga aktiviteter</h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">
        Det finns inga aktiviteter för denna period ännu. Skapa din första aktivitet för att komma
        igång.
      </p>
      {onCreateActivity && (
        <button
          onClick={onCreateActivity}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Skapa aktivitet
        </button>
      )}
    </div>
  )
}
