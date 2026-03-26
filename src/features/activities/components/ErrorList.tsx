/**
 * ErrorList — Visar fellistor från AGI-kontroll
 *
 * Används av:
 *   2.2 Granska felsignaler arbetsgivardeklaration (AGI)
 */

import type { LACalculationError, FelSeverity } from '@/types/la'

interface ErrorListProps {
  errors: LACalculationError[]
}

const SEVERITY_CONFIG: Record<
  FelSeverity,
  { label: string; bg: string; text: string; border: string }
> = {
  error: { label: 'Fel', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  warning: {
    label: 'Varning',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
  },
  info: { label: 'Info', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
}

function SeverityBadge({ severity }: { severity: FelSeverity }) {
  const config = SEVERITY_CONFIG[severity]
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  )
}

export function ErrorList({ errors }: ErrorListProps) {
  if (errors.length === 0) {
    return (
      <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg border border-green-200">
        <svg
          className="w-5 h-5 text-green-600 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-sm text-green-700 font-medium">Inga fel hittades</span>
      </div>
    )
  }

  // Gruppera på severity för summering
  const counts = errors.reduce(
    (acc, e) => {
      acc[e.severity] = (acc[e.severity] ?? 0) + 1
      return acc
    },
    {} as Record<FelSeverity, number>
  )

  return (
    <div className="space-y-3">
      {/* Summering */}
      <div className="flex gap-3 text-sm">
        {counts.error > 0 && <span className="font-medium text-red-600">{counts.error} fel</span>}
        {counts.warning > 0 && (
          <span className="font-medium text-yellow-600">{counts.warning} varningar</span>
        )}
        {counts.info > 0 && <span className="font-medium text-blue-600">{counts.info} info</span>}
      </div>

      {/* Fellista */}
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Allvarlighet</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Felkod</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Namn</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Beskrivning</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {errors.map(error => (
              <tr key={error.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <SeverityBadge severity={error.severity} />
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-600">{error.error_code}</td>
                <td className="px-4 py-3 text-gray-900">{error.name ?? '—'}</td>
                <td className="px-4 py-3 text-gray-600">{error.description}</td>
                <td className="px-4 py-3">
                  {error.behandlad ? (
                    <span className="text-xs text-green-600 font-medium">Behandlad</span>
                  ) : (
                    <span className="text-xs text-gray-400">Obehandlad</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
          {errors.length} poster
        </div>
      </div>
    </div>
  )
}
