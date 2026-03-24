# Contributing Guide

## 🚨 KRITISKA REGLER

### 1. Kör ALLTID lokala tester INNAN push

```bash
# OBLIGATORISKT före varje commit:
npm run type-check  # TypeScript errors
npm run lint        # ESLint errors
npm run test        # Unit tests
```

**Varför?** En CI-körning tar 2-5 min. 10 iterationer = 30-50 min väntetid. Lokalt får du svar på 10 sekunder.

**Rätt workflow:**
```bash
# 1. Gör ändringar
# 2. Testa ALLT:
npm run type-check && npm run lint && npm test

# 3. Fixa alla fel
# 4. Upprepa tills grönt
# 5. FÖRST DÅ:
git add .
git commit -m "feat: my feature"
git push
```

### 2. Global sökning vid typ/namn-ändringar

När du ändrar typer, enums, funktionsnamn eller prop-namn:

**MÅSTE du söka hela kodbasen och uppdatera ALLT i samma commit!**

```bash
# Exempel: Ändra ett prop-namn
grep -r "isSubmitting" src/

# VSCode: Cmd+Shift+F (Mac) / Ctrl+Shift+F (Win)
# Uppdatera ALLA träffar samtidigt!
```

**Exempel - Lägga till enum-värde:**
```typescript
// 1. Lägg till i typen
type ActivityType = 'salary' | 'tax' | 'review' | 'recurring'

// 2. SÖK var ActivityType används:
grep -r "ActivityType" src/
grep -r "'salary'" src/

// 3. Uppdatera:
// - activitySchema.ts (zod enum)
// - ActivityForm.tsx (options)
// - ActivityDetails.tsx (labels)
// - Alla test-filer

// 4. Allt i SAMMA commit!
```

### 3. Barrel exports måste matcha

```typescript
// ✅ RÄTT
// my-module.ts
export function myFunction() { ... }

// index.ts
export * from './my-module'  // VIKTIGT!

// ❌ FEL - Glömt index.ts
// Importerna kraschar!
```

### 4. Typer måste matcha överallt

```typescript
// types/activity.ts
export type ActivityType = 'salary' | 'tax' | 'review'

// schemas/activitySchema.ts
z.enum(['salary', 'tax', 'review'])  // MÅSTE MATCHA!

// components/ActivityForm.tsx
const options = [
  { value: 'salary', ... },
  { value: 'tax', ... },
  { value: 'review', ... }  // MÅSTE MATCHA!
]
```

## 📋 Checklista före push

- [ ] `npm run type-check` → Grönt
- [ ] `npm run lint` → Grönt  
- [ ] `npm run test` → Grönt
- [ ] Sökt efter ändringar i hela projektet
- [ ] Uppdaterat barrel exports
- [ ] Testat i browser (UI-ändringar)

## 🚫 Vanliga misstag

### Glömma barrel exports
```typescript
// ❌ FEL
export function myFn() { ... }  // Finns i my-module.ts
// Saknas i index.ts → import misslyckas!

// ✅ RÄTT
// index.ts: export * from './my-module'
```

### Partiella enum-uppdateringar
```typescript
// ❌ FEL - Bara 1 av 3 ställen
type T = 'a' | 'b' | 'c'  // Lagt till 'c'
z.enum(['a', 'b'])  // GLÖMT! 💥

// ✅ RÄTT - Uppdatera ALLA
```

### Pusha utan test
```bash
# ❌ FEL
git push  # Får reda på fel i CI efter 5 min 😢

# ✅ RÄTT
npm run type-check && npm run lint && npm test
git push  # Vet att det funkar! 😊
```

## 💡 Resultat med detta workflow

- ✅ 1-2 CI-körningar istället för 10+
- ✅ Fel på 10 sekunder istället för 30 minuter
- ✅ Mindre frustration
- ✅ Lägre kostnader
