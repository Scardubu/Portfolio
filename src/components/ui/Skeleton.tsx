import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: number | string
  height?: number | string
  animate?: boolean
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  animate = true,
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700'

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  }

  const style = {
    width: width,
    height: height || (variant === 'text' ? '1em' : undefined),
  }

  return (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={style}
      animate={animate ? {
        opacity: [0.5, 1, 0.5],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      } : undefined}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
      <Skeleton className="w-3/4 h-6 mb-4" />
      <Skeleton className="w-full h-4 mb-2" />
      <Skeleton className="w-full h-4 mb-2" />
      <Skeleton className="w-2/3 h-4" />
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton variant="circular" width={64} height={64} />
      <div className="space-y-2">
        <Skeleton className="w-48 h-6" />
        <Skeleton className="w-32 h-4" />
      </div>
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
      <Skeleton className="w-full h-48 mb-4" variant="rectangular" />
      <Skeleton className="w-3/4 h-6 mb-2" />
      <Skeleton className="w-full h-4 mb-4" />
      <div className="flex space-x-2">
        <Skeleton className="w-16 h-6" />
        <Skeleton className="w-16 h-6" />
        <Skeleton className="w-16 h-6" />
      </div>
    </div>
  )
}

export function BlogPostSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="w-3/4 h-8" />
      <Skeleton className="w-32 h-4" />
      <div className="space-y-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
      </div>
    </div>
  )
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-4 border-b">
      <Skeleton className="w-8 h-8" variant="circular" />
      <Skeleton className="w-32 h-4" />
      <Skeleton className="w-48 h-4" />
      <Skeleton className="w-24 h-4" />
    </div>
  )
}

export function CommentSkeleton() {
  return (
    <div className="flex space-x-4 p-4">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1 space-y-2">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-24 h-3" />
        </div>
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-3/4 h-4" />
      </div>
    </div>
  )
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  )
}
