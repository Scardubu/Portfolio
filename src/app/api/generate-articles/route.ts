import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { topics, count = 4 } = await request.json()

    const prompt = `Generate ${count} unique, engaging, and technically detailed blog article ideas about ${topics.join(', ')}.
    For each article, include:
    - A catchy title
    - A compelling excerpt (2-3 sentences)
    - A relevant category from: Machine Learning, Sports Tech, Web Development, DevOps, Data Engineering
    - An estimated read time in minutes

    Format the response as a JSON array of objects with properties: title, excerpt, category, readTime.
    Make the content highly technical, insightful, and focused on cutting-edge developments.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a technical blog content generator specializing in AI, web development, and data science.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    })

    const response = completion.choices[0].message.content
    const articles = JSON.parse(response || '[]')

    // Add additional metadata to each article
    const processedArticles = articles.map((article: any) => ({
      ...article,
      date: new Date().toLocaleDateString(),
      image: `/blog/${article.category.toLowerCase().replace(' ', '-')}.jpg`,
      slug: article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      readTime: `${article.readTime} min read`,
    }))

    return NextResponse.json(processedArticles)
  } catch (error) {
    console.error('Error generating articles:', error)
    return NextResponse.json({ error: 'Failed to generate articles' }, { status: 500 })
  }
}
