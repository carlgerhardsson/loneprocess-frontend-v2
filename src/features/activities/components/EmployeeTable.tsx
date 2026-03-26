interface Employee {
  personalNumber: string
  name: string
  department?: string
  date?: string
  amount?: number
  changeType?: string
  eventType?: string
}

interface EmployeeTableProps {
  employees: Employee[]
  columns: {
    personalNumber?: boolean
    name?: boolean
    department?: boolean
    date?: boolean
    amount?: boolean
    changeType?: boolean
    eventType?: boolean
  }
  emptyMessage?: string
}

export function EmployeeTable({
  employees,
  columns,
  emptyMessage = 'Inga data att visa',
}: EmployeeTableProps) {
  if (employees.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.personalNumber && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Personnummer
              </th>
            )}
            {columns.name && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Namn
              </th>
            )}
            {columns.department && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avdelning
              </th>
            )}
            {columns.date && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Datum
              </th>
            )}
            {columns.changeType && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Typ
              </th>
            )}
            {columns.eventType && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Händelse
              </th>
            )}
            {columns.amount && (
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Belopp
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.personalNumber && (
                <td className="px-4 py-3 text-sm text-gray-900">
                  {employee.personalNumber}
                </td>
              )}
              {columns.name && (
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {employee.name}
                </td>
              )}
              {columns.department && (
                <td className="px-4 py-3 text-sm text-gray-500">
                  {employee.department || '-'}
                </td>
              )}
              {columns.date && (
                <td className="px-4 py-3 text-sm text-gray-500">
                  {employee.date || '-'}
                </td>
              )}
              {columns.changeType && (
                <td className="px-4 py-3 text-sm text-gray-500">
                  {employee.changeType || '-'}
                </td>
              )}
              {columns.eventType && (
                <td className="px-4 py-3 text-sm text-gray-500">
                  {employee.eventType || '-'}
                </td>
              )}
              {columns.amount && (
                <td className="px-4 py-3 text-sm text-right text-gray-900">
                  {employee.amount !== undefined
                    ? `${employee.amount.toLocaleString('sv-SE')} kr`
                    : '-'}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
