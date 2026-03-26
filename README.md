# 🚀 Löneportalen v2.0 - Modern React Migration

> Production-ready digital checklista för löneprocessen - Built with React + TypeScript

[![CI](https://github.com/carlgerhardsson/loneprocess-frontend-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/carlgerhardsson/loneprocess-frontend-v2/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/badge/tests-297%20passing-success)](https://github.com/carlgerhardsson/loneprocess-frontend-v2)
[![Coverage](https://img.shields.io/badge/coverage-100%25-success)](https://github.com/carlgerhardsson/loneprocess-frontend-v2)

## 📋 Project Status

**Current Phase:** 🟢 Fas 1–4 COMPLETE | ⏳ Fas 5 PLANNED  
**Version:** 2.0.0  
**Test Suite:** ✅ 297 tests (295 unit + 2 E2E)  
**Components:** 35 production-ready  
**Status:** Fas 4 API Integration Complete 🎉

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
- ✅ **297 passing tests** (100% success rate)

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

### ✅ Fas 1–4: COMPLETE

- ✅ **Fas 1:** Project Setup (Vite, TypeScript, ESLint, CI/CD)
- ✅ **Fas 2:** Core Components (Layout, Loading, Errors, API Client, Stores)
- ✅ **Fas 3:** Feature Components (ActivityList, Periods, Details, Comments, Search)
- ✅ **Fas 4:** Integration & API
  - 4.1 React Router Setup
  - 4.2 Authentication Flow (API-nyckel, auto-login)
  - 4.3 API Integration (query hooks + data-komponenter för 7 API-aktiviteter)
  - 4.4 Production Error Handling (svenska felmeddelanden, global toast)
  - 4.5 Data Persistence & Cache (optimerad cache-strategi per datatyp)

---

### ⏳ Fas 5: Advanced Features (NEXT)

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

## 🎊 Latest Achievements

**Session: 2026-03-26**
- ✅ Fas 4 komplett (5 milestones, 10 PRs mergade)
- ✅ Auto-login via API-nyckel
- ✅ 7 API-aktiviteter med live data
- ✅ Global felhantering med svenska meddelanden
- ✅ Optimerad cache-strategi per datatyp
- ✅ 297 tester passerar (100%)

---

## 🔗 Links

- **Live Demo:** [GitHub Pages](https://carlgerhardsson.github.io/loneprocess-frontend-v2/)
- **API:** `https://loneprocess-api-922770673146.us-central1.run.app` (externt team)
- **Project Status:** [PROJECT_STATUS.md](./PROJECT_STATUS.md)
- **Next Session:** [NEXT_SESSION.md](./NEXT_SESSION.md)
- **Architecture:** [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

---

**Built with ❤️ | Fas 1–4 Complete ✅ | Fas 5: Planerad ⏳**

_Last updated: 2026-03-26_
