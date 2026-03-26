# 🚀 Next Session Guide - Fas 4.4: Production Error Handling

> Milestone 4.3 är klar — dags för robust felhantering

**Last Updated:** 2026-03-26  
**Current Status:** Milestone 4.3 Complete ✅  
**Next Up:** Milestone 4.4 - Production Error Handling

---

## ⚠️ VIKTIGA ARKITEKTURREGLER — LÄS DETTA FÖRST

1. **API ägs av externt team** — kan inte påverkas
2. **Read-only** — bara GET-anrop, inga mutationer
3. **Autentisering = API-nyckel** — `VITE_LONEPROCESS_API_KEY` i env, auto-login

---

## 📊 Var vi är

✅ **Klart:**
- Fas 1–3: 100%
- Fas 4.1: React Router ✅
- Fas 4.2: Authentication Flow ✅
- Fas 4.3: API Integration ✅
  - Auto-login via API-nyckel
  - Query hooks: `useEmployees`, `useKorningsStatus`, `useFellistor`
  - Data-komponenter: `EmployeeTable`, `StatusCard`, `ErrorList`, `ApiDataDisplay`
  - Integrerat i `ActivityListItemExpanded`

🔵 **Pågående:** Fas 4 - Integration & API (75%)

---

## 🎯 Nästa Milestone: 4.4 - Production Error Handling

**Estimat:** 1–2 timmar  
**Mål:** Konsekvent, användarvänlig felhantering i hela appen

### Vad som ska byggas

**1. Global Error Boundary**
- Fånga upp oväntade React-fel på app-nivå
- Visa en snygg felsida istf vit skärm
- "Ladda om sidan"-knapp

**2. Toast Notifications**
- Redan finns `Toast`-komponent och `useToast`-hook i projektet
- Integrera med API-fel — visa toast vid nätverksfel
- Konsekvent användning i hela appen

**3. API Error Mapping**
- Mappa HTTP-statuskoder till svenska felmeddelanden
- 401 → "Din session har gått ut, laddar om..."
- 404 → "Data hittades inte"
- 500 → "Serverfel, försök igen senare"
- Nätverksfel → "Kan inte ansluta till systemet"

**4. Error States i komponenter**
- Kontrollera att alla komponenter hanterar error-state korrekt
- `ApiDataDisplay` har redan retry-knapp — verifiera att den fungerar end-to-end

---

## 📁 Filer att skapa/uppdatera

```
src/lib/api/errors.ts          # Uppdatera med svenska felmeddelanden
src/components/errors/         # Uppdatera GlobalErrorBoundary om behövs
src/hooks/useApiError.ts       # Ny hook för konsekvent felhantering
```

---

## 🏁 Quick Start

```bash
cd loneprocess-frontend-v2
git checkout main
git pull origin main
npm install
npm test            # 285 tester ska passa ✅
npm run type-check  # Ska passa ✅
```

**Starta milestone:**
```
"Kör Fas 4, Milestone 4.4: Production Error Handling"
```

---

## 📝 Arbetsflöde (alltid följ detta)

```bash
# Efter git pull, testa allt:
npm test
npm run type-check
npm run lint -- --fix
git add -A
git commit -m "fix: lint auto-fix"
git push origin <branch-namn>
npm run build
```

### Branch Naming
```
feat/milestone-4.4-error-handling
```

### PR Requirements
- ✅ All CI checks green
- ✅ Tests passing (100%)
- ✅ Type-check passing
- ✅ Lint passing
- ✅ Build passing

---

## 🎯 Success Criteria

Milestone 4.4 är klar när:

- ✅ Global error boundary fångar oväntade fel
- ✅ Toast-notifikationer visas vid API-fel
- ✅ Svenska felmeddelanden för alla HTTP-statuskoder
- ✅ Konsekvent felhantering i hela appen
- ✅ Alla tester passerar (100%)
- ✅ PR mergad till main
- ✅ Dokumentation uppdaterad

---

**Happy Coding! 🎉**
