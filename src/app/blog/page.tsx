import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Card } from '@/components/ui/shared/Card'
import { AnimatedSection } from '@/components/PageTransition'

interface Post {
  title: string
  date: string
  description: string
  slug: string
}

async function getBlogPosts(): Promise<Post[]> {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return posts
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedSection>
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
      </AnimatedSection>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <AnimatedSection key={post.slug} index={index * 0.1}>
            <Card variant="interactive" className="h-full">
              <article className="p-6">
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h2 className="text-xl font-semibold mt-2 mb-4">
                  <a
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary-500 transition-colors"
                  >
                    {post.title}
                  </a>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {post.description}
                </p>
                <div className="mt-4">
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium inline-flex items-center"
                  >
                    Read more
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}
