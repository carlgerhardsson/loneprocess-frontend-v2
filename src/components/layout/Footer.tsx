/**
 * Footer Component
 * Bottom bar with API status and version info
 */

import { useState, useEffect } from 'react'

export function Footer() {
  const [apiStatus, setApiStatus] = useState<'unknown' | 'healthy' | 'error'>('unknown')

  useEffect(() => {
    // Placeholder - will be replaced with real API health check in Fas 2.4
    setApiStatus('healthy')
  }, [])

  const statusConfig = {
    unknown: { color: 'bg-gray-400', text: 'Checking...' },
    healthy: { color: 'bg-green-500', text: 'API Online' },
    error: { color: 'bg-red-500', text: 'API Offline' },
  }

  const status = statusConfig[apiStatus]

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          {/* Version Info */}
          <div>
            <span className="font-medium">Version:</span> 2.0.0 | Fas 2 Development
          </div>

          {/* API Status */}
          <div className="flex items-center space-x-2">
            <span>API Status:</span>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${status.color}`} />
              <span className="font-medium">{status.text}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
