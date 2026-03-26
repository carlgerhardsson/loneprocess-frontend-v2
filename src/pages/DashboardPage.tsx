/**
 * DashboardPage — Huvudsida med tab-navigation
 *
 * Tabs: Överblick | Löneperioder | Verktygslåda
 * Matchar design från v1.5.0.
 */

import { useState } from 'react'
import { DashboardOverview } from '@/features/dashboard/components/DashboardOverview'
import { LoneperioderTab } from '@/features/dashboard/components/LoneperioderTab'
import { ActivityProgressProvider } from '@/contexts/ActivityProgressContext'

type Tab = 'overblick' | 'loneperioder' | 'verktygslada'

const TABS: { id: Tab; label: string }[] = [
  { id: 'overblick', label: 'Överblick' },
  { id: 'loneperioder', label: 'Löneperioder' },
  { id: 'verktygslada', label: 'Verktygslåda' },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overblick')

  return (
    <ActivityProgressProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Tab-navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex gap-0" role="tablist">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab-innehåll */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === 'overblick' && <DashboardOverview />}

          {activeTab === 'loneperioder' && <LoneperioderTab />}

          {activeTab === 'verktygslada' && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Verktygslådan kommer i en kommande version.</p>
            </div>
          )}
        </div>
      </div>
    </ActivityProgressProvider>
  )
}
