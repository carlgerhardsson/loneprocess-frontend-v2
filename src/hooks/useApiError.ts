/**
 * useApiError — Hook för konsekvent API-felhantering
 *
 * Omvandlar API-fel till svenska felmeddelanden och visar toast-notifikationer.
 */

import { useCallback } from 'react'
import { useToastContext } from '@/contexts/useToastContext'
import { handleAPIError, getErrorMessage } from '@/lib/api/errors'

export function useApiError() {
  const { showError } = useToastContext()

  const handleError = useCallback(
    (error: unknown) => {
      const apiError = handleAPIError(error)
      showError(getErrorMessage(apiError))
      if (import.meta.env.DEV) {
        console.error('[API Error]', apiError)
      }
    },
    [showError]
  )

  const getErrorMsg = useCallback((error: unknown): string => {
    return getErrorMessage(handleAPIError(error))
  }, [])

  return { handleError, getErrorMsg }
}
