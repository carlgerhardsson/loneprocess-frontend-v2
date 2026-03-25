/**
 * ActivityReferences - Display Reference Links
 * Shows POL documents and external links
 */

import type { Reference } from '@/types/activityDef'

interface ActivityReferencesProps {
  references: Reference[]
}

export function ActivityReferences({ references }: ActivityReferencesProps) {
  if (references.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        Inga referenser tillgängliga
      </div>
    )
  }

  const getIcon = (type: Reference['type']) => {
    switch (type) {
      case 'POL':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      case 'External':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )
      case 'Internal':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const getTypeLabel = (type: Reference['type']) => {
    switch (type) {
      case 'POL':
        return 'POL'
      case 'External':
        return 'Extern'
      case 'Internal':
        return 'Intern'
    }
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">Referenser & Dokumentation</h4>
      <div className="space-y-2">
        {references.map((ref, index) => (
          <a
            key={index}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <div className="flex-shrink-0 text-gray-500 group-hover:text-gray-700 mt-0.5">
              {getIcon(ref.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  {getTypeLabel(ref.type)}
                </span>
              </div>
              <p className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                {ref.title}
              </p>
            </div>
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  )
}
