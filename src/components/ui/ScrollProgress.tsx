'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

interface ScrollProgressProps {
  color?: string
  height?: number
  showPercentage?: boolean
}

export function ScrollProgress({
  color = 'var(--primary-500)',
  height = 3,
  showPercentage = false,
}: ScrollProgressProps) {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 origin-left"
        style={{
          scaleX,
          backgroundColor: color,
          height,
        }}
      />
      {showPercentage && (
        <motion.div
          className="fixed bottom-4 right-4 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded-full px-3 py-1 text-sm font-medium z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.span>{Math.round(scrollYProgress.get() * 100)}%</motion.span>
        </motion.div>
      )}
    </>
  )
}

interface ScrollToTopProps {
  showAfter?: number // pixels
}

export function ScrollToTop({ showAfter = 400 }: ScrollToTopProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > showAfter)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfter])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 shadow-lg z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </motion.button>
  )
}

// Scroll-based reveal animation component
interface RevealOnScrollProps {
  children: React.ReactNode
  threshold?: number
  delay?: number
}

export function RevealOnScroll({ children, threshold = 0.1, delay = 0 }: RevealOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: `-${threshold * 100}% 0px` }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

// Parallax scroll effect component
interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const y = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      className={className}
      style={{
        y: y.get() * -speed,
      }}
    >
      {children}
    </motion.div>
  )
}
