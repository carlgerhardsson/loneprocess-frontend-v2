# 🧪 Phase 1 Test Guide - Optimistic Updates

**Milestone:** 4.5 - Data Persistence  
**Phase:** 1 - Optimistic Updates  
**Datum:** 2026-03-24

---

## 📋 PRE-TEST SETUP

### **1. Checkout branchen**
```bash
cd C:\Users\gerhardssonc\loneprocess-frontend-v2
git fetch origin
git checkout feat/milestone-4.5-data-persistence
git pull origin feat/milestone-4.5-data-persistence
```

### **2. Installera dependencies** (om nya tillkommit)
```bash
npm install
```

### **3. Kör validering**
```bash
# TypeScript check
npm run type-check

# Linting
npm run lint

# Unit tests
npm test
```

**Förväntat resultat:**
- ✅ TypeScript: Inga fel
- ✅ Lint: Inga fel
- ✅ Tests: 255+ passing, 13 skipped

---

## 🚀 STARTA DEV SERVER

```bash
npm run dev
```

**Öppna i browser:** http://localhost:5173

---

## ✅ MANUAL TESTNING - OPTIMISTIC UPDATES

### **Test 1: Create Activity (Optimistic)**

**Steg:**
1. Öppna Network tab i DevTools (F12)
2. Klicka "Skapa aktivitet"
3. Fyll i formulär:
   - Titel: "Test Optimistic Create"
   - Typ: Lönehantering
   - Status: Väntande
   - Prioritet: Hög
4. Klicka "Spara"

**Observera:**
- 🔍 **KRITISKT:** Aktiviteten ska visas i listan INNAN network request är klar
- 🔍 Se i Network tab att POST /activities fortfarande laddar
- 🔍 Aktiviteten har först ett temporary ID (temp-XXXXX)
- 🔍 När request är klar byts ID till riktigt backend-ID
- ✅ Toast: "Aktivitet skapad!" visas

**Förväntat beteende:**
- ⚡ Instant UI-uppdatering (<50ms)
- 🔄 Backend request i bakgrunden
- ✨ Smooth övergång från temp ID till real ID

---

### **Test 2: Update Activity (Optimistic)**

**Steg:**
1. Öppna Network tab
2. Klicka "Redigera" på en aktivitet
3. Ändra titel till "Test Optimistic Update"
4. Ändra status till "Pågående"
5. Klicka "Spara"

**Observera:**
- 🔍 **KRITISKT:** Ändringar syns i listan INNAN PUT request är klar
- 🔍 Se i Network tab att PUT /activities/:id fortfarande laddar
- 🔍 StatusBadge uppdateras omedelbart
- 🔍 Titel ändras direkt
- ✅ Toast: "Aktivitet uppdaterad!" visas

**Förväntat beteende:**
- ⚡ Instant UI-uppdatering
- 🔄 Backend request i bakgrunden
- ✨ Inga flicker eller layout shifts

---

### **Test 3: Delete Activity (Optimistic)**

**Steg:**
1. Öppna Network tab
2. Klicka "Ta bort" på en aktivitet
3. Bekräfta i dialogen

**Observera:**
- 🔍 **KRITISKT:** Aktiviteten försvinner från listan INNAN DELETE request är klar
- 🔍 Se i Network tab att DELETE /activities/:id fortfarande laddar
- 🔍 Listan renderas om utan aktiviteten
- ✅ Toast: "Aktivitet borttagen!" visas

**Förväntat beteende:**
- ⚡ Instant borttagning från UI
- 🔄 Backend request i bakgrunden
- ✨ Smooth animation när rad försvinner

---

## 🔴 ERROR SCENARIO TESTING (Simulera fel)

### **Test 4: Create Failure (Rollback)**

**Setup - Simulera network error:**
1. Öppna DevTools → Network tab
2. Klicka "Offline" (simulera nätverksfel)
3. Försök skapa en aktivitet

**Förväntat beteende:**
- ⚡ Aktiviteten visas FÖRST i listan (optimistic)
- ❌ Network request failar
- 🔄 Aktiviteten FÖRSVINNER automatiskt (rollback)
- 🚨 Eventuellt error toast (om implementerat)
- ✅ Listan återgår till korrekt state

**Viktigt:** Testa detta UTAN att reload sidan!

---

### **Test 5: Update Failure (Rollback)**

**Setup:**
1. DevTools → Network tab → Offline
2. Redigera en aktivitet
3. Ändra titel och status
4. Spara

**Förväntat beteende:**
- ⚡ Ändringar syns FÖRST (optimistic)
- ❌ Network request failar
- 🔄 Ändringar ÅTERSTÄLLS automatiskt (rollback)
- ✅ Aktiviteten ser ut som innan

---

### **Test 6: Delete Failure (Rollback)**

**Setup:**
1. DevTools → Network tab → Offline
2. Ta bort en aktivitet
3. Bekräfta

**Förväntat beteende:**
- ⚡ Aktiviteten försvinner FÖRST (optimistic)
- ❌ Network request failar
- 🔄 Aktiviteten ÅTERKOMMER automatiskt (rollback)
- ✅ Listan återgår till korrekt state

