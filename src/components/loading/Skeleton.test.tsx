import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Skeleton, SkeletonCard, SkeletonList, SkeletonTable } from './Skeleton'

describe('Skeleton', () => {
  it('renders with default variant', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton).toHaveClass('animate-pulse', 'bg-gray-200', 'rounded')
  })

  it('renders text variant', () => {
    const { container } = render(<Skeleton variant="text" />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton).toHaveClass('h-4', 'rounded')
  })

  it('renders circular variant', () => {
    const { container } = render(<Skeleton variant="circular" />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton).toHaveClass('rounded-full')
  })

  it('renders multiple lines for text variant', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />)
    const lines = container.querySelectorAll('.animate-pulse')
    expect(lines).toHaveLength(3)
  })

  it('applies custom width and height', () => {
    const { container } = render(<Skeleton width={100} height={50} />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton.style.width).toBe('100px')
    expect(skeleton.style.height).toBe('50px')
  })
})

describe('SkeletonCard', () => {
  it('renders card skeleton', () => {
    const { container } = render(<SkeletonCard />)
    expect(container.querySelector('.border')).toBeInTheDocument()
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0)
  })
})

describe('SkeletonList', () => {
  it('renders default 3 items', () => {
    const { container } = render(<SkeletonList />)
    const items = container.querySelectorAll('.flex.items-center')
    expect(items).toHaveLength(3)
  })

  it('renders custom number of items', () => {
    const { container } = render(<SkeletonList items={5} />)
    const items = container.querySelectorAll('.flex.items-center')
    expect(items).toHaveLength(5)
  })
})

describe('SkeletonTable', () => {
  it('renders default 5 rows and 4 columns', () => {
    const { container } = render(<SkeletonTable />)
    // 1 header + 5 rows = 6 total
    const rows = container.querySelectorAll('.grid')
    expect(rows).toHaveLength(6)
  })

  it('renders custom rows and columns', () => {
    const { container } = render(<SkeletonTable rows={3} cols={6} />)
    // 1 header + 3 rows = 4 total
    const rows = container.querySelectorAll('.grid')
    expect(rows).toHaveLength(4)
  })
})
