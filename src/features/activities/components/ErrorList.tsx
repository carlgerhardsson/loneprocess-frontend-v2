interface ErrorItem {
  type: string
  description: string
  count: number
  severity: 'error' | 'warning'
}

interface ErrorListProps {
  errors: ErrorItem[]
  emptyMessage?: string
}

export function ErrorList({
  errors,
  emptyMessage = 'Inga felsignaler hittades',
}: ErrorListProps) {
  if (errors.length === 0) {
    return (
      <div className="p-4 text-center text-green-700 bg-green-50 rounded-lg border-2 border-green-200">
        ✅ {emptyMessage}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {errors.map((error, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg border-l-4 ${
            error.severity === 'error'
              ? 'bg-red-50 border-red-500'
              : 'bg-yellow-50 border-yellow-500'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">
                  {error.severity === 'error' ? '🔴' : '⚠️'}
                </span>
                <h4
                  className={`font-medium text-sm ${
                    error.severity === 'error'
                      ? 'text-red-900'
                      : 'text-yellow-900'
                  }`}
                >
                  {error.type}
                </h4>
              </div>
              <p
                className={`text-sm ${
                  error.severity === 'error'
                    ? 'text-red-700'
                    : 'text-yellow-700'
                }`}
              >
                {error.description}
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                error.severity === 'error'
                  ? 'bg-red-200 text-red-900'
                  : 'bg-yellow-200 text-yellow-900'
              }`}
            >
              {error.count} st
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
