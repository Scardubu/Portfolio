'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const achievements = [
  {
    title: 'Technical Leadership',
    description: 'Led multiple cross-functional teams in delivering high-impact ML and data engineering projects.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description: 'Developed novel ML algorithms improving prediction accuracy by 35% across multiple domains.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Scale & Performance',
    description: 'Built systems processing 5TB+ data daily with 99.9% uptime and 40% cost reduction.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
]

const certifications = [
  'AWS Certified Solutions Architect',
  'Google Cloud Professional Data Engineer',
  'TensorFlow Developer Certificate',
  'Microsoft Azure AI Engineer',
]

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A passionate technologist with a proven track record of transforming complex challenges
              into elegant, scalable solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="prose prose-invert">
                <p className="text-lg text-gray-300">
                  I'm Oscar Ndugbu, a technologist based in Abuja, Nigeria, specializing in machine learning,
                  data engineering, and full-stack development. With a passion for innovation and problem-solving,
                  I've dedicated my career to building intelligent systems that drive real-world impact.
                </p>
                <p className="text-lg text-gray-300">
                  My expertise spans from developing sophisticated ML models to architecting scalable cloud
                  solutions. I believe in the power of technology to transform businesses and enhance human capabilities.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="/cv.pdf"
                  download
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download CV</span>
                </motion.a>

                <motion.a
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 border border-blue-500 hover:bg-blue-500/10 rounded-full transition-colors space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Let's Talk</span>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg space-y-6">
                <h3 className="text-xl font-semibold">Key Achievements</h3>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{achievement.title}</h4>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg space-y-4">
                <h3 className="text-xl font-semibold">Certifications</h3>
                <ul className="space-y-2">
                  {certifications.map((cert, index) => (
                    <motion.li
                      key={cert}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      className="flex items-center space-x-2 text-gray-300"
                    >
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{cert}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
