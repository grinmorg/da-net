import { fetchFromStrapi } from '../fetch'
import { ImageAttributes } from '../types/image'

export type Question = {
  id: number
  title: string
  answers?: {
    id: number
    text: string
  }[]
}

export type Result = {
  id: number
  from: number
  to: number
  content: string
}

export type Quiz = {
  id: number
  documentId: string
  title: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  cover: ImageAttributes
  blocks: {
    __component: string
    metaTitle?: string
    metaDescription?: string
  }[]
  questions?: Question[]
  results: Result[]
}

type QuizzesResponse = {
  data: Quiz[]
  meta: Meta
}

export const quizService = {
  getQuizzes: async (
    page: number = 1,
    pageSize: number = 4,
  ): Promise<QuizzesResponse> => {
    return fetchFromStrapi<QuizzesResponse>('/quizzes', {
      pagination: { page, pageSize },
      populate: '*',
    })
  },

  getQuizBySlug: async (slug: string): Promise<Quiz | null> => {
    try {
      const res = fetchFromStrapi<QuizzesResponse>('/quizzes', {
        filters: { slug: { $eq: slug } }, // Добавляем фильтр по slug
        populate: ['cover', 'blocks', 'results', 'questions.answers'],
      })
      const { data } = await res
      return data.length > 0 ? data[0] : null
    } catch (error) {
      console.error('Failed to fetch quiz:', error)
      return null
    }
  },
}
