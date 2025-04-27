// app/not-found.tsx
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-background relative h-screen w-full">
      <div className="relative container mx-auto flex h-full flex-col items-center justify-center gap-8 px-4 text-center">
        {/* Скетч-стилизованный заголовок */}
        <h1 className="[text-shadow:3px_3px_0_theme(colors.border)] text-9xl font-bold tracking-tight">
          404
        </h1>

        {/* Текст с эффектом рукописного подчеркивания */}
        <div className="relative">
          <p className="text-2xl">Ой-ой! Страница убежала в космос</p>
          <svg
            className="absolute -bottom-6 left-0 w-full"
            viewBox="0 0 200 20"
            preserveAspectRatio="none"
          >
            <path
              d="M0,15 Q50,5 100,15 T200,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Кнопка с тенью как в вашей системе */}
        <Button
          asChild
          variant="default"
          className="hover:translate-x-boxShadowX hover:translate-y-boxShadowY mt-4 hover:shadow-none"
        >
          <Link href="/">На главную</Link>
        </Button>

        {/* Дополнительные элементы в скетч-стиле */}
        <div className="absolute right-8 bottom-8 text-sm opacity-70">
          <p className="border-border inline-block rotate-6 transform border-2 px-2 py-1">
            P.S. Возможно, страницу съел медведь
          </p>
        </div>
      </div>
    </div>
  )
}
