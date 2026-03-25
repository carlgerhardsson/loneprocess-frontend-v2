/**
 * FAS 2: KONTROLLPERIOD (MELLANPERIOD)
 * 5 aktiviteter - Prövlön & Kontroller
 */

import type { ActivityDefinition } from '@/types/activityDef'

export const FAS2_ACTIVITIES: ActivityDefinition[] = [
  {
    id: '2.1',
    processNr: '2.1',
    process: 'Starta och granska prövlönekörning',
    fas: 'Kontroll',
    category: 'Prövlön & Kontroller',
    hasApiIntegration: true,
    apiEndpoint: '/api/v1/la/periods/{id}/korningsstatus',
    delsteg: [
      {
        id: '2.1.1',
        text: 'Starta prövlönekörning i systemet',
        required: true,
      },
      {
        id: '2.1.2',
        text: 'Vänta på att körningen slutförs',
        required: true,
      },
      {
        id: '2.1.3',
        text: 'Granska körningsstatus från API',
        required: true,
      },
      {
        id: '2.1.4',
        text: 'Kontrollera att inga kritiska fel uppstått',
        required: true,
      },
    ],
    references: [],
    defaultAssignee: 'Hassan Sundberg',
  },
  {
    id: '2.2',
    processNr: '2.2',
    process: 'Granska felsignaler arbetsgivardeklaration (AGI)',
    fas: 'Kontroll',
    category: 'Prövlön & Kontroller',
    hasApiIntegration: true,
    apiEndpoint: '/api/v1/la/fellistor/{id}',
    delsteg: [
      {
        id: '2.2.1',
        text: 'Hämta fellista från API',
        required: true,
      },
      {
        id: '2.2.2',
        text: 'Granska kritiska fel (severity: error)',
        required: true,
      },
      {
        id: '2.2.3',
        text: 'Åtgärda fel i systemet',
        required: true,
      },
      {
        id: '2.2.4',
        text: 'Verifiera att alla fel är lösta',
        required: true,
      },
    ],
    references: [],
    defaultAssignee: 'Tua Jonasson',
  },
  {
    id: '2.3',
    processNr: '2.3',
    process: 'Granska lönesummor och nyckeltal',
    fas: 'Kontroll',
    category: 'Prövlön & Kontroller',
    hasApiIntegration: false,
    delsteg: [
      {
        id: '2.3.1',
        text: 'Kör rapport över lönesummor per kostnadsställe',
        required: true,
      },
      {
        id: '2.3.2',
        text: 'Jämför med föregående period',
        required: true,
      },
      {
        id: '2.3.3',
        text: 'Analysera avvikelser',
        required: true,
      },
      {
        id: '2.3.4',
        text: 'Verifiera mot budget',
        required: false,
      },
    ],
    references: [],
    defaultAssignee: 'Hassan Sundberg',
  },
  {
    id: '2.4',
    processNr: '2.4',
    process: 'Kontrollera frånvaro och föräldraledighet',
    fas: 'Kontroll',
    category: 'Prövlön & Kontroller',
    hasApiIntegration: false,
    delsteg: [
      {
        id: '2.4.1',
        text: 'Granska sjukfrånvaro-rapport',
        required: true,
      },
      {
        id: '2.4.2',
        text: 'Kontrollera föräldrapenningunderlag',
        required: true,
      },
      {
        id: '2.4.3',
        text: 'Verifiera karensavdrag',
        required: true,
      },
      {
        id: '2.4.4',
        text: 'Bekräfta att alla underlag är kompletta',
        required: true,
      },
    ],
    references: [
      {
        title: 'Försäkringskassan: Regler',
        url: 'https://www.forsakringskassan.se/',
        type: 'External',
      },
    ],
    defaultAssignee: 'Tua Jonasson',
  },
  {
    id: '2.5',
    processNr: '2.5',
    process: 'Korrigera fel och gör ombernäkningar',
    fas: 'Kontroll',
    category: 'Prövlön & Kontroller',
    hasApiIntegration: false,
    delsteg: [
      {
        id: '2.5.1',
        text: 'Korrigera identifierade fel från fellistan',
        required: true,
      },
      {
        id: '2.5.2',
        text: 'Gör manuella ombernäkningar vid behov',
        required: true,
      },
      {
        id: '2.5.3',
        text: 'Dokumentera alla ändringar',
        required: true,
      },
      {
        id: '2.5.4',
        text: 'Kör ny prövlönekörning',
        required: true,
      },
      {
        id: '2.5.5',
        text: 'Verifiera att felen är åtgärdade',
        required: true,
      },
    ],
    references: [],
    defaultAssignee: 'Hassan Sundberg',
  },
]
