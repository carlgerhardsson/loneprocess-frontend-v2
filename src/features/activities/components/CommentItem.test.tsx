import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CommentItem } from './CommentItem'
import type { Comment } from '@/types'

const mockComment: Comment = {
  id: '1',
  text: 'Test comment',
  authorId: 'user-1',
  authorName: 'John Doe',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: null,
}

describe('CommentItem', () => {
  it('renders comment text', () => {
    render(<CommentItem comment={mockComment} />)
    expect(screen.getByText('Test comment')).toBeInTheDocument()
  })

  it('renders author name', () => {
    render(<CommentItem comment={mockComment} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders created date', () => {
    render(<CommentItem comment={mockComment} />)
    // Date should be formatted in Swedish
    expect(screen.getByText(/15 jan/)).toBeInTheDocument()
  })

  it('shows edited indicator when comment is updated', () => {
    const updatedComment: Comment = {
      ...mockComment,
      updatedAt: '2024-01-15T11:00:00Z',
    }

    render(<CommentItem comment={updatedComment} />)
    expect(screen.getByText('(redigerad)')).toBeInTheDocument()
  })

  it('shows edit and delete buttons when canEdit is true', () => {
    render(<CommentItem comment={mockComment} canEdit={true} />)

    expect(screen.getByLabelText('Redigera kommentar')).toBeInTheDocument()
    expect(screen.getByLabelText('Ta bort kommentar')).toBeInTheDocument()
  })

  it('hides edit and delete buttons when canEdit is false', () => {
    render(<CommentItem comment={mockComment} canEdit={false} />)

    expect(screen.queryByLabelText('Redigera kommentar')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Ta bort kommentar')).not.toBeInTheDocument()
  })

  it('enters edit mode when edit button clicked', () => {
    render(<CommentItem comment={mockComment} canEdit={true} />)

    const editButton = screen.getByLabelText('Redigera kommentar')
    fireEvent.click(editButton)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Spara')).toBeInTheDocument()
    expect(screen.getByText('Avbryt')).toBeInTheDocument()
  })

  it('calls onEdit when save button clicked', () => {
    const onEdit = vi.fn()
    render(<CommentItem comment={mockComment} onEdit={onEdit} canEdit={true} />)

    // Enter edit mode
    const editButton = screen.getByLabelText('Redigera kommentar')
    fireEvent.click(editButton)

    // Change text
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'Updated comment' } })

    // Save
    const saveButton = screen.getByText('Spara')
    fireEvent.click(saveButton)

    expect(onEdit).toHaveBeenCalledWith('1', 'Updated comment')
  })

  it('cancels edit mode when cancel button clicked', () => {
    render(<CommentItem comment={mockComment} canEdit={true} />)

    // Enter edit mode
    const editButton = screen.getByLabelText('Redigera kommentar')
    fireEvent.click(editButton)

    // Change text
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'Updated comment' } })

    // Cancel
    const cancelButton = screen.getByText('Avbryt')
    fireEvent.click(cancelButton)

    // Should show original text
    expect(screen.getByText('Test comment')).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('calls onDelete when delete button clicked and confirmed', () => {
    const onDelete = vi.fn()
    // Mock confirm dialog
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    render(<CommentItem comment={mockComment} onDelete={onDelete} canEdit={true} />)

    const deleteButton = screen.getByLabelText('Ta bort kommentar')
    fireEvent.click(deleteButton)

    expect(onDelete).toHaveBeenCalledWith('1')
  })

  it('does not call onDelete when delete is cancelled', () => {
    const onDelete = vi.fn()
    // Mock confirm dialog to return false
    vi.spyOn(window, 'confirm').mockReturnValue(false)

    render(<CommentItem comment={mockComment} onDelete={onDelete} canEdit={true} />)

    const deleteButton = screen.getByLabelText('Ta bort kommentar')
    fireEvent.click(deleteButton)

    expect(onDelete).not.toHaveBeenCalled()
  })
})
