'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

interface Article {
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  image: string
  slug: string
}

interface ArticleCardProps {
  article: Article
  index: number
}

// This would typically come from your CMS
const categories = [
  'All',
  'Machine Learning',
  'Sports Tech',
  'Web Development',
  'DevOps',
  'Data Engineering',
] as const

type Category = (typeof categories)[number]

async function fetchArticles() {
  // This is where you'd integrate with your CMS
  // Example with Contentful:
  // const response = await fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/entries?content_type=article&access_token=${ACCESS_TOKEN}`)
  // const data = await response.json()
  // return data.items.map(transformContentfulArticle)

  // For now, we'll use the OpenAI API to generate articles
  try {
    const response = await fetch('/api/generate-articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topics: ['AI', 'Web Development', 'Data Science', 'Cloud Computing'],
        count: 4,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch articles')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching articles:', error)
    return defaultArticles
  }
}

const defaultArticles = [
  {
    title: 'Building Scalable ML Systems: A Practical Guide',
    excerpt: 'Learn how to design and implement machine learning systems that can handle millions of predictions daily while maintaining high performance and reliability.',
    date: new Date().toLocaleDateString(),
    category: 'Machine Learning',
    readTime: '8 min read',
    image: '/blog/ml-systems.jpg',
    slug: 'building-scalable-ml-systems',
  },
  {
    title: 'The Future of Sports Analytics',
    excerpt: 'Exploring how AI and machine learning are revolutionizing sports predictions and performance analysis in professional athletics.',
    date: new Date().toLocaleDateString(),
    category: 'Sports Tech',
    readTime: '6 min read',
    image: '/blog/sports-analytics.jpg',
    slug: 'future-of-sports-analytics',
  },
  // ... other articles
] as Article[]

function ArticleCard({ article, index }: ArticleCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-64 mb-4 overflow-hidden rounded-lg bg-gray-800/50">
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20`} />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <span className="inline-block px-3 py-1 text-sm bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-300 mb-2">
            {article.category}
          </span>
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
            {article.title}
          </h3>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-gray-400 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{article.date}</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </motion.article>
  )
}

export function Blog() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [articles, setArticles] = useState<Article[]>(defaultArticles)
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function loadArticles() {
      setIsLoading(true)
      try {
        const newArticles = await fetchArticles()
        setArticles(newArticles)
      } catch (error) {
        console.error('Error loading articles:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadArticles()
  }, [])

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory)

  return (
    <section id="blog" className="py-20 bg-gray-900">
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
              Latest Articles
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Insights and thoughts on technology, innovation, and building scalable solutions.
            </p>
          </div>

          <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  category === selectedCategory
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <motion.div
                className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {filteredArticles.map((article, index) => (
                <ArticleCard key={article.slug} article={article} index={index} />
              ))}
            </motion.div>
          )}

          <div className="text-center">
            <motion.button
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Articles</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
