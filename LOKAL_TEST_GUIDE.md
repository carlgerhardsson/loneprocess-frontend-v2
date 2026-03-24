# 🧪 Lokal Test-Guide för loneprocess-frontend-v2

**VIKTIG:** Testa ALLTID lokalt FÖRE push! Detta sparar 30-50 minuter per dag.

---

## 🎯 Snabbstart

```bash
# Kör ALLA tester i rätt ordning:
npm run type-check && npm run lint && npm test && npm run e2e
```

Om alla är gröna → säkert att pusha! ✅

---

## 📋 Steg-för-Steg Guide

### **1. Synka med GitHub**

```bash
# Kolla vilken branch du är på
git branch

# Hämta senaste från GitHub
git pull origin feat/milestone-4.4-crud-operations
```

**Om merge conflicts:**
```bash
# Avbryt merge
git merge --abort

# Börja om rent (VARNING: tar bort lokala ändringar!)
git reset --hard origin/feat/milestone-4.4-crud-operations
```

---

### **2. TypeScript (snabbast - börja här!)**

```bash
npm run type-check
```

**Om fel:**
- Läs felmeddelandet NOGA
- Öppna filen i VSCode: `Ctrl+P` → skriv filnamn
- Fixa felet
- Kör `npm run type-check` igen
- Upprepa tills grönt ✅

**Vanliga TypeScript-fel:**

```typescript
// Fel: "Cannot find module"
// Lösning: Kolla barrel exports i src/types/index.ts
export * from './activity'

// Fel: "Property does not exist"
// Lösning: Uppdatera interface eller type

// Fel: "Module has no exported member"
// Lösning: Lägg till export i index.ts
```

---

### **3. Linting**

```bash
npm run lint
```

**Om fel:**
```bash
# Många fel kan fixas automatiskt:
npm run lint:fix

# Kolla vad som ändrades:
git diff

# Kör lint igen:
npm run lint
```

**Vanliga lint-fel:**
- Oanvända variabler → ta bort eller prefix med `_`
- Missing trailing comma → lägg till kommatecken
- Inconsistent spacing → kör `npm run lint:fix`

---

### **4. Unit Tests**

```bash
npm test
```

**Om fel:**
- Läs vilket test som failar
- Öppna test-filen (oftast `*.test.tsx`)
- Fixa testet ELLER koden som testas
- Kör `npm test` igen

**Tips:**
```bash
# Kör bara EN fil:
npm test -- ActivityForm.test.tsx

# Kör bara ETT test:
npm test -- -t "should render form"

# Watch mode (kör automatiskt vid ändringar):
npm test -- --watch
```

**Vanliga test-fel:**
```typescript
// Fel: "Element not found"
// Lösning: Använd screen.debug() för att se DOM
screen.debug()

// Fel: "Expected X but got Y"
// Lösning: Uppdatera assertion eller kod

// Fel: "Cannot read property of undefined"
// Lösning: Kolla att mock-data är korrekt
```

---

### **5. E2E Tests**

```bash
npm run e2e
```

**Om fel:**
- Läs HELA felloggen
- Ofta handlar det om timing
- Öppna `tests/e2e/example.spec.ts`
- Lägg till waits vid behov

**Vanliga E2E-fel:**
```typescript
// Fel: "Timeout waiting for element"
// Lösning: Lägg till wait
await page.waitForURL('/aktiviteter')
await page.waitForLoadState('networkidle')

// Fel: "Element not visible"
// Lösning: Kolla att element verkligen renderas
await page.waitForSelector('button', { state: 'visible' })

// Fel: "Navigation timeout"
// Lösning: Öka timeout eller fixa långsam kod
```

---

## 🚀 Optimerat Workflow

### **Snabbkommandon**

```bash
# Alla tester på en rad:
npm run type-check && npm run lint && npm test && npm run e2e

# Bara snabba tester (hoppa över E2E):
npm run type-check && npm run lint && npm test

# Auto-fix och test:
npm run lint:fix && npm test
```

### **Watch Mode (rekommenderat under utveckling)**

```bash
# Terminal 1: TypeScript watch
npm run type-check -- --watch

# Terminal 2: Test watch
npm test -- --watch

# Kod → Spara → Tester körs automatiskt!
```

---

## 🔧 Vanliga Problem & Lösningar

### **Problem 1: "Cannot find module"**
```bash
# Lösning: Installera dependencies
npm install

# Om det inte hjälper:
rm -rf node_modules package-lock.json
npm install
```

### **Problem 2: TypeScript hittar inte typer**
```bash
# Lösning: Starta om TypeScript server
# VSCode: Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

### **Problem 3: Git merge conflicts**
```bash
# Enklaste lösningen - börja om rent:
git merge --abort
git reset --hard origin/[branch-name]

# Om du vill behålla ändringar:
git merge --abort
git stash
git pull
git stash pop  # Lös konflikter manuellt
```

### **Problem 4: Tester passar lokalt men failar i CI**
```bash
# Vanlig orsak: Node/npm version
# Lösning: Kolla .nvmrc eller package.json för rätt version

# Annan orsak: Environment variabler
# Lösning: Kolla .env.example
```

---

## ✅ Checklista Före Push

- [ ] `npm run type-check` → Grönt ✅
- [ ] `npm run lint` → Grönt ✅
- [ ] `npm test` → Grönt ✅
- [ ] `npm run e2e` → Grönt ✅
- [ ] Läst igenom `git diff`
- [ ] Commit message beskriver ändringarna

**FÖRST när ALLT är grönt:**
```bash
git add .
git commit -m "fix: descriptive message"
git push
```

---

## 🎓 Best Practices

### **DO ✅**
- Kör `npm run type-check` ofta (snabbast!)
- Använd watch mode under utveckling
- Fixa TypeScript-fel INNAN lint/test
- Läs felmeddelanden NOGA
- Sök i kodbasen när du ändrar typer (`Ctrl+Shift+F`)

### **DON'T ❌**
- Pusha utan att testa lokalt
- Ignorera TypeScript-fel ("// @ts-ignore")
- Committa console.logs
- Pusha med lint-warnings
- Ändra typer utan global sökning

---

## 📊 Tidsbesparingar

**Utan lokal testning:**
```
Kod → Push → Vänta 5 min → CI error → Fixa → Push → Repeat
= 30-50 minuter för 10 iterationer
```

**Med lokal testning:**
```
Kod → npm test (10 sekunder) → Fixa → Test igen → Push
= 5 minuter totalt, 1 push
```

**Resultat: 25-45 minuter sparade per dag! ⏱️**

---

## 🆘 Fastnat?

1. **Läs felmeddelandet** - Det säger oftast exakt vad som är fel
2. **Använd `screen.debug()`** i tester - Visar DOM-strukturen
3. **Sök i projektet** - `Ctrl+Shift+F` hittar liknande kod
4. **Kolla CONTRIBUTING.md** - Innehåller viktiga regler
5. **Fråga teamet** - Beskriv felet + vad du har provat

---

## 🔗 Relaterade Guider

- **CONTRIBUTING.md** - Kodstandarder och regler
- **README.md** - Projektöversikt
- **PROJECT_STATUS.md** - Aktuell status

---

**Lycka till med testningen! 🎯**

*Senast uppdaterad: 2026-03-23*
