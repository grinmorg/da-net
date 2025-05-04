'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Question, Result } from '@/lib/strapi/services/quizzes'
import { Key, useState } from 'react'

export function QuizGame({
  questions,
  results,
}: {
  questions?: Question[]
  results: Result[]
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  if (!questions) return null

  const handleAnswer = (points: number) => {
    setScore(score + points)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const getResult = () => {
    return results.find((r) => score >= r.from && score <= r.to)
  }

  if (showResult) {
    const result = getResult()
    return (
      <div className="rounded-lg p-6">
        {result?.content.map(
          (
            block: { type: string; children: any[] },
            index: Key | null | undefined,
          ) => (
            <div key={index} className="mb-4">
              {block.type === 'heading' && (
                <h2 className={`mb-2 text-2xl font-bold`}>
                  {block.children[0].text}
                </h2>
              )}
              {block.type === 'paragraph' && (
                <p className="text-lg">
                  {block.children.map((child, i) => {
                    let className = ''
                    if (child.bold) className += 'font-bold '
                    if (child.underline) className += 'underline '
                    return (
                      <span key={i} className={className}>
                        {child.text}
                      </span>
                    )
                  })}
                </p>
              )}
            </div>
          ),
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardContent>
        <h3 className="mb-4 text-xl font-semibold">
          {questions[currentQuestion].title}
        </h3>

        <div className="grid gap-3">
          {questions[currentQuestion].answers?.map((a) => (
            <button
              key={a.id}
              onClick={() => handleAnswer(a.points)}
              className="rounded-lg border p-3 text-left transition-colors hover:bg-gray-50"
            >
              {a.text}
            </button>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Вопрос {currentQuestion + 1} из {questions.length}
        </div>
      </CardContent>
    </Card>
  )
}
