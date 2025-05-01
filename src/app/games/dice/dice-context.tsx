'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6

interface DiceContextType {
  history: DiceValue[]
  stats: {
    total: number
    rolls: Record<DiceValue, number>
  }
  rollDice: (val: DiceValue) => DiceValue[]
  clearHistory: () => void
}

const DiceContext = createContext<DiceContextType | null>(null)

export function DiceProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<DiceValue[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('diceGameData')
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

  // Save to localStorage when changed
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('diceGameData', JSON.stringify({ history }))
    }
  }, [history, isLoaded])

  const stats = {
    total: history.length,
    rolls: {
      1: history.filter((value) => value === 1).length,
      2: history.filter((value) => value === 2).length,
      3: history.filter((value) => value === 3).length,
      4: history.filter((value) => value === 4).length,
      5: history.filter((value) => value === 5).length,
      6: history.filter((value) => value === 6).length,
    },
  }

  const rollDice = (val: DiceValue): DiceValue[] => {
    setHistory((prev) => [val, ...prev]) // Limit history to 100 records

    return history
  }

  const clearHistory = () => {
    setHistory([])
  }

  return (
    <DiceContext.Provider value={{ history, stats, rollDice, clearHistory }}>
      {children}
    </DiceContext.Provider>
  )
}

export function useDice() {
  const context = useContext(DiceContext)
  if (!context) {
    throw new Error('useDice must be used within a DiceProvider')
  }
  return context
}
