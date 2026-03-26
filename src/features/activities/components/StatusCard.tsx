interface StatusCardProps {
  status: 'running' | 'completed' | 'failed' | 'pending'
  progress?: number
  message?: string
  timestamp?: string
}

export function StatusCard({
  status,
  progress,
  message,
  timestamp,
}: StatusCardProps) {
  const statusConfig = {
    running: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      label: 'Pågående',
      icon: '🔄',
    },
    completed: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      label: 'Klar',
      icon: '✅',
    },
    failed: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      label: 'Misslyckades',
      icon: '❌',
    },
    pending: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-700',
      label: 'Väntande',
      icon: '⏳',
    },
  }

  const config = statusConfig[status]

  return (
    <div
      className={`p-4 rounded-lg border-2 ${config.bg} ${config.border}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{config.icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className={`font-semibold ${config.text}`}>
              {config.label}
            </h4>
            {timestamp && (
              <span className="text-xs text-gray-500">{timestamp}</span>
            )}
          </div>

          {message && (
            <p className="text-sm text-gray-600 mb-3">{message}</p>
          )}

          {progress !== undefined && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">Framsteg</span>
                <span className={`text-sm font-medium ${config.text}`}>
                  {progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    status === 'completed'
                      ? 'bg-green-500'
                      : status === 'failed'
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
