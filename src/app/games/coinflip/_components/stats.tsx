// app/coinflip/_components/coinflip-stats.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCoinFlip } from '../coinflip-context'

export function CoinflipStats() {
  const { stats } = useCoinFlip()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Статистика</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <p className="text-muted-foreground text-sm">Всего бросков</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground text-sm">Орёл</p>
            <p className="text-2xl font-bold">{stats.heads}</p>
            <p className="text-muted-foreground text-sm">
              {stats.total > 0
                ? `${Math.round((stats.heads / stats.total) * 100)}%`
                : '0%'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Решка</p>
            <p className="text-2xl font-bold">{stats.tails}</p>
            <p className="text-muted-foreground text-sm">
              {stats.total > 0
                ? `${Math.round((stats.tails / stats.total) * 100)}%`
                : '0%'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
