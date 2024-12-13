'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface GestureHandlerProps {
  children: React.ReactNode
  onRefresh?: () => Promise<void>
  enablePullToRefresh?: boolean
  enableSwipeNavigation?: boolean
}

export function GestureHandler({
  children,
  onRefresh,
  enablePullToRefresh = true,
  enableSwipeNavigation = true,
}: GestureHandlerProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()
  const y = useMotionValue(0)
  const x = useMotionValue(0)

  // Pull to refresh indicator opacity
  const pullProgress = useTransform(y, [0, 100], [0, 1])
  const scale = useTransform(y, [0, 100], [0.8, 1])

  // Swipe navigation progress
  const swipeProgress = useTransform(x, [-100, 0, 100], [-1, 0, 1])

  useEffect(() => {
    // Reset position when refreshing is done
    if (!isRefreshing) {
      animate(y, 0, { type: 'spring', stiffness: 400, damping: 30 })
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 })
    }
  }, [isRefreshing, y, x])

  const handleDragEnd = async () => {
    if (y.get() > 100 && enablePullToRefresh && onRefresh) {
      setIsRefreshing(true)
      await onRefresh()
      setIsRefreshing(false)
    }

    if (enableSwipeNavigation) {
      const xOffset = x.get()
      if (Math.abs(xOffset) > 100) {
        if (xOffset > 0) {
          router.back()
        } else {
          router.forward()
        }
      }
    }
  }

  return (
    <motion.div
      drag={enablePullToRefresh || enableSwipeNavigation}
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      style={{ x, y }}
      className="min-h-screen touch-pan-y"
    >
      {/* Pull to refresh indicator */}
      {enablePullToRefresh && (
        <motion.div
          className="fixed top-0 left-0 right-0 flex justify-center pointer-events-none"
          style={{ opacity: pullProgress, scale }}
        >
          <div className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded-full px-4 py-2 shadow-lg">
            {isRefreshing ? (
              <span>Refreshing...</span>
            ) : (
              <span>Pull to refresh</span>
            )}
          </div>
        </motion.div>
      )}

      {/* Swipe navigation indicators */}
      {enableSwipeNavigation && (
        <>
          <motion.div
            className="fixed left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
          >
            <div className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded-full p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </motion.div>
          <motion.div
            className="fixed right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
          >
            <div className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded-full p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        </>
      )}

      {children}
    </motion.div>
  )
}
