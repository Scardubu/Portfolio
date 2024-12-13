'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: number
  color?: string
}

export default function LoadingSpinner({ size = 40, color = '#3498db' }: LoadingSpinnerProps) {
  return (
    <motion.div
      className="relative"
      style={{
        width: size,
        height: size,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-transparent"
        style={{
          borderTopColor: color,
          width: '100%',
          height: '100%',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-transparent"
        style={{
          borderRightColor: color,
          width: '80%',
          height: '80%',
          margin: '10%',
          opacity: 0.7,
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 1.5,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
    </motion.div>
  )
}
