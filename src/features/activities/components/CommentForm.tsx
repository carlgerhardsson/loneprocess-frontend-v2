import { useState } from 'react'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CommentFormProps {
  onSubmit: (text: string) => void
  placeholder?: string
  isSubmitting?: boolean
}

/**
 * Comment Form
 *
 * Form for adding new comments.
 */
export function CommentForm({
  onSubmit,
  placeholder = 'Skriv en kommentar...',
  isSubmitting = false,
}: CommentFormProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onSubmit(text.trim())
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-4">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        rows={3}
        disabled={isSubmitting}
      />
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-gray-500">{text.length > 0 && `${text.length} tecken`}</span>
        <button
          type="submit"
          disabled={!text.trim() || isSubmitting}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            text.trim() && !isSubmitting
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          )}
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? 'Skickar...' : 'Skicka'}
        </button>
      </div>
    </form>
  )
}
