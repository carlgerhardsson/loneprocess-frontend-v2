import { EmployeeTable } from './EmployeeTable'
import { StatusCard } from './StatusCard'
import { ErrorList } from './ErrorList'

interface ApiDataDisplayProps {
  activityId: string
}

// Mock data generator - kommer ersättas med riktiga API-anrop senare
function getMockDataForActivity(activityId: string) {
  // 1.2 - Hantera nyanställningar
  if (activityId === '1.2') {
    return {
      type: 'employees' as const,
      data: [
        {
          personalNumber: '9001011234',
          name: 'Anna Andersson',
          department: 'Ekonomi',
          date: '2025-04-01',
        },
        {
          personalNumber: '8502022345',
          name: 'Erik Eriksson',
          department: 'IT',
          date: '2025-04-01',
        },
        {
          personalNumber: '9203033456',
          name: 'Maria Larsson',
          department: 'HR',
          date: '2025-04-15',
        },
      ],
      columns: {
        personalNumber: true,
        name: true,
        department: true,
        date: true,
      },
      title: 'Nyanställningar att hantera',
    }
  }

  // 1.3 - Registrera slutlöner
  if (activityId === '1.3') {
    return {
      type: 'employees' as const,
      data: [
        {
          personalNumber: '7512124567',
          name: 'Lars Nilsson',
          department: 'Försäljning',
          date: '2025-03-31',
        },
        {
          personalNumber: '6803035678',
          name: 'Karin Svensson',
          department: 'Ekonomi',
          date: '2025-03-31',
        },
      ],
      columns: {
        personalNumber: true,
        name: true,
        department: true,
        date: true,
      },
      title: 'Avslutade anställningar',
    }
  }

  // 1.5 - Uppdatera tillägg/avdrag
  if (activityId === '1.5') {
    return {
      type: 'employees' as const,
      data: [
        {
          personalNumber: '8901011234',
          name: 'Anna Andersson',
          changeType: 'Löneförhöjning',
          amount: 2500,
        },
        {
          personalNumber: '7702022345',
          name: 'Per Johansson',
          changeType: 'Bilförmån',
          amount: 3200,
        },
        {
          personalNumber: '9103033456',
          name: 'Sara Berg',
          changeType: 'OB-tillägg',
          amount: 1800,
        },
      ],
      columns: {
        personalNumber: true,
        name: true,
        changeType: true,
        amount: true,
      },
      title: 'Ändringar i lön och tillägg',
    }
  }

  // 1.6 - Rapportera lönehändelser
  if (activityId === '1.6') {
    return {
      type: 'employees' as const,
      data: [
        {
          personalNumber: '8501011234',
          name: 'Johan Karlsson',
          eventType: 'Sjukfrånvaro',
          date: '2025-03-15',
          amount: -4500,
        },
        {
          personalNumber: '9002022345',
          name: 'Emma Lundberg',
          eventType: 'Övertid',
          date: '2025-03-20',
          amount: 6200,
        },
        {
          personalNumber: '7803033456',
          name: 'David Olsson',
          eventType: 'Föräldraledighet',
          date: '2025-03-01',
          amount: -12000,
        },
      ],
      columns: {
        personalNumber: true,
        name: true,
        eventType: true,
        date: true,
        amount: true,
      },
      title: 'Lönepåverkande händelser',
    }
  }

  // 2.1 - Starta prövlönekörning
  if (activityId === '2.1') {
    return {
      type: 'status' as const,
      data: {
        status: 'completed' as const,
        progress: 100,
        message:
          'Prövkörningen slutförd utan större avvikelser. Kontrollera resultatet innan definitiv körning.',
        timestamp: '2025-03-25 14:32',
      },
      title: 'Status: Prövlönekörning',
    }
  }

  // 2.2 - Granska felsignaler AGI
  if (activityId === '2.2') {
    return {
      type: 'errors' as const,
      data: [
        {
          type: 'Felaktig skattekod',
          description:
            'Skattekod stämmer ej med uppgifter från Skatteverket',
          count: 3,
          severity: 'error' as const,
        },
        {
          type: 'Saknad A-skatt',
          description: 'Preliminärskatt saknas för deltidsanställd',
          count: 1,
          severity: 'warning' as const,
        },
        {
          type: 'Avvikande semesterlön',
          description:
            'Semesterlöneberäkning avviker från förväntat värde',
          count: 2,
          severity: 'warning' as const,
        },
      ],
      title: 'Felsignaler från AGI',
    }
  }

  // 3.1 - Definitiv lönekörning
  if (activityId === '3.1') {
    return {
      type: 'status' as const,
      data: {
        status: 'running' as const,
        progress: 67,
        message:
          'Definitiv lönekörning pågår. Beräknar slutliga värden...',
        timestamp: '2025-03-26 08:15',
      },
      title: 'Status: Definitiv lönekörning',
    }
  }

  // Ingen API-data för denna aktivitet
  return null
}

export function ApiDataDisplay({ activityId }: ApiDataDisplayProps) {
  const mockData = getMockDataForActivity(activityId)

  if (!mockData) {
    return (
      <div className="p-4 text-sm text-gray-500 bg-gray-50 rounded-lg">
        Ingen API-data tillgänglig för denna aktivitet.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">
        {mockData.title}
      </h3>

      {mockData.type === 'employees' && (
        <EmployeeTable
          employees={mockData.data}
          columns={mockData.columns}
          emptyMessage="Inga poster att visa"
        />
      )}

      {mockData.type === 'status' && <StatusCard {...mockData.data} />}

      {mockData.type === 'errors' && (
        <ErrorList
          errors={mockData.data}
          emptyMessage="Inga felsignaler hittades"
        />
      )}
    </div>
  )
}
