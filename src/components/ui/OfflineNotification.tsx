'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useOffline } from '@/hooks/useOffline'

export function OfflineNotification() {
  const isOffline = useOffline()

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-auto z-50"
        >
          <div className="bg-yellow-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3">
            <svg
              className="w-6 h-6 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-medium">You're offline</p>
              <p className="text-sm text-yellow-100">Some features may be limited</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
