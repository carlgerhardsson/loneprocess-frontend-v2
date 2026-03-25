/**
 * Alla 20 Aktiviteter - Huvudindex
 *
 * Import från:
 * import { ACTIVITIES } from '@/data/activities'
 */

import type { ActivityDefinition, FasType } from '@/types/activityDef'
import { FAS1_ACTIVITIES } from './fas1'
import { FAS2_ACTIVITIES } from './fas2'
import { FAS3_ACTIVITIES } from './fas3'

// Exportera alla aktiviteter som en array
export const ACTIVITIES: ActivityDefinition[] = [
  ...FAS1_ACTIVITIES,
  ...FAS2_ACTIVITIES,
  ...FAS3_ACTIVITIES,
]

// Helper: Hämta aktiviteter för specifik fas
export function getActivitiesByFas(fas: FasType): ActivityDefinition[] {
  return ACTIVITIES.filter(a => a.fas === fas)
}

// Helper: Hämta aktivitet med ID
export function getActivityById(id: string): ActivityDefinition | undefined {
  return ACTIVITIES.find(a => a.id === id)
}

// Helper: Hämta alla aktiviteter med API-integration
export function getApiActivities(): ActivityDefinition[] {
  return ACTIVITIES.filter(a => a.hasApiIntegration)
}

// Helper: Hämta alla manuella aktiviteter
export function getManualActivities(): ActivityDefinition[] {
  return ACTIVITIES.filter(a => !a.hasApiIntegration)
}

// Exportera också per fas för enklare access
export { FAS1_ACTIVITIES, FAS2_ACTIVITIES, FAS3_ACTIVITIES }

// Statistik
export const ACTIVITY_STATS = {
  total: ACTIVITIES.length, // 20
  fas1: FAS1_ACTIVITIES.length, // 8
  fas2: FAS2_ACTIVITIES.length, // 5
  fas3: FAS3_ACTIVITIES.length, // 7
  withApi: getApiActivities().length, // 7
  manual: getManualActivities().length, // 13
}
