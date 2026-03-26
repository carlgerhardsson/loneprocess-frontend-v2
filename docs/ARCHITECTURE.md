# 🏗️ Arkitektur & Principer

> Grundläggande regler för hur detta projekt fungerar.

**Skapad:** 2026-03-26

---

## Systembild

```
┌─────────────────────────────────┐      ┌──────────────────────────────────────┐
│  Frontend (detta team)          │      │  Backend API (externt team)           │
│  loneprocess-frontend-v2        │─────▶│  loneprocess-api                     │
│  React + TypeScript             │ GET  │  FastAPI + Firestore                  │
│  GitHub Pages                   │ only │  Google Cloud Run                    │
└─────────────────────────────────┘      └──────────────────────────────────────┘
```

---

## Grundregler

### 1. API ägs av externt team
Frontend-teamet kan **inte** påverka, ändra eller ställa krav på API:et. Om ett endpoint saknas eller beter sig oväntat — anpassa frontend, inte API.

### 2. Read-Only
Applikationen **hämtar bara data**. Inga POST/PUT/PATCH/DELETE-anrop från frontend.

### 3. Autentisering
API:et använder `X-API-Key` header. Nyckeln sätts i env-variabeln `VITE_LONEPROCESS_API_KEY`. Inloggning sker automatiskt — användaren ser inget lösenordsfält.

```
X-API-Key: <VITE_LONEPROCESS_API_KEY>
```

### 4. Valda endpoints
Detta team väljer själv vilka endpoints som ger värde för applikationen. Se [NEXT_SESSION.md](../NEXT_SESSION.md) för komplett mappning.

---

## Environment Variables

| Variabel | Beskrivning | Krävs |
|---|---|---|
| `VITE_API_URL` | API bas-URL | Ja |
| `VITE_LONEPROCESS_API_KEY` | API-nyckel för autentisering | Ja |

---

## Dataflöde

```
Användare öppnar app
  → Auto-login: verifiera API-nyckel mot /health
  → Hämta löneperioder: GET /api/v1/loneperiods
  → Hämta aktiviteter: GET /api/v1/activities
  → Användare expanderar API-aktivitet
    → Hämta live data från specifik endpoint
    → Visa i EmployeeTable / StatusCard / ErrorList
```

---

## Komponenter som hanterar API-data

| Komponent | Används för | Endpoints |
|---|---|---|
| `EmployeeTable` | Aktivitet 1.2, 1.3, 1.5, 1.6 | `/api/v1/la/employees` |
| `StatusCard` | Aktivitet 2.1, 3.1 | `/api/v1/la/periods/{id}/korningsstatus` |
| `ErrorList` | Aktivitet 2.2 | `/api/v1/la/fellistor/{id}` |
| `ApiDataDisplay` | Wrapper — väljer rätt komponent | — |
