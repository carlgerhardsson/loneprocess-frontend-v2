# 🎯 Fas 5 — Teknisk Plan

> Basärat på faktisk kodanalys av nuvarande implementation

**Skapad:** 2026-03-26  
**Status:** Planerad ⏳

---

## ⚠️ ARKITEKTURREGLER (gäller alltid)

1. API ägs av externt team — kan inte påverkas
2. Read-only — bara GET-anrop
3. Autentisering = API-nyckel via `VITE_LONEPROCESS_API_KEY`

---

## 🔍 Nuvarande läge (efter Fas 4)

### Vad som fungerar
- Dashboard med 3 faskort (Lön 1 / Kontroll / Lön Klar)
- 20 hårdkodade aktiviteter med delsteg, kommentarer, POL-referenser
- localStorage-persistens för avbockningar och kommentarer
- `ApiDataDisplay` väljer rätt komponent per `activityId`
- `EmployeeTable`, `StatusCard`, `ErrorList` implementerade

### Vad som saknas (grundproblem)

**Problem 1: `loneperiodId` når aldrig `ApiDataDisplay`**

Flödet ser ut så här:
```
DashboardPage
  └── DashboardOverview         ← ingen period hämtas här
        └── FasCard              ← inget loneperiodId-prop
              └── ActivityListItemExpanded  ← har loneperiodId-prop men får aldrig ett värde
                    └── ApiDataDisplay     ← tar emot loneperiodId=undefined
                          └── KorningsStatusData / FellistorData  ← visar "Ingen aktiv löneperiod"
```

Resultat: Aktiviteterna 2.1, 2.2 och 3.1 visar alltid varningen  
"Ingen aktiv löneperiod vald" eftersom `loneperiodId` aldrig sätts.

**Problem 2: Bemanningsområde-dropdown är dekorativ**

Dropdown-elementet i UI:et (se skärmbilden) är inte kopplat till  
någon state eller filtrering. Väljer man ett bemanningsområde händer inget.

---

## 📌 Fas 5 — 3 milestones

---

### Milestone 5.1 — Löneperiod-integration

**Estimat:** 2–3 timmar  
**Mål:** Koppla vald löneperiod hela vägen ned till `ApiDataDisplay`

#### Vad som ska byggas

**1. Periodnummer-väljare i DashboardOverview**
- Hämta löneperioder från API via `usePeriods()`
- Visa en `<select>` med perioder (ex: "Mars 2025", "April 2025")
- Sätt aktuell period automatiskt till den senaste med status `for_registrering`
- Spara vald period i lokal state: `const [selectedPeriodId, setSelectedPeriodId] = useState<number|null>(null)`

**2. Propagera `loneperiodId` nedåt**

Prop-kedjan som måste uppdateras:
```
DashboardOverview
  selectedPeriodId: number | null              ← ny state
    └── FasCard
          loneperiodId: number | null          ← nytt prop
            └── ActivityListItemExpanded
                  loneperiodId: number | null  ← finns redan! (skickas bara inte)
                    └── ApiDataDisplay
                          loneperiodId         ← fungerar redan
```

**3. Filer att ändra**
```
src/features/dashboard/components/DashboardOverview.tsx  ← hämta perioder, period-väljare
src/features/dashboard/components/FasCard.tsx            ← lägg till loneperiodId-prop
```

**4. Period-väljare UI**
```tsx
// I DashboardOverview.tsx
const { data: periods = [] } = usePeriods()
const [selectedPeriodId, setSelectedPeriodId] = useState<number | null>(null)

// Auto-välj senaste period vid mount
useEffect(() => {
  const active = periods.find(p => p.status === 'for_registrering')
  if (active) setSelectedPeriodId(active.id)
}, [periods])

// UI
<select onChange={e => setSelectedPeriodId(Number(e.target.value))}>
  {periods.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
</select>
```

#### Success criteria
- Aktivitet 2.1 visar riktig `StatusCard` med körningsstatus
- Aktivitet 2.2 visar riktig `ErrorList` med fellistor  
- Aktivitet 3.1 visar riktig `StatusCard` med körningsstatus
- Byts period i dropdown → ApiDataDisplay hämtar ny data

---

### Milestone 5.2 — Bemanningsområde-filtrering

**Estimat:** 1–2 timmar  
**Mål:** Koppla bemanningsområde-dropdown till faktisk filtrering

#### Bakgrund

Från ursprungskraven:
> *"Det styrs genom att ha olika bemanningsområden. Olika uppsättning av aktiviteter i löneperioden för olika verksamheter."*

