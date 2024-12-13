'use client'

import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const loadingVariants = cva('relative', {
  variants: {
    variant: {
      spinner: 'inline-block',
      dots: 'flex space-x-2',
      pulse: 'flex space-x-1',
      screen: 'fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm',
    },
    size: {
      sm: 'h-4 w-4',
      default: 'h-8 w-8',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    },
  },
  defaultVariants: {
    variant: 'spinner',
    size: 'default',
  },
})

interface LoadingProps extends VariantProps<typeof loadingVariants> {
  className?: string
  color?: string
}

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity,
    },
  },
}

const dotsVariants = {
  animate: {
    y: ['0%', '-50%', '0%'],
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      staggerChildren: 0.1,
    },
  },
}

const pulseVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      staggerChildren: 0.2,
    },
  },
}

export function Loading({ variant, size, className, color = 'currentColor' }: LoadingProps) {
  const Component = variant === 'screen' ? motion.div : motion.span

  switch (variant) {
    case 'dots':
      return (
        <div className={cn(loadingVariants({ variant, size }), className)}>
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className={cn('inline-block rounded-full', size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2')}
              style={{ backgroundColor: color }}
              variants={dotsVariants}
              animate="animate"
            />
          ))}
        </div>
      )

    case 'pulse':
      return (
        <div className={cn(loadingVariants({ variant, size }), className)}>
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="inline-block rounded-full"
              style={{
                backgroundColor: color,
                width: size === 'sm' ? '6px' : '8px',
                height: size === 'sm' ? '6px' : '8px',
              }}
              variants={pulseVariants}
              animate="animate"
            />
          ))}
        </div>
      )

    case 'screen':
      return (
        <Component className={cn(loadingVariants({ variant }), className)}>
          <motion.div
            className="relative h-16 w-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-transparent border-l-primary-500 opacity-75"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }}
            />
          </motion.div>
        </Component>
      )

    default:
      return (
        <Component
          className={cn(loadingVariants({ variant, size }), className)}
          variants={spinnerVariants}
          animate="animate"
        >
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{ borderTopColor: color }}
          />
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderRightColor: color,
              opacity: 0.7,
              scale: 0.8,
            }}
          />
        </Component>
      )
  }
}
