# 🚀 Workflow Guide - Fortsättning Imorgon

## 📋 Sammanfattning Idag (2024-03-18)

### ✅ Vad vi åstadkom:
- **Fas 2:** 100% klar (7/7 milestones)
- **Fas 3:** Startad - Milestone 3.1 klar (1/6 milestones)
- **106 totala tester** (104 unit + 2 E2E)
- **Activities List UI** komplett med TanStack Query

### 📚 Lärdomar:
1. **TypeScript types:** Måste alltid läsas FÖRST
2. **Prettier formatting:** Kräver manuella steg (Husky körs inte via GitHub API)
3. **Test mocks:** Använd `as unknown as` för komplexa typer

---

## 🎯 Plan för Imorgon: Milestone 3.2 - Period Selector

### Vad vi ska bygga:
- **PeriodSelector** - Dropdown för att välja löneperiod
- **PeriodDisplay** - Visa vald period med metadata
- Integration med TanStack Query för period data
- ~10-15 nya tester

---

## ⚡ ARBETSFLÖDE IMORGON

### **STEG 1: Claude skapar komponenter** 
*Du gör inget här - väntar bara*

Jag kommer att:
1. ✅ Läsa `src/types/period.ts` FÖRST
2. ✅ Skapa PeriodSelector komponent
3. ✅ Skapa PeriodDisplay komponent  
4. ✅ Skapa tester
5. ✅ Pusha till GitHub (ny branch)

---

### **STEG 2: DU kör manuella checks** ⚠️
*VIKTIGT - Här kommer du in!*

När jag säger "kör manuella checks nu", gör så här:

```bash
# 1. Gå till ditt lokala repo
cd path/to/loneprocess-frontend-v2

# 2. Hämta nya branchen
git fetch origin
git checkout feat/milestone-3.2-period-selector

# 3. Installera dependencies (om nya tillkommit)
npm install

# 4. KÖR ALLA CHECKS:

# Format alla filer
npm run format

# Kontrollera TypeScript
npm run type-check

# Kontrollera ESLint
npm run lint

# Kör tester (valfritt men rekommenderat)
npm run test
```

**Om allt är grönt:**
```bash
# Stage alla ändringar (om format ändrade något)
git add .

# Commit (om det blev ändringar)
git commit -m "style: format code"

# Pusha
git push
```

**Om något är rött:**
- Kopiera felmeddelandet
- Skicka till mig
- Jag fixar

---

### **STEG 3: Claude skapar PR**
*Du gör inget här - väntar på CI*

Jag kommer att:
1. ✅ Skapa Pull Request
2. ✅ Vänta på CI (~2-3 min)
3. ✅ Merga när grön

---

## 🔄 Snabbversion

**Du behöver bara köra 4 kommandon:**
```bash
git checkout feat/milestone-3.2-period-selector
npm run format
npm run type-check
npm run lint
```

Om allt är OK:
```bash
git add .
git commit -m "style: format code"  # (om format ändrade något)
git push
```

---

## 📍 När ska du köra manuella steg?

**JAG KOMMER ATT SÄGA:**
> "✅ Komponenter klara! Kör nu manuella checks i STEG 2."

**DÅ kör du:**
```bash
npm run format && npm run type-check && npm run lint
```

**Sedan säger du till mig:**
- "Allt grönt, pushade ändringar" ✅
- Eller: "Fick fel: [kopiera felmeddelande]" ❌

---

## 🎯 Fördelar med detta workflow:

✅ **Snabbare utveckling** - CI blir grön första gången  
✅ **Färre omskrivningar** - TypeScript errors upptäcks tidigt  
✅ **Ingen frustration** - Prettier formateras lokalt  
✅ **Bättre kvalitet** - Alla checks passerar innan push  

---

## 📋 Checklista Imorgon

**Innan vi börjar:**
- [ ] Du har projektet klonat lokalt
- [ ] Du kan köra `npm install` utan errors
- [ ] Du kan köra `npm run format` utan errors

**Under utveckling:**
- [ ] Claude säger "kör manuella checks"
- [ ] Du kör 4 kommandon (format, type-check, lint, push)
- [ ] Du rapporterar resultat till Claude
- [ ] Claude skapar PR och mergar

**Efter merge:**
- [ ] Milestone 3.2 klar! 🎉
- [ ] Fortsätter med Milestone 3.3

---

## 💡 Tips

**Om npm run format ändrar filer:**
- Det är helt OK! Prettier fixar formatering
- Bara commit och pusha ändringarna

**Om npm run type-check ger errors:**
- Kopiera hela felmeddelandet
- Skicka till mig
- Jag fixar direkt via GitHub API

**Om npm run lint ger warnings:**
- Små warnings (< 5) är OK
- Många warnings/errors → skicka till mig

---

## 🚀 Redo för imorgon?

**När vi ses imorgon säger du bara:**
> "Redo att fortsätta med Milestone 3.2!"

**Då kör jag igång och säger till när du ska köra manuella steg!**

---

**Frågor? Spara denna guide och vi börjar imorgon! 💪**
