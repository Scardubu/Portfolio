'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const experiences = [
  {
    title: 'Lead Machine Learning Engineer',
    company: 'TechVision Analytics',
    period: '2022 - Present',
    location: 'Abuja, Nigeria',
    description: 'Leading a team of ML engineers in developing cutting-edge sports analytics and prediction systems.',
    achievements: [
      'Architected and deployed ML pipeline processing 1M+ events daily',
      'Improved prediction accuracy by 35% using ensemble learning techniques',
      'Led team of 5 engineers across multiple high-impact projects',
      'Reduced model training time by 60% through optimization',
    ],
    technologies: ['Python', 'TensorFlow', 'AWS', 'Kubernetes'],
  },
  {
    title: 'Senior Data Engineer',
    company: 'DataFlow Solutions',
    period: '2020 - 2022',
    location: 'Lagos, Nigeria',
    description: 'Designed and implemented scalable data pipelines and analytics solutions for enterprise clients.',
    achievements: [
      'Built real-time data processing system handling 5TB+ daily',
      'Reduced cloud infrastructure costs by 40%',
      'Implemented automated data quality monitoring',
      'Mentored junior engineers in best practices',
    ],
    technologies: ['Apache Spark', 'Python', 'AWS', 'Airflow'],
  },
  {
    title: 'Full Stack Developer',
    company: 'InnovateHub',
    period: '2018 - 2020',
    location: 'Remote',
    description: 'Developed full-stack applications with focus on performance and user experience.',
    achievements: [
      'Created microservices architecture serving 100K+ users',
      'Implemented CI/CD pipelines reducing deployment time by 70%',
      'Optimized application performance improving load times by 50%',
      'Led migration from monolith to microservices architecture',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'Docker'],
  },
]

function ExperienceCard({ experience, index }: any) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-purple-600" />

      {/* Timeline dot */}
      <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-blue-500" />

      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            {experience.title}
          </h3>
          <span className="text-sm text-gray-400">{experience.period}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 text-gray-400">
          <span>{experience.company}</span>
          <span className="hidden md:block">•</span>
          <span>{experience.location}</span>
        </div>

        <p className="text-gray-300">{experience.description}</p>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-400">Key Achievements:</h4>
          <ul className="space-y-1">
            {experience.achievements.map((achievement, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 + idx * 0.1 }}
                className="text-sm text-gray-400 flex items-start space-x-2"
              >
                <span className="text-blue-400 mt-1">→</span>
                <span>{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="py-20 bg-gray-900">
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
              Professional Experience
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A track record of delivering innovative solutions and leading high-performance teams
              in machine learning, data engineering, and full-stack development.
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.period}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
