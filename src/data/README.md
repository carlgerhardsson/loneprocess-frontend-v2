# Aktivitetsdatabas

**Status:** I utveckling  
**Issue:** [#35](https://github.com/carlgerhardsson/loneprocess-frontend-v2/issues/35)

## Översikt

Denna mapp innehåller hårdkodade aktiviteter för löneprocessen.

**Alla 20 aktiviteter finns dokumenterade i:**
- Issue #35
- `docs/FAS_5_1_PLAN.md`
- Skärmdumpar i `/mnt/project/`

## Struktur

```typescript
// activities.ts kommer innehålla:
export const ACTIVITIES: ActivityDefinition[] = [
  // FAS 1: FÖRE LÖNEBERÄKNING (8 aktiviteter)
  // FAS 2: KONTROLLPERIOD (5 aktiviteter) 
  // FAS 3: EFTER LÖNEBERÄKNING (7 aktiviteter)
]
```

## API Integration

**7 aktiviteter har API-integration:**
- 1.2, 1.3, 1.5, 1.6: `/api/v1/la/employees`
- 2.1, 3.1: `/api/v1/la/periods/{id}/korningsstatus`
- 2.2: `/api/v1/la/fellistor/{id}`

**13 aktiviteter är manuella** (checkboxar i localStorage)

## Nästa steg

Fullständig activities.ts kommer skapas i nästa commit.
