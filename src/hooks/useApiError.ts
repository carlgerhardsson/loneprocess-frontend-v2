/**
 * useApiError — Hook för konsekvent API-felhantering
 *
 * Omvandlar API-fel till svenska felmeddelanden och visar toast-notifikationer.
 * Används i komponenter som behöver hantera och presentera API-fel.
 */

import { useCallback } from 'react'
import { useToastContext } from '@/contexts/ToastContext'
import { handleAPIError, getErrorMessage } from '@/lib/api/errors'

export function useApiError() {
  const { showError } = useToastContext()

  /**
   * Hanterar ett API-fel: loggar det och visar en toast.
   */
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

  /**
   * Returnerar ett läsbart felmeddelande från ett fel.
   */
  const getErrorMsg = useCallback((error: unknown): string => {
    return getErrorMessage(handleAPIError(error))
  }, [])

  return { handleError, getErrorMsg }
}
