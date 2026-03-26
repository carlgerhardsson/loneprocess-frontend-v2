/**
 * useToastContext — Hook för global toast-context
 *
 * Separerat från ToastContext.tsx för att undvika
 * react-refresh/only-export-components-varning.
 */

import { useContext } from 'react'
import { ToastContext, type ToastContextValue } from './ToastContext'

export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToastContext måste användas inuti <ToastProvider>')
  }
  return ctx
}
