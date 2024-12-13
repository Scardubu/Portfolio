declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

type GTagEvent = {
  action: string
  category: string
  label: string
  value?: number
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return

  // Add the Google Analytics script
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  script.async = true
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
  })
}

// Log page views
export const logPageView = (url: string) => {
  if (typeof window === 'undefined') return

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// Log events
export const logEvent = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window === 'undefined') return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Log exceptions
export const logException = (description: string, fatal = false) => {
  if (typeof window === 'undefined') return

  window.gtag('event', 'exception', {
    description,
    fatal,
  })
}

// Track user timing
export const trackTiming = (name: string, value: number, category?: string, label?: string) => {
  if (typeof window === 'undefined') return

  window.gtag('event', 'timing_complete', {
    name,
    value,
    event_category: category,
    event_label: label,
  })
}

// Track social interactions
export const trackSocial = (network: string, action: string, target: string) => {
  if (typeof window === 'undefined') return

  window.gtag('event', 'social', {
    social_network: network,
    social_action: action,
    social_target: target,
  })
}

// Custom dimension tracking
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window === 'undefined') return

  window.gtag('set', 'user_properties', properties)
}

// Track user engagement
export const trackEngagement = (type: string, details: Record<string, any>) => {
  if (typeof window === 'undefined') return

  window.gtag('event', 'engagement', {
    engagement_type: type,
    ...details,
  })
}

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean) => {
  if (typeof window === 'undefined') return

  window.gtag('event', 'form_submission', {
    form_name: formName,
    success,
  })
}

// Track performance metrics
export const trackPerformance = (metric: string, value: number) => {
  if (typeof window === 'undefined') return

  window.gtag('event', 'performance', {
    metric,
    value,
  })
}