Dropdown:en är synlig i UI:et men är inte kopplad till något.

#### Vad som ska byggas

**1. Bemanningsområde-state i DashboardOverview**
```tsx
const [bemanningsomrade, setBemanningsomrade] = useState<string>('Hela installationen')
```

**2. Filtrera aktiviteter per bemanningsområde**

Aktiviteter i `src/data/activities.ts` behöver ett `bemanningsomrade`-fält,  
eller filtrering kan ske via anropet till `useEmployees({ org_kod })` för  
de aktiviteter som hämtar anställda.

**3. Koppla dropdown till state**
```tsx
<select
  value={bemanningsomrade}
  onChange={e => setBemanningsomrade(e.target.value)}
>
  <option value="Hela installationen">Hela installationen</option>
  {/* Dynamiska alternativ från API om tillgängligt */}
</select>
```

**4. Skicka `orgKod` till `useEmployees`**
```tsx
useEmployees({ 
  status: 'new',
  org_kod: bemanningsomrade !== 'Hela installationen' ? bemanningsomrade : undefined
})
```

#### Filer att ändra
```
src/features/dashboard/components/DashboardOverview.tsx
src/features/activities/components/ApiDataDisplay.tsx
src/hooks/queries/useEmployees.ts
```

#### Success criteria
- Väljer man ett bemanningsområde filtreras anställda i EmployeeTable
- "Hela installationen" visar alla anställda
- Dropdown och filtrering hänger ihop visuellt

---

### Milestone 5.3 — Export av checklista

**Estimat:** 2–3 timmar  
**Mål:** Exportera aktuell periods checklista som PDF

#### Bakgrund

Lönespecialisterna behöver kunna skriva ut/spara en PDF av checklistan  
för dokumentation och arkivering. Detta är ett konkret affärsvärde.

#### Vad som ska byggas

**1. ExportButton-komponent**
```tsx
// src/features/dashboard/components/ExportButton.tsx
export function ExportButton({ periodName }: { periodName: string }) {
  const handleExport = () => {
    window.print() // Enklaste möjliga implementation
  }
  return (
    <button onClick={handleExport}>
      Exportera checklista
    </button>
  )
}
```

**2. Print-optimerade CSS-klasser**

Lägg till Tailwind print-klasser för att dölja irrelevanta UI-element  
vid utskrift och visa checklistan på ett rent sätt:
```css
@media print {
  /* Dölj navigation, knappar, filter */
  /* Visa alla aktiviteter expanderade */
  /* Snygg typografi */
}
```

**3. Print-layout**
- Header med periodnamn och datum
- Alla tre faser med aktiviteter
- Status (bockat/ej bockat) per delsteg
- Footer med tidsstämpel

#### Alternativ implementation
Om `window.print()` inte ger tillräcklig kontroll kan vi använda  
biblioteket `html2canvas` + `jsPDF` för mer kontroll över PDF-utseendet.

#### Filer att skapa/ändra
```
src/features/dashboard/components/ExportButton.tsx  ← ny komponent
src/features/dashboard/components/DashboardOverview.tsx  ← lägg till knapp
src/index.css (eller tailwind.config)  ← print-stilar
```

#### Success criteria
- "Exportera"-knapp synlig i dashboard-headern
- Klick öppnar print-dialog med snygg layout
- Checklistans status (bockat/ej bockat) visas korrekt
- Irrelevant UI (navigation, filter, knappar) döljs vid utskrift

---

## 📊 Sammanfattning

| Milestone | Estimat | Prioritet | Värde |
|---|---|---|---|
| 5.1 Löneperiod-integration | 2–3h | 🔴 Hög | Live-data fungerar end-to-end |
| 5.2 Bemanningsområde-filtrering | 1–2h | 🟡 Medium | Krav från ursprungsspecen |
| 5.3 Export av checklista | 2–3h | 🟡 Medium | Konkret affärsvärde |

**Rekommenderad ordning:** 5.1 → 5.2 → 5.3

---

## 📝 Arbetsflöde

```bash
# Efter varje git pull:
npm test
npm run type-check
npm run lint -- --fix
git add -A && git commit -m "fix: lint auto-fix" && git push origin <branch>
npm run build
```

### Branch naming
```
feat/milestone-5.1-period-integration
feat/milestone-5.2-bemanningsomrade
feat/milestone-5.3-export
```

---

_Uppdaterad: 2026-03-26_
