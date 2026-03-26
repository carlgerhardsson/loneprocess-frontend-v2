# 🚀 Next Session Guide - Fas 4.3: API Integration

> Koppla frontend mot live data från backend-API:et

**Last Updated:** 2026-03-26  
**Current Status:** Milestone 4.2 Complete  
**Next Up:** Milestone 4.3 - API Integration

---

## ⚠️ VIKTIGA ARKITEKTURREGLER — LÄS DETTA FÖRST

### 1. API:et ägs av ett externt team
Frontend-teamet **kan inte påverka API:et**. API:et utvecklas och underhålls av ett separat team. Inga krav eller ändringar kan ställas på API:et från detta projekt.

### 2. Detta team är READ-ONLY
Frontend-applikationen **hämtar bara data** — inga create, update eller delete-operationer ska implementeras. Alla CRUD-planer från tidigare dokumentation är **ej aktuella**.

### 3. Autentisering via API-nyckel
API:et använder `X-API-Key` header — **inte** JWT/lösenord. API-nyckeln sätts som en env-variabel (`VITE_LONEPROCESS_API_KEY`) och inloggning sker **automatiskt** utan att användaren skriver in något.

---

## 📊 Where We Are

✅ **Completed:**
- Fas 1: Project Setup (100%)
- Fas 2: Core Components (100%)
- Fas 3: Feature Components (100%)
- Fas 4.1: React Router Setup ✅
- Fas 4.2: Authentication Flow ✅

🔵 **Current Phase:** Fas 4 - Integration & API (33% complete)

---

## 🎯 Next Milestone: 4.3 - API Integration

**Estimated Time:** 3-4 timmar  
**Mål:** Visa live data från backend för de 7 API-aktiviteterna

---

## 🔌 DE 7 API-AKTIVITETERNA OCH DERAS ENDPOINTS

Detta är de enda endpoints detta team använder. Alla är GET-anrop (read-only).

### FAS 1: Före Löneberäkning 🔵

| Aktivitet | Endpoint | Visar |
|---|---|---|
| **1.2** Hantera nyanställningar | `GET /api/v1/la/employees?status=new` | Lista nyanställda: namn, personnummer, anst.datum |
| **1.3** Registrera slutlöner | `GET /api/v1/la/employees?status=terminated` | Lista avslutade: namn, personnummer, sista arbetsdag |
| **1.5** Uppdatera tillägg/avdrag | `GET /api/v1/la/employees` (filtrerat) | Ändringar: namn, typ av ändring, belopp |
| **1.6** Rapportera lönehändelser | `GET /api/v1/la/employees` (filtrerat) | Frånvaro/övertid: namn, händelsetyp, datum, belopp |

### FAS 2: Kontrollperiod 🟠

| Aktivitet | Endpoint | Visar |
|---|---|---|
| **2.1** Starta provlönekörning | `GET /api/v1/la/periods/{id}/korningsstatus` | Status-badge + progress bar |
| **2.2** Granska felsignaler AGI | `GET /api/v1/la/fellistor/{id}` | Fellista: feltyp, beskrivning, antal |

### FAS 3: Efter Löneberäkning 🟢

| Aktivitet | Endpoint | Visar |
|---|---|---|
| **3.1** Definitiv lönekörning | `GET /api/v1/la/periods/{id}/korningsstatus` | Status-badge + sammanfattning |

---

## 🏗️ IMPLEMENTATIONSPLAN

### Steg 1: Auto-login via API-nyckel

**Filer:**
```
.env.example                      # Uppdatera mall
src/stores/authStore.ts           # Byt mock mot API-nyckel-validering
src/pages/LoginPage.tsx           # Ta bort input-fält, auto-login
```

- Ta bort användarnamn/lösenord-fält från `LoginPage.tsx`
- `authStore.ts`: anropa `GET /health` med `X-API-Key` för att verifiera nyckeln
- Om 200 → sätt `isAuthenticated: true` automatiskt
- API-nyckeln läses från `VITE_LONEPROCESS_API_KEY` i env

### Steg 2: Query Hooks (READ-ONLY)

**Nya filer:**
```
src/hooks/queries/useEmployees.ts       # För 1.2, 1.3, 1.5, 1.6
src/hooks/queries/useKorningsStatus.ts  # För 2.1, 3.1
src/hooks/queries/useFellistor.ts       # För 2.2
```

