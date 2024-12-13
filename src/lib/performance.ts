'use client'

import { useEffect } from 'react'

interface PerformanceMetrics {
  fcp: number // First Contentful Paint
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  ttfb: number // Time to First Byte
}

const reportMetric = (metric: keyof PerformanceMetrics, value: number) => {
  // You can send these metrics to your analytics service
  console.log(`${metric}: ${value}`)
}

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // First Contentful Paint
    const paintObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          reportMetric('fcp', entry.startTime)
        }
      }
    })
    paintObserver.observe({ entryTypes: ['paint'] })

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      reportMetric('lcp', lastEntry.startTime)
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        reportMetric('fid', entry.processingStart - entry.startTime)
      }
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += (entry as any).value
        }
      }
      reportMetric('cls', clsValue)
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })

    // Time to First Byte
    const navigationObserver = new PerformanceObserver((entryList) => {
      const [entry] = entryList.getEntries()
      reportMetric('ttfb', entry.responseStart - entry.requestStart)
    })
    navigationObserver.observe({ entryTypes: ['navigation'] })

    return () => {
      paintObserver.disconnect()
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
      navigationObserver.disconnect()
    }
  }, [])
}

export const measureComponentRender = (componentName: string) => {
  const startTime = performance.now()
  return () => {
    const duration = performance.now() - startTime
    console.log(`${componentName} render time: ${duration}ms`)
  }
}

export const withPerformanceTracking = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) => {
  return function WithPerformanceTracking(props: P) {
    useEffect(() => {
      const endMeasure = measureComponentRender(componentName)
      return endMeasure
    }, [])

    return <WrappedComponent {...props} />
  }
}
