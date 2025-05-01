// app/coinflip/_components/coinflip-stats.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDice } from '../dice-context'

export function Stats() {
  const { stats } = useDice()

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
      </CardContent>
    </Card>
  )
}
