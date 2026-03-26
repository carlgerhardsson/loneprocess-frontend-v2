/**
 * Environment validation
 * Validerar obligatoriska miljövariabler vid uppstart
 *
 * OBS: Läser import.meta.env direkt i funktioner (inte cachad)
 * så att vi.stubEnv() fungerar korrekt i tester.
 */

export const env = {
  get apiUrl(): string {
    return (
      import.meta.env.VITE_API_URL ||
      'https://loneprocess-api-922770673146.us-central1.run.app/api/v1'
    )
  },
  get apiKey(): string | undefined {
    return import.meta.env.VITE_LONEPROCESS_API_KEY as string | undefined
  },
}

/**
 * Returnerar bas-URL utan /api/v1 suffix
 */
export function getApiBaseUrl(): string {
  return env.apiUrl.replace(/\/api\/v1$/, '')
}

/**
 * Validerar att obligatoriska env-variabler är satta.
 * Läser import.meta.env direkt så att tester kan stubba värden.
 */
export function validateEnv(): { valid: boolean; missing: string[] } {
  const missing: string[] = []

  if (!import.meta.env.VITE_LONEPROCESS_API_KEY) {
    missing.push('VITE_LONEPROCESS_API_KEY')
  }

  return {
    valid: missing.length === 0,
    missing,
  }
}
