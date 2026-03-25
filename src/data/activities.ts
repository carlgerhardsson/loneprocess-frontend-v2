/**
 * Löneprocess Aktivitetsdata
 * Baserat på POL LA 2025.2 struktur
 * 
 * hasApiIntegration: true = hämtar data från backend API
 * hasApiIntegration: false = manuell aktivitet, sparas i localStorage
 */

export interface ActivityDelsteg {
  id: string
  text: string
  requiresApiData?: boolean // Om detta delsteg behöver API-data för att visa info
}

export interface ActivityReference {
  title: string
  url: string
  type: 'pol' | 'heroma' | 'external'
}

export interface ActivityDefinition {
  id: string
  processNr: string
  process: string // Aktivitetsnamn
  fas: 'Lön 1' | 'Kontroll' | 'Lön Klar'
  category: 'Före Löneberäkning' | 'Kontrollperiod' | 'Efter Löneberäkning'
  categoryColor: 'blue' | 'orange' | 'green'
  hasApiIntegration: boolean // true = visar API-badge
  apiEndpoint?: string // Vilken endpoint som används
  ansvarig?: string // Default ansvarig
  delsteg: ActivityDelsteg[]
  references: ActivityReference[]
  beskrivning?: string
}

/**
 * ALLA 20 AKTIVITETER från POL LA 2025.2
 */
