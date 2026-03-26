# 🎯 Fas 5 — Teknisk Plan

> Baserat på kodanalys + skärmbilder från tidigare version (v1.5.0)

**Skapad:** 2026-03-26  
**Status:** Planerad ⏳

---

## ⚠️ ARKITEKTURREGLER (gäller alltid)

1. API ägs av externt team — kan inte påverkas
2. Read-only — bara GET-anrop
3. Autentisering = API-nyckel via `VITE_LONEPROCESS_API_KEY`

---

## 🎨 Referens: Tidigare version (v1.5.0)

Skärmbilder från föregående version visar exakt målbilden:

### Bild 1 — Överblick-fliken
```
┌─────────────────────────────────────────────────────────────────┐
│  Överblick  |  Löneperioder  |  Verktygslåda                   │
├─────────────────────────────────────────────────────────────────┤
│  Period: [ March 2025  📅 ]    Bemanningsområde: [ Hela inst. ▼]│
├─────────────────────────────────────────────────────────────────┤
│  Total framdrift  Mars 2025                              0%     │
│  ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         │
│  0 av 20 aktiviteter slutförda · 0 av 71 delsteg klara          │
└─────────────────────────────────────────────────────────────────┘
```

### Bild 2 — Löneperioder-fliken
```
┌─────────────────────────────────────────────────────────────────┐
│  Överblick  |  Löneperioder  |  Verktygslåda                   │
├─────────────────────────────────────────────────────────────────┤
│  ⚠️ Kontakta lönechef för ändringar                             │
│                                                                  │
│  Löneperioder 2025                                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 2025-01  Januari                          [Avslutad]    │   │
│  │ 2025-02  Februari                         [Avslutad]    │   │
│  │ 2025-03  Mars                  ← aktiv →  [Aktiv]       │   │  (blå highlight)
│  │ 2025-04  April                            [Planerad]    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔍 Nuvarande läge (efter Fas 4)

### Vad som fungerar
- Dashboard med 3 faskort (Lön 1 / Kontroll / Lön Klar)
- 20 hårdkodade aktiviteter med delsteg, kommentarer, POL-referenser
- localStorage-persistens för avbockningar och kommentarer
- `ApiDataDisplay` väljer rätt komponent per `activityId`
- `EmployeeTable`, `StatusCard`, `ErrorList` implementerade

### Vad som saknas

**Problem 1: Tab-navigation saknas**
Nuvarande app har bara "Dashboard" i headern. Den tidigare versionen
hade tab-navigation (Överblick | Löneperioder | Verktygslåda)
direkt i dashboard-vyn.

**Problem 2: `loneperiodId` når aldrig `ApiDataDisplay`**
```
DashboardPage
  └── DashboardOverview         ← ingen period hämtas
        └── FasCard              ← inget loneperiodId-prop
              └── ActivityListItemExpanded  ← har prop men får aldrig värde
                    └── ApiDataDisplay     ← loneperiodId=undefined
                          └── KorningsStatusData/FellistorData
                                ← visar "Ingen aktiv löneperiod"
```

**Problem 3: Bemanningsområde-dropdown är dekorativ**
Dropdown finns visuellt men är inte kopplad till state eller filtrering.

**Problem 4: Ingen Löneperioder-sida**
Sidan med periodlista (Avslutad/Aktiv/Planerad) existerar inte.

---

## 📌 Fas 5 — 3 Milestones

---

### Milestone 5.1 — Tab-navigation, Period-väljare & Löneperioder-sida

**Estimat:** 3–4 timmar  
**Mål:** Matcha v1.5.0-designen — tabs, period-väljare, löneperiod-lista, live-data end-to-end

#### Del A: Tab-navigation

Lägg till tabs i `DashboardPage`/`DashboardOverview`:
```
Överblick | Löneperioder | Verktygslåda
```

- **Överblick** = nuvarande dashboard (faskorten + aktivitetslistan)
- **Löneperioder** = ny sida (se Del C)
- **Verktygslåda** = placeholder (tomt för nu, visas i framtida fas)

Implementeras som intern tab-state i `DashboardPage`, inte som separata routes,
för att spara scrollposition och state.

#### Del B: Period-väljare + Bemanningsområde i Överblick

Exakt som skärmbild 1 — rad med två kontroller överst:
```
Period: [ Mars 2025  📅 ]    Bemanningsområde: [ Hela installationen ▼ ]
```

- Hämta löneperioder via `usePeriods()`
- Auto-välj aktiv period (status = `for_registrering` eller `aktiv`)
- Period-väljare: `<select>` med periodnamn (ex: "Mars 2025")
- Propagera `selectedPeriodId` ned: `DashboardOverview → FasCard → ActivityListItemExpanded → ApiDataDisplay`
- Bemanningsområde: koppla dropdown till state (se Milestone 5.2)

**Prop-kedja att uppdatera:**
```
DashboardOverview (selectedPeriodId: number|null)
  └── FasCard (+loneperiodId prop)
        └── ActivityListItemExpanded (har redan prop — skickas bara inte)
              └── ApiDataDisplay (fungerar redan)
