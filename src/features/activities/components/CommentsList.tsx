import { Comment } from '@/types'
import { CommentItem } from './CommentItem'

interface CommentsListProps {
  comments: Comment[]
  onEdit?: (commentId: string, newText: string) => void
  onDelete?: (commentId: string) => void
  currentUserId?: string
}

/**
 * Comments List
 *
 * Displays a list of comments with edit/delete functionality.
 */
export function CommentsList({ comments, onEdit, onDelete, currentUserId }: CommentsListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">Inga kommentarer än</p>
        <p className="text-gray-400 text-xs mt-1">Var först med att kommentera!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onEdit={onEdit}
          onDelete={onDelete}
          canEdit={currentUserId === comment.authorId}
        />
      ))}
    </div>
  )
}
