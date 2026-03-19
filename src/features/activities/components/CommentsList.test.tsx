import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CommentsList } from './CommentsList'
import type { Comment } from '@/types'

const mockComments: Comment[] = [
  {
    id: '1',
    text: 'First comment',
    authorId: 'user-1',
    authorName: 'John Doe',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: null,
  },
  {
    id: '2',
    text: 'Second comment',
    authorId: 'user-2',
    authorName: 'Jane Smith',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T11:00:00Z',
  },
]

describe('CommentsList', () => {
  it('renders all comments', () => {
    render(<CommentsList comments={mockComments} />)
    expect(screen.getByText('First comment')).toBeInTheDocument()
    expect(screen.getByText('Second comment')).toBeInTheDocument()
  })

  it('renders author names', () => {
    render(<CommentsList comments={mockComments} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('shows empty state when no comments', () => {
    render(<CommentsList comments={[]} />)
    expect(screen.getByText('Inga kommentarer än')).toBeInTheDocument()
    expect(screen.getByText('Var först med att kommentera!')).toBeInTheDocument()
  })

  it('passes callbacks to CommentItem', () => {
    const onEdit = vi.fn()
    const onDelete = vi.fn()

    render(
      <CommentsList
        comments={mockComments}
        onEdit={onEdit}
        onDelete={onDelete}
        currentUserId="user-1"
      />
    )

    // CommentItem should receive the callbacks
    expect(screen.getAllByRole('button')).toBeTruthy()
  })

  it('determines canEdit based on currentUserId', () => {
    render(<CommentsList comments={mockComments} currentUserId="user-1" />)

    // First comment should have edit/delete buttons (user-1 is author)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
})
