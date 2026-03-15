/**
 * Header Component
 * Top navigation bar with branding and navigation
 */

interface HeaderProps {
  title?: string
}

export function Header({ title = 'Löneportalen v2.0' }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-[var(--z-sticky)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-600">🚀 {title}</h1>
            </div>
          </div>

          {/* Navigation - placeholder for now */}
          <nav className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-gray-500">Fas 2: Core Components</span>
          </nav>
        </div>
      </div>
    </header>
  )
}
