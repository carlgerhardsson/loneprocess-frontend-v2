/**
 * FAS 3: EFTER LÖNEBERÄKNING (LÖN KLAR)
 * 7 aktiviteter - Definitiv & Avstämning
 */

import type { ActivityDefinition } from '@/types/activityDef'

export const FAS3_ACTIVITIES: ActivityDefinition[] = [
  {
    id: '3.1',
    processNr: '3.1',
    process: 'Starta och bekräfta definitiv lönekörning',
    fas: 'Lön Klar',
    category: 'Definitiv & Avstämning',
    hasApiIntegration: true,
    apiEndpoint: '/api/v1/la/periods/{id}/korningsstatus',
    delsteg: [
      {
        id: '3.1.1',
        text: 'Kontrollera att alla korrigeringar är genomförda',
        required: true,
      },
      {
        id: '3.1.2',
        text: 'Starta definitiv lönekörning',
        required: true,
      },
      {
        id: '3.1.3',
        text: 'Övervaka körningsstatus via API',
        required: true,
      },
      {
        id: '3.1.4',
        text: 'Bekräfta att körningen slutförts utan fel',
        required: true,
      },
    ],
    references: [],
    defaultAssignee: 'Hassan Sundberg',
  },
  {
    id: '3.2',
    processNr: '3.2',
    process: 'Granska och godkänn lönespecifikationer',
    fas: 'Lön Klar',
    category: 'Definitiv & Avstämning',
    hasApiIntegration: false,
    delsteg: [
      {
        id: '3.2.1',
        text: 'Generera lönespecifikationer för alla anställda',
        required: true,
      },
      {
        id: '3.2.2',
        text: 'Granska slumpvält urval för kvalitet',
        required: true,
      },
      {
        id: '3.2.3',
        text: 'Verifiera att alla beräkningar stämmer',
        required: true,
      },
      {
        id: '3.2.4',
        text: 'Godkänn för utskick till anställda',
        required: true,
      },
    ],
    references: [],
    defaultAssignee: 'Elif Bylund',
  },
  {
    id: '3.3',
    processNr: '3.3',
    process: 'Hantera extratutbetalningar och justeringar',
    fas: 'Lön Klar',
    category: 'Definitiv & Avstämning',
    hasApiIntegration: false,
    delsteg: [
      {
        id: '3.3.1',
        text: 'Granska lista över extratutbetalningar',
        required: true,
      },
      {
        id: '3.3.2',
        text: 'Verifiera underlag för justeringar',
        required: true,
      },
      {
        id: '3.3.3',
        text: 'Godkänn och registrera extratutbetalningar',
        required: true,
      },
    ],
    references: [],
    defaultAssignee: 'Elif Bylund',
  },
  {
    id: '3.4',
    processNr: '3.4',
    process: 'Skicka bankfil och bekräfta utbetalning',
    fas: 'Lön Klar',
    category: 'Definitiv & Avstämning',
    hasApiIntegration: false,
    delsteg: [
      {
        id: '3.4.1',
        text: 'Generera bankfil för löneutbetalningar',
        required: true,
      },
      {
        id: '3.4.2',
        text: 'Verifiera totalbelopp mot beräknad lönesumma',
        required: true,
      },
      {
        id: '3.4.3',
        text: 'Skicka bankfil till bank',
        required: true,
      },
      {
        id: '3.4.4',
        text: 'Bekräfta att utbetalning genomförts',
        required: true,
      },
    ],
    references: [],
    defaultAssignee: 'Hassan Sundberg',
  },
  {
    id: '3.5',
    processNr: '3.5',
    process: 'Kontrollera redovisning till Skatteverket',
    fas: 'Lön Klar',
    category: 'Definitiv & Avstämning',
    hasApiIntegration: false,
    delsteg: [
      {
        id: '3.5.1',
        text: 'Granska arbetsgivardeklaration (AGI)',
        required: true,
      },
      {
        id: '3.5.2',
        text: 'Verifiera skatteavdrag och arbetsgivaravgifter',
        required: true,
      },
      {
        id: '3.5.3',
        text: 'Skicka in AGI till Skatteverket',
        required: true,
      },
      {
        id: '3.5.4',
        text: 'Bekräfta att redovisningen mottagits',
        required: true,
      },
    ],
    references: [
      {
        title: 'Skatteverket: Arbetsgivardeklaration',
        url: 'https://www.skatteverket.se/foretagochorganisationer/arbetsgivare/arbetsgivardeklaration.4.233f91f71260075abe8800020817.html',
        type: 'External',
      },
    ],
    defaultAssignee: 'Tua Jonasson',
  },
  {
    id: '3.6',
    processNr: '3.6',
    process: 'Arkivera löneunderlag och rapporter',
    fas: 'Lön Klar',
    category: 'Definitiv & Avstämning',
    hasApiIntegration: false,
    delsteg: [
      {
        id: '3.6.1',
        text: 'Samla alla löneunderlag för perioden',
        required: true,
      },
      {
        id: '3.6.2',
        text: 'Generera och spara arkiveringsrapporter',
        required: true,
      },
      {
        id: '3.6.3',
        text: 'Arkivera enligt rutiner',
        required: true,
      },
    ],
    references: [],
    defaultAssignee: 'Tua Jonasson',
  },
  {
    id: '3.7',
    processNr: '3.7',
    process: 'Stäng löneperioden och förbered nästa',
    fas: 'Lön Klar',
    category: 'Definitiv & Avstämning',
    hasApiIntegration: false,
    delsteg: [
      {
        id: '3.7.1',
        text: 'Verifiera att alla aktiviteter är slutförda',
        required: true,
      },
      {
        id: '3.7.2',
        text: 'Stäng löneperiod i systemet',
        required: true,
      },
      {
        id: '3.7.3',
        text: 'Skapa nästa löneperiod',
        required: true,
      },
      {
        id: '3.7.4',
        text: 'Förbered checklistor för nästa period',
        required: true,
      },
    ],
    references: [],
    defaultAssignee: 'Hassan Sundberg',
  },
]
