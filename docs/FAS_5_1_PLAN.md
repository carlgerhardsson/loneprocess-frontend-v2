# 🎯 FAS 5.1 - TEKNISK PLAN

**Issue:** [#35](https://github.com/carlgerhardsson/loneprocess-frontend-v2/issues/35)  
**Status:** 🟢 **STEG 1-3 KLARA!** (60% komplett)  
**Estimat:** 6-8 timmar (4h kvar)

---

## 📋 MÅL

Bygga om frontend för att matcha v1:s design med:
- ✅ **Dashboard** med 3 faskort (Blå, Orange, Grön)
- ✅ **Aktivitetslista** med expanderbara rader
- ✅ **20 aktiviteter** hårdkodade i frontend
- ✅ **localStorage** för användarstatus
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
- ✅ Unit tests uppdaterade (191 passed)
- ✅ E2E tests uppdaterade (2 passed)

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

### **Unit Tests:** ✅ **PASSAR**
- ✅ smoke.test.ts
- ✅ LoginPage.test.tsx
- ✅ Header.test.tsx
- ✅ 191 tests passed

### **E2E Tests:** ✅ **PASSAR**
- ✅ Dashboard visar 3 faskort
- ✅ Expandera aktivitet
- ✅ Bocka av delsteg
- ✅ localStorage sparas
- ✅ 2 tests passed

### **CI/CD:** ✅ **GRÖN**
- ✅ Type check
- ✅ Lint
- ✅ Format check
- ✅ Unit tests
- ✅ E2E tests
- ✅ Build

---

## 📈 PROGRESS

- [x] Planering & Issue skapad
- [x] **STEG 1: Data Layer** ✅
- [x] **STEG 2: Dashboard** ✅
- [x] **STEG 3: Aktivitetslista** ✅
- [ ] STEG 4: API Integration ⏳
- [ ] STEG 5: Styling ⏳
- [x] Testing (191 unit + 2 E2E) ✅
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

### **Session 2026-03-25:**

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

**Next Session:**
- [ ] STEG 4: API Integration (~1h)
- [ ] STEG 5: Styling Polish (~1h)

---

_Uppdaterad: 2026-03-25 16:00 CET_
