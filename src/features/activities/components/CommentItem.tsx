import { Comment } from '@/types'
import { MessageSquare, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CommentItemProps {
  comment: Comment
  onEdit?: (commentId: string, newText: string) => void
  onDelete?: (commentId: string) => void
  canEdit?: boolean
}

/**
 * Comment Item
 *
 * Individual comment with edit/delete functionality.
 */
export function CommentItem({ comment, onEdit, onDelete, canEdit = false }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(comment.text)

  const handleSave = () => {
    if (editText.trim() && onEdit) {
      onEdit(comment.id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(comment.text)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (onDelete && confirm('Är du säker på att du vill ta bort denna kommentar?')) {
      onDelete(comment.id)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gray-400" />
          <span className="font-medium text-gray-900">{comment.authorName}</span>
          <span className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString('sv-SE', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {comment.updatedAt && (
            <span className="text-xs text-gray-400">(redigerad)</span>
          )}
        </div>

        {/* Actions */}
        {canEdit && !isEditing && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
              aria-label="Redigera kommentar"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              aria-label="Ta bort kommentar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {isEditing ? (
        <div className="mt-2">
          <textarea
            value={editText}
            onChange={e => setEditText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={3}
            autoFocus
          />
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors"
            >
              Spara
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
            >
              Avbryt
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 whitespace-pre-wrap">{comment.text}</p>
      )}
    </div>
  )
}
