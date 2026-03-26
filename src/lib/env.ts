/**
 * Environment validation
 * Validerar obligatoriska miljövariabler vid uppstart
 */

export const env = {
  apiUrl:
    import.meta.env.VITE_API_URL ||
    'https://loneprocess-api-922770673146.us-central1.run.app/api/v1',
  apiKey: import.meta.env.VITE_LONEPROCESS_API_KEY as string | undefined,
}

/**
 * Returnerar bas-URL utan /api/v1 suffix
 * Används t.ex. för /health-anrop
 */
export function getApiBaseUrl(): string {
  return env.apiUrl.replace(/\/api\/v1$/, '')
}

/**
 * Validerar att obligatoriska env-variabler är satta
 */
export function validateEnv(): { valid: boolean; missing: string[] } {
  const missing: string[] = []

  if (!env.apiKey) {
    missing.push('VITE_LONEPROCESS_API_KEY')
  }

  return {
    valid: missing.length === 0,
    missing,
  }
}
