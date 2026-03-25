/**
 * Dashboard Page
 * Main overview with 3 Fas cards
 */

import { FasCard } from '@/features/dashboard/components/FasCard'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Löneprocess Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Översikt över alla aktiviteter i löneprocessen
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAS 1: Lön 1 */}
          <FasCard
            fas="Lön 1"
            title="FÖRE LÖNEBERÄKNING"
            subtitle="Rapportering & Förberedelse"
            colorScheme="blue"
          />

          {/* FAS 2: Kontroll */}
          <FasCard
            fas="Kontroll"
            title="KONTROLLPERIOD"
            subtitle="Prövlön & Kontroller"
            colorScheme="orange"
          />

          {/* FAS 3: Lön Klar */}
          <FasCard
            fas="Lön Klar"
            title="EFTER LÖNEBERÄKNING"
            subtitle="Definitiv & Avstämning"
            colorScheme="green"
          />
        </div>
      </div>
    </div>
  )
}
