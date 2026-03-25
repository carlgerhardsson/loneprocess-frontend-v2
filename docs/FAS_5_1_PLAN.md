# 🎯 FAS 5.1 - TEKNISK PLAN

**Issue:** [#35](https://github.com/carlgerhardsson/loneprocess-frontend-v2/issues/35)  
**Status:** 🟡 Planering  
**Estimat:** 6-8 timmar

---

## 📋 MÅL

Bygga om frontend för att matcha v1:s design med:
- **Dashboard** med 3 faskort (Blå, Orange, Grön)
- **Aktivitetslista** med expanderbara rader
- **20 aktiviteter** hårdkodade i frontend
- **localStorage** för användarstatus
- **Backend API** för specifik lönedata

---

## 🎨 REFERENSER

**Skärmdumpar:** `/mnt/project/`
- `Skärmbild_20260324_222546.png` - Dashboard
- `Skärmbild_20260324_222601.png` - Aktivitetslista
- `Skärmbild_20260324_222616.png` - Expanderad vy

---

## 🏗️ IMPLEMENTERINGSSTEG

### **STEG 1: Data Layer (1-2h)**

**Skapa:**
- `src/data/activities.ts` - Alla 20 aktiviteter
- `src/hooks/useActivityProgress.ts` - localStorage hook
- `src/types/activity.ts` - Uppdaterade typer

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

### **STEG 2: Dashboard (1-2h)**

**Komponenter:**
- `src/features/dashboard/components/FasCard.tsx`
- `src/features/dashboard/components/CircularProgress.tsx`
- `src/pages/DashboardPage.tsx`

**3 Faser:**
- **Lön 1** (Blå) - 8 aktiviteter
- **Kontroll** (Orange) - 5 aktiviteter
- **Lön Klar** (Grön) - 7 aktiviteter

---

### **STEG 3: Aktivitetslista (2-3h)**

**Komponenter:**
- `ActivityListItemExpanded.tsx` - Expanderbar row
- `DelstegChecklist.tsx` - Checkboxar
- `ActivityReferences.tsx` - POL-länkar
- `ActivityComments.tsx` - Kommentarsfält
- `ApiBadge.tsx` - Grön "API" badge

---

### **STEG 4: API Integration (1h)**

**Mappning:**
```typescript
'1.2': '/api/v1/la/employees?status=new'
'1.3': '/api/v1/la/employees?status=terminated'
'2.1': '/api/v1/la/periods/{id}/korningsstatus'
'2.2': '/api/v1/la/fellistor/{id}'
'3.1': '/api/v1/la/periods/{id}/korningsstatus'
```

---

### **STEG 5: Styling (1h)**

- Matcha färger från skärmdumpar
- Responsiv design
- Animationer

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

### **Unit Tests:**
- useActivityProgress hook
- FasCard component
- DelstegChecklist component

### **E2E Tests:**
- Dashboard visar 3 faskort
- Expandera aktivitet
- Bocka av delsteg
- localStorage sparas

---

## 📈 PROGRESS

- [x] Planering & Issue skapad
- [ ] STEG 1: Data Layer
- [ ] STEG 2: Dashboard
- [ ] STEG 3: Aktivitetslista
- [ ] STEG 4: API Integration
- [ ] STEG 5: Styling
- [ ] Testing
- [ ] Deployment

---

## 🔗 LÄNKAR

- **Issue:** [#35](https://github.com/carlgerhardsson/loneprocess-frontend-v2/issues/35)
- **Backend API:** https://loneprocess-api-922770673146.us-central1.run.app/api/v1
- **Live Demo:** https://carlgerhardsson.github.io/loneprocess-frontend-v2/

---

_Uppdaterad: 2026-03-25_
