/**
 * DashboardPage - Main entry point for dashboard
 * Wrapped in ActivityProgressProvider to share state across all components
 */

import { DashboardOverview } from '@/features/dashboard/components/DashboardOverview'
import { ActivityProgressProvider } from '@/contexts/ActivityProgressContext'

export default function DashboardPage() {
  return (
    <ActivityProgressProvider>
      <DashboardOverview />
    </ActivityProgressProvider>
  )
}
