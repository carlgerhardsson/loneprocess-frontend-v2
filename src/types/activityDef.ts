/**
 * Fas 5.1: Hardcoded Activity Definitions
 * Separate from backend API types
 */

export type FasType = 'Lön 1' | 'Kontroll' | 'Lön Klar'
export type ReferenceType = 'POL' | 'External' | 'Internal'

export interface Delsteg {
  id: string
  text: string
  required: boolean
}

export interface Reference {
  title: string
  url: string
  type: ReferenceType
}

export interface ActivityDefinition {
  id: string
  processNr: string
  process: string
  fas: FasType
  category: string
  hasApiIntegration: boolean
  apiEndpoint?: string
  delsteg: Delsteg[]
  references: Reference[]
  defaultAssignee?: string
}

export interface ActivityProgress {
  activityId: string
  delstegCompleted: boolean[]
  comment?: string
  assignedTo?: string
  lastUpdated: string
}

export interface LoneportalProgress {
  currentPeriod: string
  activities: Record<string, ActivityProgress>
}
