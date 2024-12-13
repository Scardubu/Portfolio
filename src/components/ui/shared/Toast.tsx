'use client'

import { createContext, useContext, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const toastVariants = cva(
  'pointer-events-auto flex w-full max-w-md rounded-lg shadow-lg ring-1 ring-black ring-opacity-5',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-gray-800',
        success: 'bg-green-50 dark:bg-green-900',
        error: 'bg-red-50 dark:bg-red-900',
        warning: 'bg-yellow-50 dark:bg-yellow-900',
        info: 'bg-blue-50 dark:bg-blue-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface Toast {
  id: string
  title: string
  description?: string
  variant?: VariantProps<typeof toastVariants>['variant']
  duration?: number
}

interface ToastContextType {
  toast: (toast: Omit<Toast, 'id'>) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(
    ({ title, description, variant = 'default', duration = 5000 }: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).slice(2, 11)
      setToasts((prev) => [...prev, { id, title, description, variant, duration }])

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id)
        }, duration)
      }
    },
    []
  )

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div
        className="fixed bottom-0 right-0 z-50 flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
        aria-live="polite"
        aria-label="Notifications"
      >
        <AnimatePresence>
          {toasts.map(({ id, title, description, variant }) => (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className={cn(toastVariants({ variant }))}
            >
              <div className="flex w-0 flex-1 items-center p-4">
                <div className="w-full">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
                    <button
                      onClick={() => dismiss(id)}
                      className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  {description && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
