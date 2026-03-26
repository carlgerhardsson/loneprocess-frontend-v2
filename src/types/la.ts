/**
 * TypeScript-typer för LA API-svar
 *
 * OBS: API:et ägs av externt team — dessa typer speglar
 * vad API:et returnerar och ska inte ändras utan att
 * API-teamet har uppdaterat sina modeller.
 */

// ─── Anställda ───────────────────────────────────────────────────────────────

export interface LAEmployee {
  id: number
  personal_number: string
  name: string
  department: string
  org_kod: string
  status: string
  employment_date: string | null
  termination_date: string | null
  salary: number | null
  salary_type: string | null
  created_at: string
  updated_at: string
}

// Filtrering för useEmployees
export type EmployeeStatus = 'new' | 'terminated' | 'active'

export interface EmployeeFilters {
  status?: EmployeeStatus
  org_kod?: string
  limit?: number
}

// ─── Körningsstatus ──────────────────────────────────────────────────────────

export type KorningsStatusType =
  | 'for_registrering'
  | 'last_for_registrering'
  | 'provlon_pagaar'
  | 'provlon_klar'
  | 'definitiv_pagaar'
  | 'definitiv_klar'
  | 'resultat_mottaget'
  | 'fel'

export interface KorningsStatus {
  id: number
  loneperiod_id: number
  status: KorningsStatusType
  provlon_startad: string | null
  provlon_klar: string | null
  definitiv_startad: string | null
  definitiv_klar: string | null
  antal_anstallda: number | null
  antal_fel: number | null
  meddelande: string | null
  updated_at: string
}

// ─── Fellistor ───────────────────────────────────────────────────────────────

export type FelSeverity = 'error' | 'warning' | 'info'

export interface LACalculationError {
  id: string
  loneperiod_id: number
  personal_number: string | null
  name: string | null
  error_code: string
  error_type: string
  description: string
  severity: FelSeverity
  behandlad: boolean
  behandlad_av: string | null
  behandlad_datum: string | null
  created_at: string
}

export interface FellistaSummary {
  loneperiod_id: number
  total_errors: number
  total_warnings: number
  total_info: number
  obehandlade: number
  behandlade: number
}

export interface FellistorFilters {
  severity?: FelSeverity
  visa_endast_obehandlade?: boolean
}
