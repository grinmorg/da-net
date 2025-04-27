'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { useCoinFlip } from '../coinflip-context'

type CoinSide = 'heads' | 'tails' | null

export function FlipCoinGame() {
  const [result, setResult] = useState<CoinSide>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const { flipCoin: contextFlip, stats } = useCoinFlip()

  const flipCoin = () => {
    if (isFlipping) return
    setIsFlipping(true)
    setResult(null)

    // Анимация длится 1 секунду
    setTimeout(() => {
      const randomResult = contextFlip()
      setResult(randomResult)
      setIsFlipping(false)
    }, 1000)
  }

  return (
    <Card className="items-center justify-center">
      <CardContent>
        <div
          className={cn(
            'relative h-64 w-64 cursor-pointer transition-transform duration-1000',
            isFlipping ? 'animate-coin-flip' : '',
            result === 'tails' ? 'bg-coin-tails' : 'bg-coin-heads',
          )}
          onClick={flipCoin}
          aria-label="Подбросить монетку"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {!isFlipping && result && (
              <span className="text-outline text-4xl font-bold text-white">
                {result === 'heads' ? 'Орёл' : 'Решка'}
              </span>
            )}
          </div>
        </div>

        <Button
          size="lg"
          className="mt-8 text-lg"
          onClick={flipCoin}
          disabled={isFlipping}
        >
          {isFlipping ? 'Монетка летит...' : 'Подбросить монетку'}
        </Button>

        {result && !isFlipping && (
          <p className="mt-4 text-center text-xl font-semibold">
            Выпало:{' '}
            <span className="text-primary">
              {result === 'heads' ? 'Орёл' : 'Решка'}
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
