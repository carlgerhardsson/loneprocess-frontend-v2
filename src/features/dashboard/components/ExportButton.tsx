/**
 * ExportButton — Exportera checklista som PDF
 *
 * Triggar webbläsarens print-dialog via window.print().
 * Print-CSS döljer irrelevant UI och visar PrintView.
 */

interface ExportButtonProps {
  label?: string
}

export function ExportButton({ label = 'Exportera checklista' }: ExportButtonProps) {
  const handleExport = () => {
    window.print()
  }

  return (
    <button
      onClick={handleExport}
      className="print:hidden flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Exportera checklista som PDF"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
        />
      </svg>
      {label}
    </button>
  )
}
