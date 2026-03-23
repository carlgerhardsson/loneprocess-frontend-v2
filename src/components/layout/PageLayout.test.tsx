import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { PageLayout } from './PageLayout'

const TestChild = () => <div>Test Content</div>

describe('PageLayout', () => {
  it('renders with Outlet for nested routes', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route path="test" element={<TestChild />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    // Should render the layout structure
    expect(container.querySelector('header')).toBeInTheDocument()
    expect(container.querySelector('main')).toBeInTheDocument()
    expect(container.querySelector('footer')).toBeInTheDocument()
  })

  it('applies correct layout classes', () => {
    const { container } = render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<TestChild />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    const layout = container.firstChild
    expect(layout).toHaveClass('min-h-screen', 'flex', 'flex-col')
  })

  it('renders nested route content', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route path="test" element={<TestChild />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    expect(getByText('Test Content')).toBeInTheDocument()
  })
})
