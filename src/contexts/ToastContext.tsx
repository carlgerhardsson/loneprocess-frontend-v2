/**
 * ToastContext — Global toast-provider
 *
 * Exporterar ToastProvider (komponent) och ToastContext (context-objekt).
 * Context-objekt och komponenter i samma fil är ett känt React-mönster.
 * Se useToastContext.ts för hooken.
 */

import { createContext, useState, useCallback, type ReactNode } from 'react'
import { Toast, type ToastType } from '@/components/ui/Toast'

interface ToastState {
  id: number
  message: string
  type: ToastType
}

export interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void
  showError: (message: string) => void
  showSuccess: (message: string) => void
  showInfo: (message: string) => void
}

// eslint-disable-next-line react-refresh/only-export-components -- context + provider i samma fil är standard React-mönster
export const ToastContext = createContext<ToastContextValue | null>(null)

let toastIdCounter = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastState[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++toastIdCounter
    setToasts(prev => [...prev, { id, message, type }])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const showError = useCallback((message: string) => showToast(message, 'error'), [showToast])
  const showSuccess = useCallback((message: string) => showToast(message, 'success'), [showToast])
  const showInfo = useCallback((message: string) => showToast(message, 'info'), [showToast])

  return (
    <ToastContext.Provider value={{ showToast, showError, showSuccess, showInfo }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast, index) => (
          <div key={toast.id} style={{ bottom: `${index * 70}px` }}>
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
