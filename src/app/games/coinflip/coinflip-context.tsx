// app/coinflip/_context/coinflip-context.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type CoinSide = 'heads' | 'tails'

interface CoinFlipContextType {
  history: CoinSide[]
  stats: {
    total: number
    heads: number
    tails: number
  }
  flipCoin: () => CoinSide
  clearHistory: () => void
}

const CoinFlipContext = createContext<CoinFlipContextType | null>(null)

export function CoinFlipProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<CoinSide[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Загрузка из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem('coinFlipData')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setHistory(data.history || [])
      } catch (e) {
        console.error('Failed to parse saved data', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Сохранение в localStorage при изменении
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('coinFlipData', JSON.stringify({ history }))
    }
  }, [history, isLoaded])

  const stats = {
    total: history.length,
    heads: history.filter((side) => side === 'heads').length,
    tails: history.filter((side) => side === 'tails').length,
  }

  const flipCoin = (): CoinSide => {
    const result: CoinSide = Math.random() > 0.5 ? 'heads' : 'tails'
    setHistory((prev) => [result, ...prev.slice(0, 99)]) // Ограничиваем историю 100 записями

    return result
  }

  const clearHistory = () => {
    setHistory([])
  }

  return (
    <CoinFlipContext.Provider
      value={{ history, stats, flipCoin, clearHistory }}
    >
      {children}
    </CoinFlipContext.Provider>
  )
}

export function useCoinFlip() {
  const context = useContext(CoinFlipContext)
  if (!context) {
    throw new Error('useCoinFlip must be used within a CoinFlipProvider')
  }
  return context
}
