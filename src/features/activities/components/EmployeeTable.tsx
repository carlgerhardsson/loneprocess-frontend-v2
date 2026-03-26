/**
 * EmployeeTable — Visar anställda från LA i tabellformat
 *
 * Används av:
 *   1.2 Hantera nyanställningar  (status: new)
 *   1.3 Registrera slutlöner     (status: terminated)
 *   1.5 Uppdatera tillägg/avdrag (alla)
 *   1.6 Rapportera lönehändelser (alla)
 */

import type { LAEmployee } from '@/types/la'

interface EmployeeTableProps {
  employees: LAEmployee[]
  /** Vilka kolumner som visas beroende på aktivitet */
  variant: 'new' | 'terminated' | 'default'
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('sv-SE')
}

function formatSalary(amount: number | null): string {
  if (amount === null) return '—'
  return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(amount)
}

export function EmployeeTable({ employees, variant }: EmployeeTableProps) {
  if (employees.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 text-sm">
        Inga poster hittades.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Personnummer</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Namn</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Avdelning</th>
            {variant === 'new' && (
              <th className="px-4 py-3 text-left font-medium text-gray-600">Anställningsdatum</th>
            )}
            {variant === 'terminated' && (
              <th className="px-4 py-3 text-left font-medium text-gray-600">Sista arbetsdag</th>
            )}
            {variant === 'default' && (
              <th className="px-4 py-3 text-left font-medium text-gray-600">Lön</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {employees.map(emp => (
            <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-mono text-gray-700">{emp.personal_number}</td>
              <td className="px-4 py-3 font-medium text-gray-900">{emp.name}</td>
              <td className="px-4 py-3 text-gray-600">{emp.department}</td>
              {variant === 'new' && (
                <td className="px-4 py-3 text-gray-600">{formatDate(emp.employment_date)}</td>
              )}
              {variant === 'terminated' && (
                <td className="px-4 py-3 text-gray-600">{formatDate(emp.termination_date)}</td>
              )}
              {variant === 'default' && (
                <td className="px-4 py-3 text-gray-600">{formatSalary(emp.salary)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
        {employees.length} poster
      </div>
    </div>
  )
}
