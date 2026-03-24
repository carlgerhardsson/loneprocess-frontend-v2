# 🚀 FAS 5 WORKFLOW PLAN - Desktop (MCP) + Code (CLI)

**Datum:** 2026-03-23  
**Status:** PLANERAD  
**Implementation:** Efter Milestone 4.6

---

## 📋 ÖVERSIKT

### **Nuvarande Workflow (Fas 4)**
Claude Desktop → GitHub API → CI → Feedback

### **Ny Workflow (Fas 5+)**
Claude Desktop (MCP) → Disk → Claude Code (CLI) → Local Tests → Git → CI

**Fördel:** Lokala tester INNAN push = färre CI-iterationer

---

## 🎯 ROLLER OCH ANSVAR

### **Claude Desktop (Arkitekt)**
**Ansvar:**
- Kravställning och UI-design
- Affärslogik och komponentarkitektur
- Kodskrivning direkt till disk via Filesystem MCP
- Strategiska beslut

**Tools:**
- Filesystem MCP (direktaccess till lokala filer)
- Kan läsa och skriva alla projektfiler
- Ingen Git-hantering

---

### **Claude Code CLI (Bygglag)**
**Ansvar:**
- Teknisk validering i lokal terminal
- Kör `npm run type-check`
- Kör `npm run lint`
- Kör `npm test`
- Kör `npm run e2e` (vid behov)
- Fixar tekniska fel i loop tills 100% grönt
- Git-hantering (branch, commit, push)

**Tools:**
- Lokal terminal
- npm scripts
- Git CLI

---

## 🔄 ARBETSFLÖDE (STEG-FÖR-STEG)

### **Fas 1: Design & Implementering (Desktop)**

```
1. Diskutera krav och design med användaren
2. Skapa/uppdatera filer via Filesystem MCP
3. Skriv kod direkt till disk:
   - src/components/...
   - src/features/...
   - tests/...
4. Bekräfta att alla filer är sparade
```

**Output:** Ny/uppdaterad kod på disk, redo för validering

---

### **Fas 2: Lokal Validering (CLI)**

```bash
# CLI agent kör:
cd /path/to/project

# Steg 1: TypeScript-check
npm run type-check
# OM FEL → fixa tills grönt → kör igen

# Steg 2: Lint
npm run lint
# OM FEL → fixa tills grönt → kör igen

# Steg 3: Unit tests
npm test
# OM FEL → fixa tills grönt → kör igen

# Steg 4: E2E (vid stora ändringar)
npm run e2e
# OM FEL → fixa tills grönt → kör igen

# OM ALLT GRÖNT → fortsätt till Fas 3
```

**Output:** 100% gröna tester lokalt

---

### **Fas 3: Git & Deployment (CLI)**

```bash
# Steg 1: Branching (om ny feature)
git checkout -b feat/milestone-X.Y-feature-name

# Steg 2: Commit
git add .
git commit -m "feat: descriptive commit message"

# Steg 3: Push
git push origin feat/milestone-X.Y-feature-name

# Steg 4: Skapa PR (om behövs)
gh pr create --title "..." --body "..."
```

**Output:** Kod pushad, PR skapad, CI kör (förväntas vara grön!)

---

## 📊 FÖRVÄNTADE FÖRDELAR

### **Kvantitativa:**
- ❌ Nuvarande: 1-3 CI-iterationer per feature
- ✅ Nytt: 0-1 CI-iterationer per feature (mål: 90% första gången grönt)
- 🚀 **Förbättring:** ~70% färre CI-iterationer

### **Kvalitativa:**
- ✅ Snabbare feedback (lokal test < 2 min vs CI > 5 min)
- ✅ Mindre frustration
- ✅ Tydligare ansvarsfördelning
- ✅ Bättre code quality (fix lokalt innan push)

---

## 🧪 PILOT-PLAN (Första Feature i Fas 5)

### **Milestone för Pilot:**
Första feature-implementationen i Fas 5

### **Success Criteria:**
- ✅ Desktop → MCP fungerar (filer skapas på disk)
- ✅ CLI kan köra alla tester
- ✅ 0-1 CI-iterationer för pilot-featuren
- ✅ Båda agenter förstår sina roller
- ✅ Workflow känns naturligt

