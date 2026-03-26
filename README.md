# 🚀 Löneportalen v2.0 - Modern React Migration

> Production-ready digital checklista för löneprocessen - Built with React + TypeScript

[![CI](https://github.com/carlgerhardsson/loneprocess-frontend-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/carlgerhardsson/loneprocess-frontend-v2/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/badge/tests-285%20passing-success)](https://github.com/carlgerhardsson/loneprocess-frontend-v2)
[![Coverage](https://img.shields.io/badge/coverage-100%25-success)](https://github.com/carlgerhardsson/loneprocess-frontend-v2)

## 📋 Project Status

**Current Phase:** 🟢 Fas 1–3 COMPLETE | 🔵 Fas 4 IN PROGRESS (75%)  
**Version:** 2.0.0  
**Test Suite:** ✅ 285 tests (283 unit + 2 E2E)  
**Components:** 35 production-ready  
**Status:** Milestone 4.3 API Integration Complete

📖 **[View Detailed Status →](./PROJECT_STATUS.md)**  
🚀 **[Next Session Guide →](./NEXT_SESSION.md)**  
🏛️ **[Architecture →](./docs/ARCHITECTURE.md)**

---

## ⚠️ Viktiga arkitekturprinciper

1. **API ägs av externt team** — inga krav kan ställas på API-sidan
2. **Read-only** — applikationen hämtar bara data, inga POST/PUT/DELETE
3. **Autentisering = API-nyckel** — `VITE_LONEPROCESS_API_KEY` i env, auto-login

---

## 🏗️ Tech Stack

### Core
- ⚛️ **React 18.3.1** + **TypeScript 5.9.3**
- ⚡ **Vite 6.0.11** - Lightning fast build tool
- 🎨 **Tailwind CSS 3.4.17** - Utility-first styling
- 🧭 **React Router v6** - Client-side routing ✅

### State & Data
- 🔄 **Zustand 5.0.2** - Lightweight state management
- 🔌 **TanStack Query v5** - Server state management
- 🔐 **Auth via API-nyckel** - X-API-Key header, auto-login ✅

### Quality & Testing
- 🧪 **Vitest 1.6.1** - Unit & component tests
- 🎭 **Playwright 1.49.1** - E2E testing
- 📚 **Testing Library** - React component testing
- ✅ **285 passing tests** (100% success rate)

---

## 🚀 Quick Start

```bash
# Clone repo
git clone https://github.com/carlgerhardsson/loneprocess-frontend-v2.git
cd loneprocess-frontend-v2

# Install dependencies
npm install

# Sätt upp env-variabler
cp .env.example .env.local
# Fyll i VITE_LONEPROCESS_API_KEY i .env.local

# Start dev server (Port 5173)
npm run dev

# Run tests
npm test

# Type check
npm run type-check

# Lint (med auto-fix)
npm run lint -- --fix

# Build for production
npm run build

# E2E tests
npm run e2e
```

---

## 📊 Migration Progress

### ✅ Fas 1–3: COMPLETE
- ✅ Fas 1: Project Setup (Vite, TypeScript, ESLint, CI/CD)
- ✅ Fas 2: Core Components (Layout, Loading, Errors, API Client, Stores)
- ✅ Fas 3: Feature Components (ActivityList, Periods, Details, Comments, Search)

---

### 🔵 Fas 4: Integration & API (IN PROGRESS - 75%)

- ✅ **4.1** React Router Setup
- ✅ **4.2** Authentication Flow (API-nyckel, auto-login)
- ✅ **4.3** API Integration (query hooks + data-komponenter för 7 API-aktiviteter)
- ⏳ **4.4** Production Error Handling (global errors, toasts)
- ⏳ **4.5** Data Persistence & Cache

**Vad som är klart i 4.3:**
- ✅ Auto-login via `VITE_LONEPROCESS_API_KEY` — ingen input krävs
- ✅ `useEmployees`, `useKorningsStatus`, `useFellistor` — React Query hooks
- ✅ `EmployeeTable`, `StatusCard`, `ErrorList`, `ApiDataDisplay` — data-komponenter
- ✅ Integrerat i `ActivityListItemExpanded` för de 7 API-aktiviteterna
- ✅ Loading skeletons + error states med retry-knapp

---

### ⏳ Fas 5: Advanced Features
- Dashboard med framdriftsöversikt
- Avancerad filtrering (datum, bemanningsområde)
- Export-funktion (PDF/Excel)

---

### ⏳ Fas 6: Production Ready
- Performance-optimering
- Tillgänglighetsaudit (WCAG 2.1 AA)
- Felövervakning (Sentry)
- Produktionsdeploy

---

## 🔌 De 7 API-aktiviteterna

| Aktivitet | Hook | Endpoint |
|---|---|---|
| 1.2 Nyanställningar | `useEmployees({ status: 'new' })` | `GET /api/v1/la/employees?status=new` |
| 1.3 Slutlöner | `useEmployees({ status: 'terminated' })` | `GET /api/v1/la/employees?status=terminated` |
| 1.5 Tillägg/avdrag | `useEmployees()` | `GET /api/v1/la/employees` |
| 1.6 Lönehändelser | `useEmployees()` | `GET /api/v1/la/employees` |
| 2.1 Provlönekörning | `useKorningsStatus(id)` | `GET /api/v1/la/periods/{id}/korningsstatus` |
| 2.2 Felsignaler AGI | `useFellistor(id)` | `GET /api/v1/la/fellistor/{id}` |
| 3.1 Definitiv körning | `useKorningsStatus(id)` | `GET /api/v1/la/periods/{id}/korningsstatus` |

---

## 🎯 CI/CD Gates

Every commit must pass:
- ✅ TypeScript type check (`npm run type-check`)
- ✅ ESLint with 0 errors (`npm run lint`)
- ✅ All tests pass (`npm test`)
- ✅ Build succeeds (`npm run build`)
- ✅ E2E tests pass (`npm run e2e`)

---

## 📁 Project Structure

```
src/
├── components/          # Core reusable components
│   ├── layout/         # Header, Footer, PageLayout
│   ├── loading/        # Spinner, Skeleton, LoadingOverlay, ProgressBar
│   ├── errors/         # ErrorBoundary, ErrorFallback
│   └── auth/           # SessionManager
├── features/
│   └── activities/
│       └── components/ # ActivityList, ApiDataDisplay, EmployeeTable,
│                       # StatusCard, ErrorList, DelstegChecklist, m.fl.
├── hooks/
│   └── queries/        # useActivities, usePeriods, useEmployees,
│                       # useKorningsStatus, useFellistor
├── lib/
│   ├── api/            # apiClient (Axios), la.ts, auth.ts, env.ts
│   └── query/          # React Query config
├── stores/             # authStore, activitiesStore, periodsStore
├── types/              # activity.ts, auth.ts, la.ts, period.ts
├── pages/              # LoginPage, ActivitiesPage, ActivityDetailPage
└── router/             # React Router + ProtectedRoute
```

---

## 🔗 Links

- **Live Demo:** [GitHub Pages](https://carlgerhardsson.github.io/loneprocess-frontend-v2/)
- **API:** `https://loneprocess-api-922770673146.us-central1.run.app` (externt team)
- **API Docs:** `https://loneprocess-api-922770673146.us-central1.run.app/docs`
- **Project Status:** [PROJECT_STATUS.md](./PROJECT_STATUS.md)
- **Next Session:** [NEXT_SESSION.md](./NEXT_SESSION.md)
- **Architecture:** [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

---

## 🎊 Latest Achievements

**Session: 2026-03-26**
- ✅ Milestone 4.3 komplett (3 steg, 5 PRs mergade)
- ✅ Auto-login via API-nyckel implementerat
- ✅ 3 React Query hooks för LA-endpoints
- ✅ 4 data-komponenter för de 7 API-aktiviteterna
- ✅ 285 tester passerar (100%)
- ✅ Arkitekturdokumentation skapad

---

**Built with ❤️ | Fas 1–3 Complete ✅ | Fas 4: 75% 🔵**

_Last updated: 2026-03-26_
