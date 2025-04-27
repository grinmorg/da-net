import { Metadata } from 'next'
import { FlipCoinGame } from './_components/flip-coin-game'
import { CoinflipStats } from './_components/stats'
import { HistoryList } from './_components/history'
import { CoinFlipProvider } from './coinflip-context'

export const metadata: Metadata = {
  title: 'Орёл или решка? - Виртуальная монетка для принятия решений',
  description:
    'Не можете выбрать? Подбросьте нашу виртуальную монетку! Честный случайный выбор между орлом и решкой. Кидайте сколько угодно раз - пока не получите нужный результат. Идеально для споров и быстрых решений.',
}

export default function CoinflipGamePage() {
  return (
    <div>
      <h1 className="font-heading mb-8 text-2xl sm:text-4xl">Монетка</h1>

      <p className="my-4 max-w-2xl text-lg">
        Когда сомневаешься - подбрось монетку! Древнейший способ принятия
        решений теперь в вашем браузере. Кидайте монетку для разрешения споров,
        выбора варианта или просто для развлечения.
      </p>
      <CoinFlipProvider>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FlipCoinGame />
          </div>

          <div className="space-y-8">
            <CoinflipStats />
            <HistoryList />
          </div>
        </div>
      </CoinFlipProvider>

      <section className="mt-12 rounded-lg">
        <h2 className="mb-4 text-xl font-semibold">Как это работает?</h2>
        <ul className="space-y-2">
          <li>• Нажмите на монетку, чтобы подбросить её</li>
          <li>• Используйте результат для принятия решения</li>
          <li>
            • Если не уверены - кидайте снова (но помните, что после 3-го раза
            монетка начинает врать)
          </li>
          <li>• История бросков сохраняется автоматически</li>
        </ul>
      </section>
    </div>
  )
}