```typescript
// Exempel
export function useEmployees(status?: 'new' | 'terminated') {
  return useQuery({
    queryKey: ['employees', status],
    queryFn: () => fetchEmployees(status),
    staleTime: 5 * 60 * 1000, // 5 min
  })
}
```

### Steg 3: Data-komponenter

**Nya filer:**
```
src/features/activities/components/ApiDataDisplay.tsx   # Huvud-wrapper
src/features/activities/components/EmployeeTable.tsx    # För 1.2, 1.3, 1.5, 1.6
src/features/activities/components/StatusCard.tsx       # För 2.1, 3.1
src/features/activities/components/ErrorList.tsx        # För 2.2
```

**ApiDataDisplay** — väljer rätt komponent baserat på `activityId`:
```typescript
interface ApiDataDisplayProps {
  activityId: string   // '1.2', '1.3', '2.1' etc.
  periodId?: number    // Krävs för 2.1, 2.2, 3.1
}
```

### Steg 4: Integrera i ActivityListItemExpanded

```tsx
{activity.hasApiIntegration && isExpanded && (
  <div>
    <h3 className="text-sm font-semibold text-gray-700 mb-3">
      Live Data från System
    </h3>
    <ApiDataDisplay
      activityId={activity.id}
      periodId={currentPeriodId}
    />
  </div>
)}
```

### Steg 5: Loading & Error states

- Loading skeletons för varje data-typ (tabell, status-card, fellista)
- Error state med "Försök igen"-knapp
- Toast-notifikationer vid fel

---

## 📊 UX-EXEMPEL: Aktivitet 1.2 Expanderad

```
┌─────────────────────────────────────────────────────┐
│ 1.2 Hantera nyanställningar                   [API]│
│ ━━━━━━━━━━━━━━━━━━━━━ 0%                           │
└─────────────────────────────────────────────────────┘
  ▼ Expanderad

  📋 Delsteg
  ☐ Kontrollera anställningsavtal
  ☐ Registrera i lönesystem
  ☐ Skapa personalkort

  📊 Live Data från System
  ┌──────────────┬───────────────┬──────────────┐
  │ Personnummer │ Namn          │ Anst.datum   │
  ├──────────────┼───────────────┼──────────────┤
  │ 8901011234   │ Anna Svensson │ 2025-04-01   │
  │ 9102022345   │ Erik Nilsson  │ 2025-04-01   │
  └──────────────┴───────────────┴──────────────┘
```

---

## 🏁 Quick Start

```bash
cd loneprocess-frontend-v2
git checkout main
git pull origin main
npm install
npm run type-check  # Ska passa ✅
npm run lint        # Ska passa ✅
npm test            # Ska passa ✅
```

**Starta milestone:**
```
"Kör Fas 4, Milestone 4.3: API Integration"
```

---

## 🧪 Testing Strategy

- Använd MSW (Mock Service Worker) för att mocka API-svar i tester
- Testa loading state, success state och error state för varje komponent
- Uppdatera authStore-tester för API-nyckel-flow istf mock-login
- Behåll 100% test-pass rate

---

## 📝 Workflow Reminders

### Branch Naming
```
feat/milestone-4.3-api-integration
```

### Commit Pattern
```
feat: add auto-login via API key
feat: add useEmployees query hook
feat: add ApiDataDisplay component
test: add MSW mocks for API endpoints
```

### PR Requirements
- ✅ All CI checks green
- ✅ Tests passing (100%)
- ✅ Type-check passing
- ✅ Lint passing

---

## 🎯 Success Criteria

Milestone 4.3 är klar när:

- ✅ Auto-login via API-nyckel fungerar
- ✅ LoginPage visar ingen input — laddar direkt
- ✅ Query hooks skapade för alla 3 data-typer
- ✅ ApiDataDisplay visar rätt komponent per aktivitet
- ✅ EmployeeTable, StatusCard och ErrorList implementerade
- ✅ Loading + error states fungerar
- ✅ Integrerat i ActivityListItemExpanded
- ✅ Alla tester passerar (100%)
- ✅ Dokumentation uppdaterad
- ✅ PR mergad till main

---

**Happy Coding! 🎉**
