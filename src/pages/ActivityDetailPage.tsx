import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/**
 * Activity Detail Page
 *
 * Shows detailed view of a single activity.
 */
export function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/activities')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Tillbaka till aktiviteter
      </button>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Aktivitet {id}</h1>
        <p className="mt-2 text-gray-600">Detaljer för aktivitet</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center text-gray-600">
          <p className="text-lg">Aktivitetsdetaljer kommer här</p>
          <p className="mt-2 text-sm">
            Komponenter från Fas 3 kommer integreras här i nästa milestone
          </p>
        </div>
      </div>
    </div>
  )
}
