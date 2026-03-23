/**
 * Activities Page
 *
 * Main page for viewing and managing activities.
 * Fetches activities from the backend API and displays them.
 */

export function ActivitiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Aktiviteter</h1>
        <p className="mt-2 text-gray-600">Hantera och följ upp löneprocessens aktiviteter</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">
          Aktiviteter visas här när du har kopplat till backend API.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Se README.md för instruktioner om hur du startar backend.
        </p>
      </div>
    </div>
  )
}
