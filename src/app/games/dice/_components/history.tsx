'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DiceValue, useDice } from '../dice-context'

// SVG компонент кубика с разными вариантами точек
const DiceFace = ({ value }: { value: DiceValue }) => {
  const dotPositions = {
    1: [{ cx: 16, cy: 16 }],
    2: [
      { cx: 10, cy: 10 },
      { cx: 22, cy: 22 },
    ],
    3: [
      { cx: 10, cy: 10 },
      { cx: 16, cy: 16 },
      { cx: 22, cy: 22 },
    ],
    4: [
      { cx: 10, cy: 10 },
      { cx: 22, cy: 10 },
      { cx: 10, cy: 22 },
      { cx: 22, cy: 22 },
    ],
    5: [
      { cx: 10, cy: 10 },
      { cx: 22, cy: 10 },
      { cx: 16, cy: 16 },
      { cx: 10, cy: 22 },
      { cx: 22, cy: 22 },
    ],
    6: [
      { cx: 10, cy: 8 },
      { cx: 22, cy: 8 },
      { cx: 10, cy: 16 },
      { cx: 22, cy: 16 },
      { cx: 10, cy: 24 },
      { cx: 22, cy: 24 },
    ],
  }

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" className="dice-face">
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="4"
        fill="white"
        stroke="black"
        strokeWidth="1"
      />
      {dotPositions[value].map((pos, i) => (
        <circle key={i} cx={pos.cx} cy={pos.cy} r="3" fill="black" />
      ))}
    </svg>
  )
}

export function HistoryList() {
  const { history, clearHistory } = useDice()

  // Срез последних элементов
  const recentHistory = history.slice(0, 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Последние броски ({recentHistory.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-y-1">
          {recentHistory.length === 0 ? (
            <p className="text-muted-foreground">История бросков пуста</p>
          ) : (
            recentHistory.map((num, index) => (
              <div
                key={`${index}-${num}`}
                className="flex h-10 w-10 items-center justify-center"
              >
                <DiceFace value={num} />
              </div>
            ))
          )}
        </div>
      </CardContent>
      {recentHistory.length > 0 && (
        <CardFooter>
          <Button variant="destructive" onClick={clearHistory}>
            Очистить историю
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
