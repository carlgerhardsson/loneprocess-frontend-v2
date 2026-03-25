/**
 * ActivityComments - Comment Field for Activities
 * Saves to localStorage on blur
 */

import { useState, useEffect } from 'react'
import { useActivityProgress } from '@/hooks/useActivityProgress'

interface ActivityCommentsProps {
  activityId: string
}

export function ActivityComments({ activityId }: ActivityCommentsProps) {
  const { progress, updateComment } = useActivityProgress()
  const activityProgress = progress[activityId]
  const [localComment, setLocalComment] = useState(activityProgress?.comment || '')

  // Update local state when progress changes
  useEffect(() => {
    setLocalComment(activityProgress?.comment || '')
  }, [activityProgress?.comment])

  const handleBlur = () => {
    if (localComment !== activityProgress?.comment) {
      updateComment(activityId, localComment)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.currentTarget.blur()
    }
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor={`comment-${activityId}`}
        className="block text-sm font-medium text-gray-700"
      >
        Kommentarer & Anteckningar
      </label>
      <textarea
        id={`comment-${activityId}`}
        value={localComment}
        onChange={(e) => setLocalComment(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="Lägg till kommentarer, anteckningar eller observationer..."
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
      />
      <p className="text-xs text-gray-500">
        Tips: Tryck Cmd/Ctrl + Enter för att spara
      </p>
      {activityProgress?.lastUpdated && (
        <p className="text-xs text-gray-400">
          Senast uppdaterad: {new Date(activityProgress.lastUpdated).toLocaleString('sv-SE')}
        </p>
      )}
    </div>
  )
}
