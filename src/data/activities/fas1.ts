/**
 * FAS 1: FÖRE LÖNEBERÄKNING (LÖN 1)
 * 8 aktiviteter - Rapportering & Förberedelse
 */

import type { ActivityDefinition } from '@/types/activityDef'

export const FAS1_ACTIVITIES: ActivityDefinition[] = [
  {
    id: '1.1',
    processNr: '1.1',
    process: 'Kontrollera driftsbilden',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    hasApiIntegration: false,
    delsteg: [
      {
        id: '1.1.1',
        text: 'Kontrollera körningsstatus "För registrering"',
        required: true,
      },
      {
        id: '1.1.2',
        text: 'Kontrollera att rätt period är markerad som körningsperiod',
        required: true,
      },
      {
        id: '1.1.3',
        text: 'Bekräfta att AGI-redovisningskörning för föregående månad är slutförd',
        required: true,
      },
    ],
    references: [
      {
        title: 'POL-referens: Driftsbilden (Arkiv > Driftsbild) – POL LA s. 272',
        url: '#',
        type: 'POL',
      },
      {
        title: 'Sökväg i LA: LA > Arkiv > Driftsbild',
        url: '#',
        type: 'Internal',
      },
    ],
    defaultAssignee: 'Tua Jonasson',
  },
  {
    id: '1.2',
    processNr: '1.2',
    process: 'Hantera nyanställningar och anställningsändringar',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    hasApiIntegration: true,
    apiEndpoint: '/api/v1/la/employees?status=new',
    delsteg: [
      {
        id: '1.2.1',
        text: 'Kontrollera lista över nya anställda från API',
        required: true,
      },
      {
        id: '1.2.2',
        text: 'Verifiera att alla nyanställningar är registrerade',
        required: true,
      },
      {
        id: '1.2.3',
        text: 'Granska anställningsändringar (tjänstgöringsgrad, lön, etc.)',
        required: true,
      },
      {
        id: '1.2.4',
        text: 'Bekräfta att startdatum och villkor är korrekta',
        required: true,
      },
    ],
    references: [],
    defaultAssignee: 'Elif Bylund',
  },
  {
    id: '1.3',
    processNr: '1.3',
    process: 'Registrera slutlöner och avgångar',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    hasApiIntegration: true,
    apiEndpoint: '/api/v1/la/employees?status=terminated',
    delsteg: [
      {
        id: '1.3.1',
        text: 'Hämta lista över avgående anställda från API',
        required: true,
      },
      {
        id: '1.3.2',
        text: 'Registrera slutdatum i systemet',
        required: true,
      },
      {
        id: '1.3.3',
        text: 'Beräkna semesterersättning och slutlön',
        required: true,
      },
      {
        id: '1.3.4',
        text: 'Kontrollera att alla avgångsrutiner är genomförda',
        required: true,
      },
    ],
    references: [],
    defaultAssignee: 'Elif Bylund',
  },
  {
    id: '1.4',
    processNr: '1.4',
    process: 'Hämta skatteuppgifter (FOS)',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    hasApiIntegration: false,
    delsteg: [
      {
        id: '1.4.1',
        text: 'Logga in på Skatteförvaltarens system (FOS)',
        required: true,
      },
      {
        id: '1.4.2',
        text: 'Hämta aktuella skatteavdrag för anställda',
        required: true,
      },
      {
        id: '1.4.3',
        text: 'Importera skatteuppgifter till lönesystemet',
        required: true,
      },
    ],
    references: [
      {
        title: 'Skatteverket: FOS-systemet',
        url: 'https://www.skatteverket.se/',
        type: 'External',
      },
    ],
    defaultAssignee: 'Elif Bylund',
  },
  {
    id: '1.5',
    processNr: '1.5',
    process: 'Uppdatera fasta tillägg/avdrag och löneuppgifter',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    hasApiIntegration: true,
    apiEndpoint: '/api/v1/la/employees',
    delsteg: [
      {
        id: '1.5.1',
        text: 'Granska lista över fasta tillägg (bil, telefon, etc.)',
        required: true,
      },
      {
        id: '1.5.2',
        text: 'Uppdatera fasta avdrag (fackavgift, försäkring)',
        required: true,
      },
      {
        id: '1.5.3',
        text: 'Kontrollera att alla ändringar är korrekta',
        required: true,
      },
      {
        id: '1.5.4',
        text: 'Verifiera mot tidigare period',
        required: false,
      },
      {
        id: '1.5.5',
        text: 'Godkänn och spara ändringar',
        required: true,
      },
    ],
    references: [],
    defaultAssignee: 'Elif Bylund',
  },
  {
    id: '1.6',
    processNr: '1.6',
    process: 'Rapportera tillfälliga lönehändelser (frånvaro, OB, övertid m.m.)',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    hasApiIntegration: true,
    apiEndpoint: '/api/v1/la/employees',
    delsteg: [
      {
        id: '1.6.1',
        text: 'Hämta tidrapporter från tidssystem',
        required: true,
      },
      {
        id: '1.6.2',
        text: 'Registrera övertid och OB-timmar',
        required: true,
      },
      {
        id: '1.6.3',
        text: 'Rapportera sjukfrånvaro och föräldraledighet',
        required: true,
      },
      {
        id: '1.6.4',
        text: 'Kontrollera att alla händelser är korrekt registrerade',
        required: true,
      },
      {
        id: '1.6.5',
        text: 'Verifiera mot budget och prognoser',
        required: false,
      },
      {
        id: '1.6.6',
        text: 'Godkänn tillfälliga lönehändelser',
        required: true,
      },
    ],
    references: [],
    defaultAssignee: 'Elif Bylund',
  },
  {
    id: '1.7',
    processNr: '1.7',
    process: 'Läs in externa filer (bilformåner, fackavgifter, försäkringsavdrag)',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    hasApiIntegration: false,
    delsteg: [
      {
        id: '1.7.1',
        text: 'Hämta fil med bilformåner från leverantör',
        required: true,
      },
      {
        id: '1.7.2',
        text: 'Importera fackavgifter från fackförbund',
        required: true,
      },
      {
        id: '1.7.3',
        text: 'Läs in försäkringsavdrag från försäkringsbolag',
        required: true,
      },
      {
        id: '1.7.4',
        text: 'Validera att alla filer är korrekta',
        required: true,
      },
    ],
    references: [],
    defaultAssignee: 'Tua Jonasson',
  },
  {
    id: '1.8',
    processNr: '1.8',
    process: 'Konteringsvalidering inför körning',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    hasApiIntegration: false,
    delsteg: [
      {
        id: '1.8.1',
        text: 'Kontrollera att alla konteringar är kompletta',
        required: true,
      },
      {
        id: '1.8.2',
        text: 'Verifiera kostnadsställen och projektkoder',
        required: true,
      },
    ],
    references: [],
    defaultAssignee: 'Tua Jonasson',
  },
]