export const ACTIVITIES: ActivityDefinition[] = [
  // ============================================================================
  // FAS 1: FÖRE LÖNEBERÄKNING (LÖN 1) - BLÅ
  // ============================================================================
  {
    id: '1.1',
    processNr: '1.1',
    process: 'Kontrollera driftsbilden',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    categoryColor: 'blue',
    hasApiIntegration: true,
    apiEndpoint: '/api/v1/la/periods/:id/korningsstatus',
    ansvarig: 'Tua Jonasson',
    delsteg: [
      {
        id: '1.1.1',
        text: 'Kontrollera körningsstatus "För registrering"',
        requiresApiData: true
      },
      {
        id: '1.1.2',
        text: 'Kontrollera att rätt period är markerad som körningsperiod'
      },
      {
        id: '1.1.3',
        text: 'Bekräfta att AGI-redovisningskörning för föregående månad är slutförd'
      }
    ],
    references: [
      {
        title: 'POL-referens: Driftsbilden (Arkiv > Driftsbild) – POL LA s. 272',
        url: '#',
        type: 'pol'
      },
      {
        title: 'Sökväg i LA: LA > Arkiv > Driftsbild',
        url: '#',
        type: 'heroma'
      }
    ]
  },
  {
    id: '1.2',
    processNr: '1.2',
    process: 'Hantera nyanställningar och anställningsändringar',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    categoryColor: 'blue',
    hasApiIntegration: true,
    apiEndpoint: '/api/v1/la/employees',
    ansvarig: 'Elif Bylund',
    delsteg: [
      {
        id: '1.2.1',
        text: 'Registrera nyanställningar',
        requiresApiData: true
      },
      {
        id: '1.2.2',
        text: 'Uppdatera anställningsändringar (tjänstgöringsgrad, lön, etc.)'
      },
      {
        id: '1.2.3',
        text: 'Kontrollera att alla ändringar har rätt giltighetsdatum'
      },
      {
        id: '1.2.4',
        text: 'Verifiera att anställningsformer är korrekta'
      }
    ],
    references: [
      {
        title: 'POL-referens: Anställningar – POL LA s. 45',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '1.3',
    processNr: '1.3',
    process: 'Registrera slutlöner och avgångar',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    categoryColor: 'blue',
    hasApiIntegration: true,
    apiEndpoint: '/api/v1/la/employees',
    ansvarig: 'Elif Bylund',
    delsteg: [
      {
        id: '1.3.1',
        text: 'Registrera avgångsdatum för anställda som slutar'
      },
      {
        id: '1.3.2',
        text: 'Kontrollera semesterlöneskuld och andra fordringar'
      },
      {
        id: '1.3.3',
        text: 'Hantera slutlönespecifikationer'
      },
      {
        id: '1.3.4',
        text: 'Verifiera att avgångsorsak är korrekt registrerad'
      }
    ],
    references: [
      {
        title: 'POL-referens: Slutlön – POL LA s. 189',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '1.4',
    processNr: '1.4',
    process: 'Hämta skatteuppgifter (FOS)',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    categoryColor: 'blue',
    hasApiIntegration: false,
    ansvarig: 'Elif Bylund',
    delsteg: [
      {
        id: '1.4.1',
        text: 'Kör FOS-hämtning för nya anställda'
      },
      {
        id: '1.4.2',
        text: 'Kontrollera att skattetabeller är uppdaterade'
      },
      {
        id: '1.4.3',
        text: 'Verifiera att alla har giltig skattekod'
      }
    ],
    references: [
      {
        title: 'POL-referens: FOS – POL LA s. 122',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '1.5',
    processNr: '1.5',
    process: 'Uppdatera fasta tillägg/avdrag och löneuppgifter',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    categoryColor: 'blue',
    hasApiIntegration: false,
    ansvarig: 'Elif Bylund',
    delsteg: [
      {
        id: '1.5.1',
        text: 'Registrera nya fasta tillägg (ob-ersättning, traktamente, etc.)'
      },
      {
        id: '1.5.2',
        text: 'Uppdatera avdrag (fackavgifter, försäkringar)'
      },
      {
        id: '1.5.3',
        text: 'Kontrollera giltighetstider för alla poster'
      },
      {
        id: '1.5.4',
        text: 'Verifiera belopp mot avtal'
      },
      {
        id: '1.5.5',
        text: 'Uppdatera lönearter vid behov'
      }
    ],
    references: [
      {
        title: 'POL-referens: Tillägg och avdrag – POL LA s. 201',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '1.6',
    processNr: '1.6',
    process: 'Rapportera tillfälliga lönehändelser (frånvaro, OB, övertid m.m.)',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    categoryColor: 'blue',
    hasApiIntegration: false,
    ansvarig: 'Elif Bylund',
    delsteg: [
      {
        id: '1.6.1',
        text: 'Registrera frånvaro (sjuk, VAB, semester, etc.)'
      },
      {
        id: '1.6.2',
        text: 'Rapportera OB-tillägg ochjourersättning'
      },
      {
        id: '1.6.3',
        text: 'Registrera övertid och mertid'
      },
      {
        id: '1.6.4',
        text: 'Hantera traktamenten och reseersättningar'
      },
      {
        id: '1.6.5',
        text: 'Kontrollera att alla händelser har korrekt period'
      },
      {
        id: '1.6.6',
        text: 'Verifiera att rätt lönearter används'
      }
    ],
    references: [
      {
        title: 'POL-referens: Lönehändelser – POL LA s. 156',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '1.7',
    processNr: '1.7',
    process: 'Läs in externa filer (bilförmåner, fackavgifter, försäkringsavdrag)',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    categoryColor: 'blue',
    hasApiIntegration: false,
    ansvarig: 'Tua Jonasson',
    delsteg: [
      {
        id: '1.7.1',
        text: 'Importera bilförmånsfil från bilregister'
      },
      {
        id: '1.7.2',
        text: 'Läs in fackavgiftsfil från fackförbund'
      },
      {
        id: '1.7.3',
        text: 'Importera försäkringsavdrag'
      },
      {
        id: '1.7.4',
        text: 'Kontrollera att alla filer har lästs in korrekt'
      }
    ],
    references: [
      {
        title: 'POL-referens: Importfiler – POL LA s. 134',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '1.8',
    processNr: '1.8',
    process: 'Konteringsvalidering inför körning',
    fas: 'Lön 1',
    category: 'Före Löneberäkning',
    categoryColor: 'blue',
    hasApiIntegration: false,
    ansvarig: 'Tua Jonasson',
    delsteg: [
      {
        id: '1.8.1',
        text: 'Kontrollera att alla anställda har giltig kontering'
      },
      {
        id: '1.8.2',
        text: 'Verifiera att kostnadsställen är aktiva'
      }
    ],
    references: [
      {
        title: 'POL-referens: Kontering – POL LA s. 145',
        url: '#',
        type: 'pol'
      }
    ]
  },

  // ============================================================================
  // FAS 2: KONTROLLPERIOD (MELLANPERIOD) - ORANGE
  // ============================================================================
  {
    id: '2.1',
    processNr: '2.1',
    process: 'Starta och granska prövlönekörning',
    fas: 'Kontroll',
    category: 'Kontrollperiod',
    categoryColor: 'orange',
    hasApiIntegration: true,
    apiEndpoint: '/api/v1/la/periods/:id/korningsstatus',
    ansvarig: 'Hassan Sundberg',
    delsteg: [
      {
        id: '2.1.1',
        text: 'Starta prövlönekörning',
        requiresApiData: true
      },
      {
        id: '2.1.2',
        text: 'Kontrollera att körningen slutfördes utan fel'
      },
      {
        id: '2.1.3',
        text: 'Granska prövlönespecifikationer'
      },
      {
        id: '2.1.4',
        text: 'Verifiera att lönesummor är rimliga jämfört med föregående månad'
      }
    ],
    references: [
      {
        title: 'POL-referens: Prövlön – POL LA s. 178',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '2.2',
    processNr: '2.2',
    process: 'Granska felsignaler arbetsgivardeklaration (AGI)',
    fas: 'Kontroll',
    category: 'Kontrollperiod',
    categoryColor: 'orange',
    hasApiIntegration: true,
    apiEndpoint: '/api/v1/la/fellistor/:id',
    ansvarig: 'Tua Jonasson',
    delsteg: [
      {
        id: '2.2.1',
        text: 'Öppna fellista för AGI',
        requiresApiData: true
      },
      {
        id: '2.2.2',
        text: 'Åtgärda kritiska fel (röda)'
      },
      {
        id: '2.2.3',
        text: 'Granska varningar (gula)'
      },
      {
        id: '2.2.4',
        text: 'Dokumentera avvikelser som inte kan åtgärdas'
      }
    ],
    references: [
      {
        title: 'POL-referens: Fellista AGI – POL LA s. 115',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '2.3',
    processNr: '2.3',
    process: 'Granska lönesummor och nyckeltal',
    fas: 'Kontroll',
    category: 'Kontrollperiod',
    categoryColor: 'orange',
    hasApiIntegration: false,
    ansvarig: 'Hassan Sundberg',
    delsteg: [
      {
        id: '2.3.1',
        text: 'Jämför total lönesumma mot föregående månad'
      },
      {
        id: '2.3.2',
        text: 'Kontrollera lönesumma per kostnadsbärare'
      },
      {
        id: '2.3.3',
        text: 'Granska avvikelser över 5%'
      },
      {
        id: '2.3.4',
        text: 'Verifiera socialavgifter och skatter'
      }
    ],
    references: [
      {
        title: 'POL-referens: Kontrollrapporter – POL LA s. 148',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '2.4',
    processNr: '2.4',
    process: 'Kontrollera frånvaro och föräldraledighet',
    fas: 'Kontroll',
    category: 'Kontrollperiod',
    categoryColor: 'orange',
    hasApiIntegration: false,
    ansvarig: 'Hassan Sundberg',
    delsteg: [
      {
        id: '2.4.1',
        text: 'Granska frånvarorapport'
      },
      {
        id: '2.4.2',
        text: 'Kontrollera att sjuklön är korrekt beräknad'
      },
      {
        id: '2.4.3',
        text: 'Verifiera föräldraledighetslön'
      },
      {
        id: '2.4.4',
        text: 'Kontrollera semesterlöneavdrag'
      }
    ],
    references: [
      {
        title: 'POL-referens: Frånvaro – POL LA s. 123',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '2.5',
    processNr: '2.5',
    process: 'Korrigera fel och rättar löneunderlag',
    fas: 'Kontroll',
    category: 'Kontrollperiod',
    categoryColor: 'orange',
    hasApiIntegration: false,
    ansvarig: 'Hassan Sundberg',
    delsteg: [
      {
        id: '2.5.1',
        text: 'Rätta identifierade fel i löneunderlag'
      },
      {
        id: '2.5.2',
        text: 'Korrigera felaktiga belopp'
      },
      {
        id: '2.5.3',
        text: 'Uppdatera konteringar vid behov'
      },
      {
        id: '2.5.4',
        text: 'Dokumentera alla korrigeringar'
      }
    ],
    references: [
      {
        title: 'POL-referens: Korrigeringar – POL LA s. 149',
        url: '#',
        type: 'pol'
      }
    ]
  },

  // ============================================================================
  // FAS 3: EFTER LÖNEBERÄKNING (LÖN KLAR) - GRÖN
  // ============================================================================
  {
    id: '3.1',
    processNr: '3.1',
    process: 'Starta och bekräfta definitiv lönekörning',
    fas: 'Lön Klar',
    category: 'Efter Löneberäkning',
    categoryColor: 'green',
    hasApiIntegration: true,
    apiEndpoint: '/api/v1/la/periods/:id/korningsstatus',
    ansvarig: 'Hassan Sundberg',
    delsteg: [
      {
        id: '3.1.1',
        text: 'Starta definitiv lönekörning',
        requiresApiData: true
      },
      {
        id: '3.1.2',
        text: 'Kontrollera att körningen slutfördes'
      },
      {
        id: '3.1.3',
        text: 'Verifiera att alla lönespec genererades'
      },
      {
        id: '3.1.4',
        text: 'Kontrollera att inga nya fel uppstått'
      }
    ],
    references: [
      {
        title: 'POL-referens: Definitiv körning – POL LA s. 67',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '3.2',
    processNr: '3.2',
    process: 'Granska och godkänn lönespecifikationer',
    fas: 'Lön Klar',
    category: 'Efter Löneberäkning',
    categoryColor: 'green',
    hasApiIntegration: false,
    ansvarig: 'Hassan Sundberg',
    delsteg: [
      {
        id: '3.2.1',
        text: 'Kontrollera slumpmässigt urval av lönespecifikationer'
      },
      {
        id: '3.2.2',
        text: 'Verifiera att alla belopp är korrekta'
      },
      {
        id: '3.2.3',
        text: 'Kontrollera att semestersaldo är uppdaterat'
      },
      {
        id: '3.2.4',
        text: 'Godkänn för utskick'
      }
    ],
    references: [
      {
        title: 'POL-referens: Lönespecifikationer – POL LA s. 162',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '3.3',
    processNr: '3.3',
    process: 'Hantera extrautbetalningar och justeringar',
    fas: 'Lön Klar',
    category: 'Efter Löneberäkning',
    categoryColor: 'green',
    hasApiIntegration: false,
    ansvarig: 'Hassan Sundberg',
    delsteg: [
      {
        id: '3.3.1',
        text: 'Registrera sena rättelser'
      },
      {
        id: '3.3.2',
        text: 'Hantera extrautbetalningar'
      },
      {
        id: '3.3.3',
        text: 'Kontrollera att återkrav hanteras korrekt'
      }
    ],
    references: [
      {
        title: 'POL-referens: Extrautbetalningar – POL LA s. 101',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '3.4',
    processNr: '3.4',
    process: 'Skicka bankfil och bekräfta utbetalning',
    fas: 'Lön Klar',
    category: 'Efter Löneberäkning',
    categoryColor: 'green',
    hasApiIntegration: false,
    ansvarig: 'Hassan Sundberg',
    delsteg: [
      {
        id: '3.4.1',
        text: 'Generera bankfil'
      },
      {
        id: '3.4.2',
        text: 'Kontrollera total utbetalningssumma'
      },
      {
        id: '3.4.3',
        text: 'Skicka bankfil till bank'
      },
      {
        id: '3.4.4',
        text: 'Bekräfta att banken mottagit filen'
      }
    ],
    references: [
      {
        title: 'POL-referens: Bankfil – POL LA s. 52',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '3.5',
    processNr: '3.5',
    process: 'Generera rapporter till Skatteverket',
    fas: 'Lön Klar',
    category: 'Efter Löneberäkning',
    categoryColor: 'green',
    hasApiIntegration: false,
    ansvarig: 'Hassan Sundberg',
    delsteg: [
      {
        id: '3.5.1',
        text: 'Generera AGI-fil (Arbetsgivardeklaration)'
      },
      {
        id: '3.5.2',
        text: 'Kontrollera att alla uppgifter är korrekta'
      },
      {
        id: '3.5.3',
        text: 'Skicka AGI-fil till Skatteverket'
      },
      {
        id: '3.5.4',
        text: 'Spara bekräftelse från Skatteverket'
      }
    ],
    references: [
      {
        title: 'POL-referens: AGI-rapportering – POL LA s. 38',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '3.6',
    processNr: '3.6',
    process: 'Utför bokföringsexport och avstämning',
    fas: 'Lön Klar',
    category: 'Efter Löneberäkning',
    categoryColor: 'green',
    hasApiIntegration: false,
    ansvarig: 'Hassan Sundberg',
    delsteg: [
      {
        id: '3.6.1',
        text: 'Generera bokföringsunderlag'
      },
      {
        id: '3.6.2',
        text: 'Kontrollera att alla konton stämmer'
      },
      {
        id: '3.6.3',
        text: 'Exportera till ekonomisystem'
      },
      {
        id: '3.6.4',
        text: 'Verifiera att importen lyckades'
      }
    ],
    references: [
      {
        title: 'POL-referens: Bokföring – POL LA s. 56',
        url: '#',
        type: 'pol'
      }
    ]
  },
  {
    id: '3.7',
    processNr: '3.7',
    process: 'Arkivera löneunderlag och dokumentation',
    fas: 'Lön Klar',
    category: 'Efter Löneberäkning',
    categoryColor: 'green',
    hasApiIntegration: false,
    ansvarig: 'Hassan Sundberg',
    delsteg: [
      {
        id: '3.7.1',
        text: 'Spara alla körningsloggar'
      },
      {
        id: '3.7.2',
        text: 'Arkivera lönespecifikationer'
      },
      {
        id: '3.7.3',
        text: 'Spara rapporter och underlag'
      },
      {
        id: '3.7.4',
        text: 'Dokumentera eventuella avvikelser'
      }
    ],
    references: [
      {
        title: 'POL-referens: Arkivering – POL LA s. 48',
        url: '#',
        type: 'pol'
      }
    ]
  }
]

/**
 * Gruppera aktiviteter per fas
 */
export const ACTIVITIES_BY_PHASE = {
  'Lön 1': ACTIVITIES.filter(a => a.fas === 'Lön 1'),
  'Kontroll': ACTIVITIES.filter(a => a.fas === 'Kontroll'),
  'Lön Klar': ACTIVITIES.filter(a => a.fas === 'Lön Klar')
}

/**
 * Faskonfig för dashboard-kort
 */
export const PHASE_CONFIG = [
  {
    id: 'lon1',
    title: 'FÖRE LÖNEBERÄKNING (LÖN 1)',
    subtitle: 'Rapportering & Förberedelse',
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    progressColor: 'text-blue-600',
    activities: ACTIVITIES.filter(a => a.fas === 'Lön 1')
  },
  {
    id: 'kontroll',
    title: 'KONTROLLPERIOD (MELLANPERIOD)',
    subtitle: 'Prövlön & Kontroller',
    color: 'orange',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    progressColor: 'text-orange-600',
    activities: ACTIVITIES.filter(a => a.fas === 'Kontroll')
  },
  {
    id: 'lonklar',
    title: 'EFTER LÖNEBERÄKNING (LÖN KLAR)',
    subtitle: 'Definitiv & Avstämning',
    color: 'green',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    progressColor: 'text-green-600',
    activities: ACTIVITIES.filter(a => a.fas === 'Lön Klar')
  }
]
