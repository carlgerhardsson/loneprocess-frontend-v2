/**
 * DashboardOverview — Överblick-fliken
 *
 * Visar period-väljare, bemanningsområde-dropdown,
 * total framdrift och de 3 faskorten.
 *
 * Baserat på v1.5.0-design.
 */

import { useState, useEffect } from 'react'
import { getActivitiesByFas, ACTIVITY_STATS } from '@/data/activities'
import { FasCard } from './FasCard'
import { usePeriods } from '@/hooks/queries'
import { useActivityProgress } from '@/hooks/useActivityProgress'

const FAS_CONFIGS = [
  {
    fas: 'Lön 1' as const,
    title: 'FÖRE LÖNEBERÄKNING (LÖN 1)',
    subtitle: 'Rapportering & Förberedelse',
    colorScheme: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      progressColor: '#2563eb',
    },
  },
  {
    fas: 'Kontroll' as const,
    title: 'KONTROLLPERIOD (MELLANPERIOD)',
    subtitle: 'Provlön & Kontroller',
    colorScheme: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-700',
      progressColor: '#ea580c',
    },
  },
  {
    fas: 'Lön Klar' as const,
    title: 'EFTER LÖNEBERÄKNING (LÖN KLAR)',
    subtitle: 'Definitiv & Avstämning',
    colorScheme: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      progressColor: '#16a34a',
    },
  },
]

export function DashboardOverview() {
  const { data: periods = [] } = usePeriods()
  const [selectedPeriodId, setSelectedPeriodId] = useState<number | null>(null)
  const [bemanningsomrade, setBemanningsomrade] = useState('Hela installationen')
  const { getCompletionPercentage } = useActivityProgress()

  // Auto-välj aktiv period vid mount — 'active' är den enda status som passar
  useEffect(() => {
    if (periods.length > 0 && selectedPeriodId === null) {
      const active = periods.find(p => p.status === 'active')
      const fallback = periods[periods.length - 1]
      const target = active ?? fallback
      if (target) setSelectedPeriodId(Number(target.id))
    }
  }, [periods, selectedPeriodId])

  // Total framdrift över alla aktiviteter
  const allActivities = [
    ...getActivitiesByFas('Lön 1'),
    ...getActivitiesByFas('Kontroll'),
    ...getActivitiesByFas('Lön Klar'),
  ]
  const totalDelsteg = allActivities.reduce((sum, a) => sum + a.delsteg.length, 0)
  const completedActivities = allActivities.filter(
    a => getCompletionPercentage(a.id) === 100
  ).length
  const completedDelsteg = allActivities.reduce((sum, a) => {
    const pct = getCompletionPercentage(a.id)
    return sum + Math.round((pct / 100) * a.delsteg.length)
  }, 0)
  const totalPercent = totalDelsteg > 0 ? Math.round((completedDelsteg / totalDelsteg) * 100) : 0

  const selectedPeriod = periods.find(p => Number(p.id) === selectedPeriodId)
  const periodDisplayName = selectedPeriod?.name ?? ''

  return (
    <div className="space-y-6">
      {/* Period + Bemanningsområde */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Period-väljare */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Period</label>
            <div className="relative">
              <select
                value={selectedPeriodId ?? ''}
                onChange={e => setSelectedPeriodId(Number(e.target.value))}
                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
                aria-label="Välj period"
              >
                {periods.length === 0 && <option value="">Laddar perioder...</option>}
                {periods.map(p => (
                  <option key={p.id} value={Number(p.id)}>
                    {p.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Bemanningsområde */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Bemanningsområde</label>
            <div className="relative">
              <select
                value={bemanningsomrade}
                onChange={e => setBemanningsomrade(e.target.value)}
                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
                aria-label="Välj bemanningsområde"
              >
                <option value="Hela installationen">Hela installationen</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total framdrift */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800">Total framdrift</span>
            {periodDisplayName && (
              <span className="text-sm text-gray-500">{periodDisplayName}</span>
            )}
          </div>
          <span className="text-lg font-bold text-primary-600">{totalPercent}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 transition-all duration-500"
            style={{ width: `${totalPercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {completedActivities} av {ACTIVITY_STATS.total} aktiviteter slutförda · {completedDelsteg}{' '}
          av {totalDelsteg} delsteg klara
        </p>
      </div>

      {/* Framdrift per fas */}
      <div>
        <h2 className="text-sm font-semibold text-gray-600 mb-3">
          Framdrift per fas — {periodDisplayName}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FAS_CONFIGS.map(config => {
            const activities = getActivitiesByFas(config.fas)
            return (
              <FasCard
                key={config.fas}
                activities={activities}
                title={config.title}
                subtitle={config.subtitle}
                colorScheme={config.colorScheme}
                loneperiodId={selectedPeriodId}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
