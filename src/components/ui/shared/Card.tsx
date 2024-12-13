'use client'

import { motion } from 'framer-motion'
import { HTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'rounded-lg bg-white dark:bg-gray-800 shadow-md transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'hover:shadow-lg',
        interactive: 'hover:shadow-xl hover:-translate-y-1 cursor-pointer',
        outline: 'border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400',
        ghost: 'bg-transparent shadow-none hover:bg-gray-50 dark:hover:bg-gray-900',
      },
      padding: {
        none: '',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
    },
  }
)

interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  isAnimated?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, isAnimated = true, children, ...props }, ref) => {
    const Component = isAnimated ? motion.div : 'div'

    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        initial={isAnimated ? { opacity: 0, y: 20 } : undefined}
        whileInView={isAnimated ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Card.displayName = 'Card'

export { Card, cardVariants }
