import './globals.css'
import { Providers } from './providers'
import { Inter } from 'next/font/google'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ToastProvider } from '@/components/ui/shared/Toast'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { MobileNav } from '@/components/ui/MobileNav'
import { GestureHandler } from '@/components/ui/MobileGestures'
import { OfflineNotification } from '@/components/ui/OfflineNotification'
import { Analytics } from '@vercel/analytics/react'
import { usePerformanceMonitoring } from '@/lib/performance'
import { ScrollProgress, ScrollToTop } from '@/components/ui/ScrollProgress'
import { useEffect } from 'react'
import type { Metadata, Viewport } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#0ea5e9',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 2,
  userScalable: true,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-portfolio.com'),
  title: {
    default: 'Portfolio | Modern Developer Portfolio',
    template: '%s | Portfolio'
  },
  description: 'A modern portfolio showcasing innovative projects and technical expertise in web development, AI, and software engineering.',
  keywords: ['Portfolio', 'Web Development', 'Software Engineering', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Modern Developer Portfolio',
    description: 'Showcasing innovative projects and technical expertise',
    siteName: 'Developer Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Developer Portfolio',
    description: 'Showcasing innovative projects and technical expertise',
    creator: '@yourusername',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Portfolio',
  },
  formatDetection: {
    telephone: false,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-192x192.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/safari-pinned-tab.svg',
        color: '#0ea5e9',
      },
    ],
  },
}

function PerformanceMonitor() {
  usePerformanceMonitoring()
  return null
}

function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      const wb = window.workbox

      wb.addEventListener('installed', (event: any) => {
        if (event.isUpdate) {
          if (confirm('New content is available! Click OK to refresh.')) {
            window.location.reload()
          }
        }
      })

      wb.addEventListener('waiting', () => {
        if (confirm('New content is available! Click OK to refresh.')) {
          wb.messageSkipWaiting()
          window.location.reload()
        }
      })

      wb.register()
    }
  }, [])

  return null
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const handleRefresh = async () => {
    'use server'
    // Add your refresh logic here
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <ErrorBoundary>
          <Providers>
            <ToastProvider>
              <GestureHandler onRefresh={handleRefresh}>
                <ThemeToggle />
                <ScrollProgress showPercentage />
                <main className="min-h-screen pb-16 lg:pb-0">
                  <div
                    className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 -z-10 transition-colors duration-300"
                    aria-hidden="true"
                  />
                  {children}
                </main>
                <MobileNav />
                <OfflineNotification />
                <ScrollToTop />
              </GestureHandler>
            </ToastProvider>
          </Providers>
        </ErrorBoundary>
        <ServiceWorkerRegistration />
        <PerformanceMonitor />
        <Analytics />
      </body>
    </html>
  )
}
