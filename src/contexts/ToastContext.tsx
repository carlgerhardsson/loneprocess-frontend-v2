/**
 * ToastContext — Global toast-notifikationer
 *
 * Ger hela appen tillgång till toast-notifikationer via useToastContext().
 * Använd denna istället för den lokala useToast-hooken när du vill
 * visa toast från var som helst i appen (t.ex. från API-felhantering).
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { Toast, type ToastType } from '@/components/ui/Toast'

interface ToastState {
  id: number
  message: string
  type: ToastType
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void
  showError: (message: string) => void
  showSuccess: (message: string) => void
  showInfo: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

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

  const showError = useCallback(
    (message: string) => showToast(message, 'error'),
    [showToast]
  )
  const showSuccess = useCallback(
    (message: string) => showToast(message, 'success'),
    [showToast]
  )
  const showInfo = useCallback(
    (message: string) => showToast(message, 'info'),
    [showToast]
  )

  return (
    <ToastContext.Provider value={{ showToast, showError, showSuccess, showInfo }}>
      {children}
      {/* Render alla aktiva toasts */}
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

export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToastContext måste användas inuti <ToastProvider>')
  }
  return ctx
}
