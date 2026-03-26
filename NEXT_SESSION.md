# 🚀 Next Session Guide - Fas 5: Advanced Features

> Fas 4 är klar — dags för avancerade funktioner!

**Last Updated:** 2026-03-26  
**Current Status:** Fas 4 Complete ✅  
**Next Up:** Fas 5 - Advanced Features

---

## ⚠️ VIKTIGA ARKITEKTURREGLER — LÄS DETTA FÖRST

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
- Fas 4.2: Authentication Flow (API-nyckel, auto-login)
- Fas 4.3: API Integration (7 API-aktiviteter med live data)
- Fas 4.4: Production Error Handling (svenska felmeddelanden, global toast)
- Fas 4.5: Data Persistence & Cache (optimerad cache per datatyp)

⏳ **Nästa:** Fas 5 - Advanced Features

---

## 🎯 Fas 5: Advanced Features

### 5.1 Dashboard med framdriftsöversikt
**Estimat:** 2–3 timmar  
**Vad:**
- Sammanfattningskort: totalt antal aktiviteter, klara, kvar
- Framdriftsbar per fas (Lön 1 / Kontroll / Lön Klar)
- Aktiv löneperiod visas prominent

### 5.2 Avancerad filtrering
**Estimat:** 1–2 timmar  
**Vad:**
- Filtrering på bemanningsområde
- Datumfilter för löneperioder
- Spara filterinställningar i URL-params

### 5.3 Export-funktion
**Estimat:** 2–3 timmar  
**Vad:**
- Exportera checklista som PDF
- Exportera fellista som Excel

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

---

## 📝 Arbetsflöde (alltid följ detta)

```bash
# Efter git pull:
npm test
npm run type-check
npm run lint -- --fix
git add -A && git commit -m "fix: lint auto-fix" && git push origin <branch>
npm run build
```

### Branch Naming
```
feat/milestone-5.1-dashboard
feat/milestone-5.2-filtering
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
