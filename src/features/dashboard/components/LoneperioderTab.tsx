/**
 * LoneperioderTab — Löneperioder-fliken
 *
 * Visar lista med löneperioder och status.
 * Read-only: inga ändringar kan göras.
 * Matchar design från v1.5.0.
 */

import { usePeriods } from '@/hooks/queries'
import type { Period } from '@/types'

function getStatusLabel(status: string): string {
  switch (status) {
    case 'active':
      return 'Aktiv'
    case 'completed':
      return 'Avslutad'
    case 'archived':
      return 'Arkiverad'
    default:
      return 'Planerad'
  }
}

function getStatusStyle(status: string): string {
  switch (status) {
    case 'active':
      return 'bg-blue-100 text-blue-800'
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'archived':
      return 'bg-gray-100 text-gray-600'
    default:
      return 'bg-gray-100 text-gray-500'
  }
}

function groupByYear(periods: Period[]): Record<string, Period[]> {
  return periods.reduce(
    (acc, period) => {
      const year = new Date(period.startDate).getFullYear().toString()
      if (!acc[year]) acc[year] = []
      acc[year].push(period)
      return acc
    },
    {} as Record<string, Period[]>
  )
}

export function LoneperioderTab() {
  const { data: periods = [], isLoading, isError } = usePeriods()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex items-center gap-2 text-gray-500">
          <svg
            className="w-5 h-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Hämtar löneperioder...</span>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700 text-sm">Kunde inte hämta löneperioder.</p>
      </div>
    )
  }

  const grouped = groupByYear(periods)
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="space-y-6">
      {/* Varning: read-only */}
      <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
        <svg
          className="w-4 h-4 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Kontakta lönechef för ändringar</span>
      </div>

      {/* Perioder per år */}
      {years.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-8">Inga löneperioder hittades.</p>
      ) : (
        years.map(year => (
          <div key={year}>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Löneperioder {year}</h2>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {grouped[year].map((period, index) => (
                <div
                  key={period.id}
                  className={`flex items-center justify-between px-5 py-4 ${
                    index < grouped[year].length - 1 ? 'border-b border-gray-100' : ''
                  } ${
                    period.status === 'active'
                      ? 'bg-blue-50 border-l-4 border-l-blue-500'
                      : 'hover:bg-gray-50'
                  } transition-colors`}
                  data-testid={`period-row-${period.id}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-gray-800">
                      {period.id}
                    </span>
                    <span className="text-gray-500 text-sm">{period.name}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      period.status
                    )}`}
                  >
                    {getStatusLabel(period.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
