import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { QuizGame } from './_components/quiz-game'
import { quizService } from '@/lib/strapi/services/quizzes'
import { getSiteTitle } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const quiz = await quizService.getQuizBySlug(slug)
  if (!quiz) return {}

  const seoBlock = quiz.blocks.find((b) => b.__component === 'shared.seo')

  const imageUrl = quiz.cover.formats.medium?.url || quiz.cover.url

  return {
    title: getSiteTitle(seoBlock?.metaTitle || quiz.title),
    description: seoBlock?.metaDescription || quiz.description,
    openGraph: {
      title: seoBlock?.metaTitle || quiz.title,
      description: seoBlock?.metaDescription || quiz.description,
      images: [imageUrl],
    },
  }
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const quiz = await quizService.getQuizBySlug(slug)
  if (!quiz) return notFound()

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="relative mb-8 h-64">
        <Image
          src={quiz.cover.url}
          alt={quiz.title}
          fill
          className="rounded-lg object-contain"
        />
      </div>

      <h1 className="mb-4 text-3xl font-bold">{quiz.title}</h1>
      <p className="mb-8 text-lg">{quiz.description}</p>

      <QuizGame questions={quiz.questions} results={quiz.results} />
    </div>
  )
}
