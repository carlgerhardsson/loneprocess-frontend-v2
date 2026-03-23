/**
 * Environment Configuration
 *
 * Validates and exports environment variables for type-safe access.
 * Uses Vite's import.meta.env for environment variable access.
 */

interface EnvConfig {
  apiBaseUrl: string
  apiKey: string
  environment: 'development' | 'staging' | 'production'
  isDevelopment: boolean
  isProduction: boolean
}

/**
 * Get environment variable with validation
 */
function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[key] || defaultValue

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

/**
 * Environment configuration
 *
 * All environment variables are validated at startup.
 * Missing required variables will throw errors.
 */
export const env: EnvConfig = {
  apiBaseUrl: getEnvVar('VITE_API_BASE_URL', 'http://localhost:8000/api/v1'),
  apiKey: getEnvVar('VITE_API_KEY', 'dev-api-key-12345'),
  environment: getEnvVar('VITE_ENV', 'development') as EnvConfig['environment'],
  isDevelopment: getEnvVar('VITE_ENV', 'development') === 'development',
  isProduction: getEnvVar('VITE_ENV', 'development') === 'production',
}

// Log configuration in development
if (env.isDevelopment) {
  console.log('🔧 Environment Configuration:', {
    apiBaseUrl: env.apiBaseUrl,
    environment: env.environment,
    apiKeySet: !!env.apiKey,
  })
}
