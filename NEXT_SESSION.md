# 🚀 Next Session Guide - Fas 5.1: Tab-navigation, Period-väljare & Löneperioder

> Fas 4 klar — nu bygger vi om dashboard för att matcha v1.5.0-designen

**Last Updated:** 2026-03-26  
**Current Status:** Fas 4 Complete ✅  
**Next Up:** Fas 5.1 — Tab-navigation + Period-integration

---

## ⚠️ VIKTIGA ARKITEKTURREGLER

1. **API ägs av externt team** — kan inte påverkas
2. **Read-only** — bara GET-anrop
3. **Autentisering = API-nyckel** — `VITE_LONEPROCESS_API_KEY` i env

---

## 📊 Var vi är

✅ **Klart — Fas 1–4 (100%)**

⏳ **Nästa:** Fas 5.1 — Tab-navigation, Period-väljare & Löneperioder-sida

---

## 🎯 Fas 5.1 — Vad som ska byggas

Baserat på skärmbilder från v1.5.0. Tre delar hänger ihop:

### Del A — Tab-navigation
```
Löneportalen
  ├── Överblick     ← nuvarande dashboard (faskort + aktiviteter)
  ├── Löneperioder  ← ny sida (lista med perioder)
  └── Verktygslåda  ← placeholder
```
Implementeras som intern tab-state i DashboardPage (inte separata routes).

### Del B — Period-väljare + Bemanningsområde i Överblick
```
Period: [ Mars 2025 📅 ]   Bemanningsområde: [ Hela installationen ▼ ]
```
- Hämta perioder via `usePeriods()`
- Auto-välj aktiv period
- Propagera `selectedPeriodId` → FasCard → ActivityListItemExpanded → ApiDataDisplay
- Aktiviteterna 2.1, 2.2, 3.1 visar då live-data istället för varning

### Del C — Löneperioder-sida
```
⚠️ Kontakta lönechef för ändringar

Löneperioder 2025
  2025-01 Januari    [Avslutad]
  2025-02 Februari   [Avslutad]
  2025-03 Mars       [Aktiv]     ← highlightad rad
  2025-04 April      [Planerad]
```

---

## 🏁 Quick Start

```bash
cd loneprocess-frontend-v2
git checkout main && git pull origin main
npm install
npm test            # 297 tester ska passa ✅
npm run type-check  # Ska passa ✅
```

**Starta milestone:**
```
"Kör Fas 5, Milestone 5.1"
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
feat/milestone-5.1-period-tabs
```

---

📚 **Detaljerad teknisk plan:** [docs/FAS5_PLAN.md](./docs/FAS5_PLAN.md)

**Happy Coding! 🎉**