### **Metrics att Samla:**
- Antal CI-iterationer
- Tid från kodstart till grön CI
- Antal lokala test-körningar
- Typer av fel som hittas lokalt vs i CI

### **Fallback:**
Om pilot misslyckas → återgå till nuvarande workflow, analysera vad som gick fel

---

## 🔧 TEKNISKA KRAV

### **Desktop (MCP):**
- ✅ Filesystem MCP aktiverat
- ✅ Access till projektkatalogen
- ✅ Kan läsa och skriva filer

### **CLI (Code):**
- ✅ Claude Code installerat
- ✅ npm tillgängligt
- ✅ Git tillgängligt
- ✅ Projekt clonat lokalt

### **Projekt:**
- ✅ Alla npm scripts konfigurerade
- ✅ `type-check`, `lint`, `test`, `e2e` fungerar

---

## 📝 KOMMUNIKATIONSMÖNSTER

### **Desktop → Användare:**
```
"Jag har implementerat [feature]. Kod finns på disk.
Kör nu CLI-validering med:
cd /path/to/project && claude-code 'Kör alla tester'"
```

### **CLI → Användare:**
```
"TypeScript: ✅ Grönt
Lint: ✅ Grönt
Tests: ✅ 268 passing
E2E: ✅ 2 passing

Allt klart! Pushar nu till GitHub..."
```

### **Vid Fel:**
```
CLI: "TypeScript fel:
- src/components/NewComponent.tsx:15 - Missing type annotation"

Desktop: "Fixar TypeScript-felet..."
[uppdaterar fil via MCP]

Desktop → Användare: "Kör CLI-validering igen"
```

---

## ⚠️ POTENTIELLA UTMANINGAR

### **1. MCP Setup**
**Problem:** Filesystem MCP kanske inte har rätt permissions  
**Lösning:** Testa före Fas 5-start, fixa permissions

### **2. Koordination**
**Problem:** Desktop och CLI kan komma i otakt  
**Lösning:** Tydlig kommunikation, Desktop bekräftar filer sparade innan CLI kör

### **3. Lokala vs CI-skillnader**
**Problem:** Tester kan vara gröna lokalt men röda i CI  
**Lösning:** Säkerställ samma Node/npm-version, sama config

### **4. Git Conflicts**
**Problem:** CLI push kan få conflicts  
**Lösning:** Desktop kollar branch-status innan kod, CLI hanterar conflicts

---

## 📈 METRICS & UPPFÖLJNING

### **Spåra per Feature:**
- CI-iterationer (mål: ≤ 1)
- Lokala test-körningar (förväntat: 2-5)
- Tid till grön CI (mål: < 30 min från start)
- Typer av fel (TypeScript vs runtime vs lint)

### **Veckovis Retrospektiv:**
Efter varje vecka i Fas 5:
- Vad fungerade bra?
- Vad kan förbättras?
- Jämför med Fas 4 metrics

---

## ✅ GODKÄNNANDE-CHECKLISTA

Innan Fas 5 startar:

- [ ] Fas 4 (4.5 + 4.6) fullständigt klar
- [ ] Desktop MCP fungerar (testad på testkatalog)
- [ ] CLI kan köra alla tester i projektet
- [ ] Båda agenter förstår roller och workflow
- [ ] Metrics-system förberett
- [ ] Användaren bekväm med nya workflow

---

## 🎯 BESLUT

**Datum:** 2026-03-23  
**Status:** ✅ GODKÄNT  
**Implementation:** Efter Milestone 4.6  

**Motivering:**
- Naturlig brytpunkt efter Fas 4
- Ger tid att slutföra momentum
- Möjliggör pilottest i Fas 5
- Förväntat resultat: Färre CI-iterationer

---

## 📞 KONTAKT VID FRÅGOR

Om du är osäker på något i denna plan:
1. Läs igenom planen igen
2. Kolla `SESSION_STATUS.md` för kontext
3. Fråga innan Fas 5 startar

**Vi provar detta steg för steg - vi kan alltid justera!** 🚀
