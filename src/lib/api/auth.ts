/**
 * Auth API
 * Verifierar API-nyckel mot backend
 * OBS: API:et ägs av externt team - inga ändringar kan göras på API-sidan
 */

import axios from 'axios'
import { getApiBaseUrl } from '../env'

/**
 * Verifierar att API:et är nåbart och att API-nyckeln är giltig
 * Anropar /api/v1/activities?limit=1 som kräver X-API-Key
 */
export async function verifyApiKey(apiKey: string): Promise<void> {
  const baseUrl = getApiBaseUrl()
  await axios.get(`${baseUrl}/api/v1/activities`, {
    params: { limit: 1 },
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  })
}
