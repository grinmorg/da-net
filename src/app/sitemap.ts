import { STRAPI_BASE_URL } from '@/lib/constants'
import { Quiz } from '@/lib/strapi/services/quizzes'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://da-net.fun'

  // Статические страницы
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/games`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/games/coinflip`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/games/dice`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tests`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Добавьте другие статические страницы
  ]

  // Динамические страницы квизов
  const quizzes = await fetchQuizzesForSitemap()
  const dynamicPages = quizzes.map((quiz: Quiz) => ({
    url: `${baseUrl}/tests/${quiz.slug}`,
    lastModified: new Date(quiz.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...dynamicPages]
}

async function fetchQuizzesForSitemap() {
  const url = new URL('/api/quizzes', STRAPI_BASE_URL)
  url.searchParams.append('fields[0]', 'slug')
  url.searchParams.append('fields[1]', 'updatedAt')
  url.searchParams.append('pagination[pageSize]', '1000') // Получаем все квизы

  try {
    const res = await fetch(url.toString())
    if (!res.ok) throw new Error('Failed to fetch quizzes')
    const { data } = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching quizzes for sitemap:', error)
    return []
  }
}
