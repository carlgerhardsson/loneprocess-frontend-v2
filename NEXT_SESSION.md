# 🚀 Next Session Guide - Fas 5: Advanced Features

> Fas 4 är klar — dags för de funktioner som gör appen komplett!

**Last Updated:** 2026-03-26  
**Current Status:** Fas 4 Complete ✅  
**Next Up:** Fas 5.1 — Löneperiod-integration

---

## ⚠️ VIKTIGA ARKITEKTURREGLER

1. **API ägs av externt team** — kan inte påverkas
2. **Read-only** — bara GET-anrop
3. **Autentisering = API-nyckel** — `VITE_LONEPROCESS_API_KEY` i env

---

## 📊 Var vi är

✅ **Klart — Fas 1–4 (100%):**
- Fas 1: Project Setup
- Fas 2: Core Components  
- Fas 3: Feature Components
- Fas 4.1: React Router
- Fas 4.2: Authentication (API-nyckel, auto-login)
- Fas 4.3: API Integration (7 API-aktiviteter med live data)
- Fas 4.4: Production Error Handling
- Fas 4.5: Data Persistence & Cache

⏳ **Nästa:** Fas 5 — Advanced Features

---

## 🎯 Fas 5 — 3 Milestones

### 5.1 Löneperiod-integration (HÖGST PRIORITET)
**Estimat:** 2–3 timmar  
**Problemet:** `loneperiodId` når aldrig `ApiDataDisplay` — aktiviteterna 2.1, 2.2 och 3.1 visar alltid "Ingen aktiv löneperiod vald".  
**Fix:** Lägg till period-väljare i `DashboardOverview`, propagera `loneperiodId` ned genom `FasCard` → `ActivityListItemExpanded` → `ApiDataDisplay`.

### 5.2 Bemanningsområde-filtrering
**Estimat:** 1–2 timmar  
**Problemet:** Dropdown-filtret i UI:et är dekorativt — kopplat till ingenting.  
**Fix:** Koppla dropdown till state, skicka `org_kod` till `useEmployees`-hooken.

### 5.3 Export av checklista
**Estimat:** 2–3 timmar  
**Värde:** Lönespecialisterna kan spara/skriva ut periodens checklista som PDF.  
**Fix:** `ExportButton`-komponent + print-optimerade CSS-klasser.

📚 **Detaljerad teknisk plan:** [docs/FAS5_PLAN.md](./docs/FAS5_PLAN.md)

---

## 🏁 Quick Start

```bash
cd loneprocess-frontend-v2
git checkout main
git pull origin main
npm install
npm test            # 297 tester ska passa ✅
npm run type-check  # Ska passa ✅
```

**Starta milestone:**
```
"Kör Fas 5, Milestone 5.1: Löneperiod-integration"
```

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
feat/milestone-5.1-period-integration
feat/milestone-5.2-bemanningsomrade
feat/milestone-5.3-export
```

### PR Requirements
- ✅ All CI checks green
- ✅ Tests passing (100%)
- ✅ Type-check passing
- ✅ Lint passing
- ✅ Build passing

---

**Happy Coding! 🎉**
