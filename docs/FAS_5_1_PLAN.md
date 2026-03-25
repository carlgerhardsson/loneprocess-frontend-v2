# 🎯 FAS 5.1 - TEKNISK PLAN

**Issue:** [#35](https://github.com/carlgerhardsson/loneprocess-frontend-v2/issues/35)  
**Status:** 🟢 **STEG 1-3 KLARA!** (60% komplett)  
**Estimat:** 6-8 timmar (2h kvar)

---

## 📋 MÅL

Bygga om frontend för att matcha v1:s design med:
- ✅ **Dashboard** med 3 faskort (Blå, Orange, Grön)
- ✅ **Aktivitetslista** med expanderbara rader
- ✅ **20 aktiviteter** hårdkodade i frontend
- ✅ **localStorage** för användarstatus
- ✅ **Comprehensive unit tests** för alla komponenter
- ⏳ **Backend API** för specifik lönedata (återstår)

---

## 🎨 REFERENSER

**Skärmdumpar:** `/mnt/project/`
- `Skärmbild_20260324_222546.png` - Dashboard
- `Skärmbild_20260324_222601.png` - Aktivitetslista
- `Skärmbild_20260324_222616.png` - Expanderad vy

---

## 🏗️ IMPLEMENTERINGSSTEG

### **STEG 1: Data Layer** ✅ **KOMPLETT**

**PR:** [#36](https://github.com/carlgerhardsson/loneprocess-frontend-v2/pull/36) - Merged

**Skapade filer:**
- ✅ `src/data/activities.ts` - Alla 20 aktiviteter
- ✅ `src/types/activityDef.ts` - Nya FAS-typer
- ✅ `src/data/README.md` - Dokumentation

**Features:**
- ✅ 20 aktiviteter fördelade över 3 faser
- ✅ Varje aktivitet har 3-5 delsteg
- ✅ POL-referenser och API-flaggor
- ✅ Färgschema (Blå, Orange, Grön)

**localStorage Schema:**
```json
{
  "loneportal-progress": {
    "currentPeriod": "2025-03",
    "activities": {
      "1.1": {
        "delstegCompleted": [true, false, true],
        "comment": "OK",
        "assignedTo": "Elif Bylund",
        "lastUpdated": "2025-03-25T10:00:00Z"
      }
    }
  }
}
```

---

### **STEG 2: Dashboard** ✅ **KOMPLETT**

**PR:** [#38](https://github.com/carlgerhardsson/loneprocess-frontend-v2/pull/38) - Merged

**Komponenter skapade:**
- ✅ `src/features/dashboard/components/DashboardOverview.tsx`
- ✅ `src/features/dashboard/components/FasCard.tsx`
- ✅ `src/features/dashboard/components/CircularProgress.tsx`
- ✅ `src/pages/DashboardPage.tsx`

**3 Faser:**
- ✅ **Lön 1** (Blå) - 8 aktiviteter
- ✅ **Kontroll** (Orange) - 5 aktiviteter
- ✅ **Lön Klar** (Grön) - 7 aktiviteter

**Features:**
- ✅ Circular progress rings per fas
- ✅ Stats bar med totalt antal
- ✅ Färgkodade kort
- ✅ Responsiv grid layout

---

### **STEG 3: Aktivitetslista** ✅ **KOMPLETT**

**PR:** [#37](https://github.com/carlgerhardsson/loneprocess-frontend-v2/pull/37) - Merged

**Komponenter skapade:**
- ✅ `src/features/activities/components/ActivityListItemExpanded.tsx` - Expanderbar row
- ✅ `src/features/activities/components/DelstegChecklist.tsx` - Checkboxar
- ✅ `src/features/activities/components/ActivityReferences.tsx` - POL-länkar
- ✅ `src/features/activities/components/ActivityComments.tsx` - Kommentarsfält
- ✅ `src/contexts/ActivityProgressContext.tsx` - Delad state via Context
- ✅ `src/hooks/useActivityProgress.ts` - Progress hook

**Test Coverage (49 nya tests):**
- ✅ `src/contexts/ActivityProgressContext.test.tsx` (8 tests)
- ✅ `src/hooks/useActivityProgress.test.ts` (4 tests)
- ✅ `src/features/activities/components/DelstegChecklist.test.tsx` (8 tests)
- ✅ `src/features/activities/components/ActivityComments.test.tsx` (7 tests)
- ✅ `src/features/activities/components/ActivityListItemExpanded.test.tsx` (13 tests)
- ✅ `src/features/activities/components/ActivityReferences.test.tsx` (9 tests)

**Features:**
- ✅ Klick för expandera/kollapsa
- ✅ Interaktiva checkboxar för delsteg
- ✅ localStorage persistence
- ✅ Real-time progress uppdatering
- ✅ Auto-save kommentarer (on blur + Cmd/Ctrl+Enter)
- ✅ Klickbara POL-referenser
- ✅ Färgkodade checkboxar per fas
- ✅ API-badges visas

**Bugfixar:**
- ✅ Checkbox-kontrast (använder `-900` färger)
- ✅ Progress-synkning via Context Provider
- ✅ Routing till `/dashboard`
- ✅ ESLint warnings fixade
- ✅ TypeScript errors fixade
- ✅ Unit tests uppdaterade (240 passed - 49 nya!)
- ✅ E2E tests uppdaterade (2 passed)
- ✅ Prettier formatting fixade

---

### **STEG 4: API Integration** ⏳ **ÅTERSTÅR** (~1h)

**TODO:**
- [ ] Skapa `src/features/activities/components/ApiDataDisplay.tsx`
- [ ] Integrera med backend endpoints
- [ ] Visa live data när aktivitet expanderas
- [ ] Error handling och loading states

**API Mappning:**
```typescript
'1.2': '/api/v1/la/employees?status=new'
'1.3': '/api/v1/la/employees?status=terminated'
'1.5': '/api/v1/la/employees' // uppdateringar
'1.6': '/api/v1/la/employees' // händelser
'2.1': '/api/v1/la/periods/{id}/korningsstatus'
'2.2': '/api/v1/la/fellistor/{id}'
'3.1': '/api/v1/la/periods/{id}/korningsstatus'
```

---

### **STEG 5: Styling** ⏳ **ÅTERSTÅR** (~1h)

**TODO:**
- [ ] Micro-interactions och animationer
- [ ] Responsiv design (mobil/tablet)
- [ ] Accessibility improvements
- [ ] Dark mode support (optional)
- [ ] Final design tweaks

---

## 📊 AKTIVITETSÖVERSIKT

### **FAS 1: FÖRE LÖNEBERÄKNING** 🔵

1. 1.1 Kontrollera driftsbilden ❌
2. 1.2 Hantera nyanställningar ✅ API
3. 1.3 Registrera slutlöner ✅ API
4. 1.4 Hämta skatteuppgifter ❌
5. 1.5 Uppdatera tillägg/avdrag ✅ API
6. 1.6 Rapportera lönehändelser ✅ API
7. 1.7 Läs in externa filer ❌
8. 1.8 Konteringsvalidering ❌

### **FAS 2: KONTROLLPERIOD** 🟠

1. 2.1 Starta prövlönekörning ✅ API
2. 2.2 Granska felsignaler AGI ✅ API
3. 2.3 Granska lönesummor ❌
4. 2.4 Kontrollera frånvaro ❌
5. 2.5 Korrigera fel ❌

### **FAS 3: EFTER LÖNEBERÄKNING** 🟢

1. 3.1 Definitiv lönekörning ✅ API
2. 3.2 Granska lönespecifikationer ❌
3. 3.3 Hantera extratutbetalningar ❌
4. 3.4 Skicka bankfil ❌
5. 3.5 Kontrollera redovisning ❌
6. 3.6 Arkivera underlag ❌
7. 3.7 Stäng löneperioden ❌

**Totalt:**
- 20 aktiviteter
- 7 med API-integration (✅)
- 13 manuella (❌)

---

## 🧪 TESTING

### **Unit Tests:** ✅ **240 TESTS PASSING**

**Test Files:** 46 passed (46)
**Tests:** 240 passed (240)
  - Previous: 191 tests
  - **New:** 49 tests (STEG 3 components)

**STEG 3 Test Coverage:**
1. ✅ `ActivityProgressContext.test.tsx` (8 tests)
   - Context provider state management
   - Toggle delsteg with localStorage persistence
   - Update comments and assignee
   - Calculate completion percentage
   - Reset progress functionality
   - Persist across re-renders

2. ✅ `useActivityProgress.test.ts` (4 tests)
   - Hook throws error outside Provider
   - Returns all context values correctly
   - All functions available

3. ✅ `DelstegChecklist.test.tsx` (8 tests)
   - Renders all checkboxes with correct structure
   - Toggle functionality via button clicks
   - Shows "Obligatorisk" badge for required items
   - Applies line-through styling when checked
   - Persists to localStorage
   - Applies correct accent colors

4. ✅ `ActivityComments.test.tsx` (7 tests)
   - Renders textarea
   - Displays existing comments from localStorage
   - Saves on blur
   - Saves on Cmd+Enter (Mac) and Ctrl+Enter (Windows)
   - Updates on typing
   - Shows helper text

5. ✅ `ActivityListItemExpanded.test.tsx` (13 tests)
   - Renders activity title and process number
   - Starts collapsed, expands/collapses on click
   - Shows progress bar and completion percentage
   - Shows API badge when applicable
   - Chevron rotates 90 degrees when expanded
   - Shows references and comment field when expanded
   - Shows default assignee if provided
   - Shows completed checkmark at 100%

6. ✅ `ActivityReferences.test.tsx` (9 tests)
   - Renders all references with correct structure
   - Links have correct href and open in new tab
   - Shows icons for each reference type
   - Shows type labels (POL, Extern, Intern)
   - Shows section heading
   - Shows message when no references
   - Applies correct styling classes

**All other tests:**
- ✅ smoke.test.ts
- ✅ LoginPage.test.tsx
- ✅ Header.test.tsx
- ✅ Plus 37 other test files

### **E2E Tests:** ✅ **PASSAR**
- ✅ Dashboard visar 3 faskort
- ✅ Expandera aktivitet
- ✅ Bocka av delsteg
- ✅ localStorage sparas
- ✅ 2 tests passed

### **CI/CD:** ✅ **GRÖN**
- ✅ Type check (TypeScript)
- ✅ Lint (ESLint)
- ✅ Format check (Prettier)
- ✅ Unit tests (Vitest - 240 tests)
- ✅ E2E tests (Playwright - 2 tests)
- ✅ Build (Vite)

---

## 📈 PROGRESS

- [x] Planering & Issue skapad
- [x] **STEG 1: Data Layer** ✅
- [x] **STEG 2: Dashboard** ✅
- [x] **STEG 3: Aktivitetslista** ✅
- [x] **STEG 3: Unit Tests** ✅ (49 nya tests!)
- [ ] STEG 4: API Integration ⏳
- [ ] STEG 5: Styling ⏳
- [x] Testing (240 unit + 2 E2E) ✅
- [x] CI/CD Pipeline ✅
- [ ] Final Deployment

**Status:** **60% komplett** (3 av 5 steg klara)

---

## 🔗 LÄNKAR

- **Issue:** [#35](https://github.com/carlgerhardsson/loneprocess-frontend-v2/issues/35)
- **PRs:**
  - [#36](https://github.com/carlgerhardsson/loneprocess-frontend-v2/pull/36) - Data Layer ✅
  - [#38](https://github.com/carlgerhardsson/loneprocess-frontend-v2/pull/38) - Dashboard ✅
  - [#37](https://github.com/carlgerhardsson/loneprocess-frontend-v2/pull/37) - Expandable Activities ✅
- **Backend API:** https://loneprocess-api-922770673146.us-central1.run.app/api/v1
- **Live Demo:** https://carlgerhardsson.github.io/loneprocess-frontend-v2/dashboard

---

## 📝 SESSION NOTES

### **Session 2026-03-25 (Part 2):**

**Completed:**
- ✅ STEG 3: Comprehensive unit tests (49 nya tests!)
- ✅ Created 6 test files for all STEG 3 components
- ✅ Fixed all test failures (29 failed → 0 failed)
- ✅ Fixed Prettier formatting issues
- ✅ All tests passing (240 total)
- ✅ CI/CD pipeline green

**Test Creation Process:**
1. ✅ Created initial 6 test files (6b8debca)
2. ✅ Fixed DelstegChecklist & ActivityReferences tests (3e8cb8fc)
3. ✅ Fixed ActivityListItemExpanded tests (d5cb1ae9)
4. ✅ Fixed placeholder text matching (20ddc2f6)
5. ✅ Fixed Prettier formatting (c30faec3)

**Key Fixes:**
- Updated DelstegChecklist to use `Delsteg[]` type with `{ id, text, required }`
- Changed colorScheme prop to match implementation
- Fixed ActivityReferences to use `{ type, title, url }` structure
- Updated ActivityListItemExpanded to use `ActivityDefinition` type
- Fixed chevron rotation expectation (rotate-90)
- Fixed placeholder text regex patterns
- Removed extra indentation and parentheses

**Next Session:**
- [ ] STEG 4: API Integration (~1h)
- [ ] STEG 5: Styling Polish (~1h)

### **Session 2026-03-25 (Part 1):**

**Completed:**
- ✅ STEG 1: Data Layer (PR #36)
- ✅ STEG 2: Dashboard (PR #38)
- ✅ STEG 3: Expandable Activities (PR #37)
- ✅ Fixed checkbox colors (from `-200` to `-900`)
- ✅ Fixed progress syncing via Context Provider
- ✅ Fixed routing to `/dashboard`
- ✅ Fixed all ESLint warnings
- ✅ Fixed all TypeScript errors
- ✅ Updated unit tests (191 passed)
- ✅ Updated E2E tests (2 passed)
- ✅ CI/CD pipeline green

---

_Uppdaterad: 2026-03-25 21:00 CET_
