/**
 * ApiDataDisplay - Displays live data from backend API
 * Shows different UI based on endpoint type
 */

import { Loader2, AlertCircle, RefreshCw } from 'lucide-react'

interface ApiDataDisplayProps {
  activityId: string
  apiEndpoint: string
}

export function ApiDataDisplay({ activityId, apiEndpoint }: ApiDataDisplayProps) {
  // TODO: Implement actual API call with React Query
  const isLoading = false
  const error = null
  const data = null

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-600">Hämtar data från systemet...</span>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-red-800">Kunde inte hämta data</h3>
            <p className="mt-1 text-sm text-red-700">Ett fel uppstod vid hämtning från API:et.</p>
            <button
              onClick={() => {
                /* TODO: Refetch */
              }}
              className="mt-3 inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-1.5" />
              Försök igen
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Determine which component to render based on endpoint
  const endpointType = getEndpointType(apiEndpoint)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Live Data från System</h3>
        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse" />
          Realtid
        </span>
      </div>

      {/* Render appropriate component based on endpoint type */}
      <div className="text-sm text-gray-500">
        Endpoint: <code className="bg-gray-100 px-2 py-1 rounded">{apiEndpoint}</code>
      </div>
      <div className="mt-4 text-sm text-gray-400 italic">
        API integration kommer här (Activity {activityId}, Type: {endpointType})
      </div>
    </div>
  )
}

// Helper to determine endpoint type
function getEndpointType(endpoint: string): string {
  if (endpoint.includes('employees?status=new')) return 'new-employees'
  if (endpoint.includes('employees?status=terminated')) return 'terminated-employees'
  if (endpoint.includes('korningsstatus')) return 'running-status'
  if (endpoint.includes('fellistor')) return 'error-list'
  if (endpoint.includes('employees')) return 'employees-general'
  return 'unknown'
}
