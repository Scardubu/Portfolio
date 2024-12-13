'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useLoading } from '@/app/providers'

export default function LoadingScreen() {
  const { isLoading, setIsLoading } = useLoading()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [setIsLoading])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: "easeInOut",
              when: "beforeChildren"
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-gray-900 to-black"
        >
          <div className="relative flex flex-col items-center">
            {/* Main rotating circle */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity
              }}
              className="w-32 h-32"
            >
              <div className="absolute w-full h-full rounded-full border-t-4 border-r-4 border-blue-500 animate-pulse" />
              <div className="absolute w-full h-full rounded-full border-b-4 border-l-4 border-purple-500 animate-pulse" style={{ animationDelay: '-0.5s' }} />
            </motion.div>

            {/* Center dot */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-4 h-4 bg-blue-500 rounded-full"
            />

            {/* Text elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 text-center"
            >
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Oscar Ndugbu
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-2 text-gray-400"
              >
                Technological Storyteller
              </motion.p>
            </motion.div>

            {/* Loading dots */}
            <motion.div
              className="flex gap-1 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: ["0%", "-50%", "0%"]
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
