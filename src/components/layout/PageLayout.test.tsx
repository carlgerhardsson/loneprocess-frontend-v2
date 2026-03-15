import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageLayout } from './PageLayout'

describe('PageLayout', () => {
  it('renders children', () => {
    render(
      <PageLayout>
        <div>Test Content</div>
      </PageLayout>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders header and footer', () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    )
    expect(screen.getByText(/Löneportalen v2.0/i)).toBeInTheDocument()
    expect(screen.getByText(/API Status:/i)).toBeInTheDocument()
  })

  it('passes title to header', () => {
    render(
      <PageLayout title="Custom Page">
        <div>Content</div>
      </PageLayout>
    )
    expect(screen.getByText(/Custom Page/i)).toBeInTheDocument()
  })
})
