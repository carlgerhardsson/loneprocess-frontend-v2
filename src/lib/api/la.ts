/**
 * LA Integration API-funktioner
 *
 * READ-ONLY: Endast GET-anrop.
 * API:et ägs av externt team — inga ändringar kan göras på API-sidan.
 */

import { apiClient } from './client'
import type {
  LAEmployee,
  EmployeeFilters,
  KorningsStatus,
  LACalculationError,
  FellistorFilters,
  FellistaSummary,
} from '@/types/la'

/**
 * Hämtar anställda från LA
 * Används av aktivitet 1.2 (new), 1.3 (terminated), 1.5 och 1.6
 */
export async function fetchEmployees(filters?: EmployeeFilters): Promise<LAEmployee[]> {
  const response = await apiClient.get<LAEmployee[]>('/la/employees', {
    params: {
      ...(filters?.status && { status: filters.status }),
      ...(filters?.org_kod && { org_kod: filters.org_kod }),
      limit: filters?.limit ?? 100,
    },
  })
  return response.data
}

/**
 * Hämtar körningsstatus för en löneperiod
 * Används av aktivitet 2.1 och 3.1
 */
export async function fetchKorningsStatus(loneperiodId: number): Promise<KorningsStatus> {
  const response = await apiClient.get<KorningsStatus>(`/la/periods/${loneperiodId}/korningsstatus`)
  return response.data
}

/**
 * Hämtar fellista för en löneperiod
 * Används av aktivitet 2.2
 */
export async function fetchFellistor(
  loneperiodId: number,
  filters?: FellistorFilters
): Promise<LACalculationError[]> {
  const response = await apiClient.get<LACalculationError[]>(`/la/fellistor/${loneperiodId}`, {
    params: {
      ...(filters?.severity && { severity: filters.severity }),
      ...(filters?.visa_endast_obehandlade && {
        visa_endast_obehandlade: filters.visa_endast_obehandlade,
      }),
    },
  })
  return response.data
}

/**
 * Hämtar sammanfattning av fellista för en löneperiod
 */
export async function fetchFellistaSummary(loneperiodId: number): Promise<FellistaSummary> {
  const response = await apiClient.get<FellistaSummary>(`/la/fellistor/${loneperiodId}/summary`)
  return response.data
}
