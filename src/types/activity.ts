/**
 * Activity & Checklist Types
 * READ-ONLY VERSION: No Create/Update data types
 */

// ============================================================================
// BACKEND API TYPES (Exact schema from Swagger)
// ============================================================================

/**
 * Activity from backend API (what we GET)
 * Based on: https://loneprocess-api-922770673146.us-central1.run.app/docs
 */
export interface ActivityAPI {
  id: number
  process_nr: string
  process: string
  out_input: string
  ska_inga_i_loneperiod: boolean
  fas: string
  roll: string
  behov: string
  effekten_vardet: string
  extra_info: string
  acceptans: string
  feature_losning: string
  priority: number // 0-4 (integer)
  status: ActivityStatus
  created_at?: string
  updated_at?: string
  senast_utford?: string
}

// ============================================================================
// FRONTEND UI TYPES (for display)
// ============================================================================

/**
 * Activity for Frontend UI
 * Matches backend schema 1:1 - no transformation needed
 */
export interface Activity {
  id: string // Convert from number to string for UI consistency
  processNr: string
  process: string
  outInput: string
  skaIngaILoneperiod: boolean
  fas: string
  roll: string
  behov: string
  effektenVardet: string
  extraInfo: string
  acceptans: string
  featureLosning: string
  priority: number
  status: ActivityStatus
  createdAt: string
  updatedAt: string
  senastUtford: string | null
}

// ============================================================================
// ENUMS & CONSTANTS
// ============================================================================

/**
 * Activity Status
 * From backend Swagger: "active|draft|pending|in_progress|completed|blocked"
 */
export type ActivityStatus = 
  | 'active'
  | 'draft'
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'blocked'

/**
 * Priority levels (0-4)
 * Based on backend schema
 */
export const PRIORITY_LEVELS = {
  NONE: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  URGENT: 4,
} as const

export type PriorityLevel = typeof PRIORITY_LEVELS[keyof typeof PRIORITY_LEVELS]

/**
 * Fas (Phase) options - common Swedish löneprocess phases
 */
export const FAS_OPTIONS = [
  'Förberedelse',
  'Insamling',
  'Beräkning',
  'Granskning',
  'Godkännande',
  'Utbetalning',
  'Rapportering',
  'Avstämning',
] as const

/**
 * Roll (Role) options - common Swedish löneprocess roles
 */
export const ROLL_OPTIONS = [
  'Löneadministratör',
  'Lönechef',
  'HR',
  'Manager',
  'Controller',
  'Systemansvarig',
] as const

// ============================================================================
// ADAPTER FUNCTIONS
// ============================================================================

/**
 * Convert backend API activity to frontend UI format
 */
export function activityFromAPI(api: ActivityAPI): Activity {
  return {
    id: String(api.id),
    processNr: api.process_nr,
    process: api.process,
    outInput: api.out_input,
    skaIngaILoneperiod: api.ska_inga_i_loneperiod,
    fas: api.fas,
    roll: api.roll,
    behov: api.behov,
    effektenVardet: api.effekten_vardet,
    extraInfo: api.extra_info,
    acceptans: api.acceptans,
    featureLosning: api.feature_losning,
    priority: api.priority,
    status: api.status,
    createdAt: api.created_at || new Date().toISOString(),
    updatedAt: api.updated_at || new Date().toISOString(),
    senastUtford: api.senast_utford || null,
  }
}

// ============================================================================
// FILTER TYPES
// ============================================================================

export interface ActivityFilters {
  status?: ActivityStatus[]
  fas?: string[]
  roll?: string[]
  priority?: number[]
  search?: string
}

export interface ActivitiesState {
  activities: Activity[]
  selectedActivity: Activity | null
  filters: ActivityFilters
  isLoading: boolean
  error: string | null
}
