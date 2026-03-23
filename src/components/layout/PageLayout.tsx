import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { SessionManager } from '@/components/auth'

/**
 * Page Layout Component
 *
 * Main layout wrapper with header, footer, and content area.
 * Used as the root layout for all pages.
 */
export function PageLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SessionManager />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
