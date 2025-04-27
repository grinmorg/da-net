'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCoinFlip } from '../coinflip-context'
import { cn } from '@/lib/utils'

export function HistoryList() {
  const { history, clearHistory } = useCoinFlip()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Последние броски ({history.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {history.map((item, index) => (
            <div
              key={index}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full',
                item === 'heads' ? 'bg-coin-heads' : 'bg-coin-tails',
              )}
            >
              <span className="text-outline text-xl text-white">
                {item === 'heads' ? 'О' : 'Р'}
              </span>
            </div>
          ))}
          {history.length === 0 && (
            <p className="text-muted-foreground">История бросков пуста</p>
          )}
        </div>
      </CardContent>
      {history.length > 0 && (
        <CardFooter>
          <Button variant="destructive" onClick={clearHistory}>
            Очистить историю
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
