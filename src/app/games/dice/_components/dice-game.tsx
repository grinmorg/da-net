'use client'

import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import Dice from 'react-dice-roll'
import { DiceValue, useDice } from '../dice-context'
import { Button } from '@/components/ui/button'

export const DiceGame: React.FC = () => {
  const [isRolling, setIsRolling] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const { rollDice } = useDice()

  const handleRoll = (value: DiceValue) => {
    setIsRolling(false)
    setResult(value)
    rollDice(value)
  }

  const triggerRoll = () => {
    if (isRolling) return
    setIsRolling(true)
    setResult(null)
    // Имитируем клик на кубике, чтобы запустить анимацию
    const diceElement = document.querySelector(
      '.react-dice-roll button',
    ) as HTMLElement
    if (diceElement) {
      diceElement.click()
    }
  }

  return (
    <Card className="items-center justify-center">
      <CardContent className="flex flex-col items-center">
        <div className="react-dice-roll">
          <Dice
            onRoll={handleRoll}
            faceBg="#322215"
            size={200}
            disabled={isRolling}
          />
        </div>

        <Button
          size="lg"
          className="mt-8 text-lg"
          onClick={triggerRoll}
          disabled={isRolling}
        >
          {isRolling ? 'Кубик крутится...' : 'Бросить кубик'}
        </Button>

        {result && !isRolling && (
          <p className="mt-4 text-center text-xl font-semibold">
            Выпало: <span className="text-primary">{result}</span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
