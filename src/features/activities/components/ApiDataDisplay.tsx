/**
 * ApiDataDisplay — Wrapper som väljer rätt datakomponent per aktivitet
 *
 * Används i ActivityListItemExpanded för de 7 API-aktiviteterna.
 * Hämtar data via React Query hooks och visar loading/error/data.
 *
 * Aktivitets-mappning:
 *   1.2 → EmployeeTable (status: new)
 *   1.3 → EmployeeTable (status: terminated)
 *   1.5 → EmployeeTable (alla)
 *   1.6 → EmployeeTable (alla)
 *   2.1 → StatusCard
 *   2.2 → ErrorList
 *   3.1 → StatusCard
 */

import { useEmployees } from '@/hooks/queries/useEmployees'
import { useKorningsStatus } from '@/hooks/queries/useKorningsStatus'
import { useFellistor } from '@/hooks/queries/useFellistor'
import { EmployeeTable } from './EmployeeTable'
import { StatusCard } from './StatusCard'
import { ErrorList } from './ErrorList'

interface ApiDataDisplayProps {
  activityId: string
  loneperiodId?: number | null
}

// Loading skeleton
function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-2" data-testid="loading-skeleton">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  )
}

// Error state med retry
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 text-red-500 flex-shrink-0"
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
        <span className="text-sm text-red-700">Kunde inte hämta data från systemet.</span>
      </div>
      <button
        onClick={onRetry}
        className="text-sm font-medium text-red-700 hover:text-red-900 underline"
      >
        Försök igen
      </button>
    </div>
  )
}

// ─── Delkomponenter per aktivitetstyp ────────────────────────────────────────────

function NewEmployeesData() {
  const { data, isLoading, isError, refetch } = useEmployees({ status: 'new' })
  if (isLoading) return <LoadingSkeleton />
  if (isError) return <ErrorState onRetry={() => void refetch()} />
  return <EmployeeTable employees={data ?? []} variant="new" />
}

function TerminatedEmployeesData() {
  const { data, isLoading, isError, refetch } = useEmployees({ status: 'terminated' })
  if (isLoading) return <LoadingSkeleton />
  if (isError) return <ErrorState onRetry={() => void refetch()} />
  return <EmployeeTable employees={data ?? []} variant="terminated" />
}

function AllEmployeesData() {
  const { data, isLoading, isError, refetch } = useEmployees()
  if (isLoading) return <LoadingSkeleton />
  if (isError) return <ErrorState onRetry={() => void refetch()} />
  return <EmployeeTable employees={data ?? []} variant="default" />
}

function KorningsStatusData({ loneperiodId }: { loneperiodId: number }) {
  const { data, isLoading, isError, refetch } = useKorningsStatus(loneperiodId)
  if (isLoading) return <LoadingSkeleton />
  if (isError) return <ErrorState onRetry={() => void refetch()} />
  if (!data) return null
  return <StatusCard status={data} />
}

function FellistorData({ loneperiodId }: { loneperiodId: number }) {
  const { data, isLoading, isError, refetch } = useFellistor(loneperiodId)
  if (isLoading) return <LoadingSkeleton />
  if (isError) return <ErrorState onRetry={() => void refetch()} />
  return <ErrorList errors={data ?? []} />
}

function NoLoneperiodWarning() {
  return (
    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
      Ingen aktiv löneperiod vald. Välj en period för att se data.
    </div>
  )
}

// ─── Huvud-wrapper ──────────────────────────────────────────────────────────────

export function ApiDataDisplay({ activityId, loneperiodId }: ApiDataDisplayProps) {
  switch (activityId) {
    case '1.2':
      return <NewEmployeesData />
    case '1.3':
      return <TerminatedEmployeesData />
    case '1.5':
    case '1.6':
      return <AllEmployeesData />
    case '2.1':
    case '3.1':
      if (!loneperiodId) return <NoLoneperiodWarning />
      return <KorningsStatusData loneperiodId={loneperiodId} />
    case '2.2':
      if (!loneperiodId) return <NoLoneperiodWarning />
      return <FellistorData loneperiodId={loneperiodId} />
    default:
      return null
  }
}