```

#### Del C: Löneperioder-sida

Exakt som skärmbild 2:
- Varningstext: "Kontakta lönechef för ändringar" (read-only, ingen redigering)
- Rubrik: "Löneperioder [år]"
- Lista med perioder och status-badges:
  - `Avslutad` (grön badge)
  - `Aktiv` (blå badge + highlight på raden)
  - `Planerad` (grå badge)
- Hämtar data via `usePeriods()` (redan implementerat)

**Ny fil:**
```
src/features/dashboard/components/LoneperioderTab.tsx
```

#### Filer att skapa/ändra
```
src/pages/DashboardPage.tsx                              ← lägg till tab-state
src/features/dashboard/components/DashboardOverview.tsx  ← period-väljare, bemanningsomr
src/features/dashboard/components/FasCard.tsx            ← loneperiodId-prop
src/features/dashboard/components/LoneperioderTab.tsx    ← ny fil
```

#### Success criteria
- Tab-navigation synlig: Överblick | Löneperioder | Verktygslåda
- Period-dropdown auto-väljer aktiv period
- Byter period → ApiDataDisplay hämtar ny data
- Aktivitet 2.1, 2.2, 3.1 visar live-data istf "Ingen aktiv löneperiod"
- Löneperioder-fliken visar lista med Avslutad/Aktiv/Planerad

---

### Milestone 5.2 — Bemanningsområde-filtrering

**Estimat:** 1–2 timmar  
**Mål:** Koppla bemanningsområde-dropdown till faktisk filtrering av anställda

#### Bakgrund

Från ursprungskraven:
> *"Det styrs genom att ha olika bemanningsområden. Olika uppsättning av
> aktiviteter i löneperioden för olika verksamheter."*

#### Vad som ska byggas

State i `DashboardOverview`:
```tsx
const [bemanningsomrade, setBemanningsomrade] = useState<string>('Hela installationen')
```

Skicka `bemanningsomrade` till `ApiDataDisplay` → `useEmployees({ org_kod })`:
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
```

#### Success criteria
- Väljer man bemanningsområde filtreras anställda i EmployeeTable
- "Hela installationen" visar alla

---

### Milestone 5.3 — Export av checklista

**Estimat:** 2–3 timmar  
**Mål:** Exportera aktuell periods checklista som PDF

#### Bakgrund

Lönespecialisterna behöver kunna spara/skriva ut checklistan
för dokumentation och arkivering.

#### Vad som ska byggas

**ExportButton-komponent** i dashboard-headern:
```tsx
src/features/dashboard/components/ExportButton.tsx
```

**Print-layout:**
- Header med periodnamn + datum
- Alla tre faser med aktiviteter och delsteg
- Status (bockat/ej bockat) per delsteg
- Dölj knappar, navigation, filter vid utskrift

**Implementation:** `window.print()` med Tailwind `print:`-klasser.
Alternativ om mer kontroll behövs: `html2canvas` + `jsPDF`.

#### Success criteria
- "Exportera"-knapp i dashboard-headern
- Print-dialog visar ren checklistevy
- Status visas korrekt
- Irrelevant UI döljs

---

## 📊 Sammanfattning

| Milestone | Estimat | Prioritet | Värde |
|---|---|---|---|
| 5.1 Tab-nav + Period + Löneperioder | 3–4h | 🔴 Hög | Matchar v1.5.0, live-data end-to-end |
| 5.2 Bemanningsområde | 1–2h | 🟡 Medium | Ursprungskrav |
| 5.3 Export | 2–3h | 🟡 Medium | Konkret affärsvärde |

**Rekommenderad ordning:** 5.1 → 5.2 → 5.3

---

## 📝 Arbetsflöde

```bash
npm test
npm run type-check
npm run lint -- --fix
git add -A && git commit -m "fix: lint auto-fix" && git push origin <branch>
npm run build
```

### Branch naming
```
feat/milestone-5.1-period-tabs
feat/milestone-5.2-bemanningsomrade
feat/milestone-5.3-export
```

---

_Uppdaterad: 2026-03-26 (med skärmbilder från v1.5.0)_
