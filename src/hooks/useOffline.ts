'use client'

import { useState, useEffect } from 'react'

export function useOffline(): boolean {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    function onOffline() {
      setIsOffline(true)
    }

    function onOnline() {
      setIsOffline(false)
    }

    // Check initial state
    setIsOffline(!navigator.onLine)

    // Add event listeners
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    // Cleanup
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  return isOffline
}
