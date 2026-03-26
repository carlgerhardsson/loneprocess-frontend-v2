# 🚀 Next Session Guide - Fas 6: Production Ready

**Last Updated:** 2026-03-26  
**Current Status:** Fas 5 Complete ✅  
**Next Up:** Fas 6 — Production Ready

---

## ⚠️ VIKTIGA ARKITEKTURREGLER

1. **API ägs av externt team** — kan inte påverkas
2. **Read-only** — bara GET-anrop
3. **Autentisering = API-nyckel** — `VITE_LONEPROCESS_API_KEY` i env

---

## 📊 Var vi är

✅ **Klart — Fas 1–5 (100%)**

| Fas | Status |
|---|---|
| Fas 1: Project Setup | ✅ |
| Fas 2: Core Components | ✅ |
| Fas 3: Feature Components | ✅ |
| Fas 4: API Integration | ✅ |
| Fas 5.1: Tab-nav + Period + Löneperioder | ✅ PR #46 |
| Fas 5.2: Bemanningsområde-filtrering | ✅ PR #47 |
| Fas 5.3: Export av checklista (PDF) | ✅ PR #48 |

**Live:** https://carlgerhardsson.github.io/loneprocess-frontend-v2/  
**Tests:** ~330 passing

---

## 🎯 Fas 6: Production Ready

### 6.1 Performance-optimering
- Code splitting / lazy loading per tab
- `React.lazy()` för `LoneperioderTab` och `DashboardOverview`
- Bundle-analys med `vite-bundle-analyzer`

### 6.2 Tillgänglighetsaudit (WCAG 2.1 AA)
- Kör `axe-core` eller `@axe-core/react` i dev
- Kontrollera färgkontraster, focus-ordning, aria-labels
- Keyboard-navigation i tab-komponenter och dropdowns

### 6.3 Felövervakning (Sentry)
- Installera `@sentry/react`
- Konfiguration i `src/lib/monitoring.ts`
- Error boundary kopplad till Sentry

### 6.4 Produktionsdeploy
- Verifiera GitHub Pages-deployment
- Kontrollera att `VITE_LONEPROCESS_API_KEY` är satt i GitHub Secrets
- E2E-test mot live-URL

---

## 🏁 Quick Start

```bash
cd loneprocess-frontend-v2
git checkout main && git pull origin main
npm install
npm test            # ~330 tester ska passa ✅
npm run type-check  # Ska passa ✅
npm run dev         # Starta lokalt
```

**Starta Fas 6:**
```
"Kör Fas 6, Milestone 6.1: Performance-optimering"
```

---

## 📝 Arbetsflöde (alltid följ detta)

```bash
npm test
npm run type-check
npm run lint -- --fix
git add -A && git commit -m "fix: lint auto-fix" && git push origin <branch>
npm run build
```

### Branch naming
```
feat/milestone-6.1-performance
feat/milestone-6.2-accessibility
feat/milestone-6.3-sentry
feat/milestone-6.4-deploy
```

---

**Happy Coding! 🎉**
