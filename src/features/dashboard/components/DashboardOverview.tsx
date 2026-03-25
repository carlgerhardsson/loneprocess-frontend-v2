/**
 * DashboardOverview - Main Dashboard Component
 * Shows all 3 phase cards (Lön 1, Kontroll, Lön Klar)
 */

import { getActivitiesByFas, ACTIVITY_STATS } from '@/data/activities'
import { FasCard } from './FasCard'

const FAS_CONFIGS = [
  {
    fas: 'Lön 1' as const,
    title: 'FÖRE LÖNEBERÄKNING',
    subtitle: 'Rapportering & Förberedelse',
    colorScheme: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      progressColor: '#2563eb'
    }
  },
  {
    fas: 'Kontroll' as const,
    title: 'KONTROLLPERIOD',
    subtitle: 'Prövlön & Kontroller',
    colorScheme: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-700',
      progressColor: '#ea580c'
    }
  },
  {
    fas: 'Lön Klar' as const,
    title: 'EFTER LÖNEBERÄKNING',
    subtitle: 'Definitiv & Avstämning',
    colorScheme: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      progressColor: '#16a34a'
    }
  }
]

export function DashboardOverview() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Löneprocess - Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Översikt över alla {ACTIVITY_STATS.total} aktiviteter fördelat på {ACTIVITY_STATS.fas1 + ACTIVITY_STATS.fas2 + ACTIVITY_STATS.fas3} faser
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-gray-200">
            <div className="text-3xl font-bold text-gray-900">{ACTIVITY_STATS.total}</div>
            <div className="text-sm text-gray-600">Totalt aktiviteter</div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-sm p-4 border-2 border-blue-200">
            <div className="text-3xl font-bold text-blue-700">{ACTIVITY_STATS.fas1}</div>
            <div className="text-sm text-gray-600">Lön 1</div>
          </div>
          <div className="bg-orange-50 rounded-lg shadow-sm p-4 border-2 border-orange-200">
            <div className="text-3xl font-bold text-orange-700">{ACTIVITY_STATS.fas2}</div>
            <div className="text-sm text-gray-600">Kontroll</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow-sm p-4 border-2 border-green-200">
            <div className="text-3xl font-bold text-green-700">{ACTIVITY_STATS.fas3}</div>
            <div className="text-sm text-gray-600">Lön Klar</div>
          </div>
        </div>

        {/* Phase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FAS_CONFIGS.map((config) => {
            const activities = getActivitiesByFas(config.fas)
            return (
              <FasCard
                key={config.fas}
                fas={config.fas}
                activities={activities}
                title={config.title}
                subtitle={config.subtitle}
                colorScheme={config.colorScheme}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
