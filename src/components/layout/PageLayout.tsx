/**
 * PageLayout Component
 * Wrapper for pages with Header and Footer
 */

import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface PageLayoutProps {
  children: ReactNode
  title?: string
}

export function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title={title} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
