# Contributing Guide

## 🚨 **KRITISKA REGLER - LÄS DETTA FÖRST!**

### **Regel #1: Kör ALLTID lokala tester INNAN du pushar**

```bash
# OBLIGATORISKT att köra innan varje commit/push:
npm run type-check  # TypeScript errors
npm run lint        # ESLint errors
npm run test        # Unit tests
```

**Varför?** Varje CI-körning kostar tid och pengar. Om du pushar kod som inte kompilerar lokalt kommer CI att misslyckas och du måste pusha igen. Det kan ta 10+ iterationer att fixa alla fel.

**Rätt arbetsflöde:**
```bash
# 1. Gör dina ändringar
# 2. Kör ALLA kommandon:
npm run type-check && npm run lint && npm run test

# 3. Fixa ALLA fel som dyker upp
# 4. Upprepa tills allt är grönt
# 5. FÖRST DÅ: commit och push
git add .
git commit -m "feat: my feature"
git push
```

---

### **Regel #2: Global sökning vid typ/namn-ändringar**

När du ändrar:
- En typ (`ActivityType`, `ActivityStatus`, etc.)
- Ett enum (`'audit'` → `'review'`)
- Ett funktionsnamn (`activity` → `initialData`)
- Ett prop-namn (`isSubmitting` → `isLoading`)

**MÅSTE du söka i hela kodbasen och uppdatera ALLT i samma commit!**

**Exempel - Ändra ett prop-namn:**

```bash
# 1. Sök i HELA projektet
grep -r "isSubmitting" src/

# 2. Hitta alla filer:
# - ActivityForm.tsx (definition)
# - ActivityForm.test.tsx (tester)
# - CreateActivityModal.tsx (användning)
# - EditActivityModal.tsx (användning)
# - ActivityForm.stories.tsx (storybook)

# 3. Ändra ALLA i samma commit!
# Annars blir det TypeScript errors i CI!
```

**I VSCode:**
1. Tryck `Cmd+Shift+F` (Mac) eller `Ctrl+Shift+F` (Windows)
2. Sök efter det du ändrar
3. Se ALLA matchningar
4. Uppdatera ALLT samtidigt

---

### **Regel #3: Barrel exports måste matcha**

När du skapar nya API-funktioner:

```typescript
// ✅ RÄTT: Exportera från barrel file
// src/lib/api/activities.ts
export function fetchActivities() { ... }

// src/lib/api/index.ts
export * from './activities'  // <-- GLÖM INTE DETTA!

// ✅ Nu kan du importera:
import { fetchActivities } from '@/lib/api'
```

```typescript
// ❌ FEL: Glömt uppdatera index.ts
// src/lib/api/activities.ts
export function fetchActivities() { ... }

// src/lib/api/index.ts
export { apiClient } from './client'  // <-- FATTAS export!

// ❌ Detta kommer KRASCHA:
import { fetchActivities } from '@/lib/api'  // ERROR!
```

---

### **Regel #4: Typer måste matcha överallt**

**Exempel - ActivityType enum:**

```typescript
// types/activity.ts
export type ActivityType = 'salary' | 'tax' | 'review'

// schemas/activitySchema.ts
type: z.enum(['salary', 'tax', 'review'])  // <-- MÅSTE MATCHA!

// ActivityForm.tsx
const typeOptions = [
  { value: 'salary', label: 'Lön' },
  { value: 'tax', label: 'Skatt' },
  { value: 'review', label: 'Granskning' },  // <-- MÅSTE MATCHA!
]

// ActivityDetails.tsx
const labels: Record<ActivityType, string> = {
  salary: 'Lönehantering',
  tax: 'Skatt',
  review: 'Granskning',  // <-- MÅSTE MATCHA!
}
```

**Om du lägger till `'recurring'`:**
1. ✅ Lägg till i `ActivityType`
2. ✅ Lägg till i `activitySchema`
3. ✅ Lägg till i `typeOptions`
4. ✅ Lägg till i `labels`
5. ✅ Lägg till i alla `test.tsx` filer

**Sök efter typen FÖRST:**
```bash
grep -r "ActivityType" src/
grep -r "'salary'" src/  # Hitta alla enum-användningar
```

---

## 🛠️ **Best Practices**

### **Small commits, complete changes**

```bash
# ✅ BRA: Allt som hör ihop i EN commit
git add src/types/activity.ts
git add src/schemas/activitySchema.ts
git add src/components/ActivityForm.tsx
git add src/components/ActivityDetails.tsx
git commit -m "feat: add 'recurring' activity type to all places"

# ❌ DÅLIGT: Delad ändring över flera commits
git commit -m "feat: add type to activity.ts"  # <-- Andra filer kompilerar inte!
# CI KRASCHAR HÄR
git commit -m "fix: add to schema"  # <-- För sent!
```

### **TypeScript first**

Använd TypeScript för att hitta fel INNAN du pushar:

```bash
# Kör detta OFTA medan du kodar:
npm run type-check

# TypeScript kommer säga:
# "Property 'recurring' does not exist"
# ↓ Fixa DIREKT, pusha inte!
```

### **Test-driven när möjligt**

```bash
# 1. Skriv testet FÖRST
# 2. Se det MISSLYCKAS
# 3. Skriv koden
# 4. Se testet LYCKAS
npm run test -- ActivityForm.test.tsx
```

---

## 📋 **Checklista innan push**

- [ ] `npm run type-check` → Inga errors
- [ ] `npm run lint` → Inga errors  
- [ ] `npm run test` → Alla tester gröna
- [ ] Sökt efter alla användningar av ändrade namn/typer
- [ ] Uppdaterat barrel exports (`index.ts`)
- [ ] Läst igenom din diff: `git diff`
- [ ] Testat lokalt i browsern (om UI-ändringar)

---

## 🚫 **Vanliga misstag att undvika**

### **1. Glömma barrel exports**
```typescript
// ❌ FEL
export function myFunction() { ... }  // Glömt lägga till i index.ts

// ✅ RÄTT  
// my-module.ts
export function myFunction() { ... }
// index.ts
export * from './my-module'
```

### **2. Partial updates av enums**
```typescript
// ❌ FEL - Bara uppdaterat 1 av 3 ställen
type ActivityType = 'salary' | 'tax' | 'recurring'  // Lagt till här
const schema = z.enum(['salary', 'tax'])  // GLÖMT här! 💥

// ✅ RÄTT - Uppdatera ALLA samtidigt
```

### **3. Pusha utan att testa**
```bash
# ❌ FEL
git add .
git commit -m "quick fix"
git push  # <-- Får reda på felen i CI 😢

# ✅ RÄTT
npm run type-check && npm run lint && npm test
# Ser felen DIREKT i terminalen 😊
git add .
git commit -m "fix: properly tested change"
git push
```

---

## 💰 **Varför detta är viktigt**

- ⏱️ **Tid**: En CI-körning tar 2-5 minuter. 10 iterationer = 30-50 minuter.
- 💸 **Kostnad**: GitHub Actions kostar pengar per minut.
- 😤 **Frustration**: Vänta på CI, fixa, pusha igen, vänta igen...
- ✅ **Lösning**: Testa lokalt = Fånga fel på 10 sekunder istället!

---

## 🎯 **Sammanfattning**

1. **Kör tester lokalt INNAN push**
2. **Global sökning vid ändringar**
3. **Uppdatera allt i samma commit**
4. **TypeScript är din vän - lyssna på den!**

**Med detta arbetsflöde: 1-2 CI-körningar istället för 10+ 🎉**
