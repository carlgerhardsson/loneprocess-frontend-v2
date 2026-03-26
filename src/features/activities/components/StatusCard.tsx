/**
 * StatusCard — Visar körningsstatus för löneperiod
 *
 * Används av:
 *   2.1 Starta och granska provlönekörning
 *   3.1 Starta och bekräfta definitiv lönekörning
 */

import type { KorningsStatus, KorningsStatusType } from '@/types/la'

interface StatusCardProps {
  status: KorningsStatus
}

const STATUS_LABELS: Record<KorningsStatusType, string> = {
  for_registrering: 'För registrering',
  last_for_registrering: 'Låst för registrering',
  provlon_pagaar: 'Provlön pågår...',
  provlon_klar: 'Provlön klar',
  definitiv_pagaar: 'Definitiv körning pågår...',
  definitiv_klar: 'Definitiv körning klar',
  resultat_mottaget: 'Resultat mottaget',
  fel: 'Fel uppstod',
}

const STATUS_COLORS: Record<KorningsStatusType, { bg: string; text: string; dot: string }> = {
  for_registrering:    { bg: 'bg-blue-50',   text: 'text-blue-700',   dot: 'bg-blue-500' },
  last_for_registrering: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  provlon_pagaar:      { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500 animate-pulse' },
  provlon_klar:        { bg: 'bg-green-50',  text: 'text-green-700',  dot: 'bg-green-500' },
  definitiv_pagaar:    { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500 animate-pulse' },
  definitiv_klar:      { bg: 'bg-green-50',  text: 'text-green-700',  dot: 'bg-green-500' },
  resultat_mottaget:   { bg: 'bg-green-50',  text: 'text-green-700',  dot: 'bg-green-500' },
  fel:                 { bg: 'bg-red-50',    text: 'text-red-700',    dot: 'bg-red-500' },
}

function formatDateTime(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleString('sv-SE', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

export function StatusCard({ status }: StatusCardProps) {
  const colors = STATUS_COLORS[status.status] ?? STATUS_COLORS.for_registrering
  const label = STATUS_LABELS[status.status] ?? status.status

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {/* Status header */}
      <div className={`${colors.bg} px-4 py-3 flex items-center gap-3`}>
        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${colors.dot}`} />
        <span className={`font-semibold text-sm ${colors.text}`}>{label}</span>
      </div>

      {/* Detaljer */}
      <div className="bg-white px-4 py-3 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt className="text-gray-500 text-xs">Antal anställda</dt>
          <dd className="font-medium text-gray-900 mt-0.5">
            {status.antal_anstallda ?? '—'}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 text-xs">Antal fel</dt>
          <dd className={`font-medium mt-0.5 ${
            status.antal_fel && status.antal_fel > 0 ? 'text-red-600' : 'text-gray-900'
          }`}>
            {status.antal_fel ?? '—'}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 text-xs">Provlön startad</dt>
          <dd className="font-medium text-gray-900 mt-0.5">{formatDateTime(status.provlon_startad)}</dd>
        </div>
        <div>
          <dt className="text-gray-500 text-xs">Provlön klar</dt>
          <dd className="font-medium text-gray-900 mt-0.5">{formatDateTime(status.provlon_klar)}</dd>
        </div>
        {status.definitiv_startad && (
          <div>
            <dt className="text-gray-500 text-xs">Definitiv startad</dt>
            <dd className="font-medium text-gray-900 mt-0.5">{formatDateTime(status.definitiv_startad)}</dd>
          </div>
        )}
        {status.definitiv_klar && (
          <div>
            <dt className="text-gray-500 text-xs">Definitiv klar</dt>
            <dd className="font-medium text-gray-900 mt-0.5">{formatDateTime(status.definitiv_klar)}</dd>
          </div>
        )}
      </div>

      {/* Meddelande */}
      {status.meddelande && (
        <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200 text-xs text-yellow-800">
          {status.meddelande}
        </div>
      )}

      {/* Uppdaterad */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
        Uppdaterad {formatDateTime(status.updated_at)}
      </div>
    </div>
  )
}
