/**
 * PrintView — Print-optimerad checklista
 *
 * Dold på skärmen (hidden), visas bara vid utskrift (print:block).
 * Visar alla aktiviteter med delsteg och status för PDF-export.
 */

import { usePeriods } from '@/hooks/queries'
import { getActivitiesByFas } from '@/data/activities'
import { useActivityProgress } from '@/hooks/useActivityProgress'
import type { ActivityDefinition } from '@/types/activityDef'

const FAS_ORDER = [
  {
    fas: 'Lön 1' as const,
    title: 'FÖRE LÖNEBERÄKNING (LÖN 1)',
    subtitle: 'Rapportering & Förberedelse',
  },
  {
    fas: 'Kontroll' as const,
    title: 'KONTROLLPERIOD (MELLANPERIOD)',
    subtitle: 'Provlön & Kontroller',
  },
  {
    fas: 'Lön Klar' as const,
    title: 'EFTER LÖNEBERÄKNING (LÖN KLAR)',
    subtitle: 'Definitiv & Avstämning',
  },
]

function PrintActivity({
  activity,
  progress,
}: {
  activity: ActivityDefinition
  progress: Record<string, { delstegCompleted: boolean[] }>
}) {
  const actProg = progress[activity.id]
  const completed = actProg ? actProg.delstegCompleted.filter(Boolean).length : 0
  const total = activity.delsteg.length
  const isDone = completed === total

  return (
    <div className="mb-3 break-inside-avoid">
      <div className="flex items-center gap-2 mb-1">
        <span
          className={`inline-block w-4 h-4 rounded border-2 flex-shrink-0 ${
            isDone ? 'bg-gray-800 border-gray-800' : 'border-gray-400'
          }`}
        />
        <span className="font-mono text-xs text-gray-500">{activity.processNr}</span>
        <span className={`text-sm font-semibold ${isDone ? 'line-through text-gray-400' : 'text-gray-900'}`}>
          {activity.process}
        </span>
        <span className="text-xs text-gray-400 ml-auto">
          {completed}/{total}
        </span>
      </div>
      <div className="ml-6 space-y-0.5">
        {activity.delsteg.map((delsteg, i) => {
          const isChecked = actProg?.delstegCompleted[i] ?? false
          return (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <span
                className={`mt-0.5 flex-shrink-0 inline-block w-3 h-3 rounded border ${
                  isChecked ? 'bg-gray-700 border-gray-700' : 'border-gray-400'
                }`}
              />
              <span className={isChecked ? 'line-through text-gray-400' : ''}>
                {typeof delsteg === 'string' ? delsteg : delsteg.text}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function PrintView() {
  const { data: periods = [] } = usePeriods()
  const { progress } = useActivityProgress()

  const activePeriod = periods.find(p => p.status === 'active') ?? periods[periods.length - 1]
  const periodName = activePeriod?.name ?? ''
  const printDate = new Date().toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const printTime = new Date().toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="hidden print:block text-black bg-white p-8" data-testid="print-view">
      {/* Header */}
      <div className="mb-6 pb-4 border-b-2 border-gray-800">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Löneportal — Digital Checklista</h1>
            <p className="text-sm text-gray-600 mt-1">POL LA 2025.2</p>
          </div>
          <div className="text-right text-sm text-gray-600">
            {periodName && (
              <p className="font-semibold text-gray-900">Period: {periodName}</p>
            )}
            <p>{printDate}</p>
          </div>
        </div>
      </div>

      {/* Fas-sektioner */}
      {FAS_ORDER.map(({ fas, title, subtitle }) => {
        const activities = getActivitiesByFas(fas)
        const completedCount = activities.filter(a => {
          const p = progress[a.id]
          return p && p.delstegCompleted.filter(Boolean).length === a.delsteg.length
        }).length

        return (
          <div key={fas} className="mb-6 break-inside-avoid-page">
            <div className="mb-3 pb-1 border-b border-gray-300">
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">{title}</h2>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">{subtitle}</p>
                <p className="text-xs text-gray-500">
                  {completedCount} av {activities.length} klara
                </p>
              </div>
            </div>
            <div>
              {activities.map(activity => (
                <PrintActivity key={activity.id} activity={activity} progress={progress} />
              ))}
            </div>
          </div>
        )
      })}

      {/* Footer */}
      <div className="mt-8 pt-3 border-t border-gray-300 text-xs text-gray-400 flex justify-between">
        <span>Löneportal v2.0 — Exporterad {printDate} kl {printTime}</span>
        <span>CGI Inc.</span>
      </div>
    </div>
  )
}
