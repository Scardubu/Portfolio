import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/shared/Button'
import { Card } from '@/components/ui/shared/Card'
import { CommentSkeleton } from '@/components/ui/Skeleton'
import { formatDate } from '@/lib/utils'
import { trackSocial } from '@/lib/analytics'

interface Comment {
  id: string
  name: string
  message: string
  createdAt: string
  avatar?: string
}

export function Guestbook() {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ name: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      })

      if (!response.ok) throw new Error('Failed to submit comment')

      const comment = await response.json()
      setComments((prev) => [comment, ...prev])
      setNewComment({ name: '', message: '' })
      trackSocial('Guestbook', 'comment', 'new_comment')
    } catch (error) {
      console.error('Failed to submit comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const commentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <Card className="mb-8">
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={newComment.name}
              onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={3}
              value={newComment.message}
              onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="Leave a message..."
            />
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="w-full"
          >
            Sign Guestbook
          </Button>
        </form>
      </Card>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <CommentSkeleton key={i} />)
        ) : (
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                variants={commentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layout
              >
                <Card className="p-4">
                  <div className="flex items-start space-x-4">
                    {comment.avatar ? (
                      <img
                        src={comment.avatar}
                        alt={comment.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <span className="text-primary-700 dark:text-primary-300 font-medium">
                          {comment.name[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {comment.name}
                        </h3>
                        <time
                          dateTime={comment.createdAt}
                          className="text-xs text-gray-500 dark:text-gray-400"
                        >
                          {formatDate(new Date(comment.createdAt))}
                        </time>
                      </div>
                      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {comment.message}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
