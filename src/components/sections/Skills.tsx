'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skills = [
  {
    category: 'Core Programming',
    items: [
      { name: 'Python (Django, FastAPI)', level: 90 },
      { name: 'JavaScript/TypeScript', level: 85 },
      { name: 'React/Next.js/Node.js', level: 85 },
      { name: 'SQL/NoSQL Databases', level: 80 },
      { name: 'GraphQL/REST APIs', level: 85 },
    ],
  },
  {
    category: 'AI & Machine Learning',
    items: [
      { name: 'TensorFlow/PyTorch', level: 85 },
      { name: 'Natural Language Processing', level: 80 },
      { name: 'Computer Vision', level: 75 },
      { name: 'Deep Learning', level: 80 },
      { name: 'MLOps & Model Deployment', level: 75 },
    ],
  },
  {
    category: 'Data Engineering & Analytics',
    items: [
      { name: 'ETL Pipeline Development', level: 85 },
      { name: 'Big Data (Spark, Hadoop)', level: 75 },
      { name: 'Data Visualization (D3.js)', level: 80 },
      { name: 'Real-time Analytics', level: 85 },
      { name: 'Data Warehousing', level: 75 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      { name: 'AWS/GCP Services', level: 80 },
      { name: 'Docker/Kubernetes', level: 75 },
      { name: 'CI/CD (GitHub Actions)', level: 80 },
      { name: 'Infrastructure as Code', level: 75 },
      { name: 'Monitoring & Logging', level: 70 },
    ],
  },
  {
    category: 'Specialized Skills',
    items: [
      { name: 'Sports Analytics', level: 90 },
      { name: 'Predictive Modeling', level: 85 },
      { name: 'System Architecture', level: 80 },
      { name: 'UI/UX Design', level: 75 },
      { name: 'Technical Leadership', level: 80 },
    ],
  },
]

function SkillCard({ category, items, index }: any) {
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
      className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg hover:shadow-xl transition-all duration-300"
    >
      <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        {category}
      </h3>
      <div className="space-y-4">
        {items.map((skill: any, idx: number) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">{skill.name}</span>
              <span className="text-gray-400">{skill.level}%</span>
            </div>
            <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.1 + idx * 0.1 }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-20 bg-gray-900">
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
              Technical Expertise
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Combining cutting-edge technologies with practical experience to deliver innovative solutions
              across machine learning, full-stack development, and cloud architecture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillGroup, index) => (
              <SkillCard key={skillGroup.category} {...skillGroup} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