---

## 🎯 EDGE CASE TESTING

### **Test 7: Rapid Multiple Operations**

**Steg:**
1. Skapa 3 aktiviteter snabbt efter varandra
2. Redigera 2 av dem direkt
3. Ta bort 1

**Observera:**
- 🔍 Inga race conditions
- 🔍 Alla operations slutförs korrekt
- 🔍 Cache uppdateras konsekvent
- 🔍 Inga duplicerade entries

---

### **Test 8: Update Same Activity Twice**

**Steg:**
1. Öppna en aktivitet för redigering
2. Ändra titel till "First Update"
3. Spara
4. DIREKT öppna samma aktivitet igen
5. Ändra titel till "Second Update"
6. Spara

**Observera:**
- 🔍 Andra uppdateringen vinner (last write wins)
- 🔍 Inga konflikter
- 🔍 Cache uppdateras korrekt

---

## 📊 PERFORMANCE VALIDATION

### **Test 9: Measure Perceived Latency**

**Tool:** DevTools Performance tab eller Network tab

**Mät tiden från klick till UI-uppdatering:**

| Operation | Target | Actual | Status |
|-----------|--------|--------|--------|
| Create | <50ms | ____ ms | ⬜ |
| Update | <50ms | ____ ms | ⬜ |
| Delete | <50ms | ____ ms | ⬜ |

**Förväntat:** Alla under 50ms (instant känsla)

---

## ✅ ACCEPTANCE CRITERIA

**Phase 1 godkänns om:**

- [ ] **Create:** Aktivitet syns direkt i listan (innan API svarar)
- [ ] **Update:** Ändringar syns direkt (innan API svarar)
- [ ] **Delete:** Aktivitet försvinner direkt (innan API svarar)
- [ ] **Rollback:** Vid network error återställs UI automatiskt
- [ ] **No manual refetch:** Inga manuella refetch()-anrop i koden
- [ ] **No race conditions:** Flera snabba operations fungerar korrekt
- [ ] **Cache consistency:** Listan alltid konsekvent efter operations
- [ ] **Performance:** <50ms perceived latency för alla operations
- [ ] **TypeScript:** Inga errors
- [ ] **Lint:** Inga warnings
- [ ] **Tests:** Alla passar (255+)

---

## 🐛 KNOWN ISSUES / LIMITATIONS

**Förväntade begränsningar i Phase 1:**
- ❌ **Ingen offline persistence:** Data försvinner vid reload offline
- ❌ **Ingen retry logic:** Misslyckade requests försöker inte igen
- ⚠️ **Network errors:** Visar bara console error (ingen user-friendly toast)

**Dessa fixas i Phase 2 & 3!**

---

## 📝 TEST RESULTAT

**Tester av:** ____________________  
**Datum:** ____________________

### Summary

| Test | Status | Notes |
|------|--------|-------|
| 1. Create Optimistic | ⬜ Pass / ⬜ Fail | |
| 2. Update Optimistic | ⬜ Pass / ⬜ Fail | |
| 3. Delete Optimistic | ⬜ Pass / ⬜ Fail | |
| 4. Create Rollback | ⬜ Pass / ⬜ Fail | |
| 5. Update Rollback | ⬜ Pass / ⬜ Fail | |
| 6. Delete Rollback | ⬜ Pass / ⬜ Fail | |
| 7. Rapid Operations | ⬜ Pass / ⬜ Fail | |
| 8. Double Update | ⬜ Pass / ⬜ Fail | |
| 9. Performance | ⬜ Pass / ⬜ Fail | |

### Overall Result

⬜ **GODKÄND** - Phase 1 fungerar som förväntat  
⬜ **UNDERKÄND** - Behöver fixes

### Issues Found

1. _______________________________________
2. _______________________________________
3. _______________________________________

---

## 🚀 NÄSTA STEG

### **Om GODKÄND:**
1. Merge PR #34
2. Starta Phase 2: Cache & Offline Support
3. Dokumentera learnings

### **Om UNDERKÄND:**
1. Dokumentera issues i PR #34
2. Fixa issues
3. Re-test
4. Repeat

---

## 💡 TIPS FÖR TESTNING

**DevTools Settings:**
- Network tab: Throttle till "Fast 3G" för tydligare optimistic updates
- Console: Bevaka errors/warnings
- Performance: Record för att mäta exact timing

**Bra att veta:**
- Optimistic updates känns "instant" även på långsam connection
- Rollback ska vara osynlig för användaren (ingen flicker)
- Cache invalidation sker automatiskt i bakgrunden

**Vid problem:**
- Kolla Console för errors
- Kolla Network tab för failed requests
- Verifiera att mutation hooks används (inte gamla)

---

## 📞 SUPPORT

Om något är oklart:
1. Läs `/src/hooks/mutations/README.md`
2. Kolla PR #34 description
3. Fråga Claude! 🤖

**Lycka till med testningen! 🎉**
