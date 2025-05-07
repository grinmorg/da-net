'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import type { Question, Result } from '@/lib/strapi/services/quizzes'
import { type Key, useState } from 'react'
import ClientMarkdownRenderer from '@/components/client-md-renderer'

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
  const [selectedValue, setSelectedValue] = useState<number | null>(null)

  if (!questions) return null

  const answerOptions = [
    { label: 'Точно нет', value: 0 },
    { label: 'Скорее нет', value: 3 },
    { label: 'Не уверен', value: 5 },
    { label: 'Скорее да', value: 7 },
    { label: 'Точно да', value: 10 },
  ]

  const handleSliderChange = (value: number[]) => {
    setSelectedValue(value[0])
  }

  const handleSubmitAnswer = () => {
    if (selectedValue !== null) {
      setScore(score + answerOptions[selectedValue].value)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedValue(null)
      } else {
        setShowResult(true)
      }
    }
  }

  const getResult = () => {
    return results.find((r) => score >= r.from && score <= r.to)
  }

  if (showResult) {
    const result = getResult()

    if (!result) return null
    return (
      <Card>
        <CardContent>
          <ClientMarkdownRenderer content={result?.content} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="py-6">
        <h3 className="mb-6 text-xl font-semibold">
          {questions[currentQuestion].title}
        </h3>

        <div className="mb-10">
          <div className="relative pt-4">
            <Slider
              defaultValue={[2]}
              value={selectedValue !== null ? [selectedValue] : [2]}
              onValueChange={handleSliderChange}
              max={4}
              step={1}
              className="py-4"
            />
            <div className="pointer-events-none absolute top-4 flex w-full justify-between">
              {Array.from({ length: answerOptions.length }).map((_, i) => (
                <div key={i} className="h-2 w-0.5 bg-gray-300" />
              ))}
            </div>
          </div>

          <div className="flex justify-between text-sm">
            {answerOptions.map((option, index) => (
              <div
                key={index}
                className={`w-1/5 cursor-pointer text-center text-xs sm:text-sm ${
                  selectedValue === index ? 'text-primary font-bold' : ''
                }`}
                onClick={() => setSelectedValue(index)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSubmitAnswer}
          className="w-full"
          disabled={selectedValue === null}
        >
          Далее
        </Button>

        <div className="mt-4 text-sm text-gray-500">
          Вопрос {currentQuestion + 1} из {questions.length}
        </div>
      </CardContent>
    </Card>
  )
}
