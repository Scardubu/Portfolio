'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const projects = [
  {
    title: 'AI-Powered Sports Analytics Platform',
    description: 'Developed a comprehensive sports analytics platform using machine learning for real-time match predictions, player performance analysis, and automated insights generation. Achieved 85% prediction accuracy across multiple sports.',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'React', 'AWS'],
    image: '/projects/sports-analytics.jpg',
    gradient: 'from-blue-500/20 to-purple-500/20',
    highlights: [
      'Real-time data processing pipeline handling 1M+ events/day',
      'Advanced ML models for match outcome prediction',
      'Interactive dashboards with D3.js visualizations',
      'Microservices architecture with Kubernetes deployment',
    ],
  },
  {
    title: 'Intelligent Betting Analytics System',
    description: 'Created an innovative betting analytics platform that combines historical data analysis, real-time odds processing, and machine learning to generate high-confidence betting recommendations.',
    tags: ['Machine Learning', 'Python', 'Node.js', 'MongoDB', 'Docker'],
    image: '/projects/betting-insights.jpg',
    gradient: 'from-green-500/20 to-blue-500/20',
    highlights: [
      'Automated data collection from 50+ betting providers',
      'Custom ML models with 75% success rate',
      'Real-time odds comparison and arbitrage detection',
      'Scalable architecture processing 100K+ events daily',
    ],
  },
  {
    title: 'Enterprise Data Pipeline Platform',
    description: 'Architected and implemented a scalable data pipeline platform for enterprise clients, handling diverse data sources and complex transformation requirements.',
    tags: ['Apache Spark', 'Python', 'AWS', 'Airflow', 'Terraform'],
    image: '/projects/data-pipeline.jpg',
    gradient: 'from-purple-500/20 to-pink-500/20',
    highlights: [
      'Processing 5TB+ data daily with 99.9% uptime',
      'Automated ETL workflows with Apache Airflow',
      'Real-time data quality monitoring',
      'Cost optimization reducing cloud expenses by 40%',
    ],
  },
  {
    title: 'Next-Gen Portfolio Platform',
    description: 'Designed and developed this portfolio using cutting-edge web technologies, featuring 3D visualizations, interactive animations, and optimal performance.',
    tags: ['Next.js', 'Three.js', 'TypeScript', 'Framer Motion'],
    image: '/projects/portfolio.jpg',
    gradient: 'from-orange-500/20 to-red-500/20',
    highlights: [
      'Interactive 3D skill visualization',
      'Optimized performance with 95+ Lighthouse score',
      'Responsive design with smooth animations',
      'Automated deployment with GitHub Actions',
    ],
  },
]

function ProjectCard({ project, index }: any) {
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
      className="group bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className={`h-48 relative bg-gradient-to-br ${project.gradient}`}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-300">{project.description}</p>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-400">Key Highlights:</h4>
          <ul className="space-y-1">
            {project.highlights.map((highlight, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 + idx * 0.1 }}
                className="text-sm text-gray-400 flex items-center space-x-2"
              >
                <span className="text-blue-400">→</span>
                <span>{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="projects" className="py-20 bg-gray-900">
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
              Featured Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A selection of projects showcasing my expertise in machine learning, 
              full-stack development, and scalable system architecture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
